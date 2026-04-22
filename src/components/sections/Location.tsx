'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/ui/SectionLabel';
import YellowButton from '@/components/ui/YellowButton';

gsap.registerPlugin(ScrollTrigger);

const timings = [
  { day: 'Monday - Friday', hours: '6:00 AM - 10:00 PM' },
  { day: 'Saturday', hours: '6:00 AM - 10:00 PM' },
  { day: 'Sunday', hours: '7:00 AM - 2:00 PM' },
];

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.location-content > *',
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
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        padding: 'clamp(80px, 10vw, 140px) 0',
        background: '#080808',
      }}
    >
      <div className="section-container">
        <div style={{ marginBottom: 48 }}>
          <SectionLabel index="09" label="FIND US" />
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(40px, 6vw, 72px)',
              color: '#F0F0F0',
              lineHeight: 1.05,
              marginTop: 20,
            }}
          >
            COME IN.
            <br />
            <span style={{ color: '#F5C400' }}>LET&apos;S TALK.</span>
          </h2>
        </div>

        <div
          className="location-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
          }}
        >
          {/* Map */}
          <div
            style={{
              border: '2px solid rgba(245, 196, 0, 0.2)',
              overflow: 'hidden',
              height: 450,
              position: 'relative',
            }}
          >
            {/* Placeholder map — dark styled */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d80.0884167!3d13.0475631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'invert(90%) hue-rotate(180deg)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NXT Fitness Studio Location"
            />
          </div>

          {/* Contact details */}
          <div className="location-content">
            {/* Address */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5C400" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: '#F0F0F0', marginBottom: 4 }}>
                  NXT Fitness Studio
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: '#666', lineHeight: 1.6 }}>
                  123 Example Street, Anna Nagar
                  <br />
                  Chennai, Tamil Nadu 600040
                </p>
              </div>
            </div>

            {/* Phone */}
            <a
              href="tel:+91XXXXXXXXXX"
              className="cursor-hover"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                color: '#F5C400',
                letterSpacing: '0.05em',
                display: 'block',
                marginBottom: 32,
                textDecoration: 'none',
              }}
            >
              +91 XXXXX XXXXX
            </a>

            {/* Timings */}
            <div style={{ marginBottom: 32 }}>
              <h4
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  color: '#666',
                  letterSpacing: '0.2em',
                  marginBottom: 16,
                  textTransform: 'uppercase',
                }}
              >
                TIMINGS
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {timings.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '12px 0',
                      background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
                      paddingLeft: 8,
                      paddingRight: 8,
                    }}
                  >
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#999' }}>
                      {t.day}
                    </span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#F0F0F0' }}>
                      {t.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <YellowButton variant="outline" href="tel:+91XXXXXXXXXX">
                📞 CALL NOW
              </YellowButton>
              <YellowButton variant="solid" href="https://wa.me/91XXXXXXXXXX">
                💬 CHAT ON WHATSAPP
              </YellowButton>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .location-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
