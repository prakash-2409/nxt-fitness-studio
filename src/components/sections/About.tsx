'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/ui/SectionLabel';
import YellowButton from '@/components/ui/YellowButton';
import DiamondBadge from '@/components/ui/DiamondBadge';
import GlassCard from '@/components/ui/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '🏋',
    label: 'PREMIUM EQUIPMENT',
    desc: 'Commercial-grade machines & free weights',
  },
  {
    icon: '👤',
    label: 'PERSONAL ATTENTION',
    desc: 'Low member-to-trainer ratio, always',
  },
  {
    icon: '📍',
    label: 'PRIVATE STUDIO',
    desc: 'No crowds. Just you and your goals.',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const mm = ScrollTrigger.matchMedia({
        // Desktop animations
        '(min-width: 769px)': function () {
          gsap.fromTo(
            '.about-image',
            { x: -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
            }
          );

          gsap.fromTo(
            '.about-content > *',
            { x: 40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
            }
          );
        },
        // Mobile animations
        '(max-width: 768px)': function () {
          gsap.fromTo(
            '.about-image',
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' },
            }
          );

          gsap.fromTo(
            '.about-content > *',
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' },
            }
          );
        },
      });

      // Diamond wobble
      gsap.to('.about-diamond', {
        rotation: 50,
        duration: 0.6,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        repeatDelay: 3,
      });

      return mm;
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        padding: 'clamp(80px, 12vw, 160px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background number */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: -20,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 300,
          color: 'rgba(245, 196, 0, 0.03)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        01
      </div>

      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 80px)',
          display: 'grid',
          gridTemplateColumns: '55% 45%',
          gap: 80,
          alignItems: 'start',
        }}
        className="about-grid"
      >
        {/* Left — Image */}
        <div className="about-image" style={{ position: 'relative' }}>
          {/* Warning stripe overlap */}
          <div
            className="warning-stripes"
            style={{
              position: 'absolute',
              top: -10,
              left: -10,
              width: 40,
              height: 200,
              opacity: 0.6,
              zIndex: 2,
            }}
          />

          {/* Image container */}
          <div
            className="img-hover-zoom"
            style={{
              position: 'relative',
              aspectRatio: '4/5',
              borderLeft: '3px solid #F5C400',
              borderBottom: '3px solid #F5C400',
              overflow: 'hidden',
            }}
          >
            {/* Placeholder image */}
            <div
              style={{
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(135deg, #1A1A1A 0%, #111111 40%, #0D0D0D 100%)',
                position: 'relative',
              }}
            >
              {/* Gym atmosphere texture */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse at 30% 60%, rgba(245, 196, 0, 0.04) 0%, transparent 50%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 60,
                  left: 40,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 120,
                  color: 'rgba(245, 196, 0, 0.06)',
                  lineHeight: 1,
                  letterSpacing: '0.05em',
                }}
              >
                NXT
              </div>
            </div>
          </div>

          {/* Google reviews badge */}
          <div style={{ position: 'absolute', bottom: 20, right: -20, zIndex: 3 }}>
            <GlassCard
              style={{
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span style={{ fontSize: 16 }}>⭐</span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  color: '#F0F0F0',
                  letterSpacing: '0.05em',
                }}
              >
                4.9 · 200+ Google Reviews
              </span>
            </GlassCard>
          </div>

          {/* Diamond badge */}
          <div
            className="about-diamond"
            style={{
              position: 'absolute',
              top: -20,
              right: -20,
              zIndex: 3,
            }}
          >
            <DiamondBadge size="lg">
              N
            </DiamondBadge>
          </div>
        </div>

        {/* Right — Content */}
        <div className="about-content" style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 24 }}>
            <SectionLabel index="01" label="ABOUT NXT" />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(40px, 5vw, 64px)',
              lineHeight: 1.05,
              color: '#F0F0F0',
              marginBottom: 32,
            }}
          >
            NOT YOUR
            <br />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              AVERAGE
              <span
                style={{
                  position: 'absolute',
                  bottom: 4,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: '#F5C400',
                  borderRadius: 2,
                }}
              />
            </span>
            <br />
            GYM.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              lineHeight: 1.8,
              color: '#999',
              marginBottom: 40,
              maxWidth: 500,
            }}
          >
            NXT Fitness Studio isn&apos;t a commercial gym where you&apos;re just another
            membership number. It&apos;s a private studio in Chennai, built for people
            who train with intent — and leave with real, visible results. Every
            corner of this space was designed to push you.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 12,
                      color: '#F5C400',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: 4,
                    }}
                  >
                    {f.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: '#666',
                    }}
                  >
                    {f.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <YellowButton variant="outline">
            TAKE A TOUR →
          </YellowButton>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
