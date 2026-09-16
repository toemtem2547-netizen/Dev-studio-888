'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/Frontend/components/Navbar';
import { Footer } from '@/Frontend/components/Footer';
import { useSettings } from '@/Frontend/context/SettingsContext';
import type { EstimatorConfig } from '@/types';

export default function EstimatorView() {
  const router = useRouter();
  const { estimatorConfig: ctxConfig } = useSettings();

  // Always fetch fresh config from API on mount (so dashboard changes reflect immediately)
  const [liveConfig, setLiveConfig] = useState<EstimatorConfig | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && data.estimatorConfig) {
          setLiveConfig(data.estimatorConfig);
          // Update localStorage so future loads use fresh data
          localStorage.setItem('nexus_dash_estimator_config', JSON.stringify(data.estimatorConfig));
        }
      } catch {
        // Fallback to context data if API fails
      }
    };
    fetchConfig();
  }, []);

  // Use fresh API data, fall back to context data (from localStorage), then hardcoded defaults
  const estimatorConfig = liveConfig || ctxConfig;

  const [projectType, setProjectType] = useState<string>('webapp');
  const [features, setFeatures] = useState<string[]>([]);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'express'>('standard');

  const customProjectTypes = estimatorConfig?.customProjectTypes || [];

  const basePrices = estimatorConfig?.basePrices || {
    webapp: 45000,
    dashboard: 55000,
    ecommerce: 50000,
    corporate: 35000,
  };

  const featurePrices = estimatorConfig?.featurePrices || {
    auth: 10000,
    payment: 15000,
    notification: 8000,
    export: 12000,
    ai: 25000,
    multilang: 9000,
  };

  const speedMultiplier = estimatorConfig?.speedMultiplier || 1.25;

  const timelineWeeks: Record<string, { standard: string; express: string; multiplier: number }> = {
    webapp: { standard: '4-6', express: '2-3', multiplier: speedMultiplier },
    dashboard: { standard: '5-7', express: '3-4', multiplier: speedMultiplier },
    ecommerce: { standard: '4-6', express: '2-4', multiplier: speedMultiplier },
    corporate: { standard: '2-3', express: '1-2', multiplier: speedMultiplier },
  };

  const toggleFeature = (f: string) => setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const getBasePrice = (type: string): number => {
    if (basePrices[type] !== undefined) {
      return basePrices[type];
    }
    const custom = customProjectTypes.find(c => c.id === type);
    if (custom) return custom.price;
    return 45000;
  };

  const getProjectName = (type: string): string => {
    if (type === 'webapp') return 'Custom Web Application';
    if (type === 'dashboard') return 'Enterprise Dashboard & CRM';
    if (type === 'ecommerce') return 'E-Commerce & Booking';
    if (type === 'corporate') return 'Corporate Showcase Website';
    const custom = customProjectTypes.find(c => c.id === type);
    return custom ? custom.name : type;
  };

  // Calculate
  let total = getBasePrice(projectType);
  features.forEach(f => {
    total += (featurePrices[f as keyof typeof featurePrices] || 0);
  });
  if (timelineSpeed === 'express') {
    total = Math.round(total * (timelineWeeks[projectType]?.multiplier || speedMultiplier));
  }

  const weeks = timelineWeeks[projectType]?.[timelineSpeed] || (timelineSpeed === 'express' ? '2-4' : '4-6');

  const handleApplySpec = () => {
    sessionStorage.setItem('nexus_est_type', projectType);
    sessionStorage.setItem('nexus_est_price', total.toString());
    sessionStorage.setItem('nexus_est_weeks', weeks);
    sessionStorage.setItem('nexus_est_features', JSON.stringify(features));
    router.push('/contact');
  };

  return (
    <>
      <Navbar />

      {/* Subpage Header */}
      <header className="page-header" style={{ padding: '130px 0 35px', textAlign: 'center' }}>
        <div className="container">
          <div className="section-badge">
            <i className="fa-solid fa-wand-magic-sparkles" style={{ marginRight: '6px' }}></i>
            INTERACTIVE ESTIMATOR
          </div>
          <h1 className="hero-title" style={{ fontSize: '2.6rem', marginTop: '12px', letterSpacing: '-0.02em' }}>
            เครื่องคำนวณ <span className="text-gradient">ประเมินราคาโปรเจ็กต์</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: '14px auto 0', maxWidth: '620px', fontSize: '1rem', color: 'var(--text-muted)' }}>
            ปรับแต่งสเปกและเลือกฟังก์ชันที่ต้องการเพื่อประมาณการงบประมาณและกรอบเวลาพัฒนาเบื้องต้นแบบ Real-time
          </p>
        </div>
      </header>

      {/* Interactive Project Cost Estimator Section */}
      <section className="section estimator-section" id="estimator" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="estimator-container">
            {/* Step Form Controls */}
            <div className="estimator-form">
              {/* Section 1: Project Type */}
              <div className="estimator-group">
                <div className="group-header">
                  <span className="group-step-pill">01</span>
                  <div>
                    <label className="group-title">เลือกประเภทโปรเจ็กต์หลัก</label>
                    <span className="group-subtitle">เลือกรูปแบบสถาปัตยกรรมหลักของระบบที่คุณต้องการพัฒนา</span>
                  </div>
                </div>

                <div className="options-grid">
                  <label
                    className={`option-card ${projectType === 'webapp' ? 'active' : ''}`}
                    onClick={() => setProjectType('webapp')}
                  >
                    <input type="radio" name="projectType" value="webapp" checked={projectType === 'webapp'} readOnly />
                    <div className="option-content">
                      <div className="option-header-row">
                        <div className="option-icon"><i className="fa-solid fa-code"></i></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="option-price-tag">เริ่มต้น ฿{(basePrices.webapp ?? 45000).toLocaleString()}</span>
                          <div className="option-radio-dot"></div>
                        </div>
                      </div>
                      <div className="option-name">Custom Web Application</div>
                      <div className="option-sub">ระบบเว็บแอปพลิเคชันเฉพาะทาง ออกแบบตามกระบวนการทำงานจริง</div>
                    </div>
                  </label>

                  <label
                    className={`option-card ${projectType === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setProjectType('dashboard')}
                  >
                    <input type="radio" name="projectType" value="dashboard" checked={projectType === 'dashboard'} readOnly />
                    <div className="option-content">
                      <div className="option-header-row">
                        <div className="option-icon"><i className="fa-solid fa-chart-pie"></i></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="option-price-tag">เริ่มต้น ฿{(basePrices.dashboard ?? 55000).toLocaleString()}</span>
                          <div className="option-radio-dot"></div>
                        </div>
                      </div>
                      <div className="option-name">Enterprise Dashboard &amp; CRM</div>
                      <div className="option-sub">แดชบอร์ดบริหาร สถิติเรียลไทม์ และระบบติดตามงานทีมขาย</div>
                    </div>
                  </label>

                  <label
                    className={`option-card ${projectType === 'ecommerce' ? 'active' : ''}`}
                    onClick={() => setProjectType('ecommerce')}
                  >
                    <input type="radio" name="projectType" value="ecommerce" checked={projectType === 'ecommerce'} readOnly />
                    <div className="option-content">
                      <div className="option-header-row">
                        <div className="option-icon"><i className="fa-solid fa-cart-shopping"></i></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="option-price-tag">เริ่มต้น ฿{(basePrices.ecommerce ?? 50000).toLocaleString()}</span>
                          <div className="option-radio-dot"></div>
                        </div>
                      </div>
                      <div className="option-name">E-Commerce &amp; Booking</div>
                      <div className="option-sub">ร้านค้าออนไลน์ ตะกร้าสินค้า และระบบนัดหมายจองบริการ</div>
                    </div>
                  </label>

                  <label
                    className={`option-card ${projectType === 'corporate' ? 'active' : ''}`}
                    onClick={() => setProjectType('corporate')}
                  >
                    <input type="radio" name="projectType" value="corporate" checked={projectType === 'corporate'} readOnly />
                    <div className="option-content">
                      <div className="option-header-row">
                        <div className="option-icon"><i className="fa-solid fa-globe"></i></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="option-price-tag">เริ่มต้น ฿{(basePrices.corporate ?? 35000).toLocaleString()}</span>
                          <div className="option-radio-dot"></div>
                        </div>
                      </div>
                      <div className="option-name">Corporate Showcase Website</div>
                      <div className="option-sub">เว็บไซต์ภาพลักษณ์องค์กรระดับพรีเมียม โหลดเร็ว รองรับ SEO</div>
                    </div>
                  </label>

                  {customProjectTypes.map((custom) => {
                    const colorStyles: Record<string, { color: string; bg: string }> = {
                      blue: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.12)' },
                      purple: { color: '#8B5CF6', bg: 'rgba(139, 92, 246, 0.12)' },
                      emerald: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)' },
                      amber: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)' },
                      rose: { color: '#F43F5E', bg: 'rgba(244, 63, 94, 0.12)' },
                      cyan: { color: '#06B6D4', bg: 'rgba(6, 182, 212, 0.12)' },
                    };
                    const cStyle = colorStyles[custom.color] || colorStyles.blue;
                    const isSelected = projectType === custom.id;
                    return (
                      <label
                        key={custom.id}
                        className={`option-card ${isSelected ? 'active' : ''}`}
                        onClick={() => setProjectType(custom.id)}
                      >
                        <input type="radio" name="projectType" value={custom.id} checked={isSelected} readOnly />
                        <div className="option-content">
                          <div className="option-header-row">
                            <div className="option-icon" style={{ color: cStyle.color, background: cStyle.bg }}>
                              <i className={`fa-solid ${custom.icon || 'fa-cubes'}`}></i>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span className="option-price-tag">เริ่มต้น ฿{(custom.price || 0).toLocaleString()}</span>
                              <div className="option-radio-dot"></div>
                            </div>
                          </div>
                          <div className="option-name">{custom.name}</div>
                          <div className="option-sub">{custom.desc || `เริ่มต้น ฿${(custom.price || 0).toLocaleString()}`}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Features Add-ons */}
              <div className="estimator-group">
                <div className="group-header">
                  <span className="group-step-pill">02</span>
                  <div>
                    <label className="group-title">ฟังก์ชันเสริมที่ต้องการ</label>
                    <span className="group-subtitle">เลือกโมดูลเพิ่มเติมที่ต้องการผสานเข้ากับระบบ (เลือกได้หลายข้อ)</span>
                  </div>
                </div>

                <div className="features-checklist">
                  {[
                    {
                      id: 'auth',
                      icon: 'fa-shield-halved',
                      label: 'ระบบสมาชิก & สิทธิ์การใช้งาน',
                      desc: 'Auth, Login, Role-Based Permissions (RBAC)',
                      price: '+10,000 ฿'
                    },
                    {
                      id: 'payment',
                      icon: 'fa-credit-card',
                      label: 'ระบบชำระเงินอัตโนมัติ',
                      desc: 'PromptPay QR, Credit Card, ใบเสร็จอัตโนมัติ',
                      price: '+15,000 ฿'
                    },
                    {
                      id: 'notification',
                      icon: 'fa-bell',
                      label: 'ระบบแจ้งเตือนอัตโนมัติ',
                      desc: 'LINE Official Account, Email, SMS Notify',
                      price: '+8,000 ฿'
                    },
                    {
                      id: 'export',
                      icon: 'fa-file-excel',
                      label: 'ระบบออกเอกสาร PDF & Excel',
                      desc: 'พิมพ์ใบเสนอราคา, ใบแจ้งหนี้, Export รายงาน',
                      price: '+12,000 ฿'
                    },
                    {
                      id: 'ai',
                      icon: 'fa-robot',
                      label: 'AI Copilot & Smart Chatbot',
                      desc: 'ระบบผู้ช่วย AI วิเคราะห์ข้อมูลและตอบลูกค้า 24/7',
                      price: '+25,000 ฿'
                    },
                    {
                      id: 'multilang',
                      icon: 'fa-language',
                      label: 'รองรับหลายภาษา (Multi-language)',
                      desc: 'สลับภาษา TH, EN, CN พร้อมระบบจัดการคำแปล',
                      price: '+9,000 ฿'
                    }
                  ].map((item) => {
                    const isSelected = features.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`feature-checkbox ${isSelected ? 'active checked' : ''}`}
                        onClick={() => toggleFeature(item.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            toggleFeature(item.id);
                          }
                        }}
                      >
                        <input
                          type="checkbox"
                          name="features"
                          value={item.id}
                          checked={isSelected}
                          readOnly
                          tabIndex={-1}
                          style={{ pointerEvents: 'none' }}
                        />
                        <div className="feature-icon-box">
                          <i className={`fa-solid ${item.icon}`}></i>
                        </div>
                        <div className="feature-info">
                          <span className="feature-label">{item.label}</span>
                          <span className="feature-desc">{item.desc}</span>
                        </div>
                        <span className="feature-tag">
                          +{(featurePrices[item.id as keyof typeof featurePrices] || 0).toLocaleString()} ฿
                        </span>
                        <div className="custom-check">
                          <i className="fa-solid fa-check"></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 3: Timeline Speed */}
              <div className="estimator-group">
                <div className="group-header">
                  <span className="group-step-pill">03</span>
                  <div>
                    <label className="group-title">ความเร่งด่วนของโปรเจ็กต์</label>
                    <span className="group-subtitle">เลือกกำหนดการที่สอดคล้องกับแผนการเปิดตัวธุรกิจของคุณ</span>
                  </div>
                </div>

                <div className="timeline-speed-selector">
                  <label
                    className={`speed-option ${timelineSpeed === 'standard' ? 'active' : ''}`}
                    onClick={() => setTimelineSpeed('standard')}
                  >
                    <input type="radio" name="timelineSpeed" value="standard" checked={timelineSpeed === 'standard'} readOnly />
                    <div className="speed-content">
                      <div className="speed-icon"><i className="fa-solid fa-calendar"></i></div>
                      <div>
                        <span className="speed-title">ระยะเวลามาตรฐาน (Standard Delivery)</span>
                        <span className="speed-desc">การันตีคุณภาพ การทดสอบระบบครบถ้วนทุก Use-case</span>
                      </div>
                      <div className="option-radio-dot"></div>
                    </div>
                  </label>

                  <label
                    className={`speed-option ${timelineSpeed === 'express' ? 'active' : ''}`}
                    onClick={() => setTimelineSpeed('express')}
                  >
                    <input type="radio" name="timelineSpeed" value="express" checked={timelineSpeed === 'express'} readOnly />
                    <div className="speed-content">
                      <div className="speed-icon" style={{ color: '#F59E0B', background: 'rgba(245, 158, 11, 0.1)' }}>
                        <i className="fa-solid fa-bolt"></i>
                      </div>
                      <div>
                        <span className="speed-title">เร่งด่วนพิเศษ (Express Fast-Track)</span>
                        <span className="speed-desc">เพิ่มทรัพยากรทีมวิศวกรเพื่อส่งมอบงานเร็วขึ้น 40%</span>
                      </div>
                      <div className="option-radio-dot"></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Estimator Summary Card (Sticky) */}
            <div className="estimator-summary-card">
              <div className="summary-header">
                <div className="summary-title-wrap">
                  <i className="fa-solid fa-receipt"></i>
                  <h3>สรุปการประเมินราคา</h3>
                </div>
                <span className="estimate-badge">โดยประมาณ</span>
              </div>

              <div className="summary-price-box">
                <span className="price-label">งบประมาณประเมิน</span>
                <div className="price-val">
                  <span id="estimatedPrice">{total.toLocaleString()}</span>
                  <span className="currency">บาท (THB)</span>
                </div>
                <div className="timeline-val">
                  <i className="fa-regular fa-clock"></i>
                  <span>ระยะเวลาพัฒนา: <strong id="estimatedWeeks">{weeks}</strong> สัปดาห์</span>
                </div>
              </div>

              <div className="summary-breakdown">
                <h4>สิ่งที่คุณจะได้รับพร้อมส่งมอบ:</h4>
                <ul className="breakdown-list" id="breakdownList">
                  <li><i className="fa-solid fa-circle-check"></i> <span>{getProjectName(projectType)}</span></li>
                  <li><i className="fa-solid fa-circle-check"></i> <span>UI/UX Design ระดับพรีเมียม (Figma)</span></li>
                  <li><i className="fa-solid fa-circle-check"></i> <span>สิทธิ์ความเป็นเจ้าของ Source Code 100%</span></li>
                  <li><i className="fa-solid fa-circle-check"></i> <span>รับประกันดูแลระบบฟรี 1 ปีเต็ม</span></li>
                  <li><i className="fa-solid fa-circle-check"></i> <span>ติดตั้งขึ้น Cloud พร้อมใช้งานทันที</span></li>
                </ul>
              </div>

              <button
                className="btn btn-primary btn-block btn-apply-spec"
                id="btnApplySpec"
                onClick={handleApplySpec}
              >
                <i className="fa-solid fa-paper-plane"></i>
                <span>ใช้สเปกนี้เพื่อขอใบเสนอราคา</span>
              </button>

              <p className="summary-note">
                <i className="fa-solid fa-shield-halved"></i>
                <span>ไม่มีข้อผูกมัด สามารถปรับแต่งสเปกตามงบประมาณจริงได้</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
