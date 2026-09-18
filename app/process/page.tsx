import ProcessView from '@/Frontend/views/ProcessView';

export const metadata = {
  title: 'ขั้นตอนการทำงาน — DEV STUDIO 888',
  description: 'กระบวนการทำงานระดับมาตรฐานสากลตั้งแต่ Requirement สู่ Production พร้อมการทดสอบ QA 100% และรับประกันดูแลระบบ 1 ปี',
  alternates: {
    canonical: '/process',
  },
  openGraph: {
    title: 'ขั้นตอนการทำงาน — DEV STUDIO 888',
    description: 'กระบวนการทำงานระดับมาตรฐานสากลตั้งแต่ Requirement สู่ Production',
    url: 'https://devstudio888.com/process',
  },
};

export default function ProcessPage() {
  return <ProcessView />;
}
