import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const INITIAL_PROJECTS = [
  {
    slug: 'nexus-analytics-platform',
    title: 'Nexus Executive Analytics & KPI Platform',
    category: 'saas',
    badge: 'Enterprise SaaS & Business Intelligence',
    kpi: '+180% ประสิทธิภาพการตัดสินใจ และลดเวลาทำรายงานลง 85%',
    img: '/assets/images/project_dashboard.jpg',
    excerpt: 'แพลตฟอร์มรวบรวมข้อมูลและรายงาน KPI ผู้บริหารระดับสูง เชื่อมต่อ ERP/CRM พร้อมรายงาน Real-time และ PDF Export',
    fullDesc: 'ระบบ Enterprise Dashboard สำหรับผู้บริหารระดับสูงที่รวมศูนย์ข้อมูลจากทุกแผนก (ERP, CRM, E-Commerce) แสดงผลวิเคราะห์ด้วย AI Insights กราฟเปรียบเทียบแบบ Interactive Real-Time พร้อมระบบส่งรายงานสรุปอัตโนมัติผ่าน Email/LINE ทุกเช้า',
    client: 'Apex Global Logistics Co., Ltd.',
    duration: '6 สัปดาห์ (ส่งมอบตรงเวลา 100%)',
    liveUrl: 'https://demo-analytics.nexusstudio888.com',
    featured: true,
    tags: JSON.stringify(['Next.js 14', 'TypeScript', 'Chart.js', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Redis Cache']),
    deliverables: JSON.stringify([
      'Executive KPI Dashboard พร้อมตัวกรอง Multi-dimension',
      'ระบบ Role-based Access Control (RBAC) สิทธิ์ 5 ระดับ',
      'Automated PDF & Excel Reporting Engine',
      'Real-time WebSocket Data Feeds',
      'Audit Trail Logs บันทึกประวัติการเข้าถึงข้อมูลตามมาตรฐาน PDPA',
    ]),
    stack: JSON.stringify(['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'TailwindCSS', 'Redis']),
  },
  {
    slug: 'axel-luxury-ecommerce',
    title: 'Axel & Co. Luxury Curated E-Commerce',
    category: 'ecommerce',
    badge: 'High-End Retail & Lifestyle Store',
    kpi: '+240% อัตราการแปลงเป็นยอดขาย (Conversion Rate) และคะแนนรีวิว 4.9/5',
    img: '/assets/images/project_ecommerce.jpg',
    excerpt: 'แพลตฟอร์ม E-Commerce ระดับพรีเมียม สถาปัตยกรรม Headless พร้อมระบบจัดการสต็อกและ PromptPay QR อัตโนมัติ',
    fullDesc: 'ร้านค้าออนไลน์ระดับ Luxury แบรนด์เนม ออกแบบด้วยแนวคิด Minimalist High-End รองรับการชำระเงินครบวงจร (Credit Card, PromptPay QR, 0% Installment) ระบบคำนวณค่าส่งอัจฉริยะ และการจัดการสต็อกแบบ Multi-Warehouse แบบเรียลไทม์',
    client: 'Axel Lifestyle Group',
    duration: '5 สัปดาห์',
    liveUrl: 'https://demo-store.nexusstudio888.com',
    featured: true,
    tags: JSON.stringify(['React.js', 'Tailwind CSS', 'Node.js', 'Stripe API', 'PromptPay Gateway', 'Redis Cart']),
    deliverables: JSON.stringify([
      'Modern Headless Storefront โหลดหน้าเร็ว < 0.6 วินาที',
      'Seamless Checkout Flow (PromptPay QR, Credit Card, TrueMoney)',
      'ระบบตัดสต็อก Real-Time ป้องกันยอดขายเกิน (Oversell Prevention)',
      'Member VIP Tier & Reward Points System',
      'Admin Inventory & Order Management Portal',
    ]),
    stack: JSON.stringify(['React', 'Node.js', 'Stripe', 'PromptPay Gateway', 'Redis', 'PostgreSQL']),
  },
  {
    slug: 'aura-clinic-booking',
    title: 'Aura Clinic & Specialist Appointment Hub',
    category: 'booking',
    badge: 'Medical Clinic & Specialist Booking Platform',
    kpi: 'ลดอัตราการเบี้ยวนัด (No-Show) ลง 92% และลดภาระงานแอดมินกว่า 70%',
    img: '/assets/images/project_booking.jpg',
    excerpt: 'ระบบนัดหมายแพทย์และบริการความงาม Interactive Calendar เชื่อมต่อ LINE Official แจ้งเตือนอัตโนมัติ 24 ชม.',
    fullDesc: 'แพลตฟอร์มจองคิวออนไลน์สำหรับคลินิกเวชกรรมความงาม 8 สาขา ให้ลูกค้าเลือกแพทย์ สาขา บริการ และช่วงเวลาว่างได้แบบเรียลไทม์ พร้อมชำระเงินมัดจำและรับการแจ้งเตือนใบนัดอัตโนมัติผ่าน LINE OA',
    client: 'Aura Aesthetic Clinic Chain',
    duration: '4 สัปดาห์',
    liveUrl: 'https://demo-booking.nexusstudio888.com',
    featured: true,
    tags: JSON.stringify(['Next.js', 'FullCalendar API', 'Node.js', 'LINE Messaging API', 'PostgreSQL', 'Twilio SMS']),
    deliverables: JSON.stringify([
      'Interactive Smart Calendar จองคิวได้ 24/7',
      'LINE OA Webhook Automated Notification & Reminder',
      'Doctor Schedule & Room Allocation Manager',
      'Deposit Payment & Slip Verification Automation',
      'Customer Treatment History & E-Consent Form',
    ]),
    stack: JSON.stringify(['Next.js', 'TypeScript', 'LINE API', 'PostgreSQL', 'Twilio', 'Node.js']),
  },
  {
    slug: 'nexus-wealth-crypto-tracker',
    title: 'Nexus Wealth & Crypto Portfolio Tracker',
    category: 'fintech',
    badge: 'FinTech & Real-Time Asset Management Platform',
    kpi: 'รองรับการส่งข้อมูล Real-time กว่า 10,000 TPS โดยมีความหน่วงต่ำกว่า 50ms',
    img: '/assets/images/project_fintech.jpg',
    excerpt: 'เว็บแอปพลิเคชันพอร์ตสินทรัพย์ดิจิทัล เชื่อมต่อ WebSocket สด พร้อมกราฟเทคนิคัลระดับสูง TradingView',
    fullDesc: 'ระบบบริหารพอร์ตการลงทุนสินทรัพย์ดิจิทัลและกองทุนรวมแบบเรียลไทม์ ดึงข้อมูลราคาจากหลายศูนย์ซื้อขายระดับโลก คำนวณกำไร/ขาดทุน (P&L) อัตโนมัติ พร้อมระบบตั้ง Alert เตือนราคาหลุดแนวรับ/ต้านผ่าน Telegram และ LINE',
    client: 'QuantEdge Capital',
    duration: '6 สัปดาห์',
    liveUrl: 'https://demo-fintech.nexusstudio888.com',
    featured: true,
    tags: JSON.stringify(['TypeScript', 'WebSockets', 'TradingView Lightweight Charts', 'Node.js Microservices', 'PostgreSQL', 'Docker']),
    deliverables: JSON.stringify([
      'TradingView High-Performance Financial Charts',
      'Low-latency WebSocket Live Price Streamer',
      'Automated P&L, ROI and Risk Analytics Calculator',
      'Multi-currency Fiat/Crypto Conversion Engine',
      'Telegram & LINE Instant Price Alert Bots',
    ]),
    stack: JSON.stringify(['TypeScript', 'WebSockets', 'TradingView', 'Docker', 'PostgreSQL', 'Node.js']),
  },
];

async function main() {
  console.log('Seeding database...');

  // 1. Seed Site Settings
  await prisma.setting.upsert({
    where: { id: 'site-config' },
    update: {},
    create: {
      id: 'site-config',
      siteName: 'DEV STUDIO 888',
      siteTagline: 'Web Application & SaaS Engineering Studio',
      siteDesc: 'ผู้เชี่ยวชาญด้านการพัฒนา Web Application, SaaS, E-Commerce และ Custom Software ระดับพรีเมียม ตอบโจทย์ทุกสเกลธุรกิจด้วยมาตรฐานระดับสากล',
      siteTechStack: 'Next.js 15, React 19, TypeScript, Python & AI, Node.js, Docker, AWS, PostgreSQL, Supabase, Redis',
      email: 'contact@nexusstudio888.com',
      phone: '088-888-8888',
      line: '@nexus888',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com',
      themePrimary: '#2563EB',
      themeSecondary: '#7C3AED',
      themePreset: 'sapphire',
    },
  });

  // 2. Seed Admin User
  await prisma.adminUser.upsert({
    where: { email: 'admin@nexus888.com' },
    update: {},
    create: {
      email: 'admin@nexus888.com',
      password: 'nexus@admin888',
      name: 'Super Admin',
      role: 'superadmin',
    },
  });

  // 3. Seed Projects
  for (const proj of INITIAL_PROJECTS) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: proj,
      create: proj,
    });
  }

  // 4. Seed Initial Leads
  const initialLeads = [
    {
      id: 'lead-001',
      name: 'คุณวรเมธ เกียรติสกุล',
      email: 'worameth.k@techinnovate.co.th',
      phone: '089-123-4567',
      projectType: 'Enterprise Dashboard & CRM',
      budget: '85,000 ฿',
      message: 'ต้องการพัฒนาระบบแดชบอร์ดบริหารจัดการทีมขาย 50 คน พร้อมระบบแจ้งเตือน LINE Notify และพิมพ์ใบเสนอราคา PDF อัตโนมัติ',
      date: '14/09/2026, 14:30',
      status: 'new',
      estimateDetails: JSON.stringify({
        type: 'dashboard',
        weeks: '5-7 สัปดาห์',
        features: ['auth', 'notification', 'export'],
      }),
    },
    {
      id: 'lead-002',
      name: 'คุณชลธิชา สิทธิการัณย์',
      email: 'cholticha.s@glamcurated.com',
      phone: '081-987-6543',
      projectType: 'E-Commerce & Booking',
      budget: '120,000 ฿',
      message: 'โปรเจกต์เว็บร้านค้าแฟชั่นระดับพรีเมียม สถาปัตยกรรม Headless พร้อมระบบตัดบัตรเครดิตและ PromptPay QR อัตโนมัติ',
      date: '13/09/2026, 09:15',
      status: 'contacted',
      estimateDetails: JSON.stringify({
        type: 'ecommerce',
        weeks: '4-6 สัปดาห์',
        features: ['auth', 'payment', 'notification', 'multilang'],
      }),
    },
    {
      id: 'lead-003',
      name: 'Dr. Arthur Pendelton',
      email: 'arthur.p@singapore-medtech.io',
      phone: '+65 9123 4567',
      projectType: 'Custom Web Application',
      budget: '185,000 ฿',
      message: 'Looking for a high-performance Web App with AI Chatbot copilot integration and multi-lingual capability (TH/EN/CN).',
      date: '12/09/2026, 17:40',
      status: 'closed',
      estimateDetails: JSON.stringify({
        type: 'webapp',
        weeks: '6-8 สัปดาห์',
        features: ['auth', 'payment', 'export', 'ai', 'multilang'],
      }),
    },
  ];

  for (const lead of initialLeads) {
    await prisma.lead.upsert({
      where: { id: lead.id },
      update: lead,
      create: lead,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
