import Link from "next/link";
import { t } from "@/lib/api";
import { Locale, Menu } from "@/lib/types";

export default function SubmenuNav({
  locale,
  menu,
  activeChildSlug
}: {
  locale: Locale;
  menu: Menu;
  activeChildSlug: string;
}) {
  return (
    <section className="subnav">
      <div className="container">
        <div className="subnav__list">
          {menu.children.map((child) => (
            <Link
              key={child.id}
              href={`/${locale}/${menu.slug}/${child.slug}`}
              className={`subnav__item ${activeChildSlug === child.slug ? "active" : ""}`}
            >
              {t(child.title, locale)}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
