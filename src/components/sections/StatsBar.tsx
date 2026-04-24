'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';

const stats = [
  { value: 340, suffix: '+', label: 'ACTIVE MEMBERS' },
  { value: 2400, suffix: '+', label: 'SQ. FT. STUDIO', format: true },
  { value: 5, suffix: '', label: 'EXPERT TRAINERS' },
  { value: 3, suffix: '+', label: 'YEARS RUNNING' },
];

function useCounter(target: number, shouldFormat: boolean, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let start = 0;
    const totalFrames = 60;
    const increment = target / totalFrames;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [inView, target]);

  const display = shouldFormat ? count.toLocaleString() : count.toString();
  return display;
}

function StatItem({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const display = useCounter(stat.value, !!stat.format, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px 8px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(40px, 5vw, 72px)',
            color: '#F5C400',
            lineHeight: 1,
          }}
        >
          {display}
        </span>
        {stat.suffix && (
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(24px, 3vw, 40px)',
              color: '#F5C400',
            }}
          >
            {stat.suffix}
          </span>
        )}
      </div>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 'clamp(9px, 1.2vw, 11px)',
          letterSpacing: '0.2em',
          color: '#555555',
          textTransform: 'uppercase',
          marginTop: 8,
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section
      aria-label="Statistics"
      style={{
        width: '100%',
        background: '#0F0F0F',
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Warning stripes on edges — desktop only */}
      <div
        className="warning-stripes stats-stripe-left"
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
        className="warning-stripes stats-stripe-right"
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

      <div style={{ marginBottom: 8, paddingTop: 16, paddingLeft: 'clamp(20px, 5vw, 80px)' }}>
        <SectionLabel index="01" label="STATS" />
      </div>

      <div
        className="stats-grid"
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '16px clamp(20px, 5vw, 80px) 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          alignItems: 'center',
        }}
      >
        {stats.map((stat, i) => (
          <StatItem key={i} stat={stat} index={i} />
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0 !important;
          }
          .stats-stripe-left,
          .stats-stripe-right {
            display: none !important;
          }
        }
        @media (max-width: 479px) {
          .stats-grid {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
