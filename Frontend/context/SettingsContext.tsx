'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { SiteSettings, ContactSettings, SocialSettings, ProjectItem, EstimatorConfig, DEFAULT_ESTIMATOR_CONFIG } from '@/types';

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontHeading: string;
  fontBody: string;
}

const defaultSiteSettings: SiteSettings = {
  siteName: 'DEV STUDIO 888',
  siteDesc: 'ผู้เชี่ยวชาญด้านการพัฒนา Web Application, SaaS, E-Commerce และ Custom Software ระดับพรีเมียม ตอบโจทย์ทุกสเกลธุรกิจด้วยมาตรฐานระดับสากล',
  heroTitle1: 'เปลี่ยนไอเดียธุรกิจของคุณสู่',
  heroTitleGrad: 'Digital Product',
  heroSubtitle: 'ผู้เชี่ยวชาญด้านการพัฒนา Web Application, SaaS, E-Commerce และ Custom Software ที่ตอบโจทย์ธุรกิจ เน้น Performance สูง สวยงาม และเพิ่มยอดขายจริง',
  siteLang: 'th',
  siteTechStack: 'React / Next.js, Node.js & TypeScript, Python & AI Models, PostgreSQL & Supabase, Docker & Cloud Deploy, AWS Architecture, Payment & PromptPay, Enterprise Security',
  availableStatus: true,
};

const defaultContactSettings: ContactSettings = {
  email: 'contact@nexusstudio888.com',
  phone: '088-888-8888',
  line: '@nexus888',
  address: '888 Gaysorn Tower, Ratchadamri Rd, Lumphini, Pathum Wan, Bangkok 10330',
};

const defaultSocialSettings: SocialSettings = {
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  facebook: 'https://facebook.com',
};

