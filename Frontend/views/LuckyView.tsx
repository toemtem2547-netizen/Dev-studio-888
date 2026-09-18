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
const TOTAL_REEL_ITEMS = 65;

export default function LuckyView() {
  const router = useRouter();
  const { luckyConfig: ctxConfig } = useSettings();
  const [liveConfig, setLiveConfig] = useState<LuckyConfig | null>(null);

  // Dynamic card pitch for responsive mobile reel
  const [cardDims, setCardDims] = useState<{ width: number; margin: number }>({
    width: CARD_WIDTH_DESKTOP,
    margin: CARD_MARGIN_DESKTOP,
  });

  useEffect(() => {
    const updateDims = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth <= 480) {
        setCardDims({ width: 150, margin: 8 });
      } else if (window.innerWidth <= 768) {
        setCardDims({ width: 175, margin: 10 });
      } else {
        setCardDims({ width: CARD_WIDTH_DESKTOP, margin: CARD_MARGIN_DESKTOP });
      }
    };
    updateDims();
    window.addEventListener('resize', updateDims);
    return () => window.removeEventListener('resize', updateDims);
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

  const [reelItems, setReelItems] = useState<PerkPrize[]>([]);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [transitionStyle, setTransitionStyle] = useState<string>('none');
  const [targetIndex, setTargetIndex] = useState<number>(50);
  const [winningPrize, setWinningPrize] = useState<PerkPrize | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [spinsLeft, setSpinsLeft] = useState<number>(1);
  const [history, setHistory] = useState<PerkPrize[]>([]);
  const [showDropRates, setShowDropRates] = useState<boolean>(false);

  const reelTrackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Keep winning card centered if window is resized or phone rotates
  useEffect(() => {
    if (!spinning && winningPrize && containerRef.current) {
      const pitch = cardDims.width + (cardDims.margin * 2);
      const containerWidth = containerRef.current.offsetWidth;
      const centered = -(targetIndex * pitch + pitch / 2 - containerWidth / 2);
      setTransitionStyle('none');
      setOffset(centered);
    }
  }, [cardDims, spinning, winningPrize, targetIndex]);

  // Trigger spin with guaranteed smooth reel sliding on EVERY spin
  const handleSpin = () => {
    if (spinning) return;

    if (spinsLeft <= 0) {
      setSpinsLeft(1);
    }

    setShowModal(false);
    setWinningPrize(null);

    // 1. Generate fresh randomized card sequence
    const newPool = buildPrizePool();
    setReelItems(newPool);

    // Randomize center winning index between 46 and 54
    const winIdx = Math.floor(46 + Math.random() * 8);
    setTargetIndex(winIdx);

    // 2. Snap reel back to starting point (0px) with NO transition
    setTransitionStyle('none');
    setOffset(0);

    // 3. After 50ms (giving browser time to paint offset 0), launch smooth spin animation
    setTimeout(() => {
      setSpinning(true);

      const currentPitch = cardDims.width + (cardDims.margin * 2);
      const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 800;
      const randomJitter = (Math.random() - 0.5) * (cardDims.width * 0.08); // subtle realistic stop variance
      const finalOffset = -(winIdx * currentPitch + currentPitch / 2 - containerWidth / 2 + randomJitter);

      // Dynamic duration configured in admin dashboard
      const spinDuration = activeConfig.spinDuration || 3800;
      setTransitionStyle(`transform ${spinDuration}ms cubic-bezier(0.12, 0.88, 0.22, 1)`);
      setOffset(finalOffset);

      // Decelerating mechanical audio ticks
      let elapsed = 0;
      let tickDelay = 26;
      const tickLoop = () => {
        if (elapsed >= spinDuration) return;
        soundFx.playSpinTick();
        elapsed += tickDelay;
        tickDelay = Math.min(420, 26 + Math.pow(elapsed / spinDuration, 2.5) * 400);
        setTimeout(tickLoop, tickDelay);
      };
      setTimeout(tickLoop, 30);

      // When spin finishes
      setTimeout(() => {
        setSpinning(false);
        const targetPrize = newPool[winIdx];
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
      }, spinDuration + 60);
    }, 50);
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

        {/* Top Header */}
        <header className="gacha-header">
          <div className="container" style={{ textAlign: 'center', maxWidth: '1400px' }}>
            <div className="section-badge gacha-header-badge">
              <i className="fa-solid fa-dice-d20 gacha-spin-icon"></i>
              NEXUS LUCKY VAULT • ลุ้นรับสิทธิพิเศษฟรี
            </div>
            <h1 className="hero-title gacha-hero-title">
              หมุนวงล้อสุ่ม <span className="text-gradient">ปลดล็อกฟังก์ชันฟรี</span> <span style={{ whiteSpace: 'nowrap' }}>ให้โปรเจกต์คุณ</span>
            </h1>
            <p className="hero-subtitle" style={{ maxWidth: '680px', margin: '14px auto 0' }}>
              มอบของขวัญสำหรับลูกค้าใหม่และพาร์ทเนอร์ สุ่มรับสิทธิ์ติดตั้งระบบเสริมระดับพรีเมียม
              มูลค่าสูงสุด <span style={{ color: '#F59E0B', fontWeight: 700 }}>฿25,000</span> ฟรีทันที ไม่มีค่าใช้จ่ายแอบแฝง!
            </p>

            {/* Quick Stats Bar */}
            <div className="gacha-status-strip">
              <div className="status-item">
                <span className="label">สิทธิ์การสุ่มคงเหลือ:</span>
                <span className="value-badge">
                  <i className="fa-solid fa-ticket" style={{ color: '#F59E0B', marginRight: '5px' }}></i>
                  {spinsLeft} สิทธิ์
                </span>
                <button
                  className="btn-add-spin"
                  onClick={handleAddSpin}
                  title="รับสิทธิ์สุ่มเพิ่มฟรี"
                >
                  <i className="fa-solid fa-plus"></i> รับสิทธิ์เพิ่ม
                </button>
              </div>

              <div className="status-item">
                <button
                  className="btn-rates"
                  onClick={() => setShowDropRates(true)}
                >
                  <i className="fa-solid fa-chart-pie"></i> อัตราการดรอป (Probabilities)
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
              {/* Clean Pointer Indicators (Center of Reel) */}
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
                    transform: `translateX(${offset}px)`,
                    transition: transitionStyle,
                  }}
                >
                  {reelItems.map((prize, idx) => {
                    const isCenterPick = idx === targetIndex;
                    return (
                      <div
                        key={`${prize.id}-${idx}`}
                        className={`gacha-card rarity-${prize.rarity} ${isCenterPick && !spinning && winningPrize ? 'card-selected' : ''}`}
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
                              style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '50%' }}
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
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* PRIZE SHOWCASE GRID (All Possible Rewards)              */}
        {/* ======================================================== */}
        <section className="container" style={{ marginTop: '70px', marginBottom: '80px', maxWidth: '1440px' }}>
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
                        style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '8px' }}
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
              {/* Close Button */}
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

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

                {/* Footer Spin Again */}
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
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* DROP RATES MODAL                                        */}
        {/* ======================================================== */}
        {showDropRates && (
          <div className="gacha-modal-overlay">
            <div className="gacha-modal-backdrop" onClick={() => setShowDropRates(false)}></div>
            <div className="gacha-rates-modal">
              <button
                className="modal-close-btn"
                onClick={() => setShowDropRates(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px' }}>
                <i className="fa-solid fa-chart-pie" style={{ color: '#F59E0B', marginRight: '8px' }}></i>
                อัตราการออกรางวัล (Drop Rate Probability)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
                ระบบสุ่มด้วยอัลกอริทึมโปร่งใส 100% ไม่มีเกลือ ทุกครั้งที่หมุนจะได้รับฟังก์ชันจริง
              </p>

              <div className="rates-table">
                <div className="rate-row gold-tier">
                  <div className="tier-info">
                    <span className="tier-badge gold">LEGENDARY</span>
                    <span className="tier-desc">ฟังก์ชันระดับท็อป (สปีด 0.4s, LINE OA, AI, ส่วนลด 10%)</span>
                  </div>
                  <div className="tier-rate">{dropRates.legendary}%</div>
                </div>

                <div className="rate-row purple-tier">
                  <div className="tier-info">
                    <span className="tier-badge purple">EPIC</span>
                    <span className="tier-desc">ระบบพรีเมียม (PromptPay QR, SLA 3 เดือน, Export Engine)</span>
                  </div>
                  <div className="tier-rate">{dropRates.epic}%</div>
                </div>

                <div className="rate-row cyan-tier">
                  <div className="tier-info">
                    <span className="tier-badge cyan">RARE</span>
                    <span className="tier-desc">บริการเสริมพื้นฐาน (โดเมน .COM + Cloudflare SSL, Technical SEO)</span>
                  </div>
                  <div className="tier-rate">{dropRates.rare}%</div>
                </div>
              </div>

              <div style={{ marginTop: '22px', textAlign: 'center' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowDropRates(false)}
                  style={{ width: '100%' }}
                >
                  เข้าใจแล้ว
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </>
  );
}
