"use client";

import { useState } from "react";
import Link from "next/link";
import { locales, t } from "@/lib/api";
import { Locale, Menu } from "@/lib/types";

const localeNames: Record<Locale, string> = { ko: "KO", en: "EN", zh: "CH" };
const megaMenuCopy: Record<
  Locale,
  { eyebrow: string; title: string; description: string; primary: string; secondary: string }
> = {
  ko: {
    eyebrow: "KHPS Overview",
    title: "수소 발전과 플랜트 실행 역량을 한 번에 살펴보세요.",
    description:
      "회사소개부터 사업분야, 기술연구, 투자정보까지 한 화면에서 빠르게 이동할 수 있도록 구성했습니다.",
    primary: "회사소개 보기",
    secondary: "문의하기"
  },
  en: {
    eyebrow: "KHPS Overview",
    title: "Explore power technology and plant execution in one view.",
    description:
      "The mega menu is organized so visitors can move quickly across company, business, technology, and investor sections.",
    primary: "Open Company",
    secondary: "Contact"
  },
  zh: {
    eyebrow: "KHPS Overview",
    title: "在一个界面中查看发电技术与工厂执行能力。",
    description: "已将公司介绍、业务领域、技术研究与投资信息整理为可快速进入的结构。",
    primary: "查看公司介绍",
    secondary: "联系我们"
  }
};

function AdminIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="header-icon">
      <path
        d="M12 3l7 3v5c0 4.8-2.9 8.9-7 10-4.1-1.1-7-5.2-7-10V6l7-3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12.5l1.7 1.7 3.3-3.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LanguageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="header-icon">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type SiteHeaderProps = {
  locale: Locale;
  menus: Menu[];
};

export default function SiteHeader({ locale, menus }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const companyMenu = menus.find((menu) => menu.slug === "company");
  const supportMenu = menus.find((menu) => menu.slug === "support");
  const megaCopy = megaMenuCopy[locale];

  function closeMobileMenu() {
    setMobileOpen(false);
    setOpenMenuId(null);
  }

  function toggleMobileMenu() {
    setMobileOpen((current) => !current);
    setOpenMenuId(null);
  }

  function toggleSubmenu(menuId: string) {
    setOpenMenuId((current) => (current === menuId ? null : menuId));
  }

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href={`/${locale}`} className="brand brand--logo" onClick={closeMobileMenu}>
          <img src="/logo.png" alt="대한수소발전 로고" className="brand__logo" />
        </Link>

        <div className="header-actions header-actions--mobile">
          <div className="locale-switch">
            {locales.map((item) => (
              <Link
                key={item}
                href={`/${item}`}
                className={`locale-badge ${item === locale ? "active" : ""}`}
                aria-label={`Switch language to ${localeNames[item]}`}
                onClick={closeMobileMenu}
              >
                {localeNames[item]}
              </Link>
            ))}
          </div>
          <button
            type="button"
            className={`menu-toggle ${mobileOpen ? "active" : ""}`}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={toggleMobileMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={`nav nav--dropdown ${mobileOpen ? "is-open" : ""}`}>
          <div className="nav__items nav__items--desktop">
            {menus.map((menu) => (
              <div key={menu.id} className="nav-item nav-item--desktop">
                <Link className="nav-item__trigger" href={`/${locale}/${menu.slug}/${menu.children[0]?.slug || ""}`}>
                  {t(menu.title, locale)}
                </Link>
              </div>
            ))}

            <div className="mega-menu" aria-hidden="true">
              <div className="mega-menu__inner">
                {menus.map((menu) => (
                  <div key={menu.id} className="mega-menu__column">
                    <Link className="mega-menu__title" href={`/${locale}/${menu.slug}/${menu.children[0]?.slug || ""}`}>
                      {t(menu.title, locale)}
                    </Link>
                    <div className="mega-menu__links">
                      {menu.children.map((child) => (
                        <Link
                          key={child.id}
                          href={`/${locale}/${menu.slug}/${child.slug}`}
                          className="mega-menu__link"
                        >
                          {t(child.title, locale)}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="nav__items nav__items--mobile">
            {menus.map((menu) => {
              const isOpen = openMenuId === menu.id;

              return (
                <div key={menu.id} className="nav-item">
                  <div className="nav-item__head">
                    <Link
                      className="nav-item__trigger"
                      href={`/${locale}/${menu.slug}/${menu.children[0]?.slug || ""}`}
                      onClick={closeMobileMenu}
                    >
                      {t(menu.title, locale)}
                    </Link>
                    {menu.children.length ? (
                      <button
                        type="button"
                        className={`nav-item__toggle ${isOpen ? "active" : ""}`}
                        aria-label={`Toggle ${t(menu.title, locale)} submenu`}
                        aria-expanded={isOpen}
                        onClick={() => toggleSubmenu(menu.id)}
                      >
                        <span />
                        <span />
                      </button>
                    ) : null}
                  </div>
                  {menu.children.length ? (
                    <div className={`nav-item__menu ${isOpen ? "is-open" : ""}`}>
                      {menu.children.map((child) => (
                        <Link
                          key={child.id}
                          href={`/${locale}/${menu.slug}/${child.slug}`}
                          className="nav-item__link"
                          onClick={closeMobileMenu}
                        >
                          {t(child.title, locale)}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="header-actions header-actions--desktop">
            <Link className="admin-link admin-link--icon" href="/admin" aria-label="Admin">
              <AdminIcon />
            </Link>
            <div className="locale-switch">
              <button
                type="button"
                className="locale-dropdown-toggle"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-label="Change language"
                aria-expanded={langMenuOpen}
              >
                <LanguageIcon />
                <span>{localeNames[locale]}</span>
              </button>
              {langMenuOpen && (
                <div className="locale-dropdown-menu">
                  {locales.map((item) => (
                    <Link
                      key={item}
                      href={`/${item}`}
                      className={`locale-dropdown-item ${item === locale ? "active" : ""}`}
                      onClick={() => setLangMenuOpen(false)}
                    >
                      {localeNames[item]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
