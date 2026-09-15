'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/Frontend/context/ThemeContext';
import { useLanguage } from '@/Frontend/context/LanguageContext';
import { useSettings } from '@/Frontend/context/SettingsContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();
  const { site } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);

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
            onClick={() => setMobileOpen(false)}
          >
            {t.navWork}
          </Link>
          <Link
            href="/#services"
            className="nav-link"
            onClick={() => setMobileOpen(false)}
          >
            {t.navServices}
          </Link>
          <Link
            href="/estimator"
            className={`nav-link highlight-link ${pathname === '/estimator' ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            <i className="fa-solid fa-calculator"></i> {t.navEstimator}
          </Link>
          <Link
            href="/process"
            className={`nav-link ${pathname === '/process' ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {t.navProcess}
          </Link>
          <Link
            href="/faq"
            className={`nav-link ${pathname === '/faq' ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            {t.navFaq}
          </Link>
          <Link
            href="/contact"
            className={`btn btn-sm btn-primary nav-cta ${pathname === '/contact' ? 'active' : ''}`}
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
