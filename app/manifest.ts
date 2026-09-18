import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DEV STUDIO 888 — Web Application & SaaS Engineering Studio',
    short_name: 'DEV STUDIO 888',
    description: 'ผู้เชี่ยวชาญด้านการพัฒนา Web Application, SaaS, E-Commerce และ Custom Software ระดับพรีเมียม ตอบโจทย์ทุกสเกลธุรกิจด้วยมาตรฐานระดับสากล',
    start_url: '/',
    display: 'standalone',
    background_color: '#070B14',
    theme_color: '#070B14',
    icons: [
      {
        src: '/assets/images/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
