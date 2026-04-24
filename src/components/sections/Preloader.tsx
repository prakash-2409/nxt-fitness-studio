'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDeviceAnimations } from '@/hooks/useDeviceAnimations';

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { animConfig } = useDeviceAnimations();

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Skip preloader on mobile
  useEffect(() => {
    if (!animConfig.enablePreloader) {
      handleComplete();
      if (containerRef.current) {
        containerRef.current.style.display = 'none';
      }
    }
  }, [animConfig.enablePreloader, handleComplete]);

  useGSAP(() => {
    if (!animConfig.enablePreloader) return;

    const tl = gsap.timeline({
      onComplete: () => {
        handleComplete();
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      },
    });

    // Progress bar
    gsap.to(progressRef.current, {
      width: '100%',
      duration: 2.8,
      ease: 'power1.inOut',
    });

    // Diamond drop in
    tl.fromTo(
      '.preloader-diamond',
      { scale: 0, opacity: 0, y: -60 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' },
      0.3
    );

    // Icon inside diamond
    tl.fromTo(
      '.preloader-icon',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
      0.8
    );

    // Text letters stagger
    tl.fromTo(
      '.preloader-letter',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.04, ease: 'power2.out' },
      1.0
    );

    // Horizontal line sweep
    tl.fromTo(
      '.preloader-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.4, ease: 'power2.out' },
      2.0
    );

    // Tagline
    tl.fromTo(
      '.preloader-tagline',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      2.4
    );

    // Exit — slide up
    tl.to(
      containerRef.current,
      {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
      },
      3.0
    );
  }, { scope: containerRef, dependencies: [animConfig.enablePreloader] });

  // Don't render on mobile
  if (!animConfig.enablePreloader) return null;

  const studioText = 'NXT FITNESS STUDIO';

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Noise texture background */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.04,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <filter id="preloaderNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#preloaderNoise)" />
      </svg>

      {/* Diamond logo */}
      <div
        className="preloader-diamond"
        style={{
          width: 120,
          height: 120,
          transform: 'rotate(45deg)',
          background: '#F5C400',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          marginBottom: 40,
        }}
      >
        <svg
          className="preloader-icon"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          style={{ transform: 'rotate(-45deg)', opacity: 0 }}
        >
          <path
            d="M30 8C32.2 8 34 9.8 34 12C34 14.2 32.2 16 30 16C27.8 16 26 14.2 26 12C26 9.8 27.8 8 30 8Z"
            fill="#080808"
          />
          <path
            d="M20 22L24 18H36L40 22L44 20L46 24L42 26L38 24V30L42 38V50H36V40L30 34L24 40V50H18V38L22 30V24L18 26L14 24L16 20L20 22Z"
            fill="#080808"
          />
          <path d="M12 20L16 18L20 22L16 24L12 20Z" fill="#080808" />
          <path d="M48 20L44 18L40 22L44 24L48 20Z" fill="#080808" />
        </svg>
      </div>

      {/* Studio name */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          marginBottom: 16,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {studioText.split('').map((letter, i) => (
          <span
            key={i}
            className="preloader-letter"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(24px, 5vw, 42px)',
              letterSpacing: '0.08em',
              color: '#F0F0F0',
              opacity: 0,
              display: letter === ' ' ? 'inline' : 'inline-block',
              width: letter === ' ' ? 12 : 'auto',
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Yellow sweep line */}
      <div
        className="preloader-line"
        style={{
          width: 200,
          height: 2,
          background: '#F5C400',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          marginBottom: 16,
        }}
      />

      {/* Tagline */}
      <p
        className="preloader-tagline"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 12,
          letterSpacing: '0.2em',
          color: '#666',
          opacity: 0,
          textTransform: 'uppercase',
        }}
      >
        CHENNAI · EST. 2021
      </p>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 2,
          background: 'rgba(245, 196, 0, 0.1)',
        }}
      >
        <div
          ref={progressRef}
          style={{
            width: 0,
            height: '100%',
            background: '#F5C400',
          }}
        />
      </div>
    </div>
  );
}
