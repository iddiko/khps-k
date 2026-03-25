export type Locale = "ko" | "en" | "zh";

export type LocaleText = Record<Locale, string>;

export type MenuChild = {
  id: string;
  slug: string;
  title: LocaleText;
};

export type Menu = {
  id: string;
  slug: string;
  title: LocaleText;
  children: MenuChild[];
};

export type PageData = {
  id?: string;
  slugPath: string[];
  hero: {
    image: string;
    title: LocaleText;
    description: LocaleText;
  };
  content: LocaleText;
  fallback?: boolean;
};

export type SiteData = {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  shareholderMeetings: Array<{
    id: string;
    date: string;
    fileUrl: string;
    title: LocaleText;
    summary: LocaleText;
  }>;
  promotion?: {
    notices: Array<{
      id: string;
      date: string;
      category: string;
      title: LocaleText;
      body: LocaleText;
    }>;
    news: Array<{
      id: string;
      date: string;
      image: string;
      title: LocaleText;
      excerpt: LocaleText;
      content: LocaleText;
    }>;
  };
  companyProfile: {
    ceoName: string;
    ceoTitle: LocaleText;
    ceoImage: string;
    ceoMessage: LocaleText;
    organizationTitle: LocaleText;
    organizationImage: string;
    organizationUnits: Array<{
      id: string;
      name: LocaleText;
    }>;
  };
  partnerLogos: Array<{
    id: string;
    name: string;
    image: string;
  }>;
  heroSlides: Array<{
    id: string;
    image: string;
    title: LocaleText;
    description: LocaleText;
  }>;
  home: {
    summary: LocaleText;
    businessCards: Array<{ id: string; title: LocaleText; description: LocaleText }>;
    researchHighlights: Array<{ id: string; title: LocaleText; description: LocaleText }>;
    notices: Array<{ id: string; date: string; title: LocaleText }>;
    faqs: Array<{ id: string; question: LocaleText; answer: LocaleText }>;
  };
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  content: string;
  status: string;
  reply: string;
  createdAt: string;
};
