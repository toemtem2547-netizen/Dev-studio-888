import type { Metadata, Viewport } from 'next';
import './globals.css';
import './dashboard.css';
import { ThemeProvider } from '@/Frontend/context/ThemeContext';
import { LanguageProvider } from '@/Frontend/context/LanguageContext';
import { SettingsProvider } from '@/Frontend/context/SettingsContext';

export const metadata: Metadata = {
  title: 'DEV STUDIO 888 — Web Application & SaaS Engineering Studio',
  description: 'ผู้เชี่ยวชาญด้านการพัฒนา Web Application, SaaS, E-Commerce และ Custom Software ระดับพรีเมียม ตอบโจทย์ทุกสเกลธุรกิจด้วยมาตรฐานระดับสากล',
  icons: {
    icon: '/assets/images/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" data-theme="dark" style={{ backgroundColor: '#070B14', colorScheme: 'dark' }}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#070B14" />
        <meta name="color-scheme" content="dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var saved = localStorage.getItem('nexus_theme') || 'dark';
                document.documentElement.setAttribute('data-theme', saved);
                if (saved === 'dark') {
                  document.documentElement.style.backgroundColor = '#070B14';
                }
              } catch(e) {}
            })()`,
          }}
        />
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
      <body style={{ backgroundColor: '#070B14', color: '#F1F5F9' }}>
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
