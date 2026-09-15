export interface ProjectItem {
  id: string;
  title: string;
  category: 'saas' | 'ecommerce' | 'booking' | 'fintech' | string;
  catLabel: string;
  badge: string;
  kpi: string;
  excerpt: string;
  image: string;
  tags: string[];
  client: string;
  duration: string;
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
