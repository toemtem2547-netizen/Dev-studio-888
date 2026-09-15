'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/Frontend/components/Navbar';
import { Footer } from '@/Frontend/components/Footer';

export default function ProcessView() {
  return (
    <>
      <Navbar />

      {/* Subpage Header */}
      <header className="page-header" style={{ padding: '140px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <span className="section-badge">WORKFLOW &amp; METHODOLOGY</span>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', marginTop: '10px' }}>
            ขั้นตอนการทำงานที่ <span className="text-gradient">โปร่งใส ตรงเวลา</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: '15px auto 0', maxWidth: '650px' }}>
            เราทำงานร่วมกับคุณในทุกขั้นตอนแบบ Agile เพื่อให้ผลงานออกมาตรงตามเป้าหมายทางธุรกิจอย่างราบรื่น
          </p>
        </div>
      </header>

      {/* Process Section */}
      <section className="section process-section" id="process" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="process-steps">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon"><i className="fa-solid fa-comments"></i></div>
              <h3 className="step-title">Requirement &amp; Strategy</h3>
              <p className="step-desc">รับฟังความต้องการ วิเคราะห์กลุ่มเป้าหมาย และวาง Scope งานรวมถึงสถาปัตยกรรมระบบให้ชัดเจนก่อนเริ่มพัฒนา</p>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon"><i className="fa-solid fa-pen-ruler"></i></div>
              <h3 className="step-title">UI/UX &amp; Interactive Prototype</h3>
              <p className="step-desc">ออกแบบหน้าตา (Figma Prototype) ให้ลูกค้าตรวจเช็กและอนุมัติ Flow การทำงานทั้งหมดก่อนเริ่มเขียนโค้ดจริง</p>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon"><i className="fa-solid fa-code"></i></div>
              <h3 className="step-title">Agile Development &amp; QA</h3>
              <p className="step-desc">พัฒนาด้วย Clean Code มีการอัปเดตความคืบหน้างานทุกสัปดาห์ พร้อมทดสอบบั๊กและความปลอดภัยอย่างเข้มงวด</p>
            </div>

            <div className="step-card">
              <div className="step-number">04</div>
              <div className="step-icon"><i className="fa-solid fa-rocket"></i></div>
              <h3 className="step-title">Deployment &amp; Warranty</h3>
              <p className="step-desc">ขึ้นระบบจริง (Live Deployment) ส่งมอบ Source Code จัดอบรมการใช้งาน พร้อมดูแลรับประกัน 1 ปีเต็ม</p>
            </div>
          </div>

          {/* Additional Process Commitments */}
          <div className="metrics-grid" style={{ marginTop: '60px' }}>
            <div className="metric-card">
              <div className="metric-num"><i className="fa-solid fa-shield-halved" style={{ color: 'var(--primary)' }}></i></div>
              <div className="metric-label" style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '8px' }}>การรับประกัน 1 ปีเต็ม</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>ดูแลและแก้ไขบั๊กโดยไม่มีค่าใช้จ่ายเพิ่มเติมตลอด 12 เดือน</p>
            </div>
            <div className="metric-card">
              <div className="metric-num"><i className="fa-solid fa-code-branch" style={{ color: 'var(--primary)' }}></i></div>
              <div className="metric-label" style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '8px' }}>Source Code 100%</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>เป็นเจ้าของสิทธิ์ในซอร์สโค้ดและระบบทั้งหมดเต็มรูปแบบ</p>
            </div>
            <div className="metric-card">
              <div className="metric-num"><i className="fa-solid fa-arrows-rotate" style={{ color: 'var(--primary)' }}></i></div>
              <div className="metric-label" style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '8px' }}>Weekly Update</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>รายงานความคืบหน้าและนำเสนองานเพื่อตรวจเช็กทุกสัปดาห์</p>
            </div>
            <div className="metric-card">
              <div className="metric-num"><i className="fa-solid fa-headset" style={{ color: 'var(--primary)' }}></i></div>
              <div className="metric-label" style={{ fontWeight: 600, color: 'var(--text-main)', marginTop: '8px' }}>Support 24/7</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>มีทีมงานดูแลระบบและพร้อมให้คำปรึกษาตลอดเวลา</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              <i className="fa-solid fa-paper-plane"></i> เริ่มต้นโปรเจ็กต์กับเรา
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
