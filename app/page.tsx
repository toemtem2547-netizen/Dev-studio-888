import HomeView from '@/Frontend/views/HomeView';

export const metadata = {
  title: 'DEV STUDIO 888 — Web Application & SaaS Engineering Studio',
  description: 'ผู้เชี่ยวชาญด้านการพัฒนา Web Application, SaaS, E-Commerce และ Custom Software ระดับพรีเมียม ตอบโจทย์ทุกสเกลธุรกิจด้วยมาตรฐานระดับสากล',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DEV STUDIO 888 — Web Application & SaaS Engineering Studio',
    description: 'ผู้เชี่ยวชาญด้านการพัฒนา Web Application, SaaS, E-Commerce และ Custom Software ระดับพรีเมียม ตอบโจทย์ทุกสเกลธุรกิจ',
    url: 'https://devstudio888.com',
  },
};

export default function HomePage() {
  return <HomeView />;
}
