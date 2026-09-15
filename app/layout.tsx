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
    <html lang="th" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#070B14" id="themeColorMeta" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                // ── Theme: default dark for first-time visitors ──
                var saved = localStorage.getItem('nexus_theme');
                if (!saved) {
                  saved = 'dark';
                  localStorage.setItem('nexus_theme', 'dark');
                }
                document.documentElement.setAttribute('data-theme', saved);
                var meta = document.getElementById('themeColorMeta');
                if (meta) {
                  meta.content = saved === 'dark' ? '#070B14' : '#F8FAFC';
                }

                // ── First visit: redirect to home page ──
                var isFirstVisit = !sessionStorage.getItem('nexus_visited');
                if (isFirstVisit) {
                  sessionStorage.setItem('nexus_visited', '1');
                  var currentPath = window.location.pathname;
                  // Only redirect if not already on home and not on login/api paths
                  if (currentPath !== '/' && !currentPath.startsWith('/login') && !currentPath.startsWith('/api')) {
                    window.location.replace('/');
                  }
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
      <body suppressHydrationWarning>
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
