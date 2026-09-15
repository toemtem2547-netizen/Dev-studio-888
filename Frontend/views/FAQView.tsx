'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/Frontend/components/Navbar';
import { Footer } from '@/Frontend/components/Footer';

export default function FAQView() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'ระยะเวลาในการพัฒนาโปรเจ็กต์ใช้เวลานานแค่ไหน?',
      a: 'โดยเฉลี่ยสำหรับเว็บไซต์บริษัทหรือ Landing Page จะใช้เวลาประมาณ 2-3 สัปดาห์ สำหรับระบบ Web Application หรือ E-Commerce จะอยู่ที่ประมาณ 4-8 สัปดาห์ ทั้งนี้ขึ้นอยู่กับความซับซ้อนของฟังก์ชันและ Scope งานที่ตกลงร่วมกัน',
    },
    {
      q: 'มีบริการดูแลและรับประกันหลังส่งมอบงานหรือไม่?',
      a: 'ทุกโปรเจ็กต์จะได้รับการรับประกัน (Warranty) ดูแลแก้ไขบั๊กฟรี 1 ปีเต็ม พร้อมบริการให้คำปรึกษา แนะนำการใช้งาน และมีแพ็กเกจดูแลระบบแบบ Maintenance รายปีหากต้องการพัฒนาฟีเจอร์เพิ่มเติมในอนาคต',
    },
    {
      q: 'เงื่อนไขการชำระเงินแบ่งจ่ายอย่างไร?',
      a: 'เพื่อความสบายใจของลูกค้า เรามักแบ่งการชำระออกเป็น 3 หรือ 4 งวดตามความคืบหน้าของงาน (เช่น งวดที่ 1 มัดจำเริ่มงาน 30%, งวดที่ 2 หลังสรุปแบบ UI/UX 30%, งวดที่ 3 หลังทดสอบระบบ 30% และงวดสุดท้ายหลังขึ้นระบบจริง 10%)',
    },
    {
      q: 'ลูกค้าจะได้เป็นเจ้าของ Source Code หรือไม่?',
      a: 'ลูกค้าจะได้รับความเป็นเจ้าของ Source Code และทรัพย์สินทางปัญญาทั้งหมด 100% พร้อมคู่มือการติดตั้งและการเข้าถึงระบบ Cloud ทั้งหมดหลังการชำระเงินงวดสุดท้ายเสร็จสิ้น',
    },
    {
      q: 'หากต้องการแก้ไขหรือเพิ่มฟังก์ชันระหว่างพัฒนาทำได้หรือไม่?',
      a: 'สามารถทำได้ครับ หากเป็นการปรับแก้เล็กน้อยใน Scope เดิม ทีมงานยินดีดำเนินการให้ฟรี แต่หากเป็นฟังก์ชันใหม่ที่มีความซับซ้อนเพิ่มเติม เราจะประเมินราคาและระยะเวลาส่วนเพิ่ม (Change Order) ให้พิจารณาก่อนเริ่มทำเสมอ',
    },
  ];

  return (
    <>
      <Navbar />

      {/* Subpage Header */}
      <header className="page-header" style={{ padding: '140px 0 40px', textAlign: 'center' }}>
        <div className="container">
          <span className="section-badge">FREQUENTLY ASKED QUESTIONS</span>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', marginTop: '10px' }}>
            คำถามที่ <span className="text-gradient">พบบ่อย</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: '15px auto 0', maxWidth: '650px' }}>
            รวบรวมข้อสงสัยและคำตอบสำคัญที่ลูกค้ามักสอบถามก่อนเริ่มงานพัฒนาระบบ
          </p>
        </div>
      </header>

      {/* FAQ Section */}
      <section className="section faq-section" id="faq" style={{ paddingTop: '20px' }}>
        <div className="container faq-container">
          <div className="accordion" id="faqAccordion">
            {faqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className={`accordion-item ${isOpen ? 'active' : ''}`}>
                  <button
                    className="accordion-header"
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                  <div
                    className="accordion-body"
                    style={{
                      maxHeight: isOpen ? '500px' : '0',
                      padding: isOpen ? '0 20px 20px' : '0 20px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>ยังมีข้อสงสัยเพิ่มเติมเกี่ยวกับโปรเจ็กต์ของคุณ?</p>
            <Link href="/contact" className="btn btn-primary">
              <i className="fa-solid fa-comments"></i> สอบถามทีมงานโดยตรง
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
