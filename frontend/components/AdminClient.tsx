"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { adminFetch, adminLogin, apiBase } from "@/lib/api";
import {
  getPromotionData,
  parseNews,
  parseNotices,
  serializeNews,
  serializeNotices
} from "@/lib/promotion-data";
import { Inquiry, Menu, PageData, SiteData } from "@/lib/types";

type AdminBundle = {
  menus: Menu[];
  pages: PageData[];
  site: SiteData;
  inquiries: Inquiry[];
};

const serializeShareholderMeetings = (items: SiteData["shareholderMeetings"]) =>
  items
    .map((item) =>
      [
        item.date,
        item.title.ko,
        item.title.en,
        item.title.zh,
        item.summary.ko,
        item.summary.en,
        item.summary.zh,
        item.fileUrl
      ].join("|")
    )
    .join("\n");

const parseShareholderMeetings = (raw: string): SiteData["shareholderMeetings"] =>
  raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [date = "", ko = "", en = "", zh = "", sumKo = "", sumEn = "", sumZh = "", fileUrl = ""] =
        line.split("|");

      return {
        id: `meeting-${index + 1}`,
        date,
        fileUrl,
        title: { ko, en, zh },
        summary: { ko: sumKo, en: sumEn, zh: sumZh }
      };
    });

