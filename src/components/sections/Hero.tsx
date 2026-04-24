'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, Variants } from 'framer-motion';
import { useDeviceAnimations } from '@/hooks/useDeviceAnimations';
import SectionLabel from '@/components/ui/SectionLabel';
import YellowButton from '@/components/ui/YellowButton';
import MarqueeStrip from '@/components/ui/MarqueeStrip';
import { useTextScramble } from '@/hooks/useTextScramble';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  preloaderDone: boolean;
}

export default function Hero({ preloaderDone }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isMobile, isDesktop, animConfig } = useDeviceAnimations();

  const warningText = useTextScramble('WARNING.');

  // Desktop: GSAP content reveal after preloader
  useGSAP(() => {
    if (!preloaderDone || isMobile) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-line',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: animConfig.duration.normal,
          stagger: 0.15,
          ease: animConfig.ease,
          delay: 0.2,
        }
      );

      // Yellow frame borders
      gsap.fromTo('.hero-border-top', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.out', delay: 0.3 });
      gsap.fromTo('.hero-border-right', { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: 'power2.out', delay: 0.5 });
      gsap.fromTo('.hero-border-bottom', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.out', delay: 0.7 });
      gsap.fromTo('.hero-border-left', { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: 'power2.out', delay: 0.9 });

      gsap.fromTo('.hero-stripes', { opacity: 0 }, { opacity: 0.15, duration: 1, delay: 1 });

      // Video parallax — desktop only
      if (animConfig.enableParallax && videoRef.current) {
        gsap.to(videoRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      gsap.fromTo(
        '.scroll-line',
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, duration: 1.2, ease: 'power1.inOut', repeat: -1, yoyo: true }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef, dependencies: [preloaderDone, isMobile, animConfig] });

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
  };

  const marqueeItems = [
    'NXT FITNESS STUDIO',
    'CHENNAI',
    'TRAIN HARDER',
    'NO EXCUSES',
    'EST. 2021',
    '⚠ RESULTS AHEAD',
    '340+ MEMBERS',
  ];

  // Mobile: Framer Motion fade-in (since preloader is skipped)
  const mobileVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100svh',
        minHeight: 600,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Video/Image Background */}
      <div
        ref={videoRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          transform: 'translateZ(0)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 30% 40%, rgba(245, 196, 0, 0.06) 0%, transparent 60%), linear-gradient(180deg, #0A0A0A 0%, #080808 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.7) 60%, rgba(8,8,8,1) 100%)',
            zIndex: 1,
          }}
        />
      </div>

      {/* Yellow Frame Borders — thinner on mobile */}
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => {
        const inset = isMobile ? 12 : 20;
        const thickness = isMobile ? 1 : 2;
        const isH = side === 'top' || side === 'bottom';
        const origins: Record<string, string> = { top: 'left', right: 'top', bottom: 'right', left: 'bottom' };
        return (
          <div
            key={side}
            className={`hero-border-${side}`}
            style={{
              position: 'absolute',
              top: side === 'bottom' ? undefined : inset,
              bottom: side === 'top' ? undefined : (side === 'bottom' ? (isMobile ? 56 : 68) : inset),
              left: side === 'right' ? undefined : inset,
              right: side === 'left' ? undefined : inset,
              width: isH ? undefined : thickness,
              height: isH ? thickness : undefined,
              background: '#F5C400',
              opacity: isMobile ? 0.3 : 0.4,
              zIndex: 3,
              transformOrigin: origins[side],
              ...(isMobile ? {} : {}),
            }}
          />
        );
      })}

      {/* Warning stripes top-left — desktop only */}
      {!isMobile && (
        <div
          className="hero-stripes warning-stripes"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 200,
            height: 200,
            opacity: 0,
            zIndex: 2,
            maskImage: 'linear-gradient(135deg, black 30%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(135deg, black 30%, transparent 70%)',
          }}
        />
      )}

      {/* Main Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: isMobile ? 24 : 'clamp(24px, 10vw, 160px)',
          paddingRight: isMobile ? 24 : 'clamp(24px, 5vw, 80px)',
        }}
      >
        {isMobile ? (
          // Mobile: Framer Motion entrance
          <>
            <motion.div custom={0} initial="hidden" animate="visible" variants={mobileVariants} style={{ marginBottom: 24 }}>
              <SectionLabel index="00" label="HERO" />
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={mobileVariants}
              style={{
                fontFamily: "var(--font-hero)",
                fontSize: 'clamp(48px, 12vw, 72px)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                color: '#F5C400',
                marginBottom: 0,
                wordBreak: 'break-word',
              }}
            >
              WARNING.
            </motion.h1>

            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={mobileVariants}
              style={{
                fontFamily: "var(--font-hero)",
                fontSize: 'clamp(48px, 12vw, 72px)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                color: '#F0F0F0',
              }}
            >
              THIS GYM
            </motion.h1>

            <motion.h1
              custom={3}
              initial="hidden"
              animate="visible"
              variants={mobileVariants}
              style={{
                fontFamily: "var(--font-hero)",
                fontSize: 'clamp(38px, 10vw, 64px)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                color: '#F0F0F0',
                marginBottom: 24,
                wordBreak: 'break-word',
                hyphens: 'auto' as const,
              }}
            >
              DELIVERS RESULTS.
            </motion.h1>

            <motion.p
              custom={4}
              initial="hidden"
              animate="visible"
              variants={mobileVariants}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.7,
                color: '#999',
                maxWidth: 480,
                marginBottom: 32,
              }}
            >
              Chennai&apos;s most serious private training studio. Built for people who actually show up and demand results.
            </motion.p>

            <motion.div
              custom={5}
              initial="hidden"
              animate="visible"
              variants={mobileVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <YellowButton variant="solid" href="https://wa.me/91XXXXXXXXXX" style={{ width: '100%', minHeight: 52, justifyContent: 'center' }}>
                ⚡ START YOUR TRIAL
              </YellowButton>
              <YellowButton variant="outline" onClick={scrollToAbout} style={{ width: '100%', minHeight: 52, justifyContent: 'center' }}>
                ↓ EXPLORE
              </YellowButton>
            </motion.div>
          </>
        ) : (
          // Desktop: GSAP entrance (hero-line class)
          <>
            <div className="hero-line" style={{ marginBottom: 24, opacity: 0 }}>
              <SectionLabel index="00" label="HERO" />
            </div>

            <h1
              className="hero-line"
              style={{
                fontFamily: "var(--font-hero)",
                fontSize: 'clamp(64px, 14vw, 200px)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                color: '#F5C400',
                opacity: 0,
                marginBottom: 0,
              }}
            >
              {warningText}
            </h1>

            <h1
              className="hero-line"
              style={{
                fontFamily: "var(--font-hero)",
                fontSize: 'clamp(64px, 14vw, 200px)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                color: '#F0F0F0',
                opacity: 0,
              }}
            >
              THIS GYM
            </h1>

            <h1
              className="hero-line"
              style={{
                fontFamily: "var(--font-hero)",
                fontSize: 'clamp(64px, 14vw, 200px)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                color: '#F0F0F0',
                opacity: 0,
                marginBottom: 32,
              }}
            >
              DELIVERS RESULTS.
            </h1>

            <p
              className="hero-line"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.7,
                color: '#999',
                maxWidth: 480,
                opacity: 0,
                marginBottom: 40,
              }}
            >
              Chennai&apos;s most serious private training studio. Built for people who actually show up and demand results.
            </p>

            <div
              className="hero-line"
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', opacity: 0 }}
            >
              <YellowButton variant="solid" href="https://wa.me/91XXXXXXXXXX">⚡ START YOUR TRIAL</YellowButton>
              <YellowButton variant="outline" onClick={scrollToAbout}>↓ EXPLORE</YellowButton>
            </div>
          </>
        )}
      </div>

      {/* Scroll Indicator — positioned higher on mobile */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.3em',
              color: 'rgba(245, 196, 0, 0.6)',
              textTransform: 'uppercase',
            }}
          >
            SCROLL
          </span>
          <div
            className="scroll-line"
            style={{
              width: 1,
              height: 40,
              background: 'rgba(245, 196, 0, 0.6)',
              transformOrigin: 'top',
            }}
          />
        </div>
      )}

      {/* Yellow Marquee Strip */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5 }}>
        <MarqueeStrip
          items={marqueeItems}
          bgColor="#F5C400"
          textColor="#080808"
          speed={isMobile ? 'normal' : 'normal'}
        />
      </div>
    </section>
  );
}
