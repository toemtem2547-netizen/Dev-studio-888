export interface ProjectItem {
  id: string;
  title: string;
  category: 'saas' | 'ecommerce' | 'booking' | 'fintech' | string;
  catLabel: string;
  badge: string;
  kpi: string;
  excerpt: string;
  image: string;
  images?: string[];
  tags: string[];
  client: string;
  duration: string;
  liveUrl?: string;
  problem: string;
  solution: string;
  results: string;
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  message?: string;
  date: string;
  status: 'new' | 'contacted' | 'closed';
  estimateDetails?: {
    scope: string;
    timeline: string;
    addOns: string[];
    totalCost: number;
  };
}

export interface SiteSettings {
  title: string;
  tagline: string;
  description: string;
  statusText: string;
  techStack: string;
}

export interface ContactSettings {
  email: string;
  phone: string;
  location: string;
  businessHours: string;
}

export interface SocialSettings {
  github: string;
  linkedin: string;
  line: string;
  facebook: string;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontHeading: string;
  fontBody: string;
  presetId?: string;
}

export interface AdminUser {
  username: string;
  name: string;
  role: string;
}

export interface AdminSession {
  loggedIn: boolean;
  username: string;
  name: string;
  token?: string;
  timestamp: number;
}

export interface EstimatorConfig {
  basePrices: {
    webapp: number;
    dashboard: number;
    ecommerce: number;
    corporate: number;
  };
  featurePrices: {
    auth: number;
    payment: number;
    notification: number;
    export: number;
    ai: number;
    multilang: number;
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

