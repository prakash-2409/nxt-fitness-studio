'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  const warningText = useTextScramble('WARNING.');

  // Content reveal after preloader
  useGSAP(() => {
    if (!preloaderDone) return;

    const ctx = gsap.context(() => {
      // Hero content stagger reveal
      gsap.fromTo(
        '.hero-line',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Yellow frame borders
      gsap.fromTo(
        '.hero-border-top',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out', delay: 0.3 }
      );
      gsap.fromTo(
        '.hero-border-right',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.8, ease: 'power2.out', delay: 0.5 }
      );
      gsap.fromTo(
        '.hero-border-bottom',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out', delay: 0.7 }
      );
      gsap.fromTo(
        '.hero-border-left',
        { scaleY: 0 },
        { scaleY: 1, duration: 0.8, ease: 'power2.out', delay: 0.9 }
      );

      // Warning stripes
      gsap.fromTo(
        '.hero-stripes',
        { opacity: 0 },
        { opacity: 0.15, duration: 1, delay: 1 }
      );

      // Video parallax on scroll
      if (videoRef.current) {
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

      // Scroll indicator loop
      gsap.fromTo(
        '.scroll-line',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef, dependencies: [preloaderDone] });

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
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

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100svh',
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
        }}
      >
        {/* Dark gradient placeholder — replace with video */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 30% 40%, rgba(245, 196, 0, 0.06) 0%, transparent 60%), linear-gradient(180deg, #0A0A0A 0%, #080808 100%)',
          }}
        />
        {/* Video gradient overlay */}
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

      {/* Yellow Frame Borders */}
      <div className="hero-border-top" style={{ position: 'absolute', top: 20, left: 20, right: 20, height: 2, background: '#F5C400', opacity: 0.4, zIndex: 3, transformOrigin: 'left' }} />
      <div className="hero-border-right" style={{ position: 'absolute', top: 20, right: 20, bottom: 20, width: 2, background: '#F5C400', opacity: 0.4, zIndex: 3, transformOrigin: 'top' }} />
      <div className="hero-border-bottom" style={{ position: 'absolute', bottom: 68, left: 20, right: 20, height: 2, background: '#F5C400', opacity: 0.4, zIndex: 3, transformOrigin: 'right' }} />
      <div className="hero-border-left" style={{ position: 'absolute', top: 20, left: 20, bottom: 20, width: 2, background: '#F5C400', opacity: 0.4, zIndex: 3, transformOrigin: 'bottom' }} />

      {/* Warning stripes top-left */}
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
          paddingLeft: 'clamp(24px, 10vw, 160px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
        }}
      >
        <div className="hero-line" style={{ marginBottom: 24, opacity: 0 }}>
          <SectionLabel index="00" label="HERO" />
        </div>

        <h1
          className="hero-line"
          style={{
            fontFamily: "var(--font-hero)",
            fontSize: 'clamp(56px, 14vw, 200px)',
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
            fontSize: 'clamp(56px, 14vw, 200px)',
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
            fontSize: 'clamp(56px, 14vw, 200px)',
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
          Chennai&apos;s most serious private training studio. Built for people who
          actually show up and demand results.
        </p>

        <div
          className="hero-line"
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            opacity: 0,
          }}
        >
          <YellowButton
            variant="solid"
            href="https://wa.me/91XXXXXXXXXX"
          >
            ⚡ START YOUR TRIAL
          </YellowButton>
          <YellowButton variant="outline" onClick={scrollToAbout}>
            ↓ EXPLORE
          </YellowButton>
        </div>
      </div>

      {/* Scroll Indicator */}
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

      {/* Yellow Marquee Strip */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5 }}>
        <MarqueeStrip
          items={marqueeItems}
          bgColor="#F5C400"
          textColor="#080808"
          speed="normal"
        />
      </div>
    </section>
  );
}
