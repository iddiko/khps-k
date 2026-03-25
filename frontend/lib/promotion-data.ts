import { LocaleText, SiteData } from "./types";

export type PromotionNotice = {
  id: string;
  date: string;
  category: string;
  title: LocaleText;
  body: LocaleText;
};

export type PromotionNewsItem = {
  id: string;
  date: string;
  image: string;
  title: LocaleText;
  excerpt: LocaleText;
  content: LocaleText;
};

export const defaultPromotionNotices: PromotionNotice[] = [
  {
    id: "notice-01",
    date: "2026-03-20",
    category: "공지",
    title: {
      ko: "대한수소발전 기업 홈페이지 1차 오픈 안내",
      en: "Corporate website phase-one launch notice",
      zh: "官网第一阶段上线通知"
    },
    body: {
      ko: "대한수소발전 기업 홈페이지 1차 구성이 완료되어 시범 운영을 시작했습니다. 회사소개, 사업분야, 기술연구, 제품 및 설비, 고객 문의 기능을 한 곳에서 확인하실 수 있습니다.",
      en: "The first phase of the KHPS corporate website is now live in pilot mode. Visitors can review the company profile, business areas, research, products, and inquiry features in one place.",
      zh: "大韩氢素发电官网第一阶段已完成并开始试运行，访问者可在一个平台查看公司介绍、事业领域、技术研究、产品设备及咨询功能。"
    }
  },
  {
    id: "notice-02",
    date: "2026-03-14",
    category: "연구",
    title: {
      ko: "암모니아 혼소 시스템 검증 일정 안내",
      en: "Ammonia co-firing system validation schedule",
      zh: "氨混烧系统验证日程通知"
    },
    body: {
      ko: "암모니아 혼소 시스템 검증은 세 단계로 진행됩니다. 기본 성능 확인, 출력 안정성 검증, 장시간 운전 검토 순으로 수행되며 결과는 추후 공지사항과 뉴스에 연동해 공개할 예정입니다.",
      en: "Validation of the ammonia co-firing system will proceed in three stages: baseline performance, output stability, and long-duration operation. Results will be shared through future notices and news updates.",
      zh: "氨混烧系统验证将分三个阶段进行，依次为基础性能确认、输出稳定性验证及长时间运行检讨，结果将通过公告和新闻发布。"
    }
  },
  {
    id: "notice-03",
    date: "2026-03-08",
    category: "사업",
    title: {
      ko: "플랜트 설계 협력사 미팅 진행",
      en: "Plant engineering partner meeting completed",
      zh: "工厂设计合作会议完成"
    },
    body: {
      ko: "이번 미팅에서는 플랜트 설계 기준, 성능 목표, 협업 역할 분담을 중심으로 논의가 진행되었습니다. 회의 결과를 바탕으로 프로젝트 협력 프로세스를 정리하고 있습니다.",
      en: "The meeting covered plant design standards, performance targets, and collaboration roles. KHPS is now organizing the project workflow based on the discussion results.",
      zh: "本次会议围绕工厂设计标准、性能目标及协作分工展开讨论，目前正根据会议结果整理项目协作流程。"
    }
  },
  {
    id: "notice-04",
    date: "2026-03-02",
    category: "공지",
    title: {
      ko: "대표 문의 메일 변경 안내",
      en: "Update to the primary inquiry email",
      zh: "主要咨询邮箱变更通知"
    },
    body: {
      ko: "공식 문의 접수 이메일은 wgcman@k-hps.com으로 통합되었습니다. 기술 문의, 사업 협력, 등록 관련 요청 모두 동일한 창구로 접수됩니다.",
      en: "The official inquiry channel has been unified as wgcman@k-hps.com. Technical requests, business collaboration, and registration inquiries are all handled through this address.",
      zh: "官方咨询邮箱已统一为 wgcman@k-hps.com，技术咨询、业务合作及登记相关请求均通过该渠道受理。"
    }
  },
  {
    id: "notice-05",
    date: "2026-02-26",
    category: "연구",
    title: {
      ko: "엔진 효율 제어 알고리즘 시험 완료",
      en: "Engine efficiency control algorithm test completed",
      zh: "发动机效率控制算法试验完成"
    },
    body: {
      ko: "엔진 효율 향상을 목표로 한 제어 알고리즘 시험이 완료되었습니다. 출력 변동 보정과 연소 효율 개선 항목이 주요 검토 대상이었으며 후속 적용성 평가가 이어질 예정입니다.",
      en: "Testing has been completed for an engine-efficiency control algorithm focused on output compensation and combustion improvement. A follow-up applicability review is planned.",
      zh: "面向发动机效率提升的控制算法试验已完成，主要评估了输出波动补偿与燃烧效率改善，后续将开展适用性审查。"
    }
  },
  {
    id: "notice-06",
    date: "2026-02-21",
    category: "사업",
    title: {
      ko: "산업 에너지 전환 컨설팅 문의 접수 시작",
      en: "Industrial energy transition consulting inquiries now open",
      zh: "产业能源转型咨询受理开始"
    },
    body: {
      ko: "산업 현장의 에너지 전환 방향 수립, 설비 프로젝트 검토, 수소·암모니아 발전 검토에 대한 컨설팅 문의 접수가 시작되었습니다.",
      en: "Consulting inquiries are now open for industrial energy transition planning, equipment project review, and hydrogen-ammonia generation assessment.",
      zh: "现已开始受理产业能源转型规划、设备项目评审及氢能/氨能发电评估相关咨询。"
    }
  },
  {
    id: "notice-07",
    date: "2026-02-16",
    category: "공지",
    title: {
      ko: "협력업체 등록 프로세스 준비 중",
      en: "Partner registration process in preparation",
      zh: "合作单位登记流程准备中"
    },
    body: {
      ko: "협력업체 등록 프로세스를 디지털 기반으로 정리하고 있습니다. 향후 등록 절차와 제출 항목이 확정되면 공지사항을 통해 안내드릴 예정입니다.",
      en: "The partner registration process is being organized in a digital workflow. Detailed steps and required items will be announced through the notice board.",
      zh: "合作单位登记流程正在数字化整理中，后续将通过公告发布详细步骤及提交项目。"
    }
  },
  {
    id: "notice-08",
    date: "2026-02-10",
    category: "연구",
    title: {
      ko: "수소 발전 제어 데이터 분석 리포트 작성",
      en: "Hydrogen power control data analysis report prepared",
      zh: "氢能发电控制数据分析报告完成"
    },
    body: {
      ko: "수소 발전 제어 데이터 기반으로 출력 안정성, 제어 반응, 모니터링 성능을 정리한 분석 리포트가 작성되었습니다. 해당 리포트는 향후 제어 개선 방향 수립에 활용될 예정입니다.",
      en: "A control-data report covering output stability, response behavior, and monitoring performance in hydrogen generation has been completed. It will support future control improvements.",
      zh: "已完成基于氢能发电控制数据的分析报告，整理了输出稳定性、控制响应与监测性能，将用于后续控制优化。"
    }
  }
];

