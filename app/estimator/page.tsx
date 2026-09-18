import EstimatorView from '@/Frontend/views/EstimatorView';

export const metadata = {
  title: 'ระบบประเมินราคาโปรเจกต์อัจฉริยะ — DEV STUDIO 888',
  description: 'คำนวณงบประมาณและสเปกโปรเจกต์ Web App, SaaS, E-Commerce ได้แม่นยำทันใจ พร้อมคำนวณระยะเวลาส่งมอบงานแบบ Real-Time',
  alternates: {
    canonical: '/estimator',
  },
  openGraph: {
    title: 'ระบบประเมินราคาโปรเจกต์อัจฉริยะ — DEV STUDIO 888',
    description: 'คำนวณงบประมาณและสเปกโปรเจกต์ Web App, SaaS, E-Commerce ได้แม่นยำทันใจ',
    url: 'https://devstudio888.com/estimator',
  },
};

export default function EstimatorPage() {
  return <EstimatorView />;
}
