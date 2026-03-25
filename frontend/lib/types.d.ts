declare module "@/lib/api" {
  export const apiBase: string;
  export const adminFetch: <T>(path: string, token: string, init?: RequestInit) => Promise<T>;
  export const adminLogin: (payload: { id: string; password: string }) => Promise<{ token: string }>;
  export const getMenus: () => Promise<any[]>;
  export const getSiteConfig: () => Promise<any>;
  export const getPage: (slugPath: string[]) => Promise<any>;
  export const submitInquiry: (payload: { name: string; email: string; content: string }) => Promise<any>;
  export const locales: string[];
  export const t: <T extends Record<string, string>>(value: T, locale: string) => string;
  export const toLocale: (value: string) => string;
}
