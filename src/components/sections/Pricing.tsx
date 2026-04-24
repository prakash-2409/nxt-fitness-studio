'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useDeviceAnimations } from '@/hooks/useDeviceAnimations';
import SectionLabel from '@/components/ui/SectionLabel';
import YellowButton from '@/components/ui/YellowButton';

const plans = [
  {
    name: 'MONTHLY',
    price: '₹2,499',
    period: '/month',
    features: ['Full gym access', 'Locker facility', 'Basic trainer guidance', 'Flexible timings', 'Progress tracking'],
    cta: 'BOOK ON WHATSAPP',
    ctaVariant: 'outline' as const,
    popular: false,
    original: null,
    savings: null,
    whatsappPlan: 'Monthly',
  },
  {
    name: 'QUARTERLY',
    price: '₹5,999',
    period: '/3 months',
    features: ['Full gym access', 'Locker facility', 'Basic trainer guidance', 'Flexible timings', 'Progress tracking', 'Personal trainer sessions (2/month)', 'Diet consultation'],
    cta: '⚡ BEST VALUE — BOOK NOW',
    ctaVariant: 'solid' as const,
    popular: true,
    original: '₹7,497',
    savings: 'SAVE 20%',
    whatsappPlan: 'Quarterly',
  },
  {
    name: 'ANNUAL',
    price: '₹8,999',
    period: '/year',
    features: ['Full gym access', 'Locker facility', 'Basic trainer guidance', 'Flexible timings', 'Progress tracking', 'Unlimited trainer sessions', 'Diet consultation', 'NXT branded gym kit'],
    cta: 'BOOK ON WHATSAPP',
    ctaVariant: 'outline' as const,
    popular: false,
    original: '₹15,000',
    savings: 'SAVE 35%',
    whatsappPlan: 'Annual',
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useDeviceAnimations();

  return (
    <section
      ref={sectionRef}
      id="pricing"
      style={{
        padding: 'clamp(80px, 12vw, 160px) 0',
        background: '#080808',
        position: 'relative',
      }}
    >
      {/* Subtle spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245,196,0,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container" style={{ position: 'relative' }}>
        {/* Header */}
        <div className="pricing-header" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ marginBottom: 24 }}>
            <SectionLabel index="07" label="MEMBERSHIP" />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(40px, 6vw, 80px)',
              color: '#F0F0F0',
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            PICK YOUR PLAN.
          </h2>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              color: '#666',
              marginBottom: 16,
              letterSpacing: '0.05em',
            }}
          >
            [ NO HIDDEN FEES · CANCEL ANYTIME · RESULTS GUARANTEED ]
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: '#F5C400',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            ⚠ Limited slots available — we keep our batches small on purpose.
          </p>
        </div>

        {/* Pricing cards */}
        <div
          className="pricing-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? 16 : 24,
            alignItems: 'start',
            marginBottom: 48,
            maxWidth: isMobile ? 500 : undefined,
            marginLeft: isMobile ? 'auto' : undefined,
            marginRight: isMobile ? 'auto' : undefined,
          }}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`pricing-card ${plan.popular && !isMobile ? 'glow-pulse' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: plan.popular ? 'rgba(245, 196, 0, 0.04)' : '#1A1A1A',
                border: plan.popular
                  ? '1px solid rgba(245, 196, 0, 0.4)'
                  : '1px solid rgba(245, 196, 0, 0.12)',
                borderRadius: 2,
                padding: isMobile ? '32px 24px' : '40px 32px',
                position: 'relative',
                transform: plan.popular && !isMobile ? 'translateY(-20px)' : 'none',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                ...(plan.popular && !isMobile
                  ? { boxShadow: '0 0 40px rgba(245, 196, 0, 0.25), 0 0 80px rgba(245, 196, 0, 0.1)' }
                  : {}),
              }}
            >
              {/* Yellow top bar for popular */}
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: '#F5C400',
                  }}
                />
              )}

              {/* Popular badge */}
              {plan.popular && (
                <span
                  style={{
                    position: 'absolute',
                    top: isMobile ? -14 : 16,
                    left: isMobile ? '50%' : undefined,
                    right: isMobile ? undefined : 16,
                    transform: isMobile ? 'translateX(-50%)' : 'none',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10,
                    color: '#080808',
                    background: '#F5C400',
                    padding: '4px 12px',
                    borderRadius: 999,
                    letterSpacing: '0.08em',
                    zIndex: 2,
                  }}
                >
                  MOST POPULAR
                </span>
              )}

              {/* Plan name */}
              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 32,
                  color: plan.popular ? '#F5C400' : '#F0F0F0',
                  letterSpacing: '0.05em',
                  marginBottom: 20,
                }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div style={{ marginBottom: 24 }}>
                {plan.original && (
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 24,
                      color: '#555',
                      textDecoration: 'line-through',
                      marginRight: 12,
                    }}
                  >
                    {plan.original}
                  </span>
                )}
                <span
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(48px, 5vw, 64px)',
                    color: plan.popular ? '#F5C400' : '#F0F0F0',
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: '#666',
                    marginLeft: 4,
                  }}
                >
                  {plan.period}
                </span>
                {plan.savings && (
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 11,
                      color: '#4ADE80',
                      background: 'rgba(74, 222, 128, 0.1)',
                      padding: '3px 10px',
                      borderRadius: 999,
                      marginLeft: 12,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {plan.savings}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div style={{ width: '100%', height: 1, background: 'rgba(245, 196, 0, 0.12)', marginBottom: 24 }} />

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                {plan.features.map((feature, fi) => (
                  <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: '#F5C400', fontSize: 14, flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: '#999' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <YellowButton
                variant={plan.ctaVariant}
                href={`https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%27m%20interested%20in%20the%20${plan.whatsappPlan}%20membership%20at%20NXT%20Fitness%20Studio`}
                className="w-full"
                style={isMobile ? { width: '100%', minHeight: 52, justifyContent: 'center' } : undefined}
              >
                {plan.popular ? '⚡ ' : '💬 '}{plan.cta}
              </YellowButton>
            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            marginBottom: 24,
            flexWrap: 'wrap',
          }}
        >
          {['✓ No joining fees', '✓ Pause anytime', '✓ Expert coaches included'].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                color: '#555',
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <p
          style={{
            textAlign: 'center',
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: '#444',
          }}
        >
          Prices shown are base rates. DM us on WhatsApp for corporate or student discounts.
        </p>
      </div>


    </section>
  );
}
