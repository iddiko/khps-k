import InquiryForm from "@/components/InquiryForm";
import PageHero from "@/components/PageHero";
import PromotionCenterClient from "@/components/PromotionCenterClient";
import { t, toLocale } from "@/lib/api";
import { getPromotionData } from "@/lib/promotion-data";
import { getPublicMenus, getPublicPage, getPublicSiteConfig } from "@/lib/server/public-data";

export default async function DynamicPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string; slug: string[] }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const locale = toLocale(rawLocale);
  const page = await getPublicPage(slug);
  const site = await getPublicSiteConfig();
  const menus = await getPublicMenus();
  const path = slug.join("/");
  const currentMenu = menus.find((menu) => menu.slug === slug[0]);
  const promotion = getPromotionData(site);
  const newsPage = Math.max(1, Number(resolvedSearchParams?.page || "1") || 1);
  const pageSize = 20;
  const totalNewsPages = Math.max(1, Math.ceil(promotion.news.length / pageSize));
  const safeNewsPage = Math.min(newsPage, totalNewsPages);
  const currentNews = promotion.news.slice((safeNewsPage - 1) * pageSize, safeNewsPage * pageSize);

  return (
    <>
      <PageHero image={page.hero.image} title={page.hero.title} description={page.hero.description} locale={locale} />
      <section className="section">
        <div className="container">
          <div className="rich-content" dangerouslySetInnerHTML={{ __html: t(page.content, locale) }} />
        </div>
      </section>
      {path === "company/greeting" ? (
        <section className="section">
          <div className="container ceo-panel">
            <div className="ceo-panel__image">
              <img src={site.companyProfile.ceoImage} alt={site.companyProfile.ceoName} />
            </div>
            <div className="card">
              <div className="small">{t(site.companyProfile.ceoTitle, locale)}</div>
              <h3>{site.companyProfile.ceoName}</h3>
              <p>{t(site.companyProfile.ceoMessage, locale)}</p>
            </div>
          </div>
        </section>
      ) : null}
      {path === "company/organization" ? (
        <section className="section">
          <div className="container">
            <div className="card org-card">
              <div className="org-card__hero">
                <img src={site.companyProfile.organizationImage} alt={t(site.companyProfile.organizationTitle, locale)} />
              </div>
              <div className="org-chart">
                <div className="org-chart__top">{site.companyProfile.ceoName}</div>
                <div className="org-chart__line" />
                <div className="org-chart__grid">
                  {site.companyProfile.organizationUnits.map((unit) => (
                    <div key={unit.id} className="org-chart__unit">
                      {t(unit.name, locale)
                        .split(" / ")
                        .map((line, index) => (
                          <span key={`${unit.id}-${index}`} className="org-chart__unit-line">
                            {line}
                          </span>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {path === "support/faq" ? (
        <section className="section">
          <div className="container grid">
            {site.home.faqs.map((item) => (
              <div key={item.id} className="card">
                <h3>{t(item.question, locale)}</h3>
                <p>{t(item.answer, locale)}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
      {path === "support/contact" ? (
        <section className="section">
          <div className="container split">
            <div className="card">
              <h3>Contact</h3>
              <p>{site.contactEmail}</p>
              <p>{site.contactPhone}</p>
            </div>
            <InquiryForm locale={locale} />
          </div>
        </section>
      ) : null}
      {path === "investor-relations/shareholder-meeting" ? (
        <section className="section">
          <div className="container">
            <div className="section-title">
              <h2>{locale === "ko" ? "주주총회 자료실" : locale === "en" ? "Shareholder Meeting Documents" : "股东大会资料"}</h2>
              <p>
                {locale === "ko"
                  ? "주주총회 관련 공고, 소집통지, 참고자료 PDF를 이곳에 게시합니다."
                  : locale === "en"
                    ? "Notices, meeting calls, and supporting PDF materials are posted here."
                    : "股东大会相关公告、召集通知及PDF资料将在此发布。"}
              </p>
            </div>
            <div className="grid">
              {site.shareholderMeetings.map((item) => (
                <div key={item.id} className="card">
                  <div className="small">{item.date}</div>
                  <h3>{t(item.title, locale)}</h3>
                  <p>{t(item.summary, locale)}</p>
                  {item.fileUrl ? (
                    <a className="button secondary" href={item.fileUrl} target="_blank" rel="noreferrer">
                      {locale === "ko" ? "PDF 보기" : locale === "en" ? "Open PDF" : "查看 PDF"}
                    </a>
                  ) : (
                    <div className="small">
                      {locale === "ko"
                        ? "관리자 페이지에서 PDF를 업로드해 연결해 주세요."
                        : locale === "en"
                          ? "Upload a PDF from the admin page to activate this item."
                          : "请在管理后台上传 PDF 后启用该条目。"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {path === "promotion/notices" ? (
        <section className="section">
          <div className="container">
            <PromotionCenterClient type="notices" locale={locale} notices={promotion.notices} />
          </div>
        </section>
      ) : null}
      {path === "promotion/news" ? (
        <section className="section">
          <div className="container">
            <PromotionCenterClient
              type="news"
              locale={locale}
              news={currentNews}
              currentPage={safeNewsPage}
              totalPages={totalNewsPages}
            />
          </div>
        </section>
      ) : null}
    </>
  );
}
