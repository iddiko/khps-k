"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Locale } from "@/lib/types";
import { PromotionNewsItem, PromotionNotice } from "@/lib/promotion-data";

type PromotionCenterClientProps =
  | {
      type: "notices";
      locale: Locale;
      notices: PromotionNotice[];
    }
  | {
      type: "news";
      locale: Locale;
      news: PromotionNewsItem[];
      currentPage: number;
      totalPages: number;
    };

function pickLocale<T extends { ko: string; en: string; zh: string }>(value: T, locale: Locale) {
  return value[locale] || value.ko;
}

const labels = {
  ko: { readMore: "자세히 보기", close: "닫기", details: "상세 내용", no: "No.", category: "구분", title: "제목", date: "날짜", search: "검색", searchPlaceholder: "검색어를 입력하세요" },
  en: { readMore: "Read More", close: "Close", details: "Details", no: "No.", category: "Category", title: "Title", date: "Date", search: "Search", searchPlaceholder: "Enter search term" },
  zh: { readMore: "查看详情", close: "关闭", details: "详细内容", no: "No.", category: "分类", title: "标题", date: "日期", search: "搜索", searchPlaceholder: "请输入搜索词" }
};

export default function PromotionCenterClient(props: PromotionCenterClientProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const copy = labels[props.locale];

  const selectedItem = useMemo(() => {
    if (props.type === "notices") {
      return props.notices.find((item) => item.id === selectedId) || null;
    }
    return props.news.find((item) => item.id === selectedId) || null;
  }, [props, selectedId]);

  const filteredNotices = useMemo(() => {
    if (props.type !== "notices") return [];
    if (!searchTerm.trim()) return props.notices;

    const term = searchTerm.toLowerCase();
    return props.notices.filter(notice => 
      notice.title.ko.toLowerCase().includes(term) ||
      notice.title.en.toLowerCase().includes(term) ||
      notice.title.zh.toLowerCase().includes(term) ||
      notice.category.toLowerCase().includes(term) ||
      notice.date.includes(term)
    );
  }, [props, searchTerm]);

  const filteredNews = useMemo(() => {
    if (props.type !== "news") return [];
    if (!searchTerm.trim()) return props.news;

    const term = searchTerm.toLowerCase();
    return props.news.filter(news => 
      news.title.ko.toLowerCase().includes(term) ||
      news.title.en.toLowerCase().includes(term) ||
      news.title.zh.toLowerCase().includes(term) ||
      news.excerpt.ko.toLowerCase().includes(term) ||
      news.excerpt.en.toLowerCase().includes(term) ||
      news.excerpt.zh.toLowerCase().includes(term) ||
      news.date.includes(term)
    );
  }, [props, searchTerm]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedId(null);
    }

    if (!selectedItem) return;
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  if (props.type === "notices") {
    return (
      <>
        <div className="card promo-list-card">
          <div className="promo-search">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={copy.searchPlaceholder}
              className="promo-search-input"
            />
            <span className="promo-search-count">{filteredNotices.length} {copy.no}</span>
          </div>
          <div className="promo-list-head">
            <span>{copy.no}</span>
            <span>{copy.category}</span>
            <span>{copy.title}</span>
            <span>{copy.date}</span>
          </div>
          <ul className="promo-list">
            {filteredNotices.map((notice, index) => (
              <li key={notice.id} className="promo-list__item promo-list__item--button">
                <span>{String(props.notices.length - index).padStart(2, "0")}</span>
                <span>{notice.category}</span>
                <span>
                  <button type="button" className="promo-open" onClick={() => setSelectedId(notice.id)}>
                    {pickLocale(notice.title, props.locale)}
                  </button>
                </span>
                <span>{notice.date}</span>
              </li>
            ))}
          </ul>
        </div>
        {selectedItem && "body" in selectedItem ? (
          <PromotionModal
            title={pickLocale(selectedItem.title, props.locale)}
            date={selectedItem.date}
            image={null}
            body={pickLocale(selectedItem.body, props.locale)}
            closeLabel={copy.close}
            detailsLabel={copy.details}
            onClose={() => setSelectedId(null)}
          />
        ) : null}
      </>
    );
  }

  return (
    <>
      <div className="promo-search">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={copy.searchPlaceholder}
          className="promo-search-input"
        />
        <span className="promo-search-count">{filteredNews.length} {copy.no}</span>
      </div>
      <div className="news-grid">
        {filteredNews.map((item) => (
          <article key={item.id} className="news-card">
            <button type="button" className="news-card__button" onClick={() => setSelectedId(item.id)}>
              <div className="news-card__image">
                <img src={item.image} alt={pickLocale(item.title, props.locale)} />
              </div>
              <div className="news-card__body">
                <div className="small">{item.date}</div>
                <h3>{pickLocale(item.title, props.locale)}</h3>
                <p>{pickLocale(item.excerpt, props.locale)}</p>
                <span className="news-card__more">{copy.readMore}</span>
              </div>
            </button>
          </article>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: props.totalPages }, (_, index) => {
          const targetPage = index + 1;
          return (
            <Link
              key={targetPage}
              href={`/${props.locale}/promotion/news?page=${targetPage}`}
              className={`pagination__item ${targetPage === props.currentPage ? "active" : ""}`}
            >
              {targetPage}
            </Link>
          );
        })}
      </div>
      {selectedItem && "content" in selectedItem ? (
        <PromotionModal
          title={pickLocale(selectedItem.title, props.locale)}
          date={selectedItem.date}
          image={selectedItem.image}
          body={pickLocale(selectedItem.content, props.locale)}
          closeLabel={copy.close}
          detailsLabel={copy.details}
          onClose={() => setSelectedId(null)}
        />
      ) : null}
    </>
  );
}

function PromotionModal({
  title,
  date,
  image,
  body,
  closeLabel,
  detailsLabel,
  onClose
}: {
  title: string;
  date: string;
  image: string | null;
  body: string;
  closeLabel: string;
  detailsLabel: string;
  onClose: () => void;
}) {
  return (
    <div className="promo-modal" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="promo-modal__backdrop" aria-label={closeLabel} onClick={onClose} />
      <div className="promo-modal__panel">
        <div className="promo-modal__top">
          <div>
            <div className="small">{detailsLabel}</div>
            <h3>{title}</h3>
            <div className="small">{date}</div>
          </div>
          <button type="button" className="promo-modal__close" onClick={onClose}>
            {closeLabel}
          </button>
        </div>
        {image ? (
          <div className="promo-modal__image">
            <img src={image} alt={title} />
          </div>
        ) : null}
        <div className="promo-modal__body">{body}</div>
      </div>
    </div>
  );
}
