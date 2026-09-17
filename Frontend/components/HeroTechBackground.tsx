'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/Frontend/context/ThemeContext';
import { useSettings } from '@/Frontend/context/SettingsContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetAlpha: number;
}

interface CodeSnippet {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  colorType: 'primary' | 'secondary' | 'accent' | 'dim';
}

const BG_SCENES = [
  {
    id: 'office',
    title: '01 Tech Studio',
    image: '/assets/images/hero_futuristic_office.jpg',
  },
  {
    id: 'skyscraper',
    title: '02 Skyscraper HQ',
    image: '/assets/images/hero_futuristic_skyscraper.jpg',
  },
  {
    id: 'datacenter',
    title: '03 Quantum Server Lab',
    image: '/assets/images/hero_futuristic_datacenter.jpg',
  },
];

export const HeroTechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const { themeSettings } = useSettings();

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  // Auto-switch scenes automatically like a continuous video loop every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSceneIndex(prev => (prev + 1) % BG_SCENES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 800);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates for interactive gravity
    let mouse = { x: width / 2, y: height / 3, isHovered: false };
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovered = true;
    };
    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Code snippets pool
    const codeTexts = [
      'const studio = "DEV 888";',
      '<NextResponse.json({ status: 200 }) />',
      'async function buildSaaS(scale = "Enterprise") {',
      'PostgreSQL.query("SELECT * FROM studio_data");',
      'git commit -m "feat: ultra performance 100%"',
      'docker run -d -p 3333:3333 --name nexus',
      'export default React.memo(FullstackApp);',
      'const [latency, setLatency] = useState("0.4s");',
      'Redis.cache.set("metrics", { uptime: "99.99%" });',
      '01001110 01000101 01011000 01010101 01010011',
      'AI.optimizeDataPipeline({ model: "GPT-4o" })',
      'TypeScript: StrictMode = true;',
      'AWS.deployMicroservices({ region: "ap-southeast-1" })',
    ];

    // Initialize particles
    const particleCount = Math.min(Math.floor(width / 30), 45);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1,
        targetAlpha: Math.random() * 0.5 + 0.15,
      });
    }

    // Initialize floating code snippets
    const snippetCount = Math.min(Math.floor(width / 160), 8);
    const snippets: CodeSnippet[] = [];
    const colorTypes: ('primary' | 'secondary' | 'accent' | 'dim')[] = ['primary', 'secondary', 'accent', 'dim'];

    for (let i = 0; i < snippetCount; i++) {
      snippets.push({
        text: codeTexts[i % codeTexts.length],
        x: Math.random() * (width - 240) + 40,
        y: Math.random() * (height - 120) + 60,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.12 - Math.random() * 0.2,
        alpha: Math.random() * 0.3 + 0.08,
        targetAlpha: Math.random() * 0.4 + 0.15,
        colorType: colorTypes[i % colorTypes.length],
      });
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const primaryHex = themeSettings?.primaryColor || (typeof document !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() : '') || '#2563EB';
      const secondaryHex = themeSettings?.secondaryColor || (typeof document !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim() : '') || '#7C3AED';

      const hexToRgbStr = (hex: string) => {
        const clean = hex.replace('#', '').trim();
        let r = 37, g = 99, b = 235;
        if (clean.length === 6) {
          r = parseInt(clean.substring(0, 2), 16);
          g = parseInt(clean.substring(2, 4), 16);
          b = parseInt(clean.substring(4, 6), 16);
        }
        return `${r}, ${g}, ${b}`;
      };

      const primaryRgbStr = hexToRgbStr(primaryHex);

      // Draw constellation connecting lines
      ctx.lineWidth = 0.65;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * (isDark ? 0.14 : 0.08);
            ctx.strokeStyle = `rgba(${primaryRgbStr}, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.isHovered) {
          const mdx = mouse.x - p.x;
          const mdy = mouse.y - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            const force = (1 - mdist / 140) * 0.5;
            p.vx += (mdx / mdist) * force * 0.08;
            p.vy += (mdy / mdist) * force * 0.08;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.vx *= 0.99;
        p.vy *= 0.99;

        p.alpha += (p.targetAlpha - p.alpha) * 0.02;
        if (Math.abs(p.alpha - p.targetAlpha) < 0.04) {
          p.targetAlpha = Math.random() * (isDark ? 0.5 : 0.3) + 0.1;
        }

        ctx.fillStyle = i % 2 === 0 ? primaryHex : secondaryHex;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw floating code snippets
      ctx.font = '500 11px "JetBrains Mono", "Fira Code", monospace';
      for (let i = 0; i < snippets.length; i++) {
        const s = snippets[i];
        s.x += s.vx;
        s.y += s.vy;

        if (s.y < -30) {
          s.y = height + Math.random() * 40;
          s.x = Math.random() * (width - 240) + 30;
          s.text = codeTexts[Math.floor(Math.random() * codeTexts.length)];
        }

        s.alpha += (s.targetAlpha - s.alpha) * 0.025;
        if (Math.abs(s.alpha - s.targetAlpha) < 0.04) {
          s.targetAlpha = Math.random() * (isDark ? 0.38 : 0.22) + 0.08;
        }

        let snippetColor = isDark ? 'rgba(148, 163, 184, 0.8)' : '#334155';
        if (s.colorType === 'primary') snippetColor = isDark ? primaryHex : '#1D4ED8';
        else if (s.colorType === 'secondary') snippetColor = isDark ? secondaryHex : '#6D28D9';
        else if (s.colorType === 'accent') snippetColor = isDark ? '#10B981' : '#047857';

        ctx.save();
        ctx.globalAlpha = isDark ? s.alpha : Math.min(s.alpha * 0.85, 0.35);

        const textWidth = ctx.measureText(s.text).width;
        ctx.fillStyle = isDark ? 'rgba(10, 15, 29, 0.65)' : 'rgba(255, 255, 255, 0.92)';
        ctx.beginPath();
        ctx.roundRect(s.x - 6, s.y - 12, textWidth + 12, 18, 5);
        ctx.fill();

        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(203, 213, 225, 0.8)';
        ctx.stroke();

        ctx.fillStyle = snippetColor;
        ctx.fillText(s.text, s.x, s.y);
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [theme, themeSettings]);

  return (
    <div
      ref={containerRef}
      className="hero-tech-bg-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* 1. Cinematic Auto-Crossfading Video-Like Background Carousel */}
      {BG_SCENES.map((scene, idx) => {
        const isActive = idx === currentSceneIndex;
        return (
          <div
            key={scene.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${scene.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isActive ? (theme === 'dark' ? 0.42 : 0.46) : 0,
              transition: 'opacity 2.4s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: theme === 'dark' ? 'contrast(1.1) brightness(0.95)' : 'contrast(1.15) brightness(0.96)',
              transform: 'scale(1.04)',
              animation: isActive ? 'heroKenBurns 28s ease-in-out infinite alternate' : 'none',
              zIndex: isActive ? 1 : 0,
            }}
          />
        );
      })}

      {/* 2. Glassmorphic Gradient Vignette & Dark/Light Overlay for Peak Text Contrast */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            theme === 'dark'
              ? 'radial-gradient(ellipse at 50% 30%, rgba(10, 15, 29, 0.45) 0%, rgba(6, 10, 20, 0.88) 75%, var(--bg-body) 100%)'
              : 'radial-gradient(ellipse at 50% 35%, rgba(255, 255, 255, 0.35) 0%, rgba(248, 250, 252, 0.72) 65%, var(--bg-body) 100%)',
          backdropFilter: 'blur(1.5px)',
          WebkitBackdropFilter: 'blur(1.5px)',
          zIndex: 2,
        }}
      />

      {/* 3. Dynamic Interactive Canvas Layer (Floating Code & Particle Nodes) */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'relative',
          zIndex: 3,
        }}
      />

      {/* 4. Ambient Neon Glowing Lighting Flares */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '20%',
          width: '580px',
          height: '580px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.14) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'ambientFloat1 10s ease-in-out infinite alternate',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(var(--secondary-rgb), 0.12) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'ambientFloat2 12s ease-in-out infinite alternate',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* 5. Smooth Bottom Fade into Tech Marquee */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '160px',
          background: 'linear-gradient(to bottom, transparent, var(--bg-body))',
          pointerEvents: 'none',
          zIndex: 4,
        }}
      />

      {/* 6. Subtle Automatic Scene Status Pulse Indicator (Informative & Sleek on Desktop) */}
      <div className="hero-scene-indicator">
        <div className="hero-scene-badge">
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'var(--primary)',
              boxShadow: '0 0 8px var(--primary)',
              animation: 'pulseDot 2s infinite',
            }}
          />
          <span style={{ fontSize: '0.74rem', color: 'var(--text-sub)', fontWeight: 600 }}>
            {BG_SCENES[currentSceneIndex].title}
          </span>
          <div style={{ display: 'flex', gap: '4px', marginLeft: '4px' }}>
            {BG_SCENES.map((_, i) => (
              <span
                key={i}
                style={{
                  width: i === currentSceneIndex ? '14px' : '5px',
                  height: '4px',
                  borderRadius: '2px',
                  background: i === currentSceneIndex ? 'var(--primary)' : 'var(--text-sub)',
                  opacity: i === currentSceneIndex ? 1 : 0.35,
                  transition: 'all 0.5s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
