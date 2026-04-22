'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import YellowButton from '@/components/ui/YellowButton';

export default function NotFound() {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    gsap.to(textRef.current, {
      scale: 1.05,
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#080808',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 24,
      }}
    >
      {/* Giant 404 background text */}
      <div
        ref={textRef}
        style={{
          position: 'absolute',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(200px, 30vw, 600px)',
          color: 'rgba(245, 196, 0, 0.06)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        404
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Diamond logo */}
        <div
          style={{
            width: 60,
            height: 60,
            transform: 'rotate(45deg)',
            background: '#F5C400',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          <span
            style={{
              transform: 'rotate(-45deg)',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22,
              color: '#080808',
              fontWeight: 700,
            }}
          >
            N
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: '#F5C400',
            letterSpacing: '0.05em',
            marginBottom: 16,
          }}
        >
          ⚠ PAGE NOT FOUND
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            color: '#666',
            maxWidth: 400,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          Even our missing pages are stronger than most gyms.
        </p>

        <YellowButton variant="solid" href="/">
          ← BACK TO HOME
        </YellowButton>
      </div>
    </div>
  );
}
