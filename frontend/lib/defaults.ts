import defaultStore from "./default-store.json";
import { Menu, PageData, SiteData } from "./types";

type DefaultStore = {
  menus: Menu[];
  pages: PageData[];
  site: SiteData;
};

const store = defaultStore as DefaultStore;

export const defaultMenus: Menu[] = store.menus || [];
export const defaultPages: PageData[] = store.pages || [];
export const defaultSiteConfig: SiteData = store.site;

const fallbackPageTemplate = {
  image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  title: {
    ko: "페이지 준비 중",
    en: "Page Coming Soon",
    zh: "页面准备中"
  },
  description: {
    ko: "기본 페이지가 표시되고 있습니다. 관리자에서 내용을 바로 수정할 수 있습니다.",
    en: "A default page is currently shown and can be updated from the admin panel.",
    zh: "当前显示默认页面，可在管理员中直接修改。"
  },
  content: {
    ko: "<p>콘텐츠를 준비 중입니다.</p>",
    en: "<p>Content is being prepared.</p>",
    zh: "<p>内容正在准备中。</p>"
  }
};

export function getDefaultPage(slugPath: string[]): PageData {
  const existing = defaultPages.find((page) => page.slugPath.join("/") === slugPath.join("/"));

  if (existing) {
    return existing;
  }

  return {
    fallback: true,
    slugPath,
    hero: {
      image: fallbackPageTemplate.image,
      title: fallbackPageTemplate.title,
      description: fallbackPageTemplate.description
    },
    content: fallbackPageTemplate.content
  };
}
