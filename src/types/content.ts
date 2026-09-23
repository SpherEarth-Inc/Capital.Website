export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ContentSection {
  id?: string;
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  cta?: { label: string; href: string };
}

export interface PageContent {
  title: string;
  description: string;
  breadcrumb?: BreadcrumbItem[];
  sections: ContentSection[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface InsightArticle {
  slug: string;
  title: string;
  description: string;
  sections: ContentSection[];
}
