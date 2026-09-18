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
  presetId?: string;
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
      name: 'ระบบเร่งสปีดเว็บ 0.4s (Ultra Speed)',
      nameEn: 'Ultra Speed Tuning 0.4s',
      category: 'ความเร็วสูง',
      rarity: 'legendary',
      valueThb: 12000,
      promoCode: 'DEV888-TURBO-SPEED',
      icon: 'fa-solid fa-bolt-lightning',
      imageUrl: '/assets/images/prizes/prize_speed.png',
      description: 'จูนโครงสร้างระบบให้โหลดเร็วติดสปีด 0.4 วินาที พร้อมคะแนน Google Lighthouse เต็ม 100',
      highlightText: 'ปรับแต่งสปีดเว็บระดับ Enterprise มูลค่า ฿12,000 ฟรี',
    },
    {
      id: 'perk-line',
      name: 'ระบบแจ้งเตือน LINE OA & Rich Menu',
      nameEn: 'LINE OA Notification Hub',
      category: 'การเชื่อมต่อ',
      rarity: 'legendary',
      valueThb: 8500,
      promoCode: 'DEV888-LINE-NOTIFY',
      icon: 'fa-solid fa-comment-dots',
      imageUrl: '/assets/images/prizes/prize_line.png',
      description: 'ระบบแจ้งเตือนคำสั่งซื้อ ลูกค้าใหม่ และสถานะโปรเจกต์เข้า LINE Notify & Webhook อัตโนมัติ',
      highlightText: 'เชื่อมต่อระบบแจ้งเตือนเข้า LINE OA ฟรี มูลค่า ฿8,500',
    },
    {
      id: 'perk-ai',
      name: 'ระบบ AI แชทบอทอัจฉริยะ 24 ชม.',
      nameEn: 'AI Copilot Integration',
      category: 'โซลูชัน AI',
      rarity: 'legendary',
      valueThb: 18000,
      promoCode: 'DEV888-AI-ASSISTANT',
      icon: 'fa-solid fa-brain',
      imageUrl: '/assets/images/prizes/prize_ai.png',
      description: 'ติดตั้งระบบ AI ถาม-ตอบอัจฉริยะ ตอบคำถามลูกค้าจากฐานข้อมูลสินค้าของคุณตลอด 24 ชม.',
      highlightText: 'ระบบ AI ถามตอบอัจฉริยะมูลค่า ฿18,000 ฟรี',
    },
    {
      id: 'perk-discount',
      name: 'คูปองส่วนลดพัฒนาโปรเจกต์ 10%',
      nameEn: '10% Project Development Voucher',
      category: 'ส่วนลดพิเศษ',
      rarity: 'legendary',
      valueThb: 25000,
      promoCode: 'DEV888-VIP-10OFF',
      icon: 'fa-solid fa-tags',
      imageUrl: '/assets/images/prizes/prize_discount.png',
      description: 'รับส่วนลดค่าบริการออกแบบและพัฒนาซอฟต์แวร์ทันที 10% จากใบเสนอราคาจริง (สูงสุด ฿25,000)',
      highlightText: 'คูปองส่วนลดเงินสดสูงสุด ฿25,000 ฟรี',
    },
    {
      id: 'perk-qr',
      name: 'ระบบสแกนจ่าย PromptPay QR อัตโนมัติ',
      nameEn: 'PromptPay QR Automation',
      category: 'ระบบการเงิน',
      rarity: 'epic',
      valueThb: 9500,
      promoCode: 'DEV888-PROMPTPAY-QR',
      icon: 'fa-solid fa-qrcode',
      imageUrl: '/assets/images/prizes/prize_qr.png',
      description: 'สร้าง QR Code สลิปพร้อมเพย์ตรงตามยอดชำระอัตโนมัติ ตรวจสอบสลิปและปรับสถานะแบบ Real-Time',
      highlightText: 'เกตเวย์ PromptPay QR อัตโนมัติมูลค่า ฿9,500 ฟรี',
    },
    {
      id: 'perk-sla',
      name: 'แพ็กเกจดูแลเซิร์ฟเวอร์ & ประกัน 3 เดือน',
      nameEn: '3-Month Premium SLA Care',
      category: 'บริการดูแล',
      rarity: 'epic',
      valueThb: 15000,
      promoCode: 'DEV888-CARE-3M',
      icon: 'fa-solid fa-shield-heart',
      imageUrl: '/assets/images/prizes/prize_sla.png',
      description: 'ดูแลเซิร์ฟเวอร์ ตรวจสอบความปลอดภัย อัปเดตแพตช์ และสำรองข้อมูลฟรี 90 วันเต็มหลังส่งมอบงาน',
      highlightText: 'การรับประกันและดูแลระบบพรีเมียม 3 เดือน มูลค่า ฿15,000 ฟรี',
    },
    {
      id: 'perk-bi',
      name: 'ระบบส่งออกรายงาน PDF & Excel',
      nameEn: 'BI Report Engine',
      category: 'รายงานและสถิติ',
      rarity: 'epic',
      valueThb: 7500,
      promoCode: 'DEV888-REPORT-EXCEL',
      icon: 'fa-solid fa-file-invoice-dollar',
      imageUrl: '/assets/images/prizes/prize_bi.png',
      description: 'ระบบ Generate รายงานสรุปยอดขาย บัญชี และสถิติ เป็น PDF ฟอร์แมตสวยงามและ Excel ใน 1 คลิก',
      highlightText: 'ระบบส่งออกรายงานผู้บริหารมูลค่า ฿7,500 ฟรี',
    },
    {
      id: 'perk-domain',
      name: 'ฟรีโดเมน .COM & Cloudflare SSL 1 ปี',
      nameEn: 'Free .COM Domain & SSL',
      category: 'ความปลอดภัย',
      rarity: 'rare',
      valueThb: 2500,
      promoCode: 'DEV888-FREE-DOMAIN',
      icon: 'fa-solid fa-globe',
      imageUrl: '/assets/images/prizes/prize_domain.png',
      description: 'จดโดเมน .com หรือ .co.th มูลค่า 1 ปี พร้อมเชื่อมต่อ Cloudflare CDN Enterprise ป้องกันการโจมตี',
      highlightText: 'ฟรีค่าโดเมนและระบบรักษาความปลอดภัย 1 ปี มูลค่า ฿2,500',
    },
    {
      id: 'perk-seo',
      name: 'ระบบปรับแต่ง Technical SEO ติดหน้าแรก',
      nameEn: 'Technical SEO Suite',
      category: 'การตลาดออนไลน์',
      rarity: 'rare',
      valueThb: 6000,
      promoCode: 'DEV888-TURBO-SEO',
      icon: 'fa-solid fa-magnifying-glass-chart',
      imageUrl: '/assets/images/prizes/prize_seo.png',
      description: 'วางโครงสร้าง Schema.org, OpenGraph, Canonical URLs, Sitemap อัตโนมัติให้ติดหน้าแรก Google',
      highlightText: 'แพ็กเกจวางระบบ SEO เชิงเทคนิค มูลค่า ฿6,000 ฟรี',
    },
  ],
};

