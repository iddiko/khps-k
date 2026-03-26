import "server-only";
import { defaultMenus, defaultSiteConfig, getDefaultPage } from "../defaults";
import { getMenusContent, getPageContent, getSiteConfigContent } from "./content-store";

export async function getPublicMenus() {
  return getMenusContent().catch(() => defaultMenus);
}

export async function getPublicSiteConfig() {
  return getSiteConfigContent().catch(() => defaultSiteConfig);
}

export async function getPublicPage(slugPath: string[]) {
  return getPageContent(slugPath).catch(() => getDefaultPage(slugPath));
}
