'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/Frontend/context/LanguageContext';
import { useSettings } from '@/Frontend/context/SettingsContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { site, contact, social } = useSettings();

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
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col footer-brand">
            <Link href="/" className="footer-logo">
              <i className="fa-solid fa-layer-group"></i>
              <span>{renderBrandName()}</span>
            </Link>
            <p className="footer-desc">
              {site.siteDesc || t.footerDesc}
            </p>
            <div className="social-links">
              <a href={social.github || 'https://github.com'} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href={social.linkedin || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href={social.facebook || 'https://facebook.com'} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">นำทาง (Navigation)</h4>
            <ul className="footer-links">
              <li><Link href="/#portfolio">{t.navWork}</Link></li>
              <li><Link href="/#services">{t.navServices}</Link></li>
              <li><Link href="/estimator">{t.navEstimator}</Link></li>
              <li><Link href="/process">{t.navProcess}</Link></li>
              <li><Link href="/faq">{t.navFaq}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-title">บริการ (Services)</h4>
            <ul className="footer-links">
              <li><Link href="/#services">Custom Web Applications</Link></li>
              <li><Link href="/#services">SaaS & Dashboard Architecture</Link></li>
              <li><Link href="/#services">High-Performance E-Commerce</Link></li>
              <li><Link href="/#services">API & Microservices Engineering</Link></li>
              <li><Link href="/#services">AI Workflow Integration</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-title">ติดต่อเรา (Contact)</h4>
            <ul className="footer-contact">
              <li>
                <i className="fa-regular fa-envelope"></i>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}>{contact.phone}</a>
              </li>
              <li>
                <i className="fa-regular fa-comment-dots"></i>
                <span>LINE: {contact.line}</span>
              </li>
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <span>Bangkok, Thailand</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.siteName || 'DEV STUDIO 888'}. {t.footerCopyright}</p>
          <div className="footer-bottom-links">
            <Link href="/login" className="footer-admin-link">
              <i className="fa-solid fa-lock"></i> เข้าสู่ระบบแอดมิน
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
