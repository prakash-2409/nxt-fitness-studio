'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/ui/SectionLabel';
import YellowButton from '@/components/ui/YellowButton';

gsap.registerPlugin(ScrollTrigger);

const posts = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  likes: Math.floor(Math.random() * 200) + 50,
}));

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ig-header > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.ig-cell',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.ig-grid', start: 'top 85%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="instagram"
      style={{
        padding: '80px 0',
        background: '#080808',
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="ig-header" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <SectionLabel index="06" label="FOLLOW THE JOURNEY" />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(32px, 5vw, 64px)',
              color: '#F0F0F0',
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              @NXT_GYM
            </span>{' '}
            on Instagram
          </h2>
        </div>

        {/* Grid */}
        {/* TODO: Replace with Behold.so embed widget for live Instagram feed */}
        <div
          className="ig-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 4,
            marginBottom: 48,
          }}
        >
          {posts.map((post) => (
            <div
              key={post.id}
              className="ig-cell cursor-image"
              style={{
                aspectRatio: '1/1',
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(${135 + post.id * 30}deg, #1A1A1A 0%, #111 50%, #0D0D0D 100%)`,
                cursor: 'none',
              }}
            >
              {/* Gym atmosphere placeholder */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at ${30 + post.id * 10}% ${40 + post.id * 5}%, rgba(245, 196, 0, 0.04) 0%, transparent 50%)`,
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 48,
                  color: 'rgba(245, 196, 0, 0.06)',
                }}
              >
                NXT
              </span>

              {/* Hover overlay */}
              <div
                className="ig-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(245, 196, 0, 0.85)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transform: 'translateY(100%)',
                  transition: 'transform 0.4s ease',
                }}
              >
                <span style={{ fontSize: 24 }}>♥</span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 14,
                    color: '#080808',
                    fontWeight: 700,
                  }}
                >
                  {post.likes}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10,
                    color: '#080808',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  VIEW POST
                </span>
              </div>

              <style jsx>{`
                .ig-cell:hover .ig-overlay {
                  transform: translateY(0) !important;
                }
                @media (max-width: 768px) {
                  .ig-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                  }
                }
              `}</style>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <YellowButton
            variant="outline"
            href="https://instagram.com/nxt_gym"
          >
            FOLLOW @NXT_GYM →
          </YellowButton>
        </div>
      </div>
    </section>
  );
}
