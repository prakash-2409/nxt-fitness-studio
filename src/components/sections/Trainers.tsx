'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDeviceAnimations } from '@/hooks/useDeviceAnimations';
import SectionLabel from '@/components/ui/SectionLabel';
import DiamondBadge from '@/components/ui/DiamondBadge';

const coaches = [
  { name: 'COACH VIKRAM', role: 'Head Trainer | Strength & Powerlifting', years: '6 Years Experience', cert: 'CPT', initials: 'V', stats: ['6+ YRS', '150+ CLIENTS', 'POWERLIFTING'], bio: 'Vikram specializes in building raw strength and powerlifting technique. His systematic approach has helped 150+ clients hit PRs.' },
  { name: 'COACH PRIYA', role: 'Nutrition & Weight Loss Specialist', years: '4 Years Experience', cert: 'CSCS', initials: 'P', stats: ['4+ YRS', '120+ CLIENTS', 'FAT LOSS'], bio: 'Priya combines nutrition science with training to deliver sustainable fat loss results. Her holistic approach sets her apart.' },
  { name: 'COACH ARJUN', role: 'Conditioning & Functional Fitness', years: '5 Years Experience', cert: 'NSCA', initials: 'A', stats: ['5+ YRS', '100+ CLIENTS', 'CONDITIONING'], bio: 'Arjun builds athletes who move well and perform better. His functional training protocols are tough but effective.' },
];

export default function Trainers() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile, isTablet, isTouch } = useDeviceAnimations();

  return (
    <section ref={sectionRef} id="trainers" style={{ padding: 'clamp(80px, 12vw, 160px) 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background number */}
      <div style={{ position: 'absolute', left: -40, top: '50%', transform: 'translateY(-50%)', fontFamily: "'Bebas Neue', sans-serif", fontSize: isMobile ? 200 : 400, color: 'rgba(245, 196, 0, 0.025)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }} aria-hidden="true">03</div>

      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} style={{ textAlign: isMobile ? 'left' : 'center', marginBottom: isMobile ? 40 : 64 }}>
          <div style={{ marginBottom: 24 }}><SectionLabel index="03" label="THE COACHES" /></div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 1.05, color: '#F0F0F0', marginBottom: 20 }}>
            THE PEOPLE BEHIND YOUR <span style={{ color: '#F5C400' }}>RESULTS</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: isMobile ? 15 : 16, color: '#666', maxWidth: 560, margin: isMobile ? '0' : '0 auto', lineHeight: 1.6 }}>
            Every trainer at NXT brings certified expertise, personal attention, and zero tolerance for excuses.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 24 : 24 }}>
          {coaches.map((coach, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
              <CoachCard coach={coach} isMobile={isMobile} isTouch={isTouch} isTablet={isTablet} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoachCard({ coach, isMobile, isTouch, isTablet }: { coach: typeof coaches[0]; isMobile: boolean; isTouch: boolean; isTablet: boolean }) {
  const [isRevealed, setIsRevealed] = useState(false);

  // Mobile: show info always (no hover/tap needed)
  if (isMobile) {
    return (
      <div style={{ background: '#1A1A1A', border: '1px solid rgba(245,196,0,0.12)', overflow: 'hidden' }}>
        {/* Photo placeholder — color always visible on mobile */}
        <div style={{ width: '100%', aspectRatio: '16/9', background: 'linear-gradient(135deg, #1A1A1A 0%, #111 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 80, color: 'rgba(245, 196, 0, 0.12)', userSelect: 'none' }}>{coach.initials}</span>
          <div style={{ position: 'absolute', top: 12, right: 12 }}><DiamondBadge size="md">{coach.cert}</DiamondBadge></div>
        </div>
        {/* Info always shown */}
        <div style={{ padding: '20px 24px' }}>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: '#F0F0F0', letterSpacing: '0.02em', marginBottom: 4 }}>{coach.name}</h3>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#F5C400', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{coach.role.split('|')[0].trim()}</p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: '#666', marginBottom: 12 }}>{coach.years}</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            {coach.stats.map((s, i) => <span key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: '#888', letterSpacing: '0.05em' }}>{s}</span>)}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: '#aaa', lineHeight: 1.6, marginBottom: 16 }}>{coach.bio}</p>
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: '#080808', background: '#F5C400', textDecoration: 'none', display: 'block', textAlign: 'center', padding: '14px 0', letterSpacing: '0.05em', minHeight: 48 }}>
            BOOK A SESSION →
          </a>
        </div>
      </div>
    );
  }

  // Tablet: tap toggle overlay
  // Desktop: hover reveal
  return (
    <div
      onClick={isTouch ? () => setIsRevealed(!isRevealed) : undefined}
      style={{ aspectRatio: '3/4', position: 'relative', overflow: 'hidden', cursor: isTouch ? 'pointer' : 'none', transition: 'transform 0.4s ease, box-shadow 0.4s ease' }}
      onMouseEnter={!isTouch ? (e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,196,0,0.4)'; } : undefined}
      onMouseLeave={!isTouch ? (e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; } : undefined}
    >
      <div className="coach-photo" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1A1A1A 0%, #111 100%)', filter: isTouch ? 'none' : 'grayscale(100%) contrast(1.1)', transition: 'filter 0.5s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onMouseEnter={!isTouch ? (e) => { e.currentTarget.style.filter = 'grayscale(0%) contrast(1)'; } : undefined}
        onMouseLeave={!isTouch ? (e) => { e.currentTarget.style.filter = 'grayscale(100%) contrast(1.1)'; } : undefined}
      >
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 120, color: 'rgba(245, 196, 0, 0.12)', userSelect: 'none' }}>{coach.initials}</span>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.95) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 3 }}><DiamondBadge size="md">{coach.cert}</DiamondBadge></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, zIndex: 2 }}>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: '#F0F0F0', letterSpacing: '0.02em', marginBottom: 4 }}>{coach.name}</h3>
        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#F5C400', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>{coach.role.split('|')[0].trim()}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: '#666' }}>{coach.years}</p>
        <div style={{ overflow: 'hidden', maxHeight: isTouch ? (isRevealed ? 200 : 0) : undefined, transition: 'max-height 0.5s ease' }} className={isTouch ? '' : 'coach-reveal'}>
          <div style={{ width: '100%', height: 1, background: '#F5C400', margin: '16px 0' }} />
          <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
            {coach.stats.map((s, i) => <span key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#888', letterSpacing: '0.05em' }}>{s}</span>)}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: '#ccc', lineHeight: 1.6, marginBottom: 16 }}>{coach.bio}</p>
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: '#F5C400', borderLeft: '3px solid #F5C400', paddingLeft: 12, textDecoration: 'none', display: 'inline-block', letterSpacing: '0.05em' }}>
            BOOK A SESSION →
          </a>
        </div>
      </div>

      <style jsx>{`
        .coach-reveal { max-height: 0; overflow: hidden; transition: max-height 0.5s ease; }
        div:hover .coach-reveal { max-height: 200px; }
      `}</style>
    </div>
  );
}
