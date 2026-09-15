export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  catLabel?: string;
  badge?: string;
  kpi: string;
  excerpt: string;
  details?: string;
  image: string;
  tags: string[];
  client?: string;
  duration?: string;
  problem?: string;
  solution?: string;
  results?: string;
}

export interface SiteSettings {
  siteName: string;
  siteDesc: string;
  heroTitle1: string;
  heroTitleGrad: string;
  heroSubtitle: string;
  siteLang: 'th' | 'en';
  siteTechStack: string;
  availableStatus: boolean;
  logo?: string;
  favicon?: string;
}

export interface ContactSettings {
  email: string;
  phone: string;
  line: string;
  address: string;
}

export interface SocialSettings {
  github: string;
  linkedin: string;
  facebook: string;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontHeading: string;
  fontBody: string;
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeline: string;
  features?: string[];
  details?: string;
  status: 'new' | 'contacted' | 'proposal' | 'won' | 'closed';
  date: string;
  estimatedPrice?: string;
}
