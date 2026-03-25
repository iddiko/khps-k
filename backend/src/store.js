import fs from "fs";
import path from "path";
import slugify from "slugify";
import { fileURLToPath } from "url";
import { createDefaultStore } from "./defaultStore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(__dirname, "..", "data", "store.json");

export const localeObject = (value = "") => ({ ko: value, en: value, zh: value });

export const buildSlug = (value) =>
  slugify(value, { lower: true, strict: true, trim: true }) || `menu-${Date.now()}`;

const pageSeeds = {
  greeting: {
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("대한수소발전의 대표 인사말을 소개합니다."),
    content: {
      ko: "<h2>지속 가능한 발전 기술을 통해 산업의 미래를 준비합니다.</h2><p>대한수소발전은 수소와 암모니아 기반 발전 기술을 현실의 산업 현장에 적용하기 위해 연구와 실증, 구축을 함께 수행하고 있습니다.</p><p>기술의 가능성을 현장 경쟁력으로 바꾸는 실행력 있는 에너지 파트너가 되겠습니다.</p>",
      en: "<h2>We prepare the future of industry through sustainable power technologies.</h2><p>KHPS develops and deploys hydrogen and ammonia power technologies for real industrial environments.</p><p>Our goal is to become an execution-focused energy partner that turns technical potential into field competitiveness.</p>",
      zh: "<h2>通过可持续发电技术，准备产业的未来。</h2><p>大韩氢能发电正在研发并落地氢能与氨能发电技术，以服务真实产业现场。</p><p>我们将成为把技术潜力转化为现场竞争力的能源伙伴。</p>"
    }
  },
  overview: {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("회사 개요와 핵심 역량을 소개합니다."),
    content: {
      ko: "<h2>기업 개요</h2><p>대한수소발전은 수소 및 암모니아 기반 발전 기술, 플랜트 설계, 설비 구축을 중심으로 사업을 전개하는 에너지 솔루션 기업입니다.</p><p>연구부터 설계, 현장 적용까지 이어지는 통합 수행 체계를 바탕으로 고객의 에너지 전환 과제를 지원합니다.</p><img src='https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80' alt='회사 개요 이미지' /><h3>핵심 역량</h3><ul><li>수소·암모니아 발전 기술 연구</li><li>플랜트 엔지니어링 및 설비 구축</li><li>현장 맞춤형 시스템 통합</li></ul>",
      en: "<h2>Company Overview</h2><p>KHPS is an energy solutions company focused on hydrogen and ammonia power technologies, plant design, and equipment deployment.</p><p>We support customers' energy transition with an integrated execution model from research and design to field application.</p>",
      zh: "<h2>公司概况</h2><p>大韩氢能发电是一家专注于氢能、氨能发电技术、工厂设计与设备建设的能源解决方案企业。</p><p>我们通过从研发、设计到现场应用的一体化执行体系，支持客户的能源转型。</p>"
    }
  },
  history: {
    image: "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("대한수소발전의 주요 이력을 소개합니다."),
    content: {
      ko: "<h2>주요 연혁</h2><img src='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80' alt='연혁 이미지' /><ul><li>2023년 회사 설립</li><li>2024년 수소 발전 제어 기술 연구 착수</li><li>2025년 암모니아 혼소 실증 설계 및 검증 수행</li><li>2026년 기업 홈페이지 및 IR 자료 체계 구축</li></ul>",
      en: "<h2>History</h2><ul><li>2023: Company established</li><li>2024: Initiated hydrogen power control research</li><li>2025: Conducted ammonia co-firing demonstration design and validation</li><li>2026: Built corporate website and IR document framework</li></ul>",
      zh: "<h2>主要沿革</h2><ul><li>2023年 公司成立</li><li>2024年 启动氢能发电控制技术研究</li><li>2025年 开展氨混烧示范设计与验证</li><li>2026年 建立企业官网与IR资料体系</li></ul>"
    }
  },
  vision: {
    image: "https://images.unsplash.com/photo-1431578500526-4d9613015464?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("지속 가능한 에너지 비전을 제시합니다."),
    content: {
      ko: "<h2>비전</h2><p>대한수소발전은 산업 현장의 에너지 전환을 현실화하는 실행형 기술 기업을 지향합니다.</p><p>친환경 발전 기술의 실용화와 안정적인 운영, 확장 가능한 시스템 설계를 통해 새로운 기준을 만들고자 합니다.</p><img src='https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' alt='비전 이미지' />",
      en: "<h2>Vision</h2><p>KHPS aims to be an execution-driven technology company that makes energy transition practical for industrial sites.</p><p>We seek to create a new standard through practical clean power technologies, stable operation, and scalable systems.</p>",
      zh: "<h2>愿景</h2><p>大韩氢能发电致力于成为推动产业现场能源转型落地的执行型技术企业。</p><p>我们希望通过清洁发电技术的实用化、稳定运行与可扩展系统设计，建立新的行业标准。</p>"
    }
  },
  organization: {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("조직 구성과 역할 체계를 안내합니다."),
    content: {
      ko: "<h2>조직 구조</h2><p>대한수소발전은 경영지원, 기술연구, 플랜트사업, 설비운영 조직이 유기적으로 협업하는 체계를 갖추고 있습니다.</p><img src='https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80' alt='조직 이미지' />",
      en: "<h2>Organization</h2><p>KHPS operates with close collaboration among management support, R&D, plant business, and equipment operations.</p>",
      zh: "<h2>组织架构</h2><p>大韩氢能发电建立了经营支援、技术研究、工厂事业与设备运营协同合作的组织体系。</p>"
    }
  },
  "hydrogen-power": {
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("수소 발전 사업과 기술 적용 분야를 안내합니다."),
    content: {
      ko: "<h2>수소 발전</h2><p>수소 연료의 특성을 반영한 발전 시스템 설계와 제어 전략을 통해 안정성과 효율을 함께 확보합니다.</p><img src='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' alt='수소 발전 이미지' /><ul><li>수소 발전 시스템 기획</li><li>연소 안정화 제어</li><li>현장 맞춤형 설비 적용</li></ul>",
      en: "<h2>Hydrogen Power</h2><p>We secure both stability and efficiency through system design and control strategies tailored to hydrogen fuel characteristics.</p>",
      zh: "<h2>氢能发电</h2><p>我们通过结合氢燃料特性的系统设计与控制策略，同时确保稳定性与效率。</p>"
    }
  },
  "ammonia-power": {
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("암모니아 혼소 기반 발전 솔루션을 소개합니다."),
    content: {
      ko: "<h2>암모니아 혼소</h2><p>저탄소 전환을 위한 암모니아 혼소 시스템 설계와 검증 전략을 제공합니다.</p><img src='https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80' alt='암모니아 혼소 이미지' /><p>연료 특성 분석, 제어 로직, 안전성을 종합적으로 고려한 발전 솔루션을 제안합니다.</p>",
      en: "<h2>Ammonia Co-firing</h2><p>We provide design and validation strategies for ammonia co-firing systems to support low-carbon transition.</p>",
      zh: "<h2>氨混烧</h2><p>我们提供服务于低碳转型的氨混烧系统设计与验证方案。</p>"
    }
  },
  "plant-design": {
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("플랜트 설계와 현장 최적화 역량을 안내합니다."),
    content: {
      ko: "<h2>플랜트 설계</h2><p>부지 조건, 운영 환경, 설비 구성을 종합 검토하여 실제 가동을 고려한 플랜트 설계를 수행합니다.</p><img src='https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80' alt='플랜트 설계 이미지' />",
      en: "<h2>Plant Design</h2><p>We design plants with practical operation in mind by reviewing site conditions, operating environments, and equipment composition.</p>",
      zh: "<h2>工厂设计</h2><p>我们综合考虑用地条件、运行环境和设备构成，开展面向实际运营的工厂设计。</p>"
    }
  },
  "generation-equipment": {
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("발전 설비 구성과 구축 역량을 소개합니다."),
    content: {
      ko: "<h2>발전 설비</h2><p>발전 목적과 현장 요구에 따라 주요 설비를 구성하고 구축 일정을 계획합니다.</p><img src='https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80' alt='발전 설비 이미지' /><ul><li>발전기 및 보조설비 구성</li><li>설치 계획 수립</li><li>운영 전 점검 및 시운전</li></ul>",
      en: "<h2>Generation Equipment</h2><p>We configure and deploy equipment according to generation objectives and field requirements.</p>",
      zh: "<h2>发电设备</h2><p>我们根据发电目标与现场要求配置并建设相关设备。</p>"
    }
  },
  "system-config": {
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("연료, 제어, 설비를 연결하는 시스템 구조를 소개합니다."),
    content: {
      ko: "<h2>시스템 구성</h2><p>연료 공급, 연소 제어, 발전 설비, 모니터링 체계를 유기적으로 연결하는 통합 구조를 제안합니다.</p><img src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' alt='시스템 구성 이미지' />",
      en: "<h2>System Architecture</h2><p>We propose integrated architecture connecting fuel supply, combustion control, generation equipment, and monitoring.</p>",
      zh: "<h2>系统构成</h2><p>我们提供连接燃料供应、燃烧控制、发电设备与监控系统的一体化架构。</p>"
    }
  },
  "research-overview": {
    image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("연구 방향과 주요 과제를 소개합니다."),
    content: {
      ko: "<h2>연구 개요</h2><p>대한수소발전은 발전 효율 향상, 연소 안정화, 재생에너지 연계 제어를 중심으로 연구를 수행합니다.</p><img src='https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80' alt='연구 개요 이미지' />",
      en: "<h2>Research Overview</h2><p>KHPS focuses its research on efficiency improvement, combustion stability, and renewable-linked control.</p>",
      zh: "<h2>研究概览</h2><p>大韩氢能发电围绕效率提升、燃烧稳定化和可再生能源联动控制开展研究。</p>"
    }
  },
  "energy-tech": {
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("에너지 기술 포트폴리오를 안내합니다."),
    content: {
      ko: "<h2>에너지 기술</h2><p>수소와 암모니아를 기반으로 한 발전 기술 포트폴리오를 통해 실질적인 탄소 저감과 운영 효율을 추구합니다.</p><img src='https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' alt='에너지 기술 이미지' />",
      en: "<h2>Energy Technology</h2><p>Our technology portfolio pursues carbon reduction and operational efficiency through hydrogen and ammonia-based power solutions.</p>",
      zh: "<h2>能源技术</h2><p>我们通过氢能与氨能发电技术组合，实现减碳与运营效率提升。</p>"
    }
  },
  "engine-tech": {
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("엔진 제어 기술과 운전 최적화 전략을 소개합니다."),
    content: {
      ko: "<h2>엔진 제어 기술</h2><p>운전 데이터와 제어 알고리즘을 기반으로 출력 안정성과 효율을 동시에 개선합니다.</p><img src='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' alt='엔진 제어 이미지' />",
      en: "<h2>Engine Control Technology</h2><p>We improve output stability and efficiency simultaneously using operating data and control algorithms.</p>",
      zh: "<h2>发动机控制技术</h2><p>我们基于运行数据和控制算法，同时提升输出稳定性与效率。</p>"
    }
  },
  "shareholder-meeting": {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("주주총회 공고와 관련 PDF 자료를 확인하실 수 있습니다."),
    content: {
      ko: "<h2>주주총회 자료 게시 위치 안내</h2><p>주주총회 공고, 소집통지, 위임장, 사업보고서 요약본 등 PDF 자료는 <strong>투자정보 &gt; 주주총회</strong> 메뉴에 게시하는 것이 가장 자연스럽습니다.</p><p>관리자 페이지에서 PDF 파일을 업로드한 뒤 아래 자료실에 링크를 연결해 게시할 수 있습니다.</p>",
      en: "<h2>Shareholder Meeting Documents</h2><p>PDF materials such as notices, proxy forms, and summaries should be posted under <strong>Investor Relations &gt; Shareholder Meeting</strong>.</p>",
      zh: "<h2>股东大会资料</h2><p>召集公告、委托书、报告摘要等PDF资料，建议发布在 <strong>投资者关系 &gt; 股东大会</strong> 菜单下。</p>"
    }
  },
  disclosures: {
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("공고와 공시 관련 안내를 제공합니다."),
    content: {
      ko: "<h2>공시 및 공고</h2><p>회사 주요 공고, 법정 고지, 투자정보 관련 공시 자료를 체계적으로 안내하는 페이지입니다.</p><img src='https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80' alt='공시 이미지' />",
      en: "<h2>Disclosures</h2><p>This page provides official notices and disclosure-related materials in an organized format.</p>",
      zh: "<h2>公告披露</h2><p>本页面集中展示公司主要公告、法定通知及投资信息相关资料。</p>"
    }
  },
  governance: {
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("기업 지배구조와 운영 원칙을 소개합니다."),
    content: {
      ko: "<h2>지배구조</h2><p>대한수소발전은 책임 있는 경영과 투명한 의사결정 체계를 바탕으로 지속 가능한 성장을 추구합니다.</p><img src='https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&q=80' alt='지배구조 이미지' />",
      en: "<h2>Governance</h2><p>KHPS pursues sustainable growth through accountable management and transparent decision-making.</p>",
      zh: "<h2>治理结构</h2><p>大韩氢能发电以责任经营和透明决策体系为基础，追求可持续增长。</p>"
    }
  },
  notices: {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("회사 공지와 운영 안내를 확인하실 수 있습니다."),
    content: {
      ko: "<h2>공지사항</h2><p>프로젝트 진행, 시스템 구축, 회사 운영 관련 주요 공지를 안내합니다.</p>",
      en: "<h2>Notices</h2><p>Major notices about project progress, system deployment, and company operations are shared here.</p>",
      zh: "<h2>公告</h2><p>这里发布项目进展、系统建设及公司运营相关的重要公告。</p>"
    }
  },
  news: {
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("연구 및 사업 관련 최신 소식을 전달합니다."),
    content: {
      ko: "<h2>뉴스</h2><p>연구, 사업, 파트너십, 현장 적용 사례 등 다양한 소식을 카드 형식으로 제공합니다.</p>",
      en: "<h2>News</h2><p>Research, business, partnership, and field-application updates are presented here in a card format.</p>",
      zh: "<h2>新闻</h2><p>研究、业务、合作及现场案例等信息以卡片形式呈现。</p>"
    }
  },
  contact: {
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("사업 및 기술 문의를 남겨 주세요."),
    content: {
      ko: "<h2>문의하기</h2><p>사업 협업, 기술 검토, 설비 구축 등 다양한 문의를 접수하고 있습니다.</p>",
      en: "<h2>Contact</h2><p>We welcome inquiries related to business collaboration, technical review, and equipment deployment.</p>",
      zh: "<h2>联系我们</h2><p>欢迎提交业务合作、技术评审和设备建设等相关咨询。</p>"
    }
  },
  faq: {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    description: localeObject("자주 묻는 질문을 정리했습니다."),
    content: {
      ko: "<h2>자주 묻는 질문</h2><p>협업 범위, 검토 절차, 구축 방식, 답변 일정 등 자주 묻는 내용을 정리해 두었습니다.</p>",
      en: "<h2>FAQ</h2><p>Frequently asked questions on collaboration scope, review process, deployment methods, and response time are summarized here.</p>",
      zh: "<h2>常见问题</h2><p>这里整理了关于合作范围、评审流程、建设方式和回复时间的常见问题。</p>"
    }
  }
};

