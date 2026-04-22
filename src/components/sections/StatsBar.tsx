'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 340, suffix: '+', label: 'ACTIVE MEMBERS' },
  { value: 2400, suffix: '+', label: 'SQ. FT. STUDIO', format: true },
  { value: 5, suffix: '', label: 'EXPERT TRAINERS' },
  { value: 3, suffix: '+', label: 'YEARS RUNNING' },
];

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Fade in the entire bar
      gsap.fromTo(
        sectionRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );

      // Counter animations
      stats.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          onUpdate: () => {
            const num = Math.round(obj.val);
            el.textContent = stat.format
              ? num.toLocaleString()
              : num.toString();
          },
        });

        // Suffix scale-in after count
        if (stat.suffix) {
          gsap.fromTo(
            `.stat-suffix-${i}`,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: 'back.out(2)',
              delay: 2,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        background: '#0F0F0F',
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Warning stripes on edges */}
      <div
        className="warning-stripes"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 60,
          opacity: 0.08,
          maskImage: 'linear-gradient(to right, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, black, transparent)',
        }}
      />
      <div
        className="warning-stripes"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 60,
          opacity: 0.08,
          maskImage: 'linear-gradient(to left, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to left, black, transparent)',
        }}
      />

      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '40px clamp(20px, 5vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          alignItems: 'center',
        }}
        className="stats-grid"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px 0',
              position: 'relative',
            }}
          >
            {/* Diagonal slash divider (not on first) */}
            {i > 0 && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%) rotate(20deg)',
                  width: 1,
                  height: 60,
                  background: '#333',
                }}
              />
            )}

            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span
                ref={(el) => { numberRefs.current[i] = el; }}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  color: '#F5C400',
                  lineHeight: 1,
                }}
              >
                0
              </span>
              {stat.suffix && (
                <span
                  className={`stat-suffix-${i}`}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(28px, 3vw, 40px)',
                    color: '#F5C400',
                    opacity: 0,
                    display: 'inline-block',
                  }}
                >
                  {stat.suffix}
                </span>
              )}
            </div>

            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.2em',
                color: '#555555',
                textTransform: 'uppercase',
                marginTop: 8,
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
