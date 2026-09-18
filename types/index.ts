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
  images?: string[];
  tags: string[];
  client?: string;
  duration?: string;
  liveUrl?: string;
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

export interface PerkPrize {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  rarity: 'legendary' | 'epic' | 'rare';
  valueThb: number;
  promoCode: string;
  icon: string;
  imageUrl?: string;
  description: string;
  highlightText?: string;
}

export interface LuckyConfig {
  prizes: PerkPrize[];
  dropRates: {
    legendary: number;
    epic: number;
    rare: number;
  };
  spinDuration: number;
  dailyFreeSpins: number;
  enabled: boolean;
}

export const DEFAULT_LUCKY_CONFIG: LuckyConfig = {
  enabled: true,
  spinDuration: 3800,
  dailyFreeSpins: 1,
  dropRates: {
    legendary: 18,
    epic: 37,
    rare: 45,
  },
  prizes: [
    {
      id: 'perk-speed',
      name: 'Ultra Speed 0.4s & Core Web Vitals 100',
      nameEn: 'Ultra Speed Tuning 0.4s',
      category: 'Performance',
      rarity: 'legendary',
      valueThb: 12000,
      promoCode: 'DEV888-TURBO-SPEED',
      icon: 'fa-solid fa-bolt-lightning',
      description: 'จูนโครงสร้างระบบให้โหลดเร็วติดสปีด 0.4s พร้อมคะแนน Google Lighthouse 98-100 เต็ม',
      highlightText: 'แถมฟรีปรับแต่ง Performance ระดับ Enterprise มูลค่า ฿12,000',
    },
    {
      id: 'perk-line',
      name: 'LINE OA Auto Alert & Rich Menu พรีเมียม',
      nameEn: 'LINE OA Notification Hub',
      category: 'Integration',
      rarity: 'legendary',
      valueThb: 8500,
      promoCode: 'DEV888-LINE-NOTIFY',
      icon: 'fa-solid fa-comment-dots',
      description: 'ระบบแจ้งเตือนคำสั่งซื้อ / ลูกค้าใหม่ / สถานะโปรเจกต์เข้า LINE Notify & Webhook อัตโนมัติ',
      highlightText: 'เชื่อมต่อระบบแจ้งเตือนเข้า LINE OA ฟรี มูลค่า ฿8,500',
    },
    {
      id: 'perk-ai',
      name: 'AI Smart Chatbot & Knowledge Base',
      nameEn: 'AI Copilot Integration',
      category: 'AI Solution',
      rarity: 'legendary',
      valueThb: 18000,
      promoCode: 'DEV888-AI-ASSISTANT',
      icon: 'fa-solid fa-brain',
      description: 'ติดตั้งระบบ AI ถาม-ตอบอัจฉริยะ ตอบคำถามลูกค้าจากฐานข้อมูลสินค้าของคุณตลอด 24 ชม.',
      highlightText: 'ระบบ AI ถามตอบอัจฉริยะมูลค่า ฿18,000 ฟรี',
    },
    {
      id: 'perk-discount',
      name: 'ส่วนลดค่าพัฒนาโปรเจกต์ 10% (สูงสุด ฿25,000)',
      nameEn: '10% Project Development Voucher',
      category: 'Special Discount',
      rarity: 'legendary',
      valueThb: 25000,
      promoCode: 'DEV888-VIP-10OFF',
      icon: 'fa-solid fa-tags',
      description: 'รับส่วนลดค่าบริการออกแบบและพัฒนาซอฟต์แวร์ทันที 10% จากใบเสนอราคาจริง',
      highlightText: 'คูปองส่วนลดเงินสดสูงสุด ฿25,000',
    },
    {
      id: 'perk-qr',
      name: 'PromptPay QR Automated Payment Gateway',
      nameEn: 'PromptPay QR Automation',
      category: 'Fintech',
      rarity: 'epic',
      valueThb: 9500,
      promoCode: 'DEV888-PROMPTPAY-QR',
      icon: 'fa-solid fa-qrcode',
      description: 'สร้าง QR Code สลิปพร้อมเพย์ตรงตามยอดชำระอัตโนมัติ เช็คสลิปและปรับสถานะแบบ Real-Time',
      highlightText: 'เกตเวย์ PromptPay อัตโนมัติมูลค่า ฿9,500 ฟรี',
    },
    {
      id: 'perk-sla',
      name: '3-Month SLA & Server Maintenance Guarantee',
      nameEn: '3-Month Premium SLA Care',
      category: 'Support',
      rarity: 'epic',
      valueThb: 15000,
      promoCode: 'DEV888-CARE-3M',
      icon: 'fa-solid fa-shield-heart',
      description: 'ดูแลระบบ ตรวจสอบความปลอดภัย อัปเดตแพตช์ และกู้คืนข้อมูลสำรองฟรี 90 วันเต็มหลังส่งมอบงาน',
      highlightText: 'การรับประกันและดูแลระบบพรีเมียม 3 เดือน มูลค่า ฿15,000',
    },
    {
      id: 'perk-bi',
      name: 'Executive PDF & Excel Export Engine',
      nameEn: 'BI Report Engine',
      category: 'Analytics',
      rarity: 'epic',
      valueThb: 7500,
      promoCode: 'DEV888-REPORT-EXCEL',
      icon: 'fa-solid fa-file-invoice-dollar',
      description: 'ระบบ Generate รายงานสรุปยอดขาย บัญชี สถิติ เป็น PDF ฟอร์แมตสวยงามและ Excel ดาวน์โหลดได้ใน 1 คลิก',
      highlightText: 'ระบบส่งออกรายงานผู้บริหารมูลค่า ฿7,500 ฟรี',
    },
    {
      id: 'perk-domain',
      name: 'Free .COM Domain & Cloudflare SSL 1 ปี',
      nameEn: 'Free .COM Domain & SSL',
      category: 'Infrastructure',
      rarity: 'rare',
      valueThb: 2500,
      promoCode: 'DEV888-FREE-DOMAIN',
      icon: 'fa-solid fa-globe',
      description: 'จดโดเมน .com หรือ .co.th มูลค่า 1 ปี พร้อมเชื่อมต่อ Cloudflare CDN Enterprise ป้องกันการโจมตี',
      highlightText: 'ฟรีค่าโดเมนและระบบรักษาความปลอดภัย 1 ปี',
    },
    {
      id: 'perk-seo',
      name: 'Advanced Technical SEO & Rich Snippets',
      nameEn: 'Technical SEO Suite',
      category: 'Marketing',
      rarity: 'rare',
      valueThb: 6000,
      promoCode: 'DEV888-TURBO-SEO',
      icon: 'fa-solid fa-magnifying-glass-chart',
      description: 'วางโครงสร้าง Schema.org, OpenGraph, Canonical URLs, Sitemap อัตโนมัติให้ติดหน้าแรก Google',
      highlightText: 'แพ็กเกจวางระบบ SEO เชิงเทคนิค มูลค่า ฿6,000 ฟรี',
    },
  ],
};

