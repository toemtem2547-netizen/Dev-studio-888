import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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
        <Script
          id="theme-visited-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                // ── 1. Theme: default dark for first-time visitors ──
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

                // ── 2. Restore Custom Theme Colors & Fonts immediately to prevent FOUC ──
                var savedCustomTheme = localStorage.getItem('nexus_dash_settings_theme');
                if (savedCustomTheme) {
                  var t = JSON.parse(savedCustomTheme);
                  if (t) {
                    var pColor = t.primaryColor || '#2563EB';
                    var sColor = t.secondaryColor || '#7C3AED';

                    function hex2rgb(hex) {
                      if (!hex) return '37, 99, 235';
                      var clean = hex.replace('#', '').trim();
                      var r = 37, g = 99, b = 235;
                      if (clean.length === 6) {
                        r = parseInt(clean.substring(0, 2), 16);
                        g = parseInt(clean.substring(2, 4), 16);
                        b = parseInt(clean.substring(4, 6), 16);
                      } else if (clean.length === 3) {
                        r = parseInt(clean[0] + clean[0], 16);
                        g = parseInt(clean[1] + clean[1], 16);
                        b = parseInt(clean[2] + clean[2], 16);
                      }
                      return (isNaN(r) || isNaN(g) || isNaN(b)) ? '37, 99, 235' : (r + ', ' + g + ', ' + b);
                    }

                    var pRgb = hex2rgb(pColor);
                    var sRgb = hex2rgb(sColor);

                    var root = document.documentElement;
                    root.style.setProperty('--primary', pColor);
                    root.style.setProperty('--secondary', sColor);
                    root.style.setProperty('--primary-rgb', pRgb);
                    root.style.setProperty('--secondary-rgb', sRgb);
                    root.style.setProperty('--primary-hover', pColor);
                    root.style.setProperty('--secondary-light', sColor);
                    root.style.setProperty('--primary-gradient', 'linear-gradient(135deg, ' + pColor + ' 0%, ' + sColor + ' 100%)');
                    root.style.setProperty('--border-focus', pColor);
                    root.style.setProperty('--glow-primary', '0 0 35px rgba(' + pRgb + ', 0.25)');
                    root.style.setProperty('--shadow-card-hover', '0 20px 45px -5px rgba(' + pRgb + ', 0.25), 0 0 0 1.5px ' + pColor);

                    if (t.fontHeading) root.style.setProperty('--font-heading', "'" + t.fontHeading + "', 'Prompt', sans-serif");
                    if (t.fontBody) root.style.setProperty('--font-body', "'" + t.fontBody + "', 'Prompt', sans-serif");
                  }
                }

                // ── 3. First visit: redirect to home page ──
                var isFirstVisit = !sessionStorage.getItem('nexus_visited');
                if (isFirstVisit) {
                  sessionStorage.setItem('nexus_visited', '1');
                  var currentPath = window.location.pathname;
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
