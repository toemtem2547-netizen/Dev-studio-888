'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/Frontend/context/ThemeContext';
import { useLanguage } from '@/Frontend/context/LanguageContext';
import { useSettings } from '@/Frontend/context/SettingsContext';
import { soundFx } from '@/Frontend/utils/soundEffects';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();
  const { site } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    setSoundOn(soundFx.isEnabled());
  }, []);

  const handleToggleSound = () => {
    const next = soundFx.toggle();
    setSoundOn(next);
  };

  // Format brand name
  const renderBrandName = () => {
    if (!site.siteName) return <>DEV STUDIO <span className="text-gradient">888</span></>;
    const parts = site.siteName.trim().split(' ');
    if (parts.length > 1) {
      const last = parts.pop();
      return <>{parts.join(' ')} <span className="text-gradient">{last}</span></>;
    }
    return <span className="text-gradient">{site.siteName}</span>;
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="container nav-container">
        <Link href="/" className="brand-logo" aria-label="Home">
          <span className="logo-icon">
            <i className="fa-solid fa-layer-group"></i>
          </span>
          <span className="logo-text">
            {renderBrandName()}
          </span>
        </Link>

        {/* Desktop & Mobile Menu */}
        <div className={`nav-links ${mobileOpen ? 'active' : ''}`} id="navLinks">
          <Link
            href="/#portfolio"
            className="nav-link"
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => setMobileOpen(false)}
          >
            {t.navWork}
          </Link>
          <Link
            href="/#services"
            className="nav-link"
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => setMobileOpen(false)}
          >
            {t.navServices}
          </Link>
          <Link
            href="/estimator"
            className={`nav-link highlight-link ${pathname === '/estimator' ? 'active' : ''}`}
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => setMobileOpen(false)}
          >
            <i className="fa-solid fa-calculator"></i> <span>{t.navEstimator}</span>
          </Link>
          <Link
            href="/lucky"
            className={`nav-link gacha-nav-link ${pathname === '/lucky' ? 'active' : ''}`}
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => setMobileOpen(false)}
          >
            <span className="gacha-nav-badge">FREE</span>
            <span>{(t as any).navLucky || '🎁 สุ่มรับฟังก์ชันฟรี'}</span>
          </Link>
          <Link
            href="/process"
            className={`nav-link ${pathname === '/process' ? 'active' : ''}`}
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => setMobileOpen(false)}
          >
            {t.navProcess}
          </Link>
          <Link
            href="/faq"
            className={`nav-link ${pathname === '/faq' ? 'active' : ''}`}
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => setMobileOpen(false)}
          >
            {t.navFaq}
          </Link>
          <Link
            href="/contact"
            className={`btn btn-sm btn-primary nav-cta ${pathname === '/contact' ? 'active' : ''}`}
            style={{ whiteSpace: 'nowrap' }}
            onClick={() => setMobileOpen(false)}
          >
            {t.navContact}
          </Link>
        </div>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Language Switcher */}
          <button
            className="theme-toggle"
            id="langToggle"
            title={lang === 'th' ? 'สลับเป็น English (EN)' : 'สลับเป็นภาษาไทย (TH)'}
            aria-label="Toggle language"
            onClick={toggleLang}
            style={{ fontWeight: 700, fontSize: '0.78rem', width: 'auto', padding: '0 10px', borderRadius: 'var(--radius-full)' }}
          >
            <i className="fa-solid fa-globe" style={{ marginRight: '4px' }}></i>
            <span>{t.langLabel}</span>
          </button>

          {/* Futuristic Sound FX Toggle */}
          <button
            className={`theme-toggle ${soundOn ? 'sound-active' : ''}`}
            id="soundToggle"
            title={soundOn ? 'ปิดเสียงเอฟเฟกต์ (Mute SFX)' : 'เปิดเสียงเอฟเฟกต์สุดล้ำ (Enable Sci-Fi SFX)'}
            aria-label="Toggle Sound Effects"
            onClick={handleToggleSound}
            style={soundOn ? { color: '#10B981', borderColor: 'rgba(16, 185, 129, 0.4)', background: 'rgba(16, 185, 129, 0.15)' } : {}}
          >
            {soundOn ? (
              <i className="fa-solid fa-volume-high"></i>
            ) : (
              <i className="fa-solid fa-volume-xmark" style={{ opacity: 0.55 }}></i>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            id="themeToggle"
            title={theme === 'dark' ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
            aria-label="Toggle light and dark mode"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <i className="fa-solid fa-sun"></i>
            ) : (
              <i className="fa-solid fa-moon"></i>
            )}
          </button>

          {/* Admin Login Portal */}
          <Link
            href="/login"
            className="theme-toggle"
            id="adminNavBtn"
            title="เข้าสู่ระบบผู้ดูแล"
            aria-label="Admin Login"
          >
            <i className="fa-solid fa-user-gear"></i>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            id="mobileToggle"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <i className={mobileOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};
