'use client';

import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import DiamondBadge from '@/components/ui/DiamondBadge';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: 'What are your gym timings?', a: "We're open Monday to Saturday, 6:00 AM to 10:00 PM, and Sunday 7:00 AM to 2:00 PM." },
  { q: 'Do you offer a free trial session?', a: 'Yes! We offer one complimentary trial session for all new walk-ins. DM us on WhatsApp to schedule yours.' },
  { q: 'Is diet consultation included in membership?', a: 'Diet consultation is included in Quarterly and Annual plans. Monthly members can add it as an optional add-on.' },
  { q: 'Is NXT a private studio or a commercial gym?', a: 'NXT is a private studio. We deliberately limit our membership count to ensure every member gets personal attention and never has to wait for equipment.' },
  { q: 'Do you have parking available?', a: 'Yes, two-wheeler parking is available in front of the studio. Street parking is also available nearby for four-wheelers.' },
  { q: 'Can I pause or freeze my membership?', a: 'Yes, you can pause your membership for up to 30 days per year with prior notice. No extra charges.' },
  { q: 'Do you have separate training for women?', a: 'Our studio is co-ed and welcoming to all. We have female trainers on staff and maintain a respectful, professional environment.' },
  { q: 'How many members are in each batch?', a: 'We cap batch sizes at 8 to maintain quality. Personal training sessions are always 1-on-1.' },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-left > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 8vw, 120px)',
        background: '#0A0A0A',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '40% 60%',
          gap: 80,
        }}
        className="faq-grid"
      >
        {/* Left */}
        <div className="faq-left">
          <div style={{ marginBottom: 24 }}>
            <SectionLabel index="08" label="FAQ" />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(40px, 5vw, 72px)',
              color: '#F0F0F0',
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            GOT QUESTIONS?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: '#666',
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            Everything you need to know before walking in. Still have questions? DM us on Instagram.
          </p>
          <DiamondBadge size="lg" style={{ opacity: 0.8 }}>
            ?
          </DiamondBadge>
        </div>

        {/* Right — Accordion */}
        <div>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid #222',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="cursor-hover"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'none',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 17,
                    fontWeight: 600,
                    color: '#F0F0F0',
                    paddingRight: 16,
                  }}
                >
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 24,
                    color: '#F5C400',
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 15,
                        color: '#777',
                        lineHeight: 1.8,
                        padding: '0 0 20px',
                      }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
