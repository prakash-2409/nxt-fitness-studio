'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/ui/SectionLabel';
import DiamondBadge from '@/components/ui/DiamondBadge';

gsap.registerPlugin(ScrollTrigger);

const coaches = [
  {
    name: 'COACH VIKRAM',
    role: 'Head Trainer | Strength & Powerlifting',
    years: '6 Years Experience',
    cert: 'CPT',
    initials: 'V',
    stats: ['6+ YRS', '150+ CLIENTS', 'POWERLIFTING'],
    bio: 'Vikram specializes in building raw strength and powerlifting technique. His systematic approach has helped 150+ clients hit PRs.',
  },
  {
    name: 'COACH PRIYA',
    role: 'Nutrition & Weight Loss Specialist',
    years: '4 Years Experience',
    cert: 'CSCS',
    initials: 'P',
    stats: ['4+ YRS', '120+ CLIENTS', 'FAT LOSS'],
    bio: 'Priya combines nutrition science with training to deliver sustainable fat loss results. Her holistic approach sets her apart.',
  },
  {
    name: 'COACH ARJUN',
    role: 'Conditioning & Functional Fitness',
    years: '5 Years Experience',
    cert: 'NSCA',
    initials: 'A',
    stats: ['5+ YRS', '100+ CLIENTS', 'CONDITIONING'],
    bio: 'Arjun builds athletes who move well and perform better. His functional training protocols are tough but effective.',
  },
];

export default function Trainers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(!window.matchMedia('(hover: hover)').matches);
  }, []);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.trainers-heading > *',
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

      gsap.fromTo(
        '.trainer-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.trainers-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="trainers"
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
          left: -40,
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 400,
          color: 'rgba(245, 196, 0, 0.025)',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        03
      </div>

      <div className="section-container">
        {/* Header */}
        <div
          className="trainers-heading"
          style={{
            textAlign: 'center',
            marginBottom: 64,
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <SectionLabel index="03" label="THE COACHES" />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 1.05,
              color: '#F0F0F0',
              marginBottom: 20,
            }}
          >
            THE PEOPLE BEHIND YOUR{' '}
            <span style={{ color: '#F5C400' }}>RESULTS</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: '#666',
              maxWidth: 560,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Every trainer at NXT brings certified expertise, personal attention,
            and zero tolerance for excuses.
          </p>
        </div>

        {/* Coach cards grid */}
        <div
          className="trainers-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {coaches.map((coach, i) => (
            <CoachCard key={i} coach={coach} isTouchDevice={isTouchDevice} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .trainers-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .trainers-grid {
            grid-template-columns: 1fr !important;
          }
          .trainers-heading {
            text-align: left !important;
          }
          .trainers-heading p {
            margin: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

interface CoachCardProps {
  coach: (typeof coaches)[0];
  isTouchDevice: boolean;
}

function CoachCard({ coach, isTouchDevice }: CoachCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const toggleReveal = () => {
    if (isTouchDevice) setIsRevealed(!isRevealed);
  };

  return (
    <div
      className="trainer-card"
      onClick={toggleReveal}
      style={{
        aspectRatio: '3/4',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 0,
        cursor: 'none',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
      }}
      onMouseEnter={(e) => {
        if (!isTouchDevice) {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,196,0,0.4)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isTouchDevice) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {/* Photo placeholder with B&W to color transition */}
      <div
        className="coach-photo"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #1A1A1A 0%, #111 100%)',
          filter: isTouchDevice ? 'none' : 'grayscale(100%) contrast(1.1)',
          transition: 'filter 0.5s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          if (!isTouchDevice) e.currentTarget.style.filter = 'grayscale(0%) contrast(1)';
        }}
        onMouseLeave={(e) => {
          if (!isTouchDevice) e.currentTarget.style.filter = 'grayscale(100%) contrast(1.1)';
        }}
      >
        {/* Initials placeholder */}
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 120,
            color: 'rgba(245, 196, 0, 0.12)',
            userSelect: 'none',
          }}
        >
          {coach.initials}
        </span>
      </div>

      {/* Dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.95) 100%)',
          zIndex: 1,
        }}
      />

      {/* Certification badge */}
      <div
        className="cert-badge"
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 3,
          transition: 'transform 0.4s ease',
        }}
      >
        <DiamondBadge size="md">
          {coach.cert}
        </DiamondBadge>
      </div>

      {/* Bottom content (always visible) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 24,
          zIndex: 2,
        }}
      >
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 32,
            color: '#F0F0F0',
            letterSpacing: '0.02em',
            marginBottom: 4,
          }}
        >
          {coach.name}
        </h3>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            color: '#F5C400',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          {coach.role.split('|')[0].trim()}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: '#666',
          }}
        >
          {coach.years}
        </p>

        {/* Hover reveal content */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: isTouchDevice ? (isRevealed ? 200 : 0) : undefined,
            transition: 'max-height 0.5s ease',
          }}
          className={isTouchDevice ? '' : 'coach-reveal'}
        >
          <div
            style={{
              width: '100%',
              height: 1,
              background: '#F5C400',
              margin: '16px 0',
            }}
          />
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginBottom: 12,
            }}
          >
            {coach.stats.map((stat, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  color: '#888',
                  letterSpacing: '0.05em',
                }}
              >
                {stat}
              </span>
            ))}
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 13,
              color: '#ccc',
              lineHeight: 1.6,
              marginBottom: 16,
            }}
          >
            {coach.bio}
          </p>
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-hover"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 16,
              color: '#F5C400',
              borderLeft: '3px solid #F5C400',
              paddingLeft: 12,
              textDecoration: 'none',
              display: 'inline-block',
              letterSpacing: '0.05em',
            }}
          >
            BOOK A SESSION →
          </a>
        </div>
      </div>

      <style jsx>{`
        .trainer-card:hover .cert-badge {
          transform: rotate(45deg);
        }
        .coach-reveal {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s ease;
        }
        .trainer-card:hover .coach-reveal {
          max-height: 200px;
        }
        @media (max-width: 768px) {
          .trainer-card {
            aspect-ratio: 1/1 !important;
          }
        }
      `}</style>
    </div>
  );
}
