'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/Frontend/components/Navbar';
import { Footer } from '@/Frontend/components/Footer';
import { TechTicker } from '@/Frontend/components/TechTicker';
import { ProjectModal } from '@/Frontend/components/ProjectModal';
import { HeroTechBackground } from '@/Frontend/components/HeroTechBackground';
import { useLanguage } from '@/Frontend/context/LanguageContext';
import { useSettings } from '@/Frontend/context/SettingsContext';
import { ProjectItem } from '@/types';

export default function HomeView() {
  const { t } = useLanguage();
  const { site, projects } = useSettings();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <HeroTechBackground />
        <div className="container hero-container">
          <div className="badge-status">
            <span className={`status-dot ${site.availableStatus ? '' : 'status-dot-busy'}`}></span>
            <span>{site.availableStatus ? t.heroBadgeActive : t.heroBadgeBusy}</span>
          </div>

          <h1 className="hero-title">
            {site.heroTitle1 || t.heroTitle1} <br />
            <span className="text-gradient">{site.heroTitleGrad || t.heroTitleGrad}</span>
          </h1>

          <p className="hero-subtitle">
            {site.heroSubtitle || t.heroSubtitle}
          </p>

          <div className="hero-actions">
            <a href="#portfolio" className="btn btn-primary btn-lg">
              <i className="fa-solid fa-rocket"></i> {t.heroCtaWork}
            </a>
            <Link href="/estimator" className="btn btn-glass btn-lg">
              <i className="fa-solid fa-calculator"></i> {t.heroCtaEstimate}
            </Link>
          </div>

          {/* Trust Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-num">50+</div>
              <div className="metric-label">{t.stat3Label}</div>
            </div>
            <div className="metric-card">
              <div className="metric-num">99.4%</div>
              <div className="metric-label">{t.stat2Label}</div>
            </div>
            <div className="metric-card">
              <div className="metric-num">100%</div>
              <div className="metric-label">{t.stat1Label}</div>
            </div>
            <div className="metric-card">
              <div className="metric-num">&lt; 1s</div>
              <div className="metric-label">{t.stat4Label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Tech Stack Ticker */}
      <TechTicker />

      {/* Portfolio Section */}
      <section className="section portfolio-section" id="portfolio">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">{t.portfolioBadge}</span>
            <h2 className="section-title">
              {t.portfolioTitle} <span className="text-gradient">{t.portfolioTitleGrad}</span>
            </h2>
            <p className="section-desc">{t.portfolioDesc}</p>

            {/* Filter Tabs */}
            <div className="portfolio-filters" id="portfolioFilters">
              <button
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                {t.filterAll}
              </button>
              <button
                className={`filter-btn ${activeFilter === 'saas' ? 'active' : ''}`}
                onClick={() => setActiveFilter('saas')}
              >
                {t.filterSaas}
              </button>
              <button
                className={`filter-btn ${activeFilter === 'ecommerce' ? 'active' : ''}`}
                onClick={() => setActiveFilter('ecommerce')}
              >
                {t.filterEcommerce}
              </button>
              <button
                className={`filter-btn ${activeFilter === 'booking' ? 'active' : ''}`}
                onClick={() => setActiveFilter('booking')}
              >
                {t.filterBooking}
              </button>
              <button
                className={`filter-btn ${activeFilter === 'fintech' ? 'active' : ''}`}
                onClick={() => setActiveFilter('fintech')}
              >
                {t.filterFintech}
              </button>
            </div>
          </div>

          <div className="portfolio-grid" id="portfolioGrid">
            {filteredProjects.map((item) => (
              <div key={item.id} className="project-card" data-category={item.category} data-project={item.id}>
                <div className="project-img-wrapper">
                  <img src={item.image} alt={item.title} className="project-img" />
                  <div className="project-badge">{item.badge || 'Featured Work'}</div>
                  <div className="project-overlay">
                    <button
                      className="btn btn-sm btn-primary view-project-btn"
                      onClick={() => setSelectedProject(item)}
                    >
                      <i className="fa-solid fa-magnifying-glass-plus"></i> {t.viewCaseStudy}
                    </button>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-meta">
                    <span className="project-cat">{item.catLabel || item.category}</span>
                    <span className="project-kpi"><i className="fa-solid fa-chart-line"></i> {item.kpi}</span>
                  </div>
                  <h3 className="project-title">{item.title}</h3>
                  <p className="project-excerpt">{item.excerpt}</p>
                  <div className="project-tags">
                    {(item.tags || []).map((tag, idx) => (
                      <span key={idx}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">{t.servicesBadge}</span>
            <h2 className="section-title">
              {t.servicesTitle} <span className="text-gradient">{t.servicesTitleGrad}</span>
            </h2>
            <p className="section-desc">{t.servicesDesc}</p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon"><i className="fa-solid fa-laptop-code"></i></div>
              <h3 className="service-title">Custom Web Application</h3>
              <p className="service-desc">พัฒนาเว็บแอปพลิเคชันแบบกำหนดเองตามความต้องการทางธุรกิจ ประสิทธิภาพสูง โหลดเร็ว และรองรับผู้ใช้งานจำนวนมาก</p>
              <ul className="service-features">
                <li><i className="fa-solid fa-check"></i> ออกแบบ Responsive ทุกหน้าจอ</li>
                <li><i className="fa-solid fa-check"></i> High Performance &amp; Clean Code</li>
                <li><i className="fa-solid fa-check"></i> SEO &amp; Core Web Vitals สูงสุด</li>
              </ul>
            </div>

            <div className="service-card highlighted-service">
              <div className="popular-badge">ยอดนิยม</div>
              <div className="service-icon"><i className="fa-solid fa-chart-pie"></i></div>
              <h3 className="service-title">Enterprise Dashboard &amp; CRM</h3>
              <p className="service-desc">ระบบจัดการภายในองค์กร ระบบติดตามทีมขาย (CRM Pipeline), ระบบจัดการสต็อกสินค้า (ERP) และแดชบอร์ดสรุปสถิติผู้บริหาร</p>
              <ul className="service-features">
                <li><i className="fa-solid fa-check"></i> Real-time Analytics &amp; Export PDF/Excel</li>
                <li><i className="fa-solid fa-check"></i> จัดการสิทธิ์การเข้าถึง (Role-Based Access)</li>
                <li><i className="fa-solid fa-check"></i> ออกใบเสนอราคา / ใบกำกับภาษีในคลิกเดียว</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon"><i className="fa-solid fa-cart-shopping"></i></div>
              <h3 className="service-title">E-Commerce &amp; Booking System</h3>
              <p className="service-desc">ระบบร้านค้าออนไลน์และระบบจองบริการ จ่ายเงินง่าย เชื่อมต่อ PromptPay, บัตรเครดิต และแจ้งเตือนลูกค้าทาง LINE อัตโนมัติ</p>
              <ul className="service-features">
                <li><i className="fa-solid fa-check"></i> ระบบตัดสต็อกและจัดการออเดอร์</li>
                <li><i className="fa-solid fa-check"></i> Payment Gateway &amp; ใบเสร็จอัตโนมัติ</li>
                <li><i className="fa-solid fa-check"></i> ปฏิทินจองคิวและระบบนัดหมาย</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon"><i className="fa-solid fa-brain"></i></div>
              <h3 className="service-title">AI Integration &amp; Automation</h3>
              <p className="service-desc">ผสานระบบปัญญาประดิษฐ์ (AI Copilot / Chatbot) เข้ากับระบบของคุณ เพื่อช่วยตอบคำถาม สรุปข้อมูล และลดภาระงานซ้ำซ้อน</p>
              <ul className="service-features">
                <li><i className="fa-solid fa-check"></i> AI Chatbot เชื่อมต่อฐานข้อมูลธุรกิจ</li>
                <li><i className="fa-solid fa-check"></i> ระบบดึงและสรุปเอกสารอัตโนมัติ</li>
                <li><i className="fa-solid fa-check"></i> Cloud Setup &amp; Server Maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-badge">CLIENT REVIEWS</span>
            <h2 className="section-title">เสียงตอบรับจาก <span className="text-gradient">ลูกค้าผู้ร่วมงาน</span></h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="testimonial-text">&quot;ระบบแดชบอร์ดที่ทำให้ช่วยประหยัดเวลาประชุมผู้บริหารได้มหาศาล UI สวยมาก โหลดข้อมูลไว และทีมงานให้คำแนะนำเรื่องโครงสร้างระบบดีมากครับ&quot;</p>
              <div className="client-meta">
                <div className="client-avatar">ก</div>
                <div>
                  <div className="client-name">คุณกิตติศักดิ์ ว.</div>
                  <div className="client-role">Managing Director, LogisTech Solutions</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="testimonial-text">&quot;ระบบจองคิวคลินิกลดปัญหานัดซ้อนและช่วยลดภาระแอดมินตอบแชทได้เกิน 80% ลูกค้าชอบหน้าตาเว็บที่ดูสะอาดตาและใช้งานง่ายมาก&quot;</p>
              <div className="client-meta">
                <div className="client-avatar">พ</div>
                <div>
                  <div className="client-name">พญ. พิมพ์มาดา ช.</div>
                  <div className="client-role">Founder, Aura Aesthetic Clinic</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <p className="testimonial-text">&quot;ประทับใจความรับผิดชอบและส่งงานตรงเวลา งาน E-commerce ละเอียดมาก ระบบชำระเงินตัดผ่าน PromptPay แม่นยำ ยอดขายโตขึ้นทันตาเห็นครับ&quot;</p>
              <div className="client-meta">
                <div className="client-avatar">ธ</div>
                <div>
                  <div className="client-name">คุณธนภัทร ส.</div>
                  <div className="client-role">E-Commerce Brand Director</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="section cta-banner-section" style={{ padding: '60px 0', background: 'var(--bg-card)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title" style={{ fontSize: '2rem' }}>พร้อมยกระดับธุรกิจของคุณด้วย <span className="text-gradient">Web Application</span> หรือยัง?</h2>
          <p className="section-desc" style={{ maxWidth: '600px', margin: '15px auto 30px' }}>
            คำนวณราคางานเบื้องต้น หรือติดต่อขอรับใบเสนอราคาและคำปรึกษาจากทีมงานได้ฟรี
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/estimator" className="btn btn-glass btn-lg">
              <i className="fa-solid fa-calculator"></i> คำนวณราคาโปรเจ็กต์
            </Link>
            <Link href="/contact" className="btn btn-primary btn-lg">
              <i className="fa-solid fa-paper-plane"></i> ขอใบเสนอราคา
            </Link>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <Footer />
    </>
  );
}
