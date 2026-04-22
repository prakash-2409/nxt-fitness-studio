'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import GlassCard from '@/components/ui/GlassCard';
import YellowButton from '@/components/ui/YellowButton';

gsap.registerPlugin(ScrollTrigger);

const transformations = [
  { id: 1, name: 'Rahul M.', duration: '3 MONTHS', stat: '-14kg', direction: 'down', trainer: 'Coach Vikram', category: '3m' },
  { id: 2, name: 'Sneha K.', duration: '6 MONTHS', stat: '-22kg', direction: 'down', trainer: 'Coach Priya', category: '6m' },
  { id: 3, name: 'Arun S.', duration: '3 MONTHS', stat: '+8kg MUSCLE', direction: 'up', trainer: 'Coach Arjun', category: '3m' },
  { id: 4, name: 'Divya R.', duration: '1 YEAR', stat: '-30kg', direction: 'down', trainer: 'Coach Priya', category: '1y' },
  { id: 5, name: 'Karthik V.', duration: '6 MONTHS', stat: '+12kg MUSCLE', direction: 'up', trainer: 'Coach Vikram', category: '6m' },
  { id: 6, name: 'Meera P.', duration: '3 MONTHS', stat: '-9kg', direction: 'down', trainer: 'Coach Priya', category: '3m' },
];

const filters = [
  { label: 'ALL', value: 'all' },
  { label: '3 MONTHS', value: '3m' },
  { label: '6 MONTHS', value: '6m' },
  { label: '1 YEAR+', value: '1y' },
];

export default function Transformations() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? transformations
    : transformations.filter((t) => t.category === activeFilter);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.transform-heading > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="transformations"
      style={{
        padding: 'clamp(80px, 12vw, 160px) 0',
        background: '#080808',
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="transform-heading" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ marginBottom: 24 }}>
            <SectionLabel index="04" label="TRANSFORMATIONS" />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 1.05,
              color: '#F0F0F0',
              marginBottom: 16,
            }}
          >
            REAL PEOPLE.
            <br />
            <span style={{ color: '#F5C400' }}>REAL RESULTS.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: '#666', maxWidth: 480, margin: '0 auto' }}>
            No filters. No tricks. Just consistent training and expert guidance.
          </p>
        </div>

        {/* Filter bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className="cursor-hover"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                padding: '10px 24px',
                border: `1px solid ${activeFilter === f.value ? '#F5C400' : '#333'}`,
                background: activeFilter === f.value ? 'rgba(245, 196, 0, 0.08)' : 'transparent',
                color: activeFilter === f.value ? '#F5C400' : '#666',
                cursor: 'none',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                letterSpacing: '0.1em',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div
          style={{
            columns: 'clamp(1, 3, 3)',
            columnCount: 3,
            gap: 16,
          }}
          className="transform-grid"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{ breakInside: 'avoid', marginBottom: 16 }}
              >
                <GlassCard
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  {/* Before/After images */}
                  <div style={{ display: 'flex', position: 'relative', height: 200 }}>
                    {/* Before */}
                    <div
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #1A1A1A 0%, #111 100%)',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 9,
                          color: '#F5C400',
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          letterSpacing: '0.1em',
                        }}
                      >
                        BEFORE
                      </span>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: 'rgba(245,196,0,0.08)' }}>B</span>
                    </div>
                    {/* Divider */}
                    <div style={{ width: 2, background: '#F5C400', zIndex: 1 }} />
                    {/* After */}
                    <div
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #222 0%, #1A1A1A 100%)',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 9,
                          color: '#F5C400',
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          letterSpacing: '0.1em',
                        }}
                      >
                        AFTER
                      </span>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: 'rgba(245,196,0,0.15)' }}>A</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                      <h4
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 22,
                          color: '#F0F0F0',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {t.name}
                      </h4>
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: 10,
                          color: '#080808',
                          background: '#F5C400',
                          padding: '3px 10px',
                          borderRadius: 999,
                          letterSpacing: '0.05em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t.duration}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 20,
                        color: t.direction === 'down' ? '#4ADE80' : '#F5C400',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      {t.direction === 'down' ? '↓' : '↑'} {t.stat}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: '#666',
              marginBottom: 24,
            }}
          >
            Want to see more? 340+ members have transformed at NXT.
          </p>
          <YellowButton variant="solid" href="https://wa.me/91XXXXXXXXXX">
            💬 START YOUR JOURNEY
          </YellowButton>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .transform-grid {
            column-count: 2 !important;
          }
        }
        @media (max-width: 768px) {
          .transform-grid {
            column-count: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
