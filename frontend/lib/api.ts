import { Inquiry, Locale, Menu, PageData, SiteData } from "./types";
export { apiBase } from "./apiBase";

const text = (ko: string, en: string, zh: string) => ({ ko, en, zh });

const defaultMenus: Menu[] = [
  {
    id: "company",
    slug: "company",
    title: text("회사소개", "Company", "公司介绍"),
    children: [
      { id: "greeting", slug: "greeting", title: text("인사말", "Greeting", "问候语") },
      { id: "overview", slug: "overview", title: text("회사개요", "Overview", "公司概况") },
      { id: "history", slug: "history", title: text("연혁", "History", "沿革") },
      { id: "vision", slug: "vision", title: text("비전", "Vision", "愿景") },
      { id: "organization", slug: "organization", title: text("조직도", "Organization", "组织图") }
    ]
  },
  {
    id: "business",
    slug: "business",
    title: text("사업분야", "Business", "业务领域"),
    children: [
      { id: "hydrogen-power", slug: "hydrogen-power", title: text("수소 발전", "Hydrogen Power", "氢能发电") },
      { id: "ammonia-power", slug: "ammonia-power", title: text("암모니아 혼소", "Ammonia Co-firing", "氨混烧") },
      { id: "plant-design", slug: "plant-design", title: text("플랜트 설계", "Plant Design", "工厂设计") },
      { id: "generation-equipment", slug: "generation-equipment", title: text("발전 설비", "Generation Equipment", "发电设备") },
      { id: "system-config", slug: "system-config", title: text("시스템 구성", "System Architecture", "系统构成") }
    ]
  },
  {
    id: "technology",
    slug: "technology",
    title: text("기술연구", "Technology", "技术研究"),
    children: [
      { id: "research-overview", slug: "research-overview", title: text("연구 개요", "Research Overview", "研究概况") },
      { id: "energy-tech", slug: "energy-tech", title: text("에너지 기술", "Energy Technology", "能源技术") },
      { id: "engine-tech", slug: "engine-tech", title: text("엔진 제어 기술", "Engine Control", "发动机控制技术") }
    ]
  },

  {
    id: "promotion",
    slug: "promotion",
    title: text("홍보센터", "Promotion", "宣传中心"),
    children: [
      { id: "notices", slug: "notices", title: text("공지사항", "Notices", "公告事项") },
      { id: "news", slug: "news", title: text("뉴스", "News", "新闻") }
    ]
  },
  {
    id: "support",
    slug: "support",
    title: text("고객지원", "Support", "客户支持"),
    children: [
      { id: "contact", slug: "contact", title: text("문의하기", "Contact", "联系我们") },
      { id: "faq", slug: "faq", title: text("FAQ", "FAQ", "常见问题") }
    ]
  }
];

