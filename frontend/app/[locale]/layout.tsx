import { ReactNode } from "react";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import { getMenus, toLocale } from "@/lib/api";

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const menus = await getMenus();

  return (
    <div className="shell">
      <SiteHeader locale={locale} menus={menus} />
      {children}
      <Footer />
    </div>
  );
}
