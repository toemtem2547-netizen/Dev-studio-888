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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                // 1. Theme: default dark for first-time visitors
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

                // 2. Synchronously inject high-priority CSS override style tag before any CSS is painted
                var savedCustomTheme = localStorage.getItem('nexus_dash_settings_theme');
                if (savedCustomTheme) {
                  var t = JSON.parse(savedCustomTheme);
                  if (t && t.primaryColor) {
                    var pColor = t.primaryColor;
                    var sColor = t.secondaryColor || '#7C3AED';

                    var cleanP = pColor.replace('#', '').trim();
                    var cleanS = sColor.replace('#', '').trim();
                    var r1 = parseInt(cleanP.substring(0, 2), 16) || 37;
                    var g1 = parseInt(cleanP.substring(2, 4), 16) || 99;
                    var b1 = parseInt(cleanP.substring(4, 6), 16) || 235;
                    var r2 = parseInt(cleanS.substring(0, 2), 16) || 124;
                    var g2 = parseInt(cleanS.substring(2, 4), 16) || 58;
                    var b2 = parseInt(cleanS.substring(4, 6), 16) || 237;

                    var pRgb = r1 + ', ' + g1 + ', ' + b1;
                    var sRgb = r2 + ', ' + g2 + ', ' + b2;

                    var css = ':root, [data-theme="dark"], [data-theme="light"] {' +
                      '--primary: ' + pColor + ' !important;' +
                      '--secondary: ' + sColor + ' !important;' +
                      '--primary-rgb: ' + pRgb + ' !important;' +
                      '--secondary-rgb: ' + sRgb + ' !important;' +
                      '--primary-hover: ' + pColor + ' !important;' +
                      '--secondary-light: ' + sColor + ' !important;' +
                      '--primary-gradient: linear-gradient(135deg, ' + pColor + ' 0%, ' + sColor + ' 100%) !important;' +
                      '--border-focus: ' + pColor + ' !important;' +
                      '--glow-primary: 0 0 35px rgba(' + pRgb + ', 0.25) !important;' +
                      '--shadow-card-hover: 0 20px 45px -5px rgba(' + pRgb + ', 0.25), 0 0 0 1.5px ' + pColor + ' !important;' +
                      (t.fontHeading ? '--font-heading: "' + t.fontHeading + '", "Prompt", sans-serif !important;' : '') +
                      (t.fontBody ? '--font-body: "' + t.fontBody + '", "Prompt", sans-serif !important;' : '') +
                      '}';

                    var styleEl = document.createElement('style');
                    styleEl.id = 'early-theme-override';
                    styleEl.innerHTML = css;
                    document.head.appendChild(styleEl);

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
                  }
                }

                // 3. First visit redirect
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
