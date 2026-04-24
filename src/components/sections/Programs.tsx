'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useDeviceAnimations } from '@/hooks/useDeviceAnimations';
import SectionLabel from '@/components/ui/SectionLabel';
import MarqueeStrip from '@/components/ui/MarqueeStrip';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  { id: 1, name: 'PERSONAL TRAINING', tagline: 'One-on-one expert-led sessions', features: ['Customized workout plans', '1-on-1 coaching', 'Progress tracking', 'Flexible scheduling'], intensity: 4, iconPath: 'M24 6a18 18 0 100 36 18 18 0 000-36zm0 6a12 12 0 100 24 12 12 0 000-24zm0 6a6 6 0 100 12 6 6 0 000-12z' },
  { id: 2, name: 'STRENGTH & CONDITIONING', tagline: 'Build power and resilience', features: ['Progressive overload', 'Compound movements', 'Periodized programming', 'Benchmarks'], intensity: 5, iconPath: 'M4 18h6v12H4zm34 0h6v12h-6zm6 2h4v8h-4zm24 0h4v8h-4zM14 24h20' },
  { id: 3, name: 'WEIGHT LOSS', tagline: 'Science-based fat loss', features: ['Caloric deficit planning', 'HIIT & cardio', 'Body composition checks', 'Nutritional guidance'], intensity: 3, iconPath: 'M24 4s6 8 6 16-6 12-6 24M24 4s-6 8-6 16 6 12 6 24M16 16s8 4 16 0M14 24s10 4 20 0' },
  { id: 4, name: 'MUSCLE BUILDING', tagline: 'Hypertrophy-focused training', features: ['Split routines', 'Time under tension', 'Drop sets', 'Growth nutrition'], intensity: 4, iconPath: 'M20 12s-4 4-4 12 4 12 4 12M28 12s4 4 4 12-4 12-4 12M20 12h8M20 36h8M24 8v4M24 36v4' },
  { id: 5, name: 'DIET & NUTRITION', tagline: 'Custom meal plans', features: ['Personalized macros', 'Meal prep guidance', 'Supplement advice', 'Weekly check-ins'], intensity: 2, iconPath: 'M24 4v12m0 0c-4 0-8 4-8 8s4 20 8 20 8-16 8-20-4-8-8-8zM18 28h12' },
  { id: 6, name: 'GROUP SESSIONS', tagline: 'High-energy group training', features: ['Small batches (max 8)', 'Competitive atmosphere', 'Partner workouts', 'Community'], intensity: 3, iconPath: 'M16 14a5 5 0 100-10 5 5 0 000 10zM32 14a5 5 0 100-10 5 5 0 000 10zM24 18a5 5 0 100-10 5 5 0 000 10z' },
];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet, isDesktop } = useDeviceAnimations();
  const [currentProgram, setCurrentProgram] = useState(1);
  const [progress, setProgress] = useState(0);
  const [activeDot, setActiveDot] = useState(0);

  useGSAP(() => {
    if (!isDesktop || !trackRef.current || !containerRef.current) return;
    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': function () {
        const tw = trackRef.current!.scrollWidth;
        const cw = containerRef.current!.offsetWidth * 0.7;
        gsap.to(trackRef.current, {
          x: -(tw - cw), ease: 'none', force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current, start: 'top top', end: `+=${tw}`,
            pin: containerRef.current, scrub: 1,
            onUpdate: (self) => { setProgress(self.progress); setCurrentProgram(Math.min(6, Math.floor(self.progress * 6) + 1)); },
          },
        });
      },
    });
  }, { scope: sectionRef, dependencies: [isDesktop] });

  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const cw = el.scrollWidth / programs.length;
    setActiveDot(Math.min(Math.round(el.scrollLeft / cw), programs.length - 1));
  };

  return (
    <>
      <section ref={sectionRef} id="programs" style={{ position: 'relative' }}>
        <div ref={containerRef} style={{ height: isDesktop ? '100vh' : 'auto', display: 'flex', flexDirection: isDesktop ? 'row' : 'column', overflow: 'hidden', background: '#080808' }}>
          {/* Header panel */}
          <div style={{ width: isDesktop ? '30%' : '100%', padding: isMobile ? '60px 24px 32px' : isTablet ? '60px 40px 32px' : '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: isDesktop ? 'center' : 'flex-start', flexShrink: 0 }}>
            <SectionLabel index="02" label="PROGRAMS" />
            <h2 style={{ fontFamily: "var(--font-hero)", fontSize: isMobile ? 'clamp(36px, 10vw, 48px)' : 'clamp(40px, 5vw, 72px)', lineHeight: 1, color: '#F0F0F0', marginTop: 24, marginBottom: 16, letterSpacing: '0.02em' }}>
              CHOOSE<br />YOUR<br />PROGRAM.
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: isMobile ? 14 : 15, color: '#666', lineHeight: 1.6, marginBottom: isDesktop ? 40 : 24, maxWidth: 300 }}>
              Six specialized tracks. Expert coaching. Zero guesswork.
            </p>
            {isDesktop && (
              <>
                <div style={{ width: 4, height: 200, background: '#1A1A1A', borderRadius: 2, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: `${progress * 100}%`, background: '#F5C400', borderRadius: 2, transition: 'height 0.1s linear' }} />
                </div>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: '#666', letterSpacing: '0.1em' }}>PROGRAM {String(currentProgram).padStart(2, '0')}/06</span>
              </>
            )}
          </div>

          {isDesktop ? (
            <div style={{ width: '70%', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
              <div ref={trackRef} style={{ display: 'flex', gap: 40, paddingRight: 80, willChange: 'transform' }}>
                {programs.map((p) => <Card key={p.id} p={p} v="desktop" />)}
              </div>
            </div>
          ) : isTablet ? (
            <div style={{ padding: '0 40px 60px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {programs.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}>
                  <Card p={p} v="tablet" />
                </motion.div>
              ))}
            </div>
          ) : (
            <>
              <div ref={mobileScrollRef} onScroll={handleMobileScroll} className="programs-scroll" style={{ overflowX: 'scroll', scrollSnapType: 'x mandatory', display: 'flex', gap: 16, padding: '0 24px 24px', WebkitOverflowScrolling: 'touch' }}>
                {programs.map((p) => <Card key={p.id} p={p} v="mobile" />)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '8px 0 40px' }}>
                {programs.map((_, i) => <span key={i} style={{ width: activeDot === i ? 8 : 6, height: activeDot === i ? 8 : 6, background: activeDot === i ? '#F5C400' : '#333', transform: 'rotate(45deg)', transition: 'all 0.3s ease' }} />)}
              </div>
            </>
          )}
        </div>
      </section>
      <MarqueeStrip items={['PERSONAL TRAINING', 'STRENGTH', 'WEIGHT LOSS', 'MUSCLE GAIN', 'NUTRITION', 'GROUP SESSIONS']} bgColor="#F5C400" textColor="#080808" speed="fast" />
      <style jsx>{`.programs-scroll::-webkit-scrollbar { display: none; } .programs-scroll { scrollbar-width: none; -ms-overflow-style: none; }`}</style>
    </>
  );
}

