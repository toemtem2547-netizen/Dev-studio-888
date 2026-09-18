'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function FloatingLuckyPopup() {
  const pathname = usePathname();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const cycleCountRef = useRef<number>(0);

  useEffect(() => {
    // Initial playful bounce after 2 seconds on page
    const initialTimer = setTimeout(() => {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 1600);
    }, 2000);

    // Recurring bounce every 20 seconds
    const interval = setInterval(() => {
      cycleCountRef.current += 1;
      // Re-surface popup if it was temporarily dismissed
      setIsDismissed(false);
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 1600);
    }, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const handleClick = () => {
    setIsDismissed(true);
    router.push('/lucky');
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  // Do not show popup if already inside /lucky, admin/dashboard, or dismissed
  if (pathname === '/lucky' || pathname?.startsWith('/admin') || pathname?.startsWith('/dashboard') || isDismissed) {
    return null;
  }

  return (
    <div
      className={`floating-lucky-nudge ${isBouncing ? 'is-bouncing' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="หมุนวงล้อสุ่มรับสิทธิ์ฟรี"
    >
      <div className="nudge-backdrop-glow"></div>

      <div className="nudge-card">
        {/* Dismiss Button */}
        <button
          className="nudge-close-btn"
          onClick={handleDismiss}
          title="ซ่อนชั่วคราว"
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* 3D Animated Gift / Lucky Vault Icon */}
        <div className="nudge-icon-wrapper">
          <div className="nudge-icon-glow"></div>
          <span className="nudge-gift-emoji">🎁</span>
          <span className="nudge-sparkle-dot"></span>
        </div>

        {/* Text Details */}
        <div className="nudge-text-col">
          <div className="nudge-badge-pill">
            <span className="nudge-live-dot"></span>
            <span>สิทธิ์ฟรีพร้อมหมุน</span>
          </div>
          <div className="nudge-headline">
            สุ่มฟรี <span className="nudge-gold-text">มูลค่า ฿5,000</span>
          </div>
          <div className="nudge-subtext">
            <span>แตะเพื่อเปิดหีบสมบัติ</span>
            <i className="fa-solid fa-arrow-right nudge-arrow-icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
