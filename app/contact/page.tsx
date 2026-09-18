import ContactView from '@/Frontend/views/ContactView';

export const metadata = {
  title: 'ติดต่อเรา — DEV STUDIO 888',
  description: 'ปรึกษาโปรเจกต์และติดต่อทีมวิศวกรซอฟต์แวร์ DEV STUDIO 888 พร้อมรับใบเสนอราคาและแผนงานภายใน 24 ชม.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'ติดต่อเรา — DEV STUDIO 888',
    description: 'ปรึกษาโปรเจกต์และติดต่อทีมวิศวกรซอฟต์แวร์ DEV STUDIO 888',
    url: 'https://devstudio888.com/contact',
  },
};

export default function ContactPage() {
  return <ContactView />;
}
