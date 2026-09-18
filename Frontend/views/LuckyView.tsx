'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/Frontend/components/Navbar';
import { Footer } from '@/Frontend/components/Footer';
import { soundFx } from '@/Frontend/utils/soundEffects';
import { useSettings } from '@/Frontend/context/SettingsContext';
import { PerkPrize, LuckyConfig, DEFAULT_LUCKY_CONFIG } from '@/types';

export const PRIZES: PerkPrize[] = DEFAULT_LUCKY_CONFIG.prizes;

const CARD_WIDTH_DESKTOP = 200;
const CARD_MARGIN_DESKTOP = 12;
const TOTAL_REEL_ITEMS = 75;

// Pre-fill initial reel items so cards are immediately visible on F5 refresh with 0 lag/flash
const INITIAL_REEL_ITEMS: PerkPrize[] = Array.from({ length: TOTAL_REEL_ITEMS }, (_, i) =>
  DEFAULT_LUCKY_CONFIG.prizes[i % DEFAULT_LUCKY_CONFIG.prizes.length]
);

export default function LuckyView() {
  const router = useRouter();
  const { luckyConfig: ctxConfig } = useSettings();
  const [liveConfig, setLiveConfig] = useState<LuckyConfig | null>(null);

  // Dynamic card pitch for responsive mobile reel
  const [cardDims, setCardDims] = useState<{ width: number; margin: number }>({
    width: CARD_WIDTH_DESKTOP,
    margin: CARD_MARGIN_DESKTOP,
  });

  const [reelItems, setReelItems] = useState<PerkPrize[]>(INITIAL_REEL_ITEMS);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(() => {
    const pitch = CARD_WIDTH_DESKTOP + (CARD_MARGIN_DESKTOP * 2);
    return -(4 * pitch + pitch / 2 - 700);
  });
  const [transitionStyle, setTransitionStyle] = useState<string>('none');
  const [targetIndex, setTargetIndex] = useState<number>(4);
  const [winningPrize, setWinningPrize] = useState<PerkPrize | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [spinsLeft, setSpinsLeft] = useState<number>(1);
  const [history, setHistory] = useState<PerkPrize[]>([]);

  const reelTrackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetIndexRef = useRef<number>(4);
  const spinningRef = useRef<boolean>(false);
  const cardDimsRef = useRef<{ width: number; margin: number }>({
    width: CARD_WIDTH_DESKTOP,
    margin: CARD_MARGIN_DESKTOP,
  });

  // Helper to calculate exact centered offset for a card index
  const calculateCenteredOffset = (idx: number, dims: { width: number; margin: number }) => {
    const containerWidth = containerRef.current ? containerRef.current.offsetWidth : (typeof window !== 'undefined' ? Math.min(window.innerWidth, 1440) : 360);
    const pitch = dims.width + (dims.margin * 2);
    return -(idx * pitch + pitch / 2 - containerWidth / 2);
  };

  // Ensure on load or F5 refresh, viewport is always pinned to the top (0, 0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      window.scrollTo(0, 0);
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const updateDims = () => {
      if (typeof window === 'undefined') return;
      let newDims = { width: CARD_WIDTH_DESKTOP, margin: CARD_MARGIN_DESKTOP };
      if (window.innerWidth <= 480) {
        newDims = { width: 155, margin: 6 };
      } else if (window.innerWidth <= 768) {
        newDims = { width: 175, margin: 8 };
      }
      setCardDims(newDims);
      cardDimsRef.current = newDims;

      if (!spinningRef.current && containerRef.current) {
        const pitch = newDims.width + (newDims.margin * 2);
        const containerWidth = containerRef.current.offsetWidth || (typeof window !== 'undefined' ? window.innerWidth : 360);
        const centered = -(targetIndexRef.current * pitch + pitch / 2 - containerWidth / 2);
        setTransitionStyle('none');
        setOffset(centered);
        if (reelTrackRef.current) {
          reelTrackRef.current.style.transition = 'none';
          reelTrackRef.current.style.transform = `translate3d(${centered}px, 0, 0)`;
        }
      }
    };

    updateDims();
    const t = setTimeout(updateDims, 80);
    window.addEventListener('resize', updateDims);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateDims);
    };
  }, []);

  // Fetch live config from API so admin changes take effect immediately
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success && data.luckyConfig) {
          setLiveConfig(data.luckyConfig);
          localStorage.setItem('nexus_dash_lucky_config', JSON.stringify(data.luckyConfig));
        }
      } catch (_) { }
    };
    fetchConfig();
  }, []);

  const activeConfig: LuckyConfig = liveConfig || ctxConfig || DEFAULT_LUCKY_CONFIG;
  const currentPrizes = activeConfig.prizes && activeConfig.prizes.length > 0 ? activeConfig.prizes : DEFAULT_LUCKY_CONFIG.prizes;
  const dropRates = activeConfig.dropRates || DEFAULT_LUCKY_CONFIG.dropRates;

  // Helper to generate a random deck of prizes using real admin drop rates
  const buildPrizePool = (): PerkPrize[] => {
    const items: PerkPrize[] = [];
    const legRate = Number(dropRates.legendary) || 18;
    const epicRate = Number(dropRates.epic) || 37;

    for (let i = 0; i < TOTAL_REEL_ITEMS; i++) {
      const rand = Math.random() * 100;
      let pool: PerkPrize[];
      if (rand < legRate) {
        pool = currentPrizes.filter(p => p.rarity === 'legendary');
      } else if (rand < (legRate + epicRate)) {
        pool = currentPrizes.filter(p => p.rarity === 'epic');
      } else {
        pool = currentPrizes.filter(p => p.rarity === 'rare');
      }
      if (!pool || pool.length === 0) pool = currentPrizes;
      const item = pool[Math.floor(Math.random() * pool.length)];
      items.push(item);
    }
    return items;
  };

  // Sync initial deck when prizes or drop rates update
  useEffect(() => {
    const initialPool = buildPrizePool();
    setReelItems(initialPool);

    // Load saved spin state & history
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('nexus_lucky_history');
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch (_) { }
      }

      const savedSpins = localStorage.getItem('nexus_lucky_spins');
      if (savedSpins !== null) {
        setSpinsLeft(parseInt(savedSpins, 10) || 1);
      }
    }
  }, [currentPrizes, dropRates.legendary, dropRates.epic, dropRates.rare]);

  // Trigger spin with guaranteed smooth reel sliding on EVERY spin
  const handleSpin = () => {
    if (spinningRef.current) return;
    spinningRef.current = true;
    setSpinning(true);

    if (spinsLeft <= 0) {
      setSpinsLeft(1);
    }

    setShowModal(false);
    const prevPrize = winningPrize;
    setWinningPrize(null);
    soundFx.playClick();

    // 1. Generate fresh randomized card sequence with previous prize at index 4 (so start looks seamless)
    const newPool = buildPrizePool();
    if (prevPrize) {
      newPool[4] = prevPrize;
    }
    setReelItems(newPool);

    // Randomize center winning index between 48 and 56 (giving 44-52 cards of high-speed spin)
    const winIdx = Math.floor(48 + Math.random() * 8);

    const dims = cardDimsRef.current;
    const currentPitch = dims.width + (dims.margin * 2);
    const containerWidth = containerRef.current ? containerRef.current.offsetWidth : (typeof window !== 'undefined' ? Math.min(window.innerWidth, 1440) : 360);

    // Reset reel position instantly to card index 4 with NO transition
    const startOffset = -(4 * currentPitch + currentPitch / 2 - containerWidth / 2);
    const finalOffset = -(winIdx * currentPitch + currentPitch / 2 - containerWidth / 2);

    targetIndexRef.current = 4;
    setTargetIndex(4);
    setTransitionStyle('none');
    setOffset(startOffset);

    if (reelTrackRef.current) {
      reelTrackRef.current.style.transition = 'none';
      reelTrackRef.current.style.transform = `translate3d(${startOffset}px, 0, 0)`;
      void reelTrackRef.current.offsetHeight; // Force browser layout reflow
    }

    // Dynamic duration configured in admin dashboard
    const spinDuration = activeConfig.spinDuration || 4000;

    // 2. Launch smooth CSS transition towards winIdx in next animation frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const easeCurve = 'cubic-bezier(0.12, 0.88, 0.22, 1)';
        const transStyle = `transform ${spinDuration}ms ${easeCurve}`;

        setTransitionStyle(transStyle);
        setOffset(finalOffset);

        if (reelTrackRef.current) {
          reelTrackRef.current.style.transition = transStyle;
          reelTrackRef.current.style.transform = `translate3d(${finalOffset}px, 0, 0)`;
        }

        // Decelerating mechanical audio ticks
        let elapsed = 0;
        let tickDelay = 26;
        const tickLoop = () => {
          if (elapsed >= spinDuration || !spinningRef.current) return;
          soundFx.playSpinTick();
          elapsed += tickDelay;
          tickDelay = Math.min(460, 26 + Math.pow(elapsed / spinDuration, 2.6) * 430);
          setTimeout(tickLoop, tickDelay);
        };
        setTimeout(tickLoop, 35);

        // When spin finishes
        setTimeout(() => {
          spinningRef.current = false;
          setSpinning(false);
          targetIndexRef.current = winIdx;
          setTargetIndex(winIdx);

          const targetPrize = newPool[winIdx] || currentPrizes[0];
          setWinningPrize(targetPrize);
          setShowModal(true);
          soundFx.playWinJackpot();

          // Native mobile haptic feedback if supported
          if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            try {
              navigator.vibrate([70, 30, 70, 30, 140]);
            } catch (_) { }
          }

          // Deduct spin
          setSpinsLeft(prev => {
            const next = Math.max(0, prev - 1);
            if (typeof window !== 'undefined') {
              localStorage.setItem('nexus_lucky_spins', next.toString());
            }
            return next;
          });

          // Save to history
          setHistory(prev => {
            const updated = [targetPrize, ...prev.filter(x => x.id !== targetPrize.id)].slice(0, 5);
            if (typeof window !== 'undefined') {
              localStorage.setItem('nexus_lucky_history', JSON.stringify(updated));
            }
            return updated;
          });

          // Launch celebratory confetti canvas
          launchConfetti();
        }, spinDuration + 100);
      });
    });
  };

  // Add more spins button
  const handleAddSpin = () => {
    soundFx.playClick();
    setSpinsLeft(prev => {
      const next = prev + 1;
      localStorage.setItem('nexus_lucky_spins', next.toString());
      return next;
    });
  };

  const handleCopyCode = (code: string) => {
    soundFx.playClick();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Canvas Confetti
  const launchConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      vRot: number;
      life: number;
    }

    const colors = ['#F59E0B', '#10B981', '#6366F1', '#EC4899', '#38BDF8', '#F43F5E', '#A855F7'];
    const particles: Particle[] = [];

    for (let i = 0; i < 160; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.45 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 18,
        vy: -Math.random() * 14 - 6,
        size: Math.random() * 9 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        life: 1,
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45; // gravity
        p.rotation += p.vRot;
        p.life -= 0.007;

        if (p.life > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
          ctx.restore();
        }
      });

      if (alive) {
        animId = requestAnimationFrame(render);
      }
    };
    render();
  };

  const getRarityBadge = (rarity: PerkPrize['rarity']) => {
    switch (rarity) {
      case 'legendary':
        return <span className="gacha-rarity-pill rarity-gold"><i className="fa-solid fa-crown"></i> LEGENDARY</span>;
      case 'epic':
        return <span className="gacha-rarity-pill rarity-purple"><i className="fa-solid fa-gem"></i> EPIC</span>;
      default:
        return <span className="gacha-rarity-pill rarity-cyan"><i className="fa-solid fa-star"></i> RARE</span>;
    }
  };

  return (
    <>
      <Navbar />

      {/* Background canvas for celebration */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />

      <main className="gacha-page-container">
        {/* Ambient Glows */}
        <div className="gacha-bg-glow glow-1"></div>
        <div className="gacha-bg-glow glow-2"></div>

        {/* Full-screen Hero Game Stage */}
        <div className="gacha-hero-stage">
          {/* Top Header */}
          <header className="gacha-header">
            <div className="container" style={{ textAlign: 'center', maxWidth: '1400px' }}>
              <div className="section-badge gacha-header-badge">
                <i className="fa-solid fa-dice-d20 gacha-spin-icon"></i>
                NEXUS LUCKY VAULT • ลุ้นรับสิทธิพิเศษฟรี
              </div>
              <h1 className="hero-title gacha-hero-title">
                <span className="hero-title-line1">
                  หมุนวงล้อสุ่ม <span className="text-gradient">ปลดล็อกฟังก์ชันฟรี</span>
                </span>
                <span className="hero-title-line2">ให้โปรเจกต์คุณ</span>
              </h1>
              <p className="hero-subtitle">
                มอบของขวัญสำหรับลูกค้าใหม่และพาร์ทเนอร์ สุ่มรับสิทธิ์ติดตั้งระบบเสริมระดับพรีเมียม
                มูลค่าสูงสุด <span style={{ color: '#F59E0B', fontWeight: 700 }}>฿25,000</span> ฟรีทันที ไม่มีค่าใช้จ่ายแอบแฝง!
              </p>

              {/* Quick Stats Bar */}
              <div className="gacha-status-strip">
                <div className="status-item">
                  <span className="label" style={{ whiteSpace: 'nowrap' }}>สิทธิ์คงเหลือ:</span>
                  <span className="value-badge" style={{ whiteSpace: 'nowrap' }}>
                    <i className="fa-solid fa-ticket" style={{ color: '#F59E0B', marginRight: '4px' }}></i>
                    {spinsLeft} สิทธิ์
                  </span>
                  <button
                    className="btn-add-spin"
                    onClick={handleAddSpin}
                    title="รับสิทธิ์สุ่มเพิ่มฟรี"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <i className="fa-solid fa-plus"></i> เพิ่มสิทธิ์
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* ======================================================== */}
          {/* CENTER REEL SECTION (Dead center of the viewport)       */}
          {/* ======================================================== */}
          <section className="gacha-reel-section">
            <div className="container" style={{ maxWidth: '1440px', position: 'relative' }}>

              {/* Reel Outer Frame */}
              <div className="gacha-reel-frame">
                {/* Center Spin Pointer (Arrows Only) */}
                <div className="gacha-center-pointer top-pointer">
                  <div className="pointer-head"></div>
                </div>
                <div className="gacha-center-pointer bottom-pointer">
                  <div className="pointer-head"></div>
                </div>

                {/* Edge Vignette Gradients */}
                <div className="reel-vignette vignette-left"></div>
                <div className="reel-vignette vignette-right"></div>

                {/* Viewport Window */}
                <div className="gacha-viewport" ref={containerRef}>
                  <div
                    className="gacha-track"
                    ref={reelTrackRef}
                    style={{
                      transform: `translate3d(${offset}px, 0, 0)`,
                      transition: transitionStyle,
                    }}
                  >
                    {reelItems.map((prize, idx) => {
                      const isCenterPick = idx === targetIndex;
                      const focusClass = spinning
                        ? ''
                        : isCenterPick
                        ? (winningPrize ? 'card-selected' : 'card-focused')
                        : 'card-dimmed';

                      return (
                        <div
                          key={`${prize.id}-${idx}`}
                          className={`gacha-card rarity-${prize.rarity} ${focusClass}`}
                          style={{ width: `${cardDims.width}px`, margin: `0 ${cardDims.margin}px` }}
                        >
                          <div className="gacha-card-glow"></div>

                          {/* Rarity Header Bar */}
                          <div className="card-top-bar">
                            {getRarityBadge(prize.rarity)}
                          </div>

                          {/* Icon or Image */}
                          <div className="card-icon-box">
                            {prize.imageUrl ? (
                              <img
                                src={prize.imageUrl}
                                alt={prize.name}
                                className="card-prize-image"
                              />
                            ) : (
                              <i className={prize.icon}></i>
                            )}
                          </div>

                          {/* Prize Name */}
                          <div className="card-info">
                            <h4 className="card-title">{prize.name}</h4>
                            <span className="card-category">{prize.category}</span>
                          </div>

                          {/* Value Tag */}
                          <div className="card-value-tag">
                            มูลค่า ฿{prize.valueThb.toLocaleString()} ฟรี
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SPIN ACTION BUTTON (Right below center reel) */}
          <div className="gacha-controls">
            <button
              id="spinVaultBtn"
              className={`btn-spin-huge ${spinning ? 'is-spinning' : ''}`}
              onClick={handleSpin}
              disabled={spinning}
            >
              {spinning ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i> กำลังหมุนวงล้อสุ่ม...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-bolt"></i> หมุนสุ่มรับสิทธิ์ฟรี (SPIN NOW)
                </>
              )}
            </button>
            <p className="spin-hint">
              <i className="fa-solid fa-circle-check" style={{ color: '#10B981', marginRight: '6px' }}></i>
              สุ่มได้ฟรี 100% • โค้ดที่ได้สามารถนำไปหักลดในใบเสนอราคาหรือใช้ในระบบคำนวณราคาได้ทันที
            </p>
            <div className="gacha-scroll-down-hint">
              <a href="#prizesSection" className="scroll-down-link">
                <span>ดูของรางวัลทั้งหมด</span>
                <i className="fa-solid fa-chevron-down scroll-arrow-down"></i>
              </a>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PRIZE SHOWCASE GRID (All Possible Rewards)              */}
        {/* ======================================================== */}
        <section className="container gacha-prizes-section" id="prizesSection" style={{ maxWidth: '1440px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
              รายการของรางวัลทั้งหมดใน <span className="text-gradient">Lucky Vault</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              ทุกการหมุน การันตีได้รับรางวัล 1 รายการแน่นอน ไม่มีช่องว่างเปล่า!
            </p>
          </div>

          <div className="gacha-prizes-grid">
            {currentPrizes.map(p => (
              <div key={p.id} className={`prize-showcase-card border-${p.rarity}`}>
                <div className="showcase-header">
                  <div className="showcase-icon">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        style={{ width: '88%', height: '88%', objectFit: 'contain' }}
                      />
                    ) : (
                      <i className={p.icon}></i>
                    )}
                  </div>
                  <div className="showcase-meta">
                    {getRarityBadge(p.rarity)}
                    <span className="showcase-value">มูลค่า ฿{p.valueThb.toLocaleString()}</span>
                  </div>
                </div>
                <h4 className="showcase-title">{p.name}</h4>
                <p className="showcase-desc">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* WINNER POPUP MODAL (Luxury VIP Gacha Winner Experience)  */}
        {/* ======================================================== */}
        {showModal && winningPrize && (
          <div className="gacha-modal-overlay">
            <div className="gacha-modal-backdrop" onClick={() => setShowModal(false)}></div>

            <div className={`gacha-win-modal modal-rarity-${winningPrize.rarity}`}>
              {/* Ambient radial glow */}
              <div className="win-ambient-glow"></div>

              <div className="modal-inner-content">
                {/* Header Strip with Congrats and Rarity Badge */}
                <div className="win-header-strip">
                  <div className="win-congrats-pill">
                    <i className="fa-solid fa-trophy"></i>
                    <span>CONGRATULATIONS!</span>
                  </div>
                  <div className="win-rarity-badge-wrap">
                    {getRarityBadge(winningPrize.rarity)}
                  </div>
                </div>

                {/* Hero Showcase Centerpiece */}
                <div className="win-hero-stage">
                  <div className="win-hero-pedestal">
                    <div className="win-hero-ring-outer"></div>
                    <div className="win-hero-ring-inner">
                      {winningPrize.imageUrl ? (
                        <img
                          src={winningPrize.imageUrl}
                          alt={winningPrize.name}
                          className="win-hero-image"
                        />
                      ) : (
                        <i className={`${winningPrize.icon} win-hero-icon`}></i>
                      )}
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="win-info-section">
                  <span className="win-category-tag">{winningPrize.category}</span>
                  <h2 className="win-prize-title">{winningPrize.name}</h2>
                  <p className="win-prize-desc">{winningPrize.description}</p>
                </div>

                {/* Value Banner / Savings Card */}
                <div className="win-value-card">
                  <div className="val-card-left">
                    <div className="val-card-icon">
                      <i className="fa-solid fa-gift"></i>
                    </div>
                    <div className="val-card-text">
                      <span className="val-card-label">มูลค่าสิทธิ์พิเศษที่ได้รับฟรี</span>
                      <span className="val-card-sub">ประหยัดต้นทุนโปรเจกต์ของคุณ 100%</span>
                    </div>
                  </div>
                  <div className="val-card-right">
                    <span className="val-amount">฿{winningPrize.valueThb.toLocaleString()}</span>
                    <span className="val-free-tag">ฟรี!</span>
                  </div>
                </div>

                {/* VIP Voucher Ticket Box */}
                <div className="win-voucher-ticket">
                  <div className="ticket-top-bar">
                    <span className="ticket-title">
                      <i className="fa-solid fa-ticket"></i> รหัสโปรโมชันของคุณ (Voucher Code)
                    </span>
                    <span className="ticket-status-dot">
                      <span className="dot-pulse"></span> พร้อมใช้งานทันที
                    </span>
                  </div>

                  <div className="ticket-code-row">
                    <div className="ticket-code-display">
                      <span className="code-text">{winningPrize.promoCode}</span>
                    </div>
                    <button
                      className={`btn-ticket-copy ${copied ? 'copied' : ''}`}
                      onClick={() => handleCopyCode(winningPrize.promoCode)}
                    >
                      {copied ? (
                        <>
                          <i className="fa-solid fa-check"></i> คัดลอกสำเร็จ!
                        </>
                      ) : (
                        <>
                          <i className="fa-solid fa-copy"></i> คัดลอกโค้ด
                        </>
                      )}
                    </button>
                  </div>
                  <div className="ticket-hint">
                    <i className="fa-solid fa-circle-info"></i> นำโค้ดนี้ไปคำนวณราคา หรือส่งให้ทีมงานทาง LINE เพื่อรับสิทธิ์
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="win-action-buttons">
                  <Link
                    href={`/estimator?promo=${winningPrize.promoCode}`}
                    className="btn-win-primary"
                    onClick={() => {
                      sessionStorage.setItem('nexus_won_promo', winningPrize.promoCode);
                      sessionStorage.setItem('nexus_won_name', winningPrize.name);
                    }}
                  >
                    <div className="btn-win-content">
                      <span className="btn-main-label">
                        <i className="fa-solid fa-calculator"></i> นำโค้ดไปคำนวณราคาโปรเจกต์ทันที
                      </span>
                      <span className="btn-sub-label">หักส่วนลด ฿{winningPrize.valueThb.toLocaleString()} อัตโนมัติในระบบ</span>
                    </div>
                    <i className="fa-solid fa-arrow-right btn-win-arrow"></i>
                  </Link>

                  <a
                    href={`https://line.me/R/ti/p/@devstudio888?text=${encodeURIComponent(`สวัสดีครับ สนใจทำโปรเจกต์และได้รับสิทธิ์ฟรีจาก Lucky Vault: ${winningPrize.name} (รหัสโค้ด: ${winningPrize.promoCode})`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-win-line"
                  >
                    <i className="fa-brands fa-line line-brand-icon"></i>
                    <span>ส่งให้ทีมงานทาง LINE เพื่อจองสิทธิ์</span>
                  </a>
                </div>

                {/* Footer Spin Again & Close Button */}
                <div className="win-modal-footer">
                  <button
                    className="btn-spin-again"
                    onClick={() => {
                      setShowModal(false);
                      setTimeout(() => {
                        handleSpin();
                      }, 200);
                    }}
                  >
                    <i className="fa-solid fa-rotate-right"></i> สุ่มใหม่อีกครั้ง {spinsLeft > 0 ? `(${spinsLeft} สิทธิ์คงเหลือ)` : ''}
                  </button>
                  <button
                    className="btn-modal-close-action"
                    onClick={() => setShowModal(false)}
                  >
                    <i className="fa-solid fa-xmark"></i> ปิดหน้านี้
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}
