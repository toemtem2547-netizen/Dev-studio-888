'use client';

import React from 'react';
import { useTheme } from '@/Frontend/context/ThemeContext';

interface TechItem {
  name: string;
  icon: string;
  color: string;
  glow: string;
  lightColor?: string;
}

// Comprehensive Tech Ecosystem across all Languages & Stacks (Logo Only)
const TECH_LOGOS: TechItem[] = [
  { name: 'Next.js 15', icon: 'fa-solid fa-n', color: '#FFFFFF', lightColor: '#0F172A', glow: 'rgba(37, 99, 235, 0.4)' },
  { name: 'React 19', icon: 'fa-brands fa-react', color: '#00D8FF', lightColor: '#0284C7', glow: 'rgba(0, 216, 255, 0.45)' },
  { name: 'TypeScript', icon: 'fa-brands fa-js', color: '#3178C6', glow: 'rgba(49, 120, 198, 0.45)' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#68A063', lightColor: '#16A34A', glow: 'rgba(104, 160, 99, 0.45)' },
  { name: 'Python & AI', icon: 'fa-brands fa-python', color: '#3776AB', glow: 'rgba(55, 118, 171, 0.45)' },
  { name: 'OpenAI / Claude AI', icon: 'fa-solid fa-brain', color: '#10A37F', glow: 'rgba(16, 163, 127, 0.45)' },
  { name: 'PostgreSQL', icon: 'fa-solid fa-database', color: '#336791', glow: 'rgba(51, 103, 145, 0.45)' },
  { name: 'Supabase Cloud', icon: 'fa-solid fa-bolt', color: '#3ECF8E', lightColor: '#059669', glow: 'rgba(62, 207, 142, 0.45)' },
  { name: 'Docker', icon: 'fa-brands fa-docker', color: '#2496ED', glow: 'rgba(36, 150, 237, 0.45)' },
  { name: 'AWS Cloud', icon: 'fa-brands fa-aws', color: '#FF9900', lightColor: '#D97706', glow: 'rgba(255, 153, 0, 0.45)' },
  { name: 'Google Cloud (GCP)', icon: 'fa-brands fa-google', color: '#4285F4', glow: 'rgba(66, 133, 244, 0.45)' },
  { name: 'Go (Golang)', icon: 'fa-brands fa-golang', color: '#00ADD8', lightColor: '#0284C7', glow: 'rgba(0, 173, 216, 0.45)' },
  { name: 'Rust', icon: 'fa-brands fa-rust', color: '#DEA584', lightColor: '#B45309', glow: 'rgba(222, 165, 132, 0.45)' },
  { name: 'Vue.js 3', icon: 'fa-brands fa-vuejs', color: '#42B883', lightColor: '#059669', glow: 'rgba(66, 184, 131, 0.45)' },
  { name: 'Flutter & Mobile', icon: 'fa-solid fa-mobile-screen-button', color: '#02569B', glow: 'rgba(2, 86, 155, 0.45)' },
  { name: 'TailwindCSS', icon: 'fa-solid fa-wind', color: '#38BDF8', lightColor: '#0284C7', glow: 'rgba(56, 189, 248, 0.45)' },
  { name: 'PromptPay & Stripe', icon: 'fa-solid fa-credit-card', color: '#635BFF', glow: 'rgba(99, 91, 255, 0.45)' },
  { name: 'Redis Cache', icon: 'fa-solid fa-server', color: '#DC382D', glow: 'rgba(220, 56, 45, 0.45)' },
  { name: 'PHP & Laravel', icon: 'fa-brands fa-php', color: '#777BB4', glow: 'rgba(119, 123, 180, 0.45)' },
  { name: 'Java & Spring', icon: 'fa-brands fa-java', color: '#ED8B00', lightColor: '#D97706', glow: 'rgba(237, 139, 0, 0.45)' },
  { name: 'Security & OAuth', icon: 'fa-solid fa-shield-halved', color: '#EAB308', lightColor: '#CA8A04', glow: 'rgba(234, 179, 8, 0.45)' },
  { name: 'Git & CI/CD', icon: 'fa-brands fa-git-alt', color: '#F05032', glow: 'rgba(240, 80, 50, 0.45)' },
];

export const TechTicker: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Seamless loop repeated items
  const loopItems = [...TECH_LOGOS, ...TECH_LOGOS, ...TECH_LOGOS, ...TECH_LOGOS];

  return (
    <div className="tech-marquee-wrapper" aria-label="Technology Stack Logos">
      {/* Top subtle ambient glow line */}
      <div className="tech-marquee-glow-top"></div>
      
      {/* Single clean minimalist logo-only row */}
      <div className="tech-marquee-lane">
        <div className="tech-marquee-track tech-marquee-track-left">
          {loopItems.map((item, index) => {
            const activeColor = (!isDark && item.lightColor) ? item.lightColor : item.color;
            return (
              <div
                key={`logo-${item.name}-${index}`}
                className="tech-logo-bubble"
                style={{
                  '--brand-color': activeColor,
                  '--brand-glow': item.glow,
                } as React.CSSProperties}
              >
                <i className={item.icon} style={{ color: activeColor }}></i>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