const normalizeStore = (store) => {
  const base = createDefaultStore();

  if (!store || typeof store !== "object") {
    return base;
  }

  if (store.schemaVersion === 2) {
    return {
      ...base,
      ...store,
      site: {
        ...base.site,
        ...(store.site || {}),
        shareholderMeetings: store.site?.shareholderMeetings || base.site.shareholderMeetings
      },
      menus: Array.isArray(store.menus) && store.menus.length ? store.menus : base.menus,
      pages: Array.isArray(store.pages) ? store.pages : base.pages,
      inquiries: Array.isArray(store.inquiries) ? store.inquiries : base.inquiries
    };
  }

  return {
    ...base,
    inquiries: Array.isArray(store.inquiries) ? store.inquiries : []
  };
};

export const loadStore = () => {
  try {
    const parsed = JSON.parse(fs.readFileSync(STORE_PATH, "utf-8"));
    return normalizeStore(parsed);
  } catch {
    return createDefaultStore();
  }
};

export const saveStore = (store) =>
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");

export const createDefaultPage = ({ parentSlug, childSlug, title }) => ({
  id: `page-${Date.now()}-${childSlug}`,
  slugPath: [parentSlug, childSlug],
  hero: {
    image:
      pageSeeds[childSlug]?.image ||
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1600&q=80",
    title,
    description:
      pageSeeds[childSlug]?.description ||
      localeObject("페이지 설명을 준비 중입니다.")
  },
  content:
    pageSeeds[childSlug]?.content ||
    localeObject("<p>페이지 콘텐츠를 준비 중입니다.</p>")
});

export const ensureAllPages = (store) => {
  if (store.schemaVersion !== 2) {
    store.schemaVersion = 2;
  }

  store.menus.forEach((menu) => {
    menu.children.forEach((child) => {
      const existingPage = store.pages.find(
        (page) => page.slugPath.join("/") === [menu.slug, child.slug].join("/")
      );

      if (!existingPage) {
        store.pages.push(
          createDefaultPage({
            parentSlug: menu.slug,
            childSlug: child.slug,
            title: child.title
          })
        );
        return;
      }

      const seed = pageSeeds[child.slug];
      if (!seed) return;

      existingPage.hero = {
        ...existingPage.hero,
        image: existingPage.hero?.image || seed.image,
        title: existingPage.hero?.title || child.title,
        description: existingPage.hero?.description || seed.description
      };

      if (!existingPage.content || typeof existingPage.content !== "object") {
        existingPage.content = seed.content;
      }
    });
  });
};
