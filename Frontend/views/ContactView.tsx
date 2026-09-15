'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/Frontend/components/Navbar';
import { Footer } from '@/Frontend/components/Footer';
import { useSettings } from '@/Frontend/context/SettingsContext';

export default function ContactView() {
  const { contact } = useSettings();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectScope, setProjectScope] = useState('Custom Web Application');
  const [budgetRange, setBudgetRange] = useState('50k-100k');
  const [projectDetails, setProjectDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  useEffect(() => {
    // Check if coming from Estimator with prefilled values
    const estType = sessionStorage.getItem('nexus_est_type');
    const estPrice = sessionStorage.getItem('nexus_est_price');
    const estWeeks = sessionStorage.getItem('nexus_est_weeks');

    if (estType && estPrice) {
      const typeLabels: Record<string, string> = {
        webapp: 'Custom Web Application',
        dashboard: 'Enterprise Dashboard & CRM',
        ecommerce: 'E-Commerce & Booking',
        corporate: 'Corporate Showcase Website',
      };
      setProjectScope(typeLabels[estType] || 'Custom Web Application');
      setProjectDetails(`[สเปกจากระบบประเมินราคา]\n- ประเภท: ${typeLabels[estType] || estType}\n- ราคาประเมิน: ${parseInt(estPrice).toLocaleString()} บาท\n- ระยะเวลา: ${estWeeks} สัปดาห์`);
    }
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`คัดลอก "${text}" เรียบร้อยแล้ว`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    setSubmitting(true);

    const leadPayload = {
      name,
      phone,
      email,
      projectType: projectScope,
      budget: budgetRange,
      message: projectDetails,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });
      const data = await res.json();

      if (data.success && data.lead) {
        try {
          const existing = JSON.parse(localStorage.getItem('nexus_dash_leads') || '[]');
          existing.unshift(data.lead);
          localStorage.setItem('nexus_dash_leads', JSON.stringify(existing));
        } catch {}
      }
      triggerToast('ส่งข้อมูลสำเร็จ! ข้อมูลบันทึกเข้าสู่ระบบเรียบร้อยแล้ว');
      setName('');
      setPhone('');
      setEmail('');
      setProjectDetails('');
    } catch (err) {
      console.error('[ContactView.handleSubmit] Error:', err);
      // Fallback
      const fallbackLead = {
        id: 'lead-' + Date.now(),
        ...leadPayload,
        status: 'new' as const,
        date: new Date().toLocaleDateString('th-TH'),
      };
      try {
        const existing = JSON.parse(localStorage.getItem('nexus_dash_leads') || '[]');
        existing.unshift(fallbackLead);
        localStorage.setItem('nexus_dash_leads', JSON.stringify(existing));
      } catch {}
      triggerToast('ส่งข้อมูลสำเร็จ!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Toast */}
      {toastMsg && (
        <div className="toast show" id="toast">
          <i className="fa-solid fa-circle-check toast-icon"></i>
          <div className="toast-message" id="toastMessage">{toastMsg}</div>
        </div>
      )}

      {/* Subpage Header */}
      <header className="page-header" style={{ padding: '140px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <span className="section-badge">START A PROJECT</span>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', marginTop: '10px' }}>
            พร้อมร่วมงานกัน <span className="text-gradient">ติดต่อเราวันนี้</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: '15px auto 0', maxWidth: '650px' }}>
            บอกเล่าไอเดียของคุณ หรือขอใบเสนอราคาอย่างเป็นทางการ เราพร้อมให้คำปรึกษาฟรี ตอบกลับรวดเร็วภายใน 24 ชม.
          </p>
        </div>
      </header>

      {/* Contact Section */}
      <section className="section contact-section" id="contact" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info Side */}
            <div className="contact-info-card">
              <h3>ช่องทางติดต่อด่วน</h3>
              <p className="contact-intro">ยินดีพูดคุยและให้คำปรึกษาเบื้องต้นโดยไม่มีค่าใช้จ่าย ตอบกลับรวดเร็วภายใน 24 ชั่วโมง</p>

              <div className="contact-methods">
                <div className="method-item">
                  <div className="method-icon"><i className="fa-brands fa-line"></i></div>
                  <div className="method-detail">
                    <span className="method-title">LINE Official Account</span>
                    <span className="method-val">{contact.line || '@nexus888dev'}</span>
                  </div>
                  <button className="btn-copy" onClick={() => handleCopy(contact.line || '@nexus888dev')} title="คัดลอก">
                    <i className="fa-regular fa-copy"></i>
                  </button>
                </div>

                <div className="method-item">
                  <div className="method-icon"><i className="fa-solid fa-phone"></i></div>
                  <div className="method-detail">
                    <span className="method-title">เบอร์โทรศัพท์ติดต่อ</span>
                    <span className="method-val">{contact.phone || '088-888-8888'}</span>
                  </div>
                  <button className="btn-copy" onClick={() => handleCopy(contact.phone || '088-888-8888')} title="คัดลอก">
                    <i className="fa-regular fa-copy"></i>
                  </button>
                </div>

                <div className="method-item">
                  <div className="method-icon"><i className="fa-solid fa-envelope"></i></div>
                  <div className="method-detail">
                    <span className="method-title">อีเมลสำหรับส่งเอกสาร</span>
                    <span className="method-val">{contact.email || 'contact@nexus888.dev'}</span>
                  </div>
                  <button className="btn-copy" onClick={() => handleCopy(contact.email || 'contact@nexus888.dev')} title="คัดลอก">
                    <i className="fa-regular fa-copy"></i>
                  </button>
                </div>

                <div className="method-item">
                  <div className="method-icon"><i className="fa-solid fa-location-dot"></i></div>
                  <div className="method-detail">
                    <span className="method-title">ที่ตั้งสำนักงาน</span>
                    <span className="method-val">{contact.address || 'Bangkok, Thailand (รองรับ Remote ทั่วประเทศ)'}</span>
                  </div>
                </div>
              </div>

              <div className="consult-badge">
                <i className="fa-solid fa-calendar-check"></i>
                <div>
                  <strong>นัดหมาย Video Call</strong>
                  <span>สามารถขอนัดประชุมสรุปความต้องการผ่าน Google Meet / Zoom ได้ทันที</span>
                </div>
              </div>
            </div>

            {/* Contact Form Side */}
            <div className="contact-form-card">
              <form id="leadForm" className="lead-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="clientName">ชื่อผู้ติดต่อ / ชื่อบริษัท <span className="required">*</span></label>
                    <input
                      type="text"
                      id="clientName"
                      placeholder="เช่น คุณสมชาย (บริษัท นวัตกรรม จำกัด)"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="clientPhone">เบอร์โทรศัพท์ <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="clientPhone"
                      placeholder="เช่น 081-234-5678"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="clientEmail">อีเมล <span className="required">*</span></label>
                    <input
                      type="email"
                      id="clientEmail"
                      placeholder="name@company.com"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="projectScope">ประเภทงานที่สนใจ</label>
                    <select
                      id="projectScope"
                      value={projectScope}
                      onChange={e => setProjectScope(e.target.value)}
                    >
                      <option value="Custom Web Application">Custom Web Application</option>
                      <option value="Enterprise Dashboard &amp; CRM">Enterprise Dashboard &amp; CRM</option>
                      <option value="E-Commerce &amp; Booking">E-Commerce &amp; Booking</option>
                      <option value="Corporate Showcase Website">Corporate Showcase Website</option>
                      <option value="Other">ปรึกษาโปรเจ็กต์อื่นๆ</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="budgetRange">ช่วงงบประมาณที่วางไว้</label>
                  <select
                    id="budgetRange"
                    value={budgetRange}
                    onChange={e => setBudgetRange(e.target.value)}
                  >
                    <option value="30k-50k">30,000 - 50,000 บาท</option>
                    <option value="50k-100k">50,000 - 100,000 บาท</option>
                    <option value="100k-200k">100,000 - 200,000 บาท</option>
                    <option value="200k+">มากกว่า 200,000 บาทขึ้นไป</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="projectDetails">รายละเอียดโปรเจ็กต์ หรือฟังก์ชันที่ต้องการเบื้องต้น</label>
                  <textarea
                    id="projectDetails"
                    rows={5}
                    placeholder="บอกเล่าสิ่งที่คุณต้องการพัฒนา เช่น หน้าที่ต้องการ, ระบบหลังบ้าน, หรือแนบลิงก์ตัวอย่างที่ชอบ..."
                    value={projectDetails}
                    onChange={e => setProjectDetails(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-submit" id="submitBtn" disabled={submitting}>
                  {submitting ? (
                    <span className="btn-spinner" style={{ display: 'inline-block' }}>
                      <i className="fa-solid fa-circle-notch fa-spin"></i> กำลังส่งข้อมูล...
                    </span>
                  ) : (
                    <span className="btn-text">
                      <i className="fa-solid fa-paper-plane"></i> ส่งข้อมูลเพื่อขอรับใบเสนอราคา
                    </span>
                  )}
                </button>
                <p className="privacy-note">
                  <i className="fa-solid fa-lock"></i> ข้อมูลของคุณจะถูกเก็บเป็นความลับตามนโยบายความเป็นส่วนตัว
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
