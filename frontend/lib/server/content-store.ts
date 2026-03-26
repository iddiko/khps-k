import "server-only";
import { defaultMenus, defaultPages, defaultSiteConfig, getDefaultPage } from "../defaults";
import { Menu, PageData, SiteData } from "../types";
import { getServiceSupabase, storageBucket } from "./supabase";

type SiteContentKey = "menus" | "pages" | "site";

type SiteContentRow = {
  key: SiteContentKey;
  value: unknown;
};

const defaultContent: Record<SiteContentKey, unknown> = {
  menus: defaultMenus,
  pages: defaultPages,
  site: defaultSiteConfig
};

let seedPromise: Promise<void> | null = null;

async function ensureSeeded() {
  if (seedPromise) {
    return seedPromise;
  }

  seedPromise = (async () => {
    try {
      const supabase = getServiceSupabase();
      const { data, error } = await supabase
        .from("site_content")
        .select("key")
        .in("key", Object.keys(defaultContent));

      if (error) {
        return;
      }

      const existingKeys = new Set((data || []).map((row) => row.key));
      const missingRows = (Object.keys(defaultContent) as SiteContentKey[])
        .filter((key) => !existingKeys.has(key))
        .map((key) => ({
          key,
          value: defaultContent[key]
        }));

      if (missingRows.length) {
        await supabase.from("site_content").upsert(missingRows, { onConflict: "key" });
      }
    } catch {
      return;
    }
  })();

  return seedPromise;
}

async function getSiteContent<T>(key: SiteContentKey, fallback: T): Promise<T> {
  try {
    await ensureSeeded();
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value")
      .eq("key", key)
      .maybeSingle<SiteContentRow>();

    if (error || !data) {
      return fallback;
    }

    return (data.value as T) || fallback;
  } catch {
    return fallback;
  }
}

export async function saveSiteContent<T>(key: SiteContentKey, value: T) {
  const supabase = getServiceSupabase();
  const { error } = await supabase.from("site_content").upsert({ key, value }, { onConflict: "key" });

  if (error) {
    throw error;
  }
}

export async function getMenusContent() {
  return getSiteContent<Menu[]>("menus", defaultMenus);
}

export async function getPagesContent() {
  return getSiteContent<PageData[]>("pages", defaultPages);
}

export async function getSiteConfigContent() {
  return getSiteContent<SiteData>("site", defaultSiteConfig);
}

export async function getPageContent(slugPath: string[]) {
  const pages = await getPagesContent();
  return pages.find((page) => page.slugPath.join("/") === slugPath.join("/")) || getDefaultPage(slugPath);
}

export async function addMenuContent(parentTitle: Menu["title"], childTitle: Menu["children"][number]["title"]) {
  const menus = await getMenusContent();
  const pages = await getPagesContent();
  const parentSlug = slugifyText(parentTitle.ko || parentTitle.en || parentTitle.zh || "menu");
  const childSlug = slugifyText(childTitle.ko || childTitle.en || childTitle.zh || "page");

  const menu = {
    id: `menu-${Date.now()}`,
    slug: parentSlug,
    title: parentTitle,
    children: [
      {
        id: `child-${Date.now()}`,
        slug: childSlug,
        title: childTitle
      }
    ]
  };

  const pageSeed = getDefaultPage([parentSlug, childSlug]);

  pages.push({
    ...pageSeed,
    id: `page-${Date.now()}-${childSlug}`,
    slugPath: [parentSlug, childSlug],
    hero: {
      ...pageSeed.hero,
      title: childTitle
    }
  });

  menus.push(menu);
  await saveSiteContent("menus", menus);
  await saveSiteContent("pages", pages);
  return menu;
}

export async function updatePageContent(pageData: PageData) {
  const pages = await getPagesContent();
  const index = pages.findIndex((item) => item.id === pageData.id);

  if (index < 0) {
    throw new Error("Page not found");
  }

  pages[index] = pageData;
  await saveSiteContent("pages", pages);
  return pageData;
}

export async function createPageContent(pageData: PageData) {
  const pages = await getPagesContent();
  const nextPage = {
    ...pageData,
    id: pageData.id || `page-${Date.now()}`
  };

  pages.push(nextPage);
  await saveSiteContent("pages", pages);
  return nextPage;
}

export async function createInquiry(payload: { name: string; email: string; content: string }) {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("inquiries")
    .insert({
      name: payload.name,
      email: payload.email,
      content: payload.content,
      status: "pending",
      reply: ""
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function listInquiries() {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return [];
    }

    return data || [];
  } catch {
    return [];
  }
}

export async function replyInquiry(payload: { id: string; reply: string; status: string }) {
  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("inquiries")
    .update({
      reply: payload.reply,
      status: payload.status,
      replied_at: new Date().toISOString()
    })
    .eq("id", payload.id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function uploadAsset(file: File) {
  const supabase = getServiceSupabase();
  const extension = getFileExtension(file.name);
  const baseName = file.name.replace(/\.[^.]+$/, "");
  const safeBaseName = slugifyText(baseName || "asset");
  const filePath = `admin/${Date.now()}-${safeBaseName}${extension}`;
  const { error } = await supabase.storage.from(storageBucket).upload(filePath, file, {
    contentType: file.type || undefined,
    upsert: false
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from(storageBucket).getPublicUrl(filePath);

  return {
    path: data.publicUrl,
    originalName: file.name,
    mimeType: file.type
  };
}

function getFileExtension(name: string) {
  const match = name.match(/\.[^.]+$/);
  return match ? match[0].toLowerCase() : "";
}

function slugifyText(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "") || `item-${Date.now()}`;
}