const defaultProjects: ProjectItem[] = [
  {
    id: '1',
    title: 'ARIT Web Subject Guide - RMU Library Portal',
    category: 'saas',
    catLabel: 'EdTech & Academic Library Information Portal',
    badge: 'Academic Portal',
    kpi: 'รวบรวม 947 ทรัพยากร 117 สาขา ค้นคว้างานวิจัยได้เร็วขึ้นกว่า 80%',
    excerpt: 'ระบบแนะนำแหล่งสืบค้นทรัพยากรสารสนเทศ สำนักวิทยบริการฯ มรภ.มหาสารคาม รวบรวมหนังสือ ฐานข้อมูลงานวิจัย e-Books 117 สาขา',
    image: '/assets/images/project_arit_guide.jpg',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'RMU OPAC', 'TDC Database', 'ProQuest API', 'Vercel'],
    client: 'สำนักวิทยบริการและเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏมหาสารคาม (ARIT RMU)',
    duration: '4 สัปดาห์',
    problem: 'นักศึกษาและคณาจารย์กว่า 117 สาขาวิชา ประสบปัญหาในการค้นคว้าแหล่งข้อมูลทางวิชาการและงานวิจัย เนื่องจากแหล่งสืบค้น วารสาร ฐานข้อมูลออนไลน์ (OPAC, TDC, ProQuest, EBSCO, ScienceDirect) กระจัดกระจายและเข้าถึงได้ยาก',
    solution: 'ออกแบบและพัฒนาระบบ ARIT Web Subject Guide ที่จัดหมวดหมู่ทรัพยากรสารสนเทศตามสาขาวิชาและคณะแบบครบวงจร (Subject Guide Architecture) พร้อมระบบค้นหาอัจฉริยะ (Instant Subject Search) และ Direct Resource Access เชื่อมตรงสู่ฐานข้อมูลงานวิจัยระดับสากล',
    results: 'เข้าถึงทรัพยากรสารสนเทศได้สะดวกรวดเร็วในคลิกเดียว ลดเวลาสืบค้นงานวิจัยลง 80% และรองรับทราฟฟิกค้นคว้ากว่า 1,000+ รายการต่อวัน',
  },
  {
    id: '2',
    title: 'Nexus Executive Analytics & KPI Platform',
    category: 'saas',
    catLabel: 'Enterprise SaaS & Business Intelligence',
    badge: 'Enterprise SaaS',
    kpi: '+180% ประสิทธิภาพการตัดสินใจ และลดเวลาทำรีพอร์ตลง 85%',
    excerpt: 'แพลตฟอร์มรวบรวมข้อมูลและรายงาน KPI ผู้บริหารระดับสูง เชื่อมต่อ ERP/CRM พร้อมรายงาน Real-time และ PDF Export',
    image: '/assets/images/project_dashboard.jpg',
    tags: ['Next.js 14', 'TypeScript', 'Chart.js', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Redis Cache'],
    client: 'Global Logistics & Supply Chain Corp.',
    duration: '7 สัปดาห์',
    problem: 'ผู้บริหารและทีมงานต้องใช้เวลารวบรวมข้อมูลยอดขายจาก 6 ระบบที่แยกกัน ทำให้เสียเวลาประชุมสรุปผลกว่า 12 ชั่วโมงต่อสัปดาห์ และรายงานที่ได้มีความล่าช้า ไม่สะท้อนสถานการณ์จริง',
    solution: 'พัฒนา Centralized Executive Dashboard ที่เชื่อมต่อฐานข้อมูลและ API จากทุกระบบเข้าด้วยกัน พร้อมแสดงผลกราฟแบบ Real-time, ระบบคัดกรองข้อมูลตามช่วงเวลา และระบบ Export รายงาน PDF ส่งตรงเข้าเมลผู้บริหารทุกเช้า',
    results: '+180% ประสิทธิภาพการตัดสินใจ และลดเวลาทำรีพอร์ตลง 85%',
  },
  {
    id: '3',
    title: 'Axel & Co. Luxury Curated E-Commerce',
    category: 'ecommerce',
    catLabel: 'High-End Retail & Lifestyle Store',
    badge: 'E-Commerce Retail',
    kpi: '+240% อัตราการแปลงเป็นยอดขาย (Conversion Rate) และคะแนนรีวิว 4.9/5',
    excerpt: 'แพลตฟอร์ม E-Commerce ระดับพรีเมียม สถาปัตยกรรม Headless พร้อมระบบจัดการสต็อกและ PromptPay QR อัตโนมัติ',
    image: '/assets/images/project_ecommerce.jpg',
    tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Stripe API', 'PromptPay Gateway', 'Redis Cart'],
    client: 'Axel & Co. International Lifestyle Brand',
    duration: '5 สัปดาห์',
    problem: 'เว็บไซต์เดิมใช้ระบบเก่าที่โหลดช้า (กว่า 4.5 วินาที) ทำให้สูญเสียลูกค้ากว่า 40% ในขั้นตอน Checkout และไม่รองรับการชำระเงินแบบ PromptPay QR อัตโนมัติ',
    solution: 'สร้างแพลตฟอร์ม E-Commerce ระดับพรีเมียมใหม่ทั้งหมดด้วย React + Headless Architecture โหลดหน้าเว็บเร็วขึ้นเป็น 0.4 วินาที พร้อมระบบ Quick Slide Cart และ Payment Gateway PromptPay QR & Credit Card แม่นยำ 100%',
    results: '+240% อัตราการแปลงเป็นยอดขาย (Conversion Rate) และคะแนนรีวิว 4.9/5',
  },
  {
    id: '4',
    title: 'Aura Clinic & Specialist Appointment Hub',
    category: 'booking',
    catLabel: 'Medical Clinic & Specialist Booking Platform',
    badge: 'Clinic Booking',
    kpi: 'ลดอัตราการเบี้ยวนัด (No-Show) ลง 92% และลดภาระงานแอดมินกว่า 70%',
    excerpt: 'ระบบนัดหมายแพทย์และบริการความงาม Interactive Calendar เชื่อมต่อ LINE Official แจ้งเตือนอัตโนมัติ 24 ชม.',
    image: '/assets/images/project_booking.jpg',
    tags: ['Next.js', 'FullCalendar API', 'Node.js', 'LINE Messaging API', 'PostgreSQL', 'Twilio SMS'],
    client: 'Aura Wellness & Aesthetic Center',
    duration: '6 สัปดาห์',
    problem: 'การนัดหมายคนไข้ใช้การตอบแชทแอดมินผ่าน LINE ซึ่งเกิดปัญหานัดหมายชนกัน (Double Booking) สูง และลูกค้ามักลืมนัดทำให้คลินิกสูญเสียรายได้จากคิวที่ว่าง',
    solution: 'ออกแบบระบบปฏิทินนัดหมายแบบ Interactive Calendar ที่คนไข้สามารถเลือกแพทย์ สาขา และเวลาว่างได้เอง พร้อมเชื่อมต่อ LINE Messaging API เพื่อส่งใบนัดและการแจ้งเตือนล่วงหน้า 24 ชม. และ 2 ชม. ก่อนนัด',
    results: 'ลดอัตราการเบี้ยวนัด (No-Show) ลง 92% และลดภาระงานแอดมินกว่า 70%',
  },
  {
    id: '5',
    title: 'Nexus Wealth & Crypto Portfolio Tracker',
    category: 'fintech',
    catLabel: 'FinTech & Real-Time Asset Management Platform',
    badge: 'FinTech Platform',
    kpi: 'รองรับการส่งข้อมูล Real-time กว่า 10,000 TPS โดยมีความหน่วงต่ำกว่า 50ms',
    excerpt: 'เว็บแอปติดตามพอร์ตสินทรัพย์ดิจิทัล เชื่อมต่อ WebSocket สด พร้อมกราฟเทคนิคัลระดับสูง TradingView',
    image: '/assets/images/project_fintech.jpg',
    tags: ['TypeScript', 'WebSockets', 'TradingView Lightweight Charts', 'Node.js Microservices', 'PostgreSQL', 'Docker'],
    client: 'Nexus Capital & Private Investors',
    duration: '8 สัปดาห์',
    problem: 'นักลงทุนต้องการระบบติดตามมูลค่าพอร์ตสินทรัพย์ดิจิทัลและหุ้นแบบสดๆ พร้อมแจ้งเตือนเมื่อเกิดความผันผวนของราคา แต่แอปทั่วไปในตลาดมีค่าความหน่วงสูง (Latency) และไม่สามารถคำนวณภาษีหรือกำไรขาดทุนสะสมได้',
    solution: 'พัฒนา Web Application ที่เชื่อมต่อ WebSocket สดจาก Binance, CoinGecko และตลาดหลักทรัพย์ คำนวณ P&L กำไรขาดทุนแบบ Real-time พร้อมกราฟเทคนิคัลระดับสูง (TradingView Integration) และระบบความปลอดภัยระดับสถาบันการเงิน',
    results: 'รองรับการส่งข้อมูล Real-time กว่า 10,000 TPS โดยมีความหน่วงต่ำกว่า 50ms',
  },
];

