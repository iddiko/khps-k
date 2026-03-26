import { Inquiry, Locale, Menu, PageData, SiteData } from "./types";
import { defaultMenus, defaultSiteConfig, getDefaultPage } from "./defaults";

export { apiBase } from "./apiBase";

const backendFetch = async <T,>(path: string, init?: RequestInit): Promise<T | null> => {
  try {
    const response = await fetch(path, {
      ...init,
      cache: "no-store",
      headers: {
        ...(init?.headers || {})
      }
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
};

export const getMenus = async (): Promise<Menu[]> =>
  (await backendFetch<Menu[]>("/api/menu")) || defaultMenus;

export const getSiteConfig = async (): Promise<SiteData> =>
  (await backendFetch<SiteData>("/api/site-config")) || defaultSiteConfig;

export const getPage = async (slugPath: string[]): Promise<PageData> => {
  const slug = slugPath.join("/");
  return (await backendFetch<PageData>(`/api/pages?slug=${encodeURIComponent(slug)}`)) || getDefaultPage(slugPath);
};

export const submitInquiry = async (payload: { name: string; email: string; content: string }) => {
  const result = await backendFetch<Inquiry>("/api/inquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!result) {
    throw new Error("Inquiry submission failed");
  }

  return result;
};

export const adminLogin = async (payload: { id: string; password: string }) => {
  const result = await backendFetch<{ token: string }>("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!result?.token) {
    throw new Error("Invalid credentials");
  }

  return result;
};

export const adminFetch = async <T,>(path: string, token: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`/api${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(init?.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
};

export const locales: Locale[] = ["ko", "en", "zh"];

export const t = <T extends Record<Locale, string>>(value: T, locale: Locale) => value[locale] || value.ko;

export const toLocale = (value: string): Locale =>
  locales.includes(value as Locale) ? (value as Locale) : "ko";
