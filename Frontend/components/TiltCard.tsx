'use client';

import React, { useRef, useState, useEffect } from 'react';
import { soundFx } from '@/Frontend/utils/soundEffects';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; // max tilt degrees (default: 8)
  scale?: number; // scale on hover (default: 1.02)
  glare?: boolean; // spotlight glare effect
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  maxTilt = 7,
  scale = 1.018,
  glare = true,
  className = '',
  style = {},
  onClick,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const width = rect.width;
      const height = rect.height;

      const xPercent = (x / width - 0.5) * 2;
      const yPercent = (y / height - 0.5) * 2;

      const rotateX = -yPercent * maxTilt;
      const rotateY = xPercent * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (glare && spotlightRef.current) {
        spotlightRef.current.style.opacity = '1';
        spotlightRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(var(--primary-rgb), 0.16), transparent 75%)`;
      }
    });
  };

  const handleMouseEnter = () => {
    if (isTouchDevice || !cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.12s ease-out';
    soundFx.playHover();
  };

  const handleMouseLeave = () => {
    if (isTouchDevice || !cardRef.current) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glare && spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}
      {...rest}
    >
      {/* Glare / Spotlight Border overlay */}
      {glare && (
        <div
          ref={spotlightRef}
          className="tilt-card-spotlight"
          style={{
            opacity: 0,
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 3,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
      {children}
    </div>
  );
};
