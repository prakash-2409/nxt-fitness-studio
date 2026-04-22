'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YellowButton from '@/components/ui/YellowButton';

const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'PROGRAMS', href: '#programs' },
  { label: 'TRAINERS', href: '#trainers' },
  { label: 'RESULTS', href: '#transformations' },
  { label: 'PRICING', href: '#pricing' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section
  useEffect(() => {
    const sectionIds = ['about', 'programs', 'trainers', 'transformations', 'pricing', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(20px, 4vw, 60px)',
          background: scrolled ? 'rgba(8, 8, 8, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(245, 196, 0, 0.15)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="cursor-hover"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'none',
            border: 'none',
            cursor: 'none',
          }}
          aria-label="Scroll to top"
        >
          {/* Diamond icon */}
          <div
            style={{
              width: 28,
              height: 28,
              transform: 'rotate(45deg)',
              background: '#F5C400',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                transform: 'rotate(-45deg)',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 12,
                color: '#080808',
                fontWeight: 700,
              }}
            >
              N
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22,
              color: '#F5C400',
              letterSpacing: '0.1em',
            }}
          >
            NXT FITNESS
          </span>
        </button>

        {/* Desktop nav links */}
        <div
          className="nav-links-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="cursor-hover"
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.15em',
                  color: isActive ? '#F5C400' : '#888',
                  cursor: 'none',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  paddingBottom: 4,
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#F5C400',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="nav-cta-desktop">
          <YellowButton
            variant="solid"
            size="small"
            onClick={() => scrollToSection('#pricing')}
          >
            JOIN NOW →
          </YellowButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger cursor-hover"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 6,
            background: 'none',
            border: 'none',
            cursor: 'none',
            padding: 8,
            zIndex: 1002,
          }}
        >
          <motion.span
            animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            style={{ width: 24, height: 2, background: '#F5C400', display: 'block' }}
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            style={{ width: 24, height: 2, background: '#F5C400', display: 'block' }}
          />
          <motion.span
            animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            style={{ width: 24, height: 2, background: '#F5C400', display: 'block' }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999,
              background: '#0A0A0A',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 40px',
            }}
          >
            {/* Background diamond watermark */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: -60,
                transform: 'translateY(-50%) rotate(45deg)',
                width: 300,
                height: 300,
                background: 'rgba(245, 196, 0, 0.03)',
                pointerEvents: 'none',
              }}
            />

            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollToSection(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 64,
                  color: activeSection === link.href.replace('#', '') ? '#F5C400' : '#F0F0F0',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '8px 0',
                  transition: 'color 0.3s ease',
                  letterSpacing: '0.02em',
                }}
              >
                {link.label}
              </motion.button>
            ))}

            {/* Social links */}
            <div style={{ display: 'flex', gap: 24, marginTop: 40 }}>
              <a
                href="https://instagram.com/nxt_gym"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#666', transition: 'color 0.3s ease', fontSize: 14, fontFamily: "'Space Mono', monospace" }}
              >
                INSTAGRAM
              </a>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#666', transition: 'color 0.3s ease', fontSize: 14, fontFamily: "'Space Mono', monospace" }}
              >
                WHATSAPP
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 1024px) {
          .nav-links-desktop {
            display: none !important;
          }
          .nav-cta-desktop {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
