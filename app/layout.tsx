import type { Metadata } from 'next';
import './globals.css';
import './dashboard.css';
import { ThemeProvider } from '@/Frontend/context/ThemeContext';
import { LanguageProvider } from '@/Frontend/context/LanguageContext';
import { SettingsProvider } from '@/Frontend/context/SettingsContext';

export const metadata: Metadata = {
  title: 'NEXUS STUDIO 888 — Web Application & SaaS Engineering Studio',
  description: 'ผู้เชี่ยวชาญด้านการพัฒนา Web Application, SaaS, E-Commerce และ Custom Software ระดับพรีเมียม ตอบโจทย์ทุกสเกลธุรกิจด้วยมาตรฐานระดับสากล',
  icons: {
    icon: '/assets/images/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Prompt:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <SettingsProvider>
              {children}
            </SettingsProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