export const defaultPromotionNews: PromotionNewsItem[] = Array.from({ length: 40 }, (_, index) => {
  const no = index + 1;
  return {
    id: `news-${String(no).padStart(2, "0")}`,
    date: `2026-02-${String((no % 28) + 1).padStart(2, "0")}`,
    image: `https://images.unsplash.com/photo-${[
      "1497436072909-60f360e1d4b1",
      "1518005020951-eccb494ad742",
      "1509395176047-4a66953fd231",
      "1532187643603-ba119ca4109e",
      "1517048676732-d65bc937f952"
    ][index % 5]}?auto=format&fit=crop&w=900&q=80`,
    title: {
      ko: `대한수소발전 뉴스 더미 데이터 ${no}`,
      en: `KHPS News Dummy Item ${no}`,
      zh: `大韩氢素发电新闻示例 ${no}`
    },
    excerpt: {
      ko: `수소 및 암모니아 기반 발전 기술과 플랜트 설계, 설비 구축 동향을 소개하는 뉴스 요약 ${no}입니다.`,
      en: `News summary ${no} covering hydrogen and ammonia power technologies, plant engineering, and equipment deployment.`,
      zh: `新闻摘要 ${no}，介绍氢能与氨能发电技术、工厂工程及设备建设动态。`
    },
    content: {
      ko: `이 뉴스 상세 본문 ${no}은 수소 발전, 암모니아 혼소 기술, 플랜트 설계, 설비 구축과 관련된 내용을 방문자가 직접 확인할 수 있도록 구성한 예시입니다. 실제 운영 시에는 프로젝트 진행 상황, 연구 성과, 협력 소식, 산업 동향 등을 상세하게 입력해 활용할 수 있습니다.`,
      en: `This detailed news body ${no} is a sample showing how visitors can read a full article about hydrogen generation, ammonia co-firing, plant design, and equipment deployment. In production, it can be used for project updates, research results, partnership stories, and industry trends.`,
      zh: `该新闻正文示例 ${no} 用于展示访客如何查看关于氢能发电、氨混烧技术、工厂设计及设备建设的完整内容。实际运营时可录入项目进展、研究成果、合作消息及产业趋势等详细信息。`
    }
  };
});

export const getPromotionData = (site: SiteData) => ({
  notices: site.promotion?.notices?.length ? site.promotion.notices : defaultPromotionNotices,
  news: site.promotion?.news?.length ? site.promotion.news : defaultPromotionNews
});

export const serializeNotices = (items: PromotionNotice[]) =>
  items
    .map((item) =>
      [
        item.date,
        item.category,
        item.title.ko,
        item.title.en,
        item.title.zh,
        item.body.ko,
        item.body.en,
        item.body.zh
      ].join("|")
    )
    .join("\n");

export const serializeNews = (items: PromotionNewsItem[]) =>
  items
    .map((item) =>
      [
        item.date,
        item.image,
        item.title.ko,
        item.title.en,
        item.title.zh,
        item.excerpt.ko,
        item.excerpt.en,
        item.excerpt.zh,
        item.content.ko,
        item.content.en,
        item.content.zh
      ].join("|")
    )
    .join("\n");

export const parseNotices = (raw: string): PromotionNotice[] =>
  raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [date = "", category = "", ko = "", en = "", zh = "", bodyKo = "", bodyEn = "", bodyZh = ""] =
        line.split("|");

      return {
        id: `notice-${String(index + 1).padStart(2, "0")}`,
        date,
        category,
        title: { ko, en, zh },
        body: {
          ko: bodyKo || ko,
          en: bodyEn || en,
          zh: bodyZh || zh
        }
      };
    });

export const parseNews = (raw: string): PromotionNewsItem[] =>
  raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [
        date = "",
        image = "",
        ko = "",
        en = "",
        zh = "",
        exKo = "",
        exEn = "",
        exZh = "",
        contentKo = "",
        contentEn = "",
        contentZh = ""
      ] = line.split("|");

      return {
        id: `news-${String(index + 1).padStart(2, "0")}`,
        date,
        image,
        title: { ko, en, zh },
        excerpt: { ko: exKo, en: exEn, zh: exZh },
        content: {
          ko: contentKo || exKo,
          en: contentEn || exEn,
          zh: contentZh || exZh
        }
      };
    });