export default function AdminClient() {
  const [token, setToken] = useState("");
  const [bundle, setBundle] = useState<AdminBundle | null>(null);
  const [selectedPageId, setSelectedPageId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("khps-admin-token");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (!token) return;
    window.localStorage.setItem("khps-admin-token", token);
    loadBundle(token).catch(() => setMessage("관리자 데이터를 불러오지 못했습니다."));
  }, [token]);

  async function loadBundle(nextToken: string) {
    const [menus, pages, site, inquiries] = await Promise.all([
      adminFetch<Menu[]>("/menu", nextToken),
      adminFetch<PageData[]>("/pages", nextToken),
      adminFetch<SiteData>("/site-config", nextToken),
      adminFetch<Inquiry[]>("/inquiry", nextToken)
    ]);

    setBundle({ menus, pages, site, inquiries });
    setSelectedPageId((current) => current || pages[0]?.id || "");
  }

  async function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await adminLogin({
      id: String(form.get("id") || ""),
      password: String(form.get("password") || "")
    });
    setToken(result.token);
    setMessage("로그인되었습니다.");
  }

  function onLogout() {
    window.localStorage.removeItem("khps-admin-token");
    setToken("");
    setBundle(null);
    setMessage("로그아웃되었습니다.");
  }

  async function addMenu(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    const form = new FormData(event.currentTarget);
    await adminFetch("/menu", token, {
      method: "POST",
      body: JSON.stringify({
        parentTitle: {
          ko: String(form.get("parentKo") || ""),
          en: String(form.get("parentEn") || ""),
          zh: String(form.get("parentZh") || "")
        },
        childTitle: {
          ko: String(form.get("childKo") || ""),
          en: String(form.get("childEn") || ""),
          zh: String(form.get("childZh") || "")
        }
      })
    });

    await loadBundle(token);
    event.currentTarget.reset();
    setMessage("메뉴와 기본 페이지가 생성되었습니다.");
  }

  async function saveSite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || !bundle) return;

    const form = new FormData(event.currentTarget);
    const partnerLogos = String(form.get("partnerLogos") || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const [name, image] = line.includes("|") ? line.split("|") : [`Partner ${index + 1}`, line];
        return {
          id: `partner-${index + 1}`,
          name: name.trim(),
          image: (image || "").trim()
        };
      });

    const nextSite: SiteData = {
      ...bundle.site,
      contactEmail: String(form.get("contactEmail") || ""),
      contactPhone: String(form.get("contactPhone") || ""),
      shareholderMeetings: parseShareholderMeetings(String(form.get("shareholderMeetings") || "")),
      companyProfile: {
        ...bundle.site.companyProfile,
        ceoName: String(form.get("ceoName") || ""),
        ceoImage: String(form.get("ceoImage") || ""),
        ceoMessage: {
          ko: String(form.get("ceoMessageKo") || ""),
          en: String(form.get("ceoMessageEn") || ""),
          zh: String(form.get("ceoMessageZh") || "")
        },
        organizationImage: String(form.get("organizationImage") || "")
      },
      partnerLogos,
      promotion: {
        notices: parseNotices(String(form.get("promotionNotices") || "")),
        news: parseNews(String(form.get("promotionNews") || ""))
      },
      home: {
        ...bundle.site.home,
        summary: {
          ko: String(form.get("summaryKo") || ""),
          en: String(form.get("summaryEn") || ""),
          zh: String(form.get("summaryZh") || "")
        }
      }
    };

    await adminFetch("/site-config", token, {
      method: "PUT",
      body: JSON.stringify(nextSite)
    });

    await loadBundle(token);
    setMessage("사이트 정보가 저장되었습니다.");
  }

  async function savePage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || !bundle || !selectedPageId) return;

    const target = bundle.pages.find((item) => item.id === selectedPageId);
    if (!target) return;

    const form = new FormData(event.currentTarget);
    await adminFetch("/pages", token, {
      method: "PUT",
      body: JSON.stringify({
        ...target,
        hero: {
          image: String(form.get("heroImage") || target.hero.image),
          title: {
            ko: String(form.get("heroTitleKo") || ""),
            en: String(form.get("heroTitleEn") || ""),
            zh: String(form.get("heroTitleZh") || "")
          },
          description: {
            ko: String(form.get("heroDescKo") || ""),
            en: String(form.get("heroDescEn") || ""),
            zh: String(form.get("heroDescZh") || "")
          }
        },
        content: {
          ko: String(form.get("contentKo") || ""),
          en: String(form.get("contentEn") || ""),
          zh: String(form.get("contentZh") || "")
        }
      })
    });

    await loadBundle(token);
    setMessage("페이지가 저장되었습니다.");
  }

  async function replyInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    const form = new FormData(event.currentTarget);
    await adminFetch("/inquiry/reply", token, {
      method: "POST",
      body: JSON.stringify({
        id: String(form.get("inquiryId") || ""),
        reply: String(form.get("reply") || ""),
        status: String(form.get("status") || "completed")
      })
    });

    await loadBundle(token);
    event.currentTarget.reset();
    setMessage("문의 답변이 저장되었습니다.");
  }

  async function uploadAsset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    const form = new FormData(event.currentTarget);
    const result = await adminFetch<{ path: string; originalName?: string }>("/upload", token, {
      method: "POST",
      body: form
    });

    setMessage(`업로드 완료: ${apiBase}${result.path}`);
  }

  const selectedPage = useMemo(
    () => bundle?.pages.find((page) => page.id === selectedPageId) || bundle?.pages[0],
    [bundle, selectedPageId]
  );

  if (!token) {
    return (
      <div className="container admin-panel">
        <div className="card">
          <h1>관리자 로그인</h1>
          <form onSubmit={onLogin}>
            <input name="id" placeholder="ID" defaultValue="admin" />
            <input name="password" type="password" placeholder="Password" />
            <button type="submit">로그인</button>
          </form>
          {message ? <div className="small">{message}</div> : null}
        </div>
      </div>
    );
  }

  if (!bundle) {
    return (
      <div className="container admin-panel">
        <div className="card">관리자 데이터를 불러오는 중입니다.</div>
      </div>
    );
  }

  const promotion = getPromotionData(bundle.site);

  return (
    <div className="container admin-panel">
      <div className="admin-topbar">
        <div className="section-title">
          <h1>관리자 대시보드</h1>
          <p>메뉴, 페이지, 사이트 정보, 홍보자료, 주주총회 PDF 자료를 한 곳에서 관리할 수 있습니다.</p>
        </div>
        <button type="button" className="logout-button" onClick={onLogout}>
          로그아웃
        </button>
      </div>
      {message ? <div className="card small">{message}</div> : null}

      <div className="admin-grid">
        <div className="card">
          <h3>메뉴 추가</h3>
          <form onSubmit={addMenu}>
            <input name="parentKo" placeholder="상위 메뉴 KO" required />
            <input name="parentEn" placeholder="상위 메뉴 EN" required />
            <input name="parentZh" placeholder="상위 메뉴 ZH" required />
            <input name="childKo" placeholder="하위 메뉴 KO" required />
            <input name="childEn" placeholder="하위 메뉴 EN" required />
            <input name="childZh" placeholder="하위 메뉴 ZH" required />
            <button type="submit">메뉴 생성</button>
          </form>
        </div>

        <div className="card">
          <h3>파일 업로드</h3>
          <form onSubmit={uploadAsset}>
            <input type="file" name="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" required />
            <button type="submit">업로드</button>
          </form>
          <div className="small">
            이미지와 PDF를 업로드한 뒤 반환된 URL을 페이지 본문이나 주주총회 자료실에 붙여 넣으면 됩니다.
          </div>
        </div>
      </div>

      <div className="card">
        <h3>사이트 기본 정보</h3>
        <form onSubmit={saveSite}>
          <input name="contactEmail" defaultValue={bundle.site.contactEmail} placeholder="대표 이메일" />
          <input name="contactPhone" defaultValue={bundle.site.contactPhone} placeholder="대표 연락처" />
          <input name="ceoName" defaultValue={bundle.site.companyProfile.ceoName} placeholder="대표명" />
          <input name="ceoImage" defaultValue={bundle.site.companyProfile.ceoImage} placeholder="대표 이미지 URL" />
          <textarea name="ceoMessageKo" defaultValue={bundle.site.companyProfile.ceoMessage.ko} placeholder="대표 인사말 KO" />
          <textarea name="ceoMessageEn" defaultValue={bundle.site.companyProfile.ceoMessage.en} placeholder="대표 인사말 EN" />
          <textarea name="ceoMessageZh" defaultValue={bundle.site.companyProfile.ceoMessage.zh} placeholder="대표 인사말 ZH" />
          <input
            name="organizationImage"
            defaultValue={bundle.site.companyProfile.organizationImage}
            placeholder="조직도 이미지 URL"
          />
          <textarea name="summaryKo" defaultValue={bundle.site.home.summary.ko} placeholder="메인 소개 KO" />
          <textarea name="summaryEn" defaultValue={bundle.site.home.summary.en} placeholder="메인 소개 EN" />
          <textarea name="summaryZh" defaultValue={bundle.site.home.summary.zh} placeholder="메인 소개 ZH" />
          <textarea
            name="partnerLogos"
            defaultValue={(bundle.site.partnerLogos || []).map((item) => `${item.name}|${item.image}`).join("\n")}
            placeholder={"파트너명|이미지URL\n예시: Partner A|https://..."}
          />
          <textarea
            name="promotionNotices"
            defaultValue={serializeNotices(promotion.notices)}
            placeholder={"공지사항: 날짜|카테고리|제목KO|제목EN|제목ZH|본문KO|본문EN|본문ZH"}
          />
          <textarea
            name="promotionNews"
            defaultValue={serializeNews(promotion.news)}
            placeholder={"뉴스: 날짜|이미지URL|제목KO|제목EN|제목ZH|요약KO|요약EN|요약ZH|본문KO|본문EN|본문ZH"}
          />
          <textarea
            name="shareholderMeetings"
            defaultValue={serializeShareholderMeetings(bundle.site.shareholderMeetings || [])}
            placeholder={"주주총회 자료: 날짜|제목KO|제목EN|제목ZH|요약KO|요약EN|요약ZH|파일URL"}
          />
          <button type="submit">사이트 정보 저장</button>
        </form>
      </div>

      <div className="card">
        <h3>페이지 편집</h3>
        <select value={selectedPage?.id} onChange={(e) => setSelectedPageId(e.target.value)}>
          {bundle.pages.map((page) => (
            <option key={page.id} value={page.id}>
              {page.slugPath.join("/")}
            </option>
          ))}
        </select>
        {selectedPage ? (
          <form onSubmit={savePage}>
            <div className="small">선택한 페이지의 히어로 이미지와 제목, 설명, 본문 HTML을 직접 수정할 수 있습니다.</div>
            <input name="heroImage" defaultValue={selectedPage.hero.image} placeholder="Hero image URL" />
            <input name="heroTitleKo" defaultValue={selectedPage.hero.title.ko} placeholder="제목 KO" />
            <input name="heroTitleEn" defaultValue={selectedPage.hero.title.en} placeholder="제목 EN" />
            <input name="heroTitleZh" defaultValue={selectedPage.hero.title.zh} placeholder="제목 ZH" />
            <textarea name="heroDescKo" defaultValue={selectedPage.hero.description.ko} placeholder="설명 KO" />
            <textarea name="heroDescEn" defaultValue={selectedPage.hero.description.en} placeholder="설명 EN" />
            <textarea name="heroDescZh" defaultValue={selectedPage.hero.description.zh} placeholder="설명 ZH" />
            <textarea name="contentKo" defaultValue={selectedPage.content.ko} placeholder="본문 HTML KO" />
            <textarea name="contentEn" defaultValue={selectedPage.content.en} placeholder="본문 HTML EN" />
            <textarea name="contentZh" defaultValue={selectedPage.content.zh} placeholder="본문 HTML ZH" />
            <button type="submit">페이지 저장</button>
          </form>
        ) : null}
      </div>

      <div className="card">
        <h3>현재 메뉴 구조</h3>
        <div className="admin-list">
          {bundle.menus.map((menu) => (
            <div key={menu.id} className="admin-item">
              <strong>{menu.title.ko}</strong>
              <div className="small">{menu.children.map((child) => child.title.ko).join(", ")}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>문의 관리</h3>
        <div className="admin-list">
          {bundle.inquiries.map((inquiry) => (
            <div className="admin-item" key={inquiry.id}>
              <div>
                <strong>{inquiry.name}</strong> <span className="small">{inquiry.email}</span>
              </div>
              <div className="small">{inquiry.content}</div>
              <div className="status">{inquiry.status}</div>
            </div>
          ))}
        </div>

        {bundle.inquiries.length ? (
          <form onSubmit={replyInquiry}>
            <select name="inquiryId">
              {bundle.inquiries.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} / {item.email}
                </option>
              ))}
            </select>
            <textarea name="reply" placeholder="답변 내용" />
            <select name="status" defaultValue="completed">
              <option value="pending">pending</option>
              <option value="completed">completed</option>
            </select>
            <button type="submit">답변 저장</button>
          </form>
        ) : (
          <div className="small">등록된 문의가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
