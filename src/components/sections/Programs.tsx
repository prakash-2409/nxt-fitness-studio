'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/ui/SectionLabel';
import MarqueeStrip from '@/components/ui/MarqueeStrip';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    id: 1,
    name: 'PERSONAL TRAINING',
    tagline: 'One-on-one expert-led sessions tailored to your goals',
    features: ['Customized workout plans', '1-on-1 coaching every session', 'Progress tracking & adjustments', 'Flexible scheduling'],
    intensity: 4,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#F5C400" strokeWidth="2">
        <circle cx="24" cy="24" r="18" /><circle cx="24" cy="24" r="12" /><circle cx="24" cy="24" r="6" /><circle cx="24" cy="24" r="2" fill="#F5C400" />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'STRENGTH & CONDITIONING',
    tagline: 'Build power, performance, and resilience',
    features: ['Progressive overload protocols', 'Compound movement focus', 'Periodized programming', 'Performance benchmarks'],
    intensity: 5,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#F5C400" strokeWidth="2.5">
        <rect x="4" y="18" width="6" height="12" rx="1" /><rect x="38" y="18" width="6" height="12" rx="1" />
        <rect x="10" y="20" width="4" height="8" rx="1" /><rect x="34" y="20" width="4" height="8" rx="1" />
        <line x1="14" y1="24" x2="34" y2="24" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'WEIGHT LOSS',
    tagline: 'Science-based fat loss with nutrition support',
    features: ['Caloric deficit planning', 'HIIT & steady-state cardio', 'Weekly body composition checks', 'Nutritional guidance'],
    intensity: 3,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#F5C400" strokeWidth="2">
        <path d="M24 4C24 4 30 12 30 20C30 28 24 32 24 44" /><path d="M24 4C24 4 18 12 18 20C18 28 24 32 24 44" />
        <path d="M16 16C16 16 24 20 32 16" /><path d="M14 24C14 24 24 28 34 24" />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'MUSCLE BUILDING',
    tagline: 'Hypertrophy-focused progressive training',
    features: ['Muscle group split routines', 'Time under tension focus', 'Rest-pause & drop sets', 'Nutrition for growth'],
    intensity: 4,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#F5C400" strokeWidth="2">
        <path d="M20 12C20 12 16 16 16 24C16 32 20 36 20 36" /><path d="M28 12C28 12 32 16 32 24C32 32 28 36 28 36" />
        <path d="M20 12L28 12" /><path d="M20 36L28 36" /><line x1="24" y1="8" x2="24" y2="12" /><line x1="24" y1="36" x2="24" y2="40" />
      </svg>
    ),
  },
  {
    id: 5,
    name: 'DIET & NUTRITION',
    tagline: 'Custom meal plans with expert guidance',
    features: ['Personalized macro targets', 'Meal prep guidance', 'Supplement advice', 'Weekly check-ins'],
    intensity: 2,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#F5C400" strokeWidth="2">
        <path d="M24 4V16M24 16C20 16 16 20 16 24C16 28 20 44 24 44C28 44 32 28 32 24C32 20 28 16 24 16Z" />
        <line x1="18" y1="28" x2="30" y2="28" />
      </svg>
    ),
  },
  {
    id: 6,
    name: 'GROUP SESSIONS',
    tagline: 'High-energy training, better together',
    features: ['Small batch sizes (max 8)', 'Competitive atmosphere', 'Partner workouts', 'Community building'],
    intensity: 3,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#F5C400" strokeWidth="2">
        <circle cx="16" cy="14" r="5" /><circle cx="32" cy="14" r="5" /><circle cx="24" cy="18" r="5" />
        <path d="M8 36C8 28 12 24 16 24" /><path d="M40 36C40 28 36 24 32 24" /><path d="M14 40C14 30 18 26 24 26C30 26 34 30 34 40" />
      </svg>
    ),
  },
];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentProgram, setCurrentProgram] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useGSAP(() => {
    if (isMobile || !trackRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const trackWidth = trackRef.current!.scrollWidth;
      const containerWidth = containerRef.current!.offsetWidth * 0.7;

      gsap.to(trackRef.current, {
        x: -(trackWidth - containerWidth),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${trackWidth}`,
          pin: containerRef.current,
          scrub: 1,
          onUpdate: (self) => {
            setProgress(self.progress);
            const idx = Math.min(
              6,
              Math.floor(self.progress * 6) + 1
            );
            setCurrentProgram(idx);
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef, dependencies: [isMobile] });

  const marqueeItems = [
    'PERSONAL TRAINING',
    'STRENGTH',
    'WEIGHT LOSS',
    'MUSCLE GAIN',
    'NUTRITION',
    'GROUP SESSIONS',
  ];

  return (
    <>
      <section
        ref={sectionRef}
        id="programs"
        style={{
          position: 'relative',
          minHeight: isMobile ? 'auto' : undefined,
        }}
      >
        <div
          ref={containerRef}
          style={{
            height: isMobile ? 'auto' : '100vh',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            overflow: 'hidden',
            background: '#080808',
          }}
        >
          {/* Left — Fixed text panel */}
          <div
            style={{
              width: isMobile ? '100%' : '30%',
              padding: isMobile ? '60px 24px 40px' : '80px 60px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <SectionLabel index="02" label="PROGRAMS" />

            <h2
              style={{
                fontFamily: "var(--font-hero)",
                fontSize: 'clamp(40px, 5vw, 72px)',
                lineHeight: 1,
                color: '#F0F0F0',
                marginTop: 24,
                marginBottom: 20,
                letterSpacing: '0.02em',
              }}
            >
              CHOOSE
              <br />
              YOUR
              <br />
              PROGRAM.
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: '#666',
                lineHeight: 1.6,
                marginBottom: 40,
                maxWidth: 300,
              }}
            >
              Six specialized tracks. Expert coaching. Zero guesswork.
            </p>

            {/* Progress bar (desktop only) */}
            {!isMobile && (
              <>
                <div
                  style={{
                    width: 4,
                    height: 200,
                    background: '#1A1A1A',
                    borderRadius: 2,
                    marginBottom: 24,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: `${progress * 100}%`,
                      background: '#F5C400',
                      borderRadius: 2,
                      transition: 'height 0.1s linear',
                    }}
                  />
                </div>

                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 12,
                    color: '#666',
                    letterSpacing: '0.1em',
                  }}
                >
                  PROGRAM {String(currentProgram).padStart(2, '0')}/06
                </span>
              </>
            )}
          </div>

          {/* Right — Scrolling track */}
          {isMobile ? (
            /* Mobile: CSS scroll-snap carousel */
            <div
              style={{
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                display: 'flex',
                gap: 16,
                padding: '0 24px 40px',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} isMobile />
              ))}
            </div>
          ) : (
            <div
              style={{
                width: '70%',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <div
                ref={trackRef}
                style={{
                  display: 'flex',
                  gap: 40,
                  paddingRight: 80,
                  willChange: 'transform',
                }}
              >
                {programs.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Marquee transition */}
      <MarqueeStrip
        items={marqueeItems}
        bgColor="#F5C400"
        textColor="#080808"
        speed="fast"
      />
    </>
  );
}

interface ProgramCardProps {
  program: (typeof programs)[0];
  isMobile?: boolean;
}

function ProgramCard({ program, isMobile = false }: ProgramCardProps) {
  return (
    <div
      className="program-card"
      style={{
        width: isMobile ? '85vw' : 420,
        height: isMobile ? 'auto' : 'calc(100vh - 120px)',
        flexShrink: 0,
        background: '#1A1A1A',
        border: '1px solid rgba(245, 196, 0, 0.12)',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'none',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease',
        scrollSnapAlign: isMobile ? 'start' : undefined,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = 'rgba(245, 196, 0, 0.05)';
        el.style.borderColor = 'rgba(245, 196, 0, 0.5)';
        el.style.boxShadow = '0 0 60px rgba(245, 196, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = '#1A1A1A';
        el.style.borderColor = 'rgba(245, 196, 0, 0.12)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: '#F5C400',
        }}
      />

      {/* Background number */}
      <div
        className="card-bg-number"
        style={{
          position: 'absolute',
          bottom: -20,
          right: -10,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 180,
          color: 'rgba(245, 196, 0, 0.04)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'color 0.4s ease',
        }}
      >
        {String(program.id).padStart(2, '0')}
      </div>

      {/* Icon */}
      <div style={{ marginBottom: 24 }}>{program.icon}</div>

      {/* Number tag */}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: '#444',
          letterSpacing: '0.1em',
          marginBottom: 16,
        }}
      >
        [ PROGRAM_{String(program.id).padStart(2, '0')} ]
      </span>

      {/* Name */}
      <h3
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(36px, 4vw, 52px)',
          color: '#F0F0F0',
          lineHeight: 1.05,
          letterSpacing: '0.02em',
          marginBottom: 12,
        }}
      >
        {program.name}
      </h3>

      {/* Tagline */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: '#666',
          lineHeight: 1.5,
          marginBottom: 32,
        }}
      >
        {program.tagline}
      </p>

      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32, flex: 1 }}>
        {program.features.map((feature, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: '#999',
            }}
          >
            <span style={{ width: 6, height: 6, background: '#F5C400', borderRadius: '50%', flexShrink: 0 }} />
            {feature}
          </div>
        ))}
      </div>

      {/* Intensity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            color: '#555',
            letterSpacing: '0.1em',
            marginRight: 4,
          }}
        >
          INTENSITY
        </span>
        {[1, 2, 3, 4, 5].map((level) => (
          <span
            key={level}
            style={{
              fontSize: 12,
              color: level <= program.intensity ? '#F5C400' : '#333',
            }}
          >
            ◆
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-hover"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 18,
          color: '#F5C400',
          letterSpacing: '0.05em',
          textDecoration: 'none',
          position: 'relative',
          display: 'inline-block',
          paddingBottom: 4,
        }}
        onMouseEnter={(e) => {
          const underline = e.currentTarget.querySelector('.cta-underline') as HTMLElement;
          if (underline) underline.style.transform = 'scaleX(1)';
        }}
        onMouseLeave={(e) => {
          const underline = e.currentTarget.querySelector('.cta-underline') as HTMLElement;
          if (underline) underline.style.transform = 'scaleX(0)';
        }}
      >
        → GET STARTED
        <span
          className="cta-underline"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: '#F5C400',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.3s ease',
          }}
        />
      </a>
    </div>
  );
}