const defaultThemeSettings: ThemeSettings = {
  primaryColor: '#2563EB',
  secondaryColor: '#7C3AED',
  fontHeading: 'Plus Jakarta Sans',
  fontBody: 'Inter',
};

interface SettingsContextType {
  site: SiteSettings;
  contact: ContactSettings;
  social: SocialSettings;
  projects: ProjectItem[];
  themeSettings: ThemeSettings;
  estimatorConfig: EstimatorConfig;
  updateSiteSettings: (data: Partial<SiteSettings>) => void;
  updateContactSettings: (data: Partial<ContactSettings>) => void;
  updateSocialSettings: (data: Partial<SocialSettings>) => void;
  updateThemeSettings: (data: Partial<ThemeSettings>) => void;
  updateEstimatorConfig: (config: Partial<EstimatorConfig>, skipApiCall?: boolean) => void;
  saveProjects: (projects: ProjectItem[]) => void;
}

const SettingsContext = createContext<SettingsContextType>({
  site: defaultSiteSettings,
  contact: defaultContactSettings,
  social: defaultSocialSettings,
  projects: defaultProjects,
  themeSettings: defaultThemeSettings,
  estimatorConfig: DEFAULT_ESTIMATOR_CONFIG,
  updateSiteSettings: () => {},
  updateContactSettings: () => {},
  updateSocialSettings: () => {},
  updateThemeSettings: () => {},
  updateEstimatorConfig: () => {},
  saveProjects: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [site, setSite] = useState<SiteSettings>(defaultSiteSettings);
  const [contact, setContact] = useState<ContactSettings>(defaultContactSettings);
  const [social, setSocial] = useState<SocialSettings>(defaultSocialSettings);
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(defaultThemeSettings);
  const [estimatorConfig, setEstimatorConfig] = useState<EstimatorConfig>(DEFAULT_ESTIMATOR_CONFIG);

function hexToRgb(hex: string): string {
  if (!hex) return '37, 99, 235';
  const clean = hex.replace('#', '').trim();
  let r = 37, g = 99, b = 235;
  if (clean.length === 6) {
    r = parseInt(clean.substring(0, 2), 16);
    g = parseInt(clean.substring(2, 4), 16);
    b = parseInt(clean.substring(4, 6), 16);
  } else if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
  }
  return isNaN(r) || isNaN(g) || isNaN(b) ? '37, 99, 235' : `${r}, ${g}, ${b}`;
}

  const applyThemeToDOM = (t: ThemeSettings) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const pColor = t.primaryColor || '#2563EB';
      const sColor = t.secondaryColor || '#7C3AED';
      const pRgb = hexToRgb(pColor);
      const sRgb = hexToRgb(sColor);

      root.style.setProperty('--primary', pColor);
      root.style.setProperty('--secondary', sColor);
      root.style.setProperty('--primary-rgb', pRgb);
      root.style.setProperty('--secondary-rgb', sRgb);
      root.style.setProperty('--primary-hover', pColor);
      root.style.setProperty('--secondary-light', sColor);
      root.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${pColor} 0%, ${sColor} 100%)`);
      root.style.setProperty('--border-focus', pColor);
      root.style.setProperty('--glow-primary', `0 0 35px rgba(${pRgb}, 0.25)`);
      root.style.setProperty('--shadow-card-hover', `0 20px 45px -5px rgba(${pRgb}, 0.25), 0 0 0 1.5px ${pColor}`);

      if (t.fontHeading) root.style.setProperty('--font-heading', `'${t.fontHeading}', 'Prompt', sans-serif`);
      if (t.fontBody) root.style.setProperty('--font-body', `'${t.fontBody}', 'Prompt', sans-serif`);
    }
  };

  useEffect(() => {
    // 1. Initial load from localStorage (instant cache)
    try {
      const savedSite = localStorage.getItem('nexus_dash_settings_site');
      if (savedSite) setSite(prev => ({ ...prev, ...JSON.parse(savedSite) }));

      const savedContact = localStorage.getItem('nexus_dash_settings_contact');
      if (savedContact) setContact(prev => ({ ...prev, ...JSON.parse(savedContact) }));

      const savedSocial = localStorage.getItem('nexus_dash_settings_social');
      if (savedSocial) setSocial(prev => ({ ...prev, ...JSON.parse(savedSocial) }));

      const savedTheme = localStorage.getItem('nexus_dash_settings_theme');
      if (savedTheme) {
        const parsed = JSON.parse(savedTheme);
        const merged = { ...defaultThemeSettings, ...parsed };
        setThemeSettings(merged);
        applyThemeToDOM(merged);
      } else {
        applyThemeToDOM(defaultThemeSettings);
      }

      const savedProjects = localStorage.getItem('nexus_dash_portfolio');
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        if (Array.isArray(parsed) && parsed.length > 0) setProjects(parsed);
      }

      const savedEstimator = localStorage.getItem('nexus_dash_estimator_config');
      if (savedEstimator) {
        setEstimatorConfig(prev => ({ ...prev, ...JSON.parse(savedEstimator) }));
      }
    } catch (e) {
      console.error('SettingsContext local cache error:', e);
    }

    // 2. Fetch live data from Database API
    const fetchLiveData = async () => {
      try {
        const [settRes, projRes] = await Promise.all([
          fetch('/api/settings'),
          fetch('/api/projects'),
        ]);
        const settData = await settRes.json();
        const projData = await projRes.json();

        if (settData.success) {
          if (settData.site) {
            setSite(prev => ({ ...prev, ...settData.site }));
            localStorage.setItem('nexus_dash_settings_site', JSON.stringify(settData.site));
          }
          if (settData.contact) {
            setContact(prev => ({ ...prev, ...settData.contact }));
            localStorage.setItem('nexus_dash_settings_contact', JSON.stringify(settData.contact));
          }
          if (settData.social) {
            setSocial(prev => ({ ...prev, ...settData.social }));
            localStorage.setItem('nexus_dash_settings_social', JSON.stringify(settData.social));
          }
          if (settData.estimatorConfig) {
            setEstimatorConfig(prev => ({ ...prev, ...settData.estimatorConfig }));
            localStorage.setItem('nexus_dash_estimator_config', JSON.stringify(settData.estimatorConfig));
          }
        }

        if (projData.success && Array.isArray(projData.projects) && projData.projects.length > 0) {
          setProjects(projData.projects);
          localStorage.setItem('nexus_dash_portfolio', JSON.stringify(projData.projects));
        }
      } catch (err) {
        console.error('SettingsContext API fetch error:', err);
      }
    };

    fetchLiveData();
  }, []);

  const updateSiteSettings = async (data: any) => {
    const next = { ...site, ...data };
    setSite(next);
    localStorage.setItem('nexus_dash_settings_site', JSON.stringify(next));
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site: next }),
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.site) {
          setSite(result.site);
          localStorage.setItem('nexus_dash_settings_site', JSON.stringify(result.site));
        }
      }
    } catch (err) {
      console.error('[updateSiteSettings] API error:', err);
    }
  };

  const updateContactSettings = async (data: any) => {
    const next = { ...contact, ...data };
    setContact(next);
    localStorage.setItem('nexus_dash_settings_contact', JSON.stringify(next));
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: next }),
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.contact) {
          setContact(result.contact);
          localStorage.setItem('nexus_dash_settings_contact', JSON.stringify(result.contact));
        }
      }
    } catch (err) {
      console.error('[updateContactSettings] API error:', err);
    }
  };

  const updateSocialSettings = async (data: any) => {
    const next = { ...social, ...data };
    setSocial(next);
    localStorage.setItem('nexus_dash_settings_social', JSON.stringify(next));
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ social: next }),
      });
      if (res.ok) {
        const result = await res.json();
        if (result.success && result.social) {
          setSocial(result.social);
          localStorage.setItem('nexus_dash_settings_social', JSON.stringify(result.social));
        }
      }
    } catch (err) {
      console.error('[updateSocialSettings] API error:', err);
    }
  };

  const updateThemeSettings = (data: Partial<ThemeSettings>) => {
    const next = { ...themeSettings, ...data };
    setThemeSettings(next);
    localStorage.setItem('nexus_dash_settings_theme', JSON.stringify(next));
    applyThemeToDOM(next);
  };

  const updateEstimatorConfig = async (config: Partial<EstimatorConfig>, skipApiCall = false) => {
    const next: EstimatorConfig = {
      basePrices: {
        webapp: 45000,
        dashboard: 55000,
        ecommerce: 50000,
        corporate: 35000,
        ...estimatorConfig?.basePrices,
        ...(config.basePrices || {}),
      },
      featurePrices: {
        auth: 10000,
        payment: 15000,
        notification: 8000,
        export: 12000,
        ai: 25000,
        multilang: 9000,
        ...estimatorConfig?.featurePrices,
        ...(config.featurePrices || {}),
      },
      customProjectTypes: config.customProjectTypes ?? estimatorConfig?.customProjectTypes ?? [],
      speedMultiplier: config.speedMultiplier ?? estimatorConfig?.speedMultiplier ?? 1.25,
    };
    // Immediately update UI and localStorage
    setEstimatorConfig(next);
    localStorage.setItem('nexus_dash_estimator_config', JSON.stringify(next));
    if (skipApiCall) return; // Skip API when called from handleSaveEstimatorSettings (already saved)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estimatorConfig: next }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.estimatorConfig) {
          setEstimatorConfig(data.estimatorConfig);
          localStorage.setItem('nexus_dash_estimator_config', JSON.stringify(data.estimatorConfig));
        }
      }
    } catch (err) {
      console.error('[updateEstimatorConfig] API error:', err);
    }
  };

  const saveProjects = async (newProjects: ProjectItem[]) => {
    setProjects(newProjects);
    localStorage.setItem('nexus_dash_portfolio', JSON.stringify(newProjects));
    // Sync latest added or updated project
    if (newProjects.length > 0) {
      const topProj = newProjects[0];
      try {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(topProj),
        });
      } catch (err) {
        console.error('[saveProjects] API error:', err);
      }
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        site,
        contact,
        social,
        projects,
        themeSettings,
        estimatorConfig,
        updateSiteSettings,
        updateContactSettings,
        updateSocialSettings,
        updateThemeSettings,
        updateEstimatorConfig,
        saveProjects,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