function Card({ p, v }: { p: typeof programs[0]; v: 'desktop' | 'tablet' | 'mobile' }) {
  const m = v === 'mobile';
  const t = v === 'tablet';
  return (
    <div style={{ width: m ? '80vw' : t ? '100%' : 420, minWidth: m ? '80vw' : undefined, height: m ? 'auto' : t ? 'auto' : 'calc(100vh - 120px)', minHeight: m ? 420 : undefined, flexShrink: 0, background: '#1A1A1A', border: '1px solid rgba(245,196,0,0.12)', borderTop: '3px solid #F5C400', position: 'relative', overflow: 'hidden', padding: m ? '32px 28px' : 40, display: 'flex', flexDirection: 'column', scrollSnapAlign: m ? 'start' : undefined, cursor: m ? 'default' : 'none', transition: 'border-color 0.4s ease, box-shadow 0.4s ease' }}
      onMouseEnter={!m ? (e) => { e.currentTarget.style.background = 'rgba(245,196,0,0.05)'; e.currentTarget.style.borderColor = 'rgba(245,196,0,0.5)'; e.currentTarget.style.boxShadow = '0 0 60px rgba(245,196,0,0.15)'; } : undefined}
      onMouseLeave={!m ? (e) => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.borderColor = 'rgba(245,196,0,0.12)'; e.currentTarget.style.boxShadow = 'none'; } : undefined}
    >
      {!m && <div style={{ position: 'absolute', bottom: -20, right: -10, fontFamily: "'Bebas Neue', sans-serif", fontSize: 180, color: 'rgba(245,196,0,0.04)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>{String(p.id).padStart(2, '0')}</div>}
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#F5C400" strokeWidth="2" style={{ marginBottom: 20 }}><path d={p.iconPath} /></svg>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: m ? 10 : 11, color: '#444', letterSpacing: '0.1em', marginBottom: 12 }}>[ PROGRAM_{String(p.id).padStart(2, '0')} ]</span>
      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: m ? 'clamp(32px,8vw,44px)' : 'clamp(36px,4vw,52px)', color: '#F0F0F0', lineHeight: 1.05, letterSpacing: '0.02em', marginBottom: 8 }}>{p.name}</h3>
      <p style={{ fontFamily: "var(--font-body)", fontSize: m ? 13 : 14, color: '#666', lineHeight: 1.5, marginBottom: m ? 20 : 32 }}>{p.tagline}</p>
      {m && <div style={{ width: '100%', height: 1, background: '#222', marginBottom: 20 }} />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: m ? 10 : 12, marginBottom: m ? 24 : 32, flex: 1 }}>
        {p.features.map((f, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: "'Space Mono', monospace", fontSize: m ? 11 : 12, color: '#999' }}><span style={{ width: 6, height: 6, background: '#F5C400', borderRadius: '50%', flexShrink: 0 }} />{f}</div>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#555', letterSpacing: '0.1em' }}>INTENSITY</span>
          {[1, 2, 3, 4, 5].map((l) => <span key={l} style={{ fontSize: 12, color: l <= p.intensity ? '#F5C400' : '#333' }}>◆</span>)}
        </div>
        <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: m ? 16 : 18, color: '#F5C400', letterSpacing: '0.05em', textDecoration: 'none' }}>→ GET STARTED</a>
      </div>
    </div>
  );
}