const defaultSiteConfig = (): SiteData => ({
  companyName: "(주)대한수소발전",
  contactEmail: "wgcman@k-hps.com",
  contactPhone: "+82-2-0000-0000",
  shareholderMeetings: [
    {
      id: "meeting-2026-01",
      date: "2026-03-25",
      fileUrl: "",
      title: text("2026 정기주주총회 공고", "2026 Annual General Meeting Notice", "2026年定期股东大会公告"),
      summary: text(
        "관리자 페이지에서 PDF를 업로드한 뒤 이 항목과 연결해 게시할 수 있습니다.",
        "Upload a PDF from the admin page and connect it to this item.",
        "可在管理员页面上传 PDF 后关联到此项目进行发布。"
      )
    }
  ],
  promotion: {
    notices: [],
    news: []
  },
  companyProfile: {
    ceoName: "김정선",
    ceoTitle: text("대표이사 인사말", "CEO Message", "代表理事致辞"),
    ceoImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80",
    ceoMessage: text(
      "대한수소발전은 수소 및 암모니아 기반 발전 기술을 산업 현장에 연결하는 실행 중심 기업입니다.",
      "KHPS is an execution-focused company that connects hydrogen and ammonia power technologies to industrial sites.",
      "大韩氢能发电是一家将氢能与氨能发电技术连接到产业现场的执行型企业。"
    ),
    organizationTitle: text("조직도", "Organization", "组织图"),
    organizationImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    organizationUnits: [
      {
        id: "org-1",
        name: text(
          "경영지원부 / 전략기획사업부 박익환 / 국내마케팅사업부 이금봉",
          "Management Support / Strategic Planning Division: Park Ik-hwan / Domestic Marketing Division: Lee Geum-bong",
          "经营支援部 / 战略企划事业部 朴翼焕 / 国内营销事业部 李金奉"
        )
      },
      {
        id: "org-2",
        name: text(
          "기술연구소 / 연구소장 손복수",
          "R&D Center / Director: Son Bok-su",
          "技术研究所 / 研究所长 孙福洙"
        )
      },
      {
        id: "org-3",
        name: text(
          "해외/기술사업부 / 김용수 부장 / 박정군 부장",
          "Overseas / Technology Business Division / General Manager: Kim Yong-su / General Manager: Park Jeong-gun",
          "海外/技术事业部 / 部长 金容洙 / 部长 朴正君"
        )
      }
    ]
  },
  partnerLogos: [
    { id: "partner-1", name: "Partner 1", image: "/partner-logo-1.png" },
    { id: "partner-2", name: "Partner 2", image: "/partner-logo-2.png" },
    { id: "partner-3", name: "Partner 3", image: "/partner-logo-3.png" }
  ],
  heroSlides: [
    {
      id: "hero-1",
      image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1600&q=80",
      title: text("수소와 암모니아 발전의 새로운 기준", "A New Standard for Hydrogen and Ammonia Power", "氢能与氨能发电的新标准"),
      description: text(
        "발전 기술 연구와 플랜트 엔지니어링을 연결하는 에너지 솔루션을 제공합니다.",
        "We deliver energy solutions that connect power technology research with plant engineering.",
        "我们提供连接发电技术研究与工厂工程的能源解决方案。"
      )
    }
  ],
  home: {
    summary: text(
      "대한수소발전은 수소 및 암모니아 기반 발전 기술과 플랜트 엔지니어링으로 산업 전환을 지원합니다.",
      "KHPS supports industrial energy transition through hydrogen and ammonia power technologies and plant engineering.",
      "大韩氢能发电通过氢能与氨能发电技术及工厂工程支持产业转型。"
    ),
    businessCards: [],
    researchHighlights: [],
    notices: [],
    faqs: []
  }
});

const fallbackPage = (slugPath: string[]): PageData => ({
  fallback: true,
  slugPath,
  hero: {
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    title: text("페이지 준비 중", "Page Coming Soon", "页面准备中"),
    description: text(
      "기본 페이지가 표시되고 있습니다. 실제 데이터 연결 후 내용을 교체할 수 있습니다.",
      "A default page is currently shown and can be replaced after data is connected.",
      "当前显示的是默认页面，连接实际数据后可替换内容。"
    )
  },
  content: {
    ko: "<p>콘텐츠를 준비 중입니다.</p>",
    en: "<p>Content is being prepared.</p>",
    zh: "<p>内容准备中。</p>"
  }
});

const backendFetch = async <T,>(path: string, init?: RequestInit): Promise<T | null> => {
  try {
    const response = await fetch(`${apiBase}${path}`, {
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

export const getMenus = async (): Promise<Menu[]> => (await backendFetch<Menu[]>("/menu")) || defaultMenus;

export const getSiteConfig = async (): Promise<SiteData> =>
  (await backendFetch<SiteData>("/site-config")) || defaultSiteConfig();

export const getPage = async (slugPath: string[]): Promise<PageData> => {
  const slug = slugPath.join("/");
  return (await backendFetch<PageData>(`/pages?slug=${encodeURIComponent(slug)}`)) || fallbackPage(slugPath);
};

export const submitInquiry = async (payload: { name: string; email: string; content: string }) => {
  const result = await backendFetch<Inquiry>("/inquiry", {
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
  const result = await backendFetch<{ token: string }>("/login", {
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
  const response = await fetch(`${apiBase}${path}`, {
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
