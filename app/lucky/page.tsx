import LuckyView from '@/Frontend/views/LuckyView';

export const metadata = {
  title: '🎁 หมุนวงล้อสุ่มรับฟังก์ชันฟรี (Lucky Vault) — DEV STUDIO 888',
  description: 'สุ่มรับฟังก์ชันและระบบเสริมมูลค่าสูงสุด ฿5,000 ฟรี! ทั้ง Speed Tuning 0.4s, LINE OA Notification, PromptPay QR และส่วนลดพัฒนาโปรเจกต์',
  alternates: {
    canonical: '/lucky',
  },
  openGraph: {
    title: '🎁 หมุนวงล้อสุ่มรับฟังก์ชันฟรี (Lucky Vault) — DEV STUDIO 888',
    description: 'สุ่มรับฟังก์ชันและระบบเสริมมูลค่าสูงสุด ฿5,000 ฟรี! สิทธิพิเศษสำหรับลูกค้าใหม่และพาร์ทเนอร์',
    url: 'https://devstudio888.com/lucky',
  },
};

export default function LuckyPage() {
  return <LuckyView />;
}
