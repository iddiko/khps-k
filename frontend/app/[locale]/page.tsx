import { getMenus, getSiteConfig, toLocale, t } from "@/lib/api";
import HeroSlider from "@/components/HeroSlider";
import PartnerMarquee from "@/components/PartnerMarquee";
import { getPromotionData } from "@/lib/promotion-data";
import { Locale } from "@/lib/types";
import Link from "next/link";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = toLocale(rawLocale);
  const site = await getSiteConfig();
  const menus = await getMenus();
  const promotion = getPromotionData(site);
  
  const homeData = site.home || {};
  const businessCards = homeData.businessCards || [];
  const researchHighlights = homeData.researchHighlights || [];
  const notices = promotion.notices.slice(0, 3);
  const faqs = homeData.faqs || [];

  return (
    <main>
      {/* Hero Slider 섹션 */}
      <HeroSlider slides={site.heroSlides || []} locale={locale} />

      {/* 회사 소개 요약 섹션 */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>{locale === "ko" ? "회사 소개" : locale === "en" ? "About Us" : "公司介绍"}</h2>
            <p>{t(homeData.summary || { ko: "", en: "", zh: "" }, locale)}</p>
          </div>
        </div>
      </section>

      {/* 비즈니스 카드 섹션 */}
      {businessCards.length > 0 && (
        <section className="section section--gray">
          <div className="container">
            <div className="section-title">
              <h2>{locale === "ko" ? "사업 분야" : locale === "en" ? "Business Areas" : "业务领域"}</h2>
            </div>
            <div className="grid grid--3">
              {businessCards.map((card) => (
                <div key={card.id} className="card">
                  <h3>{t(card.title, locale)}</h3>
                  <p>{t(card.description, locale)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 연구 하이라이트 섹션 */}
      {researchHighlights.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-title">
              <h2>{locale === "ko" ? "기술 연구" : locale === "en" ? "Research" : "技术研究"}</h2>
            </div>
            <div className="grid grid--3">
              {researchHighlights.map((item) => (
                <div key={item.id} className="card">
                  <h3>{t(item.title, locale)}</h3>
                  <p>{t(item.description, locale)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 파트너 마퀴 섹션 */}
      <PartnerMarquee logos={site.partnerLogos || []} />

      {/* 공지사항 섹션 */}
      {notices.length > 0 && (
        <section className="section section--gray">
          <div className="container">
            <div className="section-title">
              <h2>{locale === "ko" ? "공지사항" : locale === "en" ? "Notices" : "公告"}</h2>
              <Link
                href={`/${locale}/promotion/notices`}
                className="button secondary"
              >
                {locale === "ko" ? "더보기" : locale === "en" ? "View More" : "查看更多"}
              </Link>
            </div>
            <div className="grid">
              {notices.map((notice) => (
                <div key={notice.id} className="card">
                  <div className="small">{notice.date}</div>
                  <h3>{t(notice.title, locale)}</h3>
                  <p>{t(notice.body, locale)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ 섹션 */}
      {faqs.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-title">
              <h2>FAQ</h2>
              <Link
                href={`/${locale}/support/faq`}
                className="button secondary"
              >
                {locale === "ko" ? "더보기" : locale === "en" ? "View More" : "查看更多"}
              </Link>
            </div>
            <div className="grid">
              {faqs.map((faq) => (
                <div key={faq.id} className="card">
                  <h3>{t(faq.question, locale)}</h3>
                  <p>{t(faq.answer, locale)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
