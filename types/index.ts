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
  message?: string;
  timeline?: string;
  features?: string[];
  details?: string;
  status: 'new' | 'contacted' | 'proposal' | 'won' | 'closed' | string;
  date: string;
  estimatedPrice?: string;
  estimateDetails?: any;
}

export interface CustomProjectType {
  id: string;
  name: string;
  desc?: string;
  price: number;
  icon?: string;
  color?: string;
}

export interface EstimatorConfig {
  basePrices: {
    webapp: number;
    dashboard: number;
    ecommerce: number;
    corporate: number;
    [key: string]: number;
  };
  customProjectTypes?: CustomProjectType[];
  featurePrices: {
    auth: number;
    payment: number;
    notification: number;
    export: number;
    ai: number;
    multilang: number;
    [key: string]: number;
  };
  speedMultiplier: number;
}

export const DEFAULT_ESTIMATOR_CONFIG: EstimatorConfig = {
  basePrices: {
    webapp: 45000,
    dashboard: 55000,
    ecommerce: 50000,
    corporate: 35000,
  },
  customProjectTypes: [],
  featurePrices: {
    auth: 10000,
    payment: 15000,
    notification: 8000,
    export: 12000,
    ai: 25000,
    multilang: 9000,
  },
  speedMultiplier: 1.25,
};

