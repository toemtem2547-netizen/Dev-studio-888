import FAQView from '@/Frontend/views/FAQView';

export const metadata = {
  title: 'คำถามที่พบบ่อย (FAQ) — DEV STUDIO 888',
  description: 'คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับการพัฒนาซอฟต์แวร์และบริการของเรา',
  alternates: {
    canonical: '/faq',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'ระยะเวลาในการพัฒนาโปรเจกต์ใช้เวลานานแค่ไหน?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'โดยเฉลี่ยสำหรับเว็บไซต์บริษัทหรือ Landing Page จะใช้เวลาประมาณ 2-3 สัปดาห์ สำหรับระบบ Web Application หรือ E-Commerce จะอยู่ที่ประมาณ 4-8 สัปดาห์ ทั้งนี้ขึ้นอยู่กับความซับซ้อนของฟังก์ชันและ Scope งานที่ตกลงร่วมกัน',
      },
    },
    {
      '@type': 'Question',
      name: 'มีบริการดูแลและรับประกันหลังส่งมอบงานหรือไม่?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ทุกโปรเจกต์จะได้รับการรับประกัน (Warranty) ดูแลแก้ไขบั๊กฟรี 1 ปีเต็ม พร้อมบริการให้คำปรึกษา แนะนำการใช้งาน และมีแพ็กเกจดูแลระบบแบบ Maintenance รายปีหากต้องการพัฒนาฟีเจอร์เพิ่มเติมในอนาคต',
      },
    },
    {
      '@type': 'Question',
      name: 'เงื่อนไขการชำระเงินแบ่งจ่ายอย่างไร?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'เพื่อความสบายใจของลูกค้า เรามักแบ่งการชำระออกเป็น 3 หรือ 4 งวดตามความคืบหน้าของงาน (เช่น งวดที่ 1 มัดจำเริ่มงาน 30%, งวดที่ 2 หลังสรุปแบบ UI/UX 30%, งวดที่ 3 หลังทดสอบระบบ 30% และงวดสุดท้ายหลังขึ้นระบบจริง 10%)',
      },
    },
    {
      '@type': 'Question',
      name: 'ลูกค้าจะได้เป็นเจ้าของ Source Code หรือไม่?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ลูกค้าจะได้รับความเป็นเจ้าของ Source Code และทรัพย์สินทางปัญญาทั้งหมด 100% พร้อมคู่มือการติดตั้งและการเข้าถึงระบบ Cloud ทั้งหมดหลังการชำระเงินงวดสุดท้ายเสร็จสิ้น',
      },
    },
    {
      '@type': 'Question',
      name: 'หากต้องการแก้ไขหรือเพิ่มฟังก์ชันระหว่างพัฒนาทำได้หรือไม่?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'สามารถทำได้ครับ หากเป็นการปรับแก้เล็กน้อยใน Scope เดิม ทีมงานยินดีดำเนินการให้ฟรี แต่หากเป็นฟังก์ชันใหม่ที่มีความซับซ้อนเพิ่มเติม เราจะประเมินราคาและระยะเวลาส่วนเพิ่ม (Change Order) ให้พิจารณาก่อนเริ่มทำเสมอ',
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQView />
    </>
  );
}
