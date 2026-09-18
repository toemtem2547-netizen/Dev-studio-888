'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'th' | 'en';

export const translations = {
  th: {
    langLabel: 'TH',
    navWork: 'ผลงาน (Work)',
    navServices: 'บริการ (Services)',
    navEstimator: 'คำนวณราคา',
    navLucky: '🎁 สุ่มรับฟังก์ชันฟรี',
    navProcess: 'กระบวนการ',
    navFaq: 'คำถามที่พบบ่อย',
    navContact: 'ติดต่อรับงาน',
    heroBadgeActive: 'เปิดรับโปรเจ็กต์ใหม่ (Available for Q4 Projects)',
    heroBadgeBusy: 'ปิดรับโปรเจ็กต์ชั่วคราว (Busy with Projects)',
    heroTitle1: 'เปลี่ยนไอเดียธุรกิจของคุณสู่',
    heroTitleGrad: 'Digital Product',
    heroSubtitle: 'ผู้เชี่ยวชาญด้านการพัฒนา Web Application, SaaS, E-Commerce และ Custom Software ที่ตอบโจทย์ธุรกิจ เน้น Performance สูง สวยงาม และเพิ่มยอดขายจริง',
    heroCtaEstimate: 'เริ่มคำนวณราคาโปรเจกต์',
    heroCtaWork: 'ดูตัวอย่างผลงานจริง',
    heroLuckyTitle: 'สุ่มรับฟังก์ชันฟรี (Lucky Vault)',
    heroLuckySub: 'หมุนวงล้อลุ้นรับระบบพรีเมียม มูลค่าสูงสุด ฿5,000 ฟรี!',
    stat1Label: 'ส่งมอบตรงเวลา',
    stat2Label: 'ความพึงพอใจลูกค้า',
    stat3Label: 'โปรเจ็กต์สำเร็จ',
    stat4Label: 'Page Load Speed',
    portfolioBadge: 'PORTFOLIO SHOWCASE',
    portfolioTitle: 'ผลงานที่ออกแบบเพื่อ',
    portfolioTitleGrad: 'สร้างผลลัพธ์จริง',
    portfolioDesc: 'ตัวอย่างผลงานที่ตอบโจทย์ทั้งความสวยงาม ความเร็ว และการเติบโตของธุรกิจ',
    filterAll: 'ทั้งหมด (All)',
    filterSaas: 'Enterprise SaaS & Dashboard',
    filterEcommerce: 'E-Commerce & Retail',
    filterBooking: 'Booking & Service',
    filterFintech: 'FinTech & Asset Tracker',
    viewCaseStudy: 'ดูรายละเอียด Case Study',
    servicesBadge: 'SERVICES & EXPERTISE',
    servicesTitle: 'บริการที่เราเชี่ยวชาญ',
    servicesTitleGrad: 'เพื่อขับเคลื่อนธุรกิจคุณ',
    servicesDesc: 'ครอบคลุมทุกมิติของการพัฒนาซอฟต์แวร์ ตั้งแต่วางแผน ออกแบบ จนถึงขึ้นระบบจริง',
    estimatorBadge: 'COST & TIMELINE ESTIMATOR',
    estimatorTitle: 'คำนวณงบประมาณและเวลาพัฒนา',
    estimatorTitleGrad: 'แบบ Real-Time',
    estimatorDesc: 'เลือกระบบ ฟังก์ชัน และสเกลงานที่คุณต้องการ เพื่อประเมินราคาและระยะเวลาการพัฒนาเบื้องต้นได้ทันที',
    contactBadge: 'GET IN TOUCH',
    contactTitle: 'พร้อมเริ่มสร้างโปรเจ็กต์ของคุณแล้วหรือยัง?',
    contactTitleGrad: 'ปรึกษาเราได้ทันที',
    contactDesc: 'กรอกข้อมูลรายละเอียดโปรเจ็กต์เบื้องต้น ทีมงานจะติดต่อกลับพร้อมแผนงานและใบเสนอราคาภายใน 24 ชม.',
    footerDesc: 'สตูดิโอรับพัฒนาเว็บแอปพลิเคชันระดับพรีเมียม ตอบโจทย์ทุกสเกลธุรกิจด้วยมาตรฐานระดับสากล',
    footerCopyright: 'สงวนลิขสิทธิ์ทุกประการ พัฒนาด้วยความประณีต',
    toastTh: '🇹🇭 สลับเป็นภาษาไทยเรียบร้อยแล้ว',
    toastEn: '🇬🇧 Switched to English successfully',
  },
  en: {
    langLabel: 'EN',
    navWork: 'Portfolio',
    navServices: 'Services',
    navEstimator: 'Cost Estimator',
    navLucky: '🎁 Lucky Perks',
    navProcess: 'Process',
    navFaq: 'FAQ',
    navContact: 'Contact Us',
    heroBadgeActive: 'Available for New Projects (Q4 Booking)',
    heroBadgeBusy: 'Currently Fully Booked',
    heroTitle1: 'Transforming Your Ideas into',
    heroTitleGrad: 'Digital Products',
    heroSubtitle: 'Bespoke Web Applications, SaaS platforms, E-Commerce engines, and enterprise solutions engineered for maximum speed, aesthetics, and measurable ROI.',
    heroCtaEstimate: 'Estimate Project Cost',
    heroCtaWork: 'View Live Case Studies',
    heroLuckyTitle: 'Lucky Vault (Win Free Perks)',
    heroLuckySub: 'Spin to unlock premium features up to ฿5,000 for free!',
    stat1Label: 'On-Time Delivery Rate',
    stat2Label: 'Client Satisfaction',
    stat3Label: 'Delivered Projects',
    stat4Label: 'Page Load Speed',
    portfolioBadge: 'PORTFOLIO SHOWCASE',
    portfolioTitle: 'Crafted to Deliver',
    portfolioTitleGrad: 'Real Business Impact',
    portfolioDesc: 'High-performance web applications engineered for speed, aesthetics, and measurable ROI.',
    filterAll: 'All Works',
    filterSaas: 'Enterprise SaaS & Dashboard',
    filterEcommerce: 'E-Commerce & Retail',
    filterBooking: 'Booking & Healthcare',
    filterFintech: 'FinTech & Real-Time Assets',
    viewCaseStudy: 'View Case Study Details',
    servicesBadge: 'SERVICES & EXPERTISE',
    servicesTitle: 'Engineering Capabilities',
    servicesTitleGrad: 'to Scale Your Business',
    servicesDesc: 'Comprehensive full-cycle capabilities spanning UX/UI design, scalable architecture, and cloud deployment.',
    estimatorBadge: 'COST & TIMELINE ESTIMATOR',
    estimatorTitle: 'Instant Project',
    estimatorTitleGrad: 'Cost Calculator',
    estimatorDesc: 'Select platform, modules, and delivery speed to get an instant transparent quote in real-time.',
    contactBadge: 'GET IN TOUCH',
    contactTitle: 'Ready to Bring Your Vision to Life?',
    contactTitleGrad: 'Let\'s Connect Today',
    contactDesc: 'Submit your requirements and our team will get back to you with a comprehensive roadmap within 24 hours.',
    footerDesc: 'Premium bespoke web application studio crafting enterprise-grade digital experiences.',
    footerCopyright: 'All rights reserved. Crafted with precision.',
    toastTh: '🇹🇭 สลับเป็นภาษาไทยเรียบร้อยแล้ว',
    toastEn: '🇬🇧 Switched to English successfully',
  },
};

interface LanguageContextType {
  lang: Language;
  t: typeof translations.th;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'th',
  t: translations.th,
  toggleLang: () => {},
  setLang: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('th');

  useEffect(() => {
    const saved = (localStorage.getItem('nexus_lang') as Language) || 'th';
    setLangState(saved);
    document.documentElement.setAttribute('lang', saved);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('nexus_lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
  };

  const toggleLang = () => {
    const next = lang === 'th' ? 'en' : 'th';
    setLang(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
