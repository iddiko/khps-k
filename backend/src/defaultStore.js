const text = (ko, en, zh) => ({ ko, en, zh });

export const createDefaultStore = () => ({
  schemaVersion: 2,
  site: {
    companyName: "(주)대한수소발전",
    contactEmail: "wgcman@k-hps.com",
    contactPhone: "+82-2-0000-0000",
    shareholderMeetings: [
      {
        id: "meeting-2026-01",
        date: "2026-03-25",
        fileUrl: "",
        title: text("2026년 정기주주총회 소집공고", "2026 Annual General Meeting Notice", "2026年度股东大会召集公告"),
        summary: text(
          "정기주주총회 일정과 의안 안내를 확인하실 수 있습니다. PDF 업로드 후 실제 공고 파일로 교체해 주세요.",
          "Review the AGM schedule and agenda. Replace this item with the actual PDF after upload.",
          "可查看年度股东大会日程与议案说明。上传PDF后请替换为正式文件。"
        )
      }
    ],
    heroSlides: [
      {
        id: "hero-1",
        image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1600&q=80",
        title: text("수소와 암모니아 발전의 새로운 기준", "A New Standard for Hydrogen and Ammonia Power", "氢能与氨能发电的新标准"),
        description: text(
          "대한수소발전은 수소·암모니아 발전 기술과 플랜트 엔지니어링을 연결하는 에너지 솔루션을 제공합니다.",
          "KHPS delivers energy solutions that connect hydrogen and ammonia power technologies with plant engineering.",
          "大韩氢能发电提供连接氢能、氨能发电技术与工厂工程的能源解决方案。"
        )
      },
      {
        id: "hero-2",
        image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=80",
        title: text("설계부터 구축, 운영 최적화까지", "From Design to Deployment and Optimization", "从设计、建设到运营优化"),
        description: text(
          "현장 조건에 맞춘 설비 구성을 통해 산업 현장의 에너지 전환을 지원합니다.",
          "We support industrial energy transition with site-ready equipment and optimized system architecture.",
          "我们通过适配现场条件的设备与系统方案，支持产业现场的能源转型。"
        )
      }
    ],
    partnerLogos: [
      { id: "partner-1", name: "Partner 1", image: "/partner-logo-1.png" },
      { id: "partner-2", name: "Partner 2", image: "/partner-logo-2.png" },
      { id: "partner-3", name: "Partner 3", image: "/partner-logo-3.png" }
    ],
    companyProfile: {
      ceoName: "김정섭",
      ceoTitle: text("대표 인사말", "CEO Message", "代表致辞"),
      ceoImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80",
      ceoMessage: text(
        "대한수소발전은 수소와 암모니아 기반 발전 기술이 실제 산업 현장에서 안정적으로 작동하도록 연구, 설계, 구축을 함께 수행하고 있습니다. 기술의 가능성을 현장 경쟁력으로 바꾸는 것이 우리의 역할입니다.",
        "KHPS researches, designs, and deploys hydrogen and ammonia power technologies so they can operate reliably in real industrial environments.",
        "大韩氢能发电致力于研发、设计并落地氢能与氨能发电技术，使其能够在真实产业环境中稳定运行。"
      ),
      organizationTitle: text("조직도", "Organization Chart", "组织图"),
      organizationImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      organizationUnits: [
        { id: "org-1", name: text("경영지원본부", "Management Support", "经营支援本部") },
        { id: "org-2", name: text("기술연구소", "R&D Center", "技术研究所") },
        { id: "org-3", name: text("플랜트사업부", "Plant Business Division", "工厂事业部") },
        { id: "org-4", name: text("설비운영팀", "Equipment Operations Team", "设备运营团队") }
      ]
    },
    home: {
      summary: text(
        "대한수소발전은 수소 및 암모니아 기반 발전 기술과 플랜트 엔지니어링을 중심으로 산업 현장의 에너지 전환을 지원합니다.",
        "KHPS supports industrial energy transition through hydrogen and ammonia power technologies and plant engineering.",
        "大韩氢能发电以氢能、氨能发电技术和工厂工程为核心，支持产业现场的能源转型。"
      ),
      businessCards: [
        {
          id: "biz-1",
          title: text("수소 발전", "Hydrogen Power", "氢能发电"),
          description: text("고효율 수소 발전 시스템 기획과 현장 적용", "Planning and deployment of high-efficiency hydrogen power systems", "高效率氢能发电系统规划与现场应用")
        },
        {
          id: "biz-2",
          title: text("암모니아 혼소", "Ammonia Co-firing", "氨混烧"),
          description: text("저탄소 전환을 위한 암모니아 기반 발전 솔루션", "Ammonia-based power solutions for low-carbon transition", "面向低碳转型的氨能发电方案")
        },
        {
          id: "biz-3",
          title: text("플랜트 엔지니어링", "Plant Engineering", "工厂工程"),
          description: text("설계부터 구축, 운영까지 이어지는 통합 엔지니어링", "Integrated engineering from design to construction and operation", "覆盖设计、建设与运营的一体化工程服务")
        }
      ],
      researchHighlights: [
        {
          id: "tech-1",
          title: text("연소 안정화", "Combustion Stability", "燃烧稳定化"),
          description: text("출력 안정성과 연소 효율을 함께 고려한 제어 기술", "Control technology balancing output stability and combustion efficiency", "兼顾输出稳定性与燃烧效率的控制技术")
        },
        {
          id: "tech-2",
          title: text("효율 향상", "Efficiency Improvement", "效率提升"),
          description: text("운전 데이터 기반의 발전 효율 최적화", "Generation efficiency optimization based on operating data", "基于运行数据的发电效率优化")
        },
        {
          id: "tech-3",
          title: text("재생에너지 연계", "Renewable Integration", "可再生能源联动"),
          description: text("신재생 환경과 연계되는 통합 발전 시스템 설계", "Integrated generation systems aligned with renewable environments", "适配可再生能源环境的一体化发电系统设计")
        }
      ],
      notices: [
        {
          id: "notice-1",
          date: "2026-03-20",
          title: text("기업 홈페이지 1차 공개", "Corporate website first release", "企业官网首次上线")
        },
        {
          id: "notice-2",
          date: "2026-03-14",
          title: text("암모니아 혼소 시스템 검증 일정 안내", "Ammonia co-firing validation schedule", "氨混烧系统验证日程公告")
        }
      ],
      faqs: [
        {
          id: "faq-1",
          question: text("어떤 협업이 가능한가요?", "What collaborations are available?", "可以进行哪些合作？"),
          answer: text("플랜트 설계, 설비 구축, 기술 검토, 공동 연구 협업이 가능합니다.", "Plant design, equipment deployment, technical review, and joint research are available.", "可进行工厂设计、设备建设、技术评审与联合研发合作。")
        },
        {
          id: "faq-2",
          question: text("문의 답변은 얼마나 걸리나요?", "How long does it take to receive a reply?", "多久可以收到回复？"),
          answer: text("일반적으로 영업일 기준 1~3일 내 답변드립니다.", "Replies are typically provided within 1 to 3 business days.", "通常会在 1 到 3 个工作日内回复。")
        }
      ]
    }
  },
  menus: [
    {
      id: "company",
      slug: "company",
      title: text("회사소개", "Company", "公司介绍"),
      children: [
        { id: "greeting", slug: "greeting", title: text("인사말", "Greeting", "致辞") },
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
        { id: "research-overview", slug: "research-overview", title: text("연구 개요", "Research Overview", "研究概览") },
        { id: "energy-tech", slug: "energy-tech", title: text("에너지 기술", "Energy Technology", "能源技术") },
        { id: "engine-tech", slug: "engine-tech", title: text("엔진 제어 기술", "Engine Control", "发动机控制技术") }
      ]
    },
    {
      id: "investor-relations",
      slug: "investor-relations",
      title: text("투자정보", "Investor Relations", "投资者关系"),
      children: [
        { id: "shareholder-meeting", slug: "shareholder-meeting", title: text("주주총회", "Shareholder Meeting", "股东大会") },
        { id: "disclosures", slug: "disclosures", title: text("공시/공고", "Disclosures", "公告披露") },
        { id: "governance", slug: "governance", title: text("지배구조", "Governance", "治理结构") }
      ]
    },
    {
      id: "promotion",
      slug: "promotion",
      title: text("홍보센터", "Promotion", "宣传中心"),
      children: [
        { id: "notices", slug: "notices", title: text("공지사항", "Notices", "公告") },
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
  ],
  pages: [],
  inquiries: []
});
