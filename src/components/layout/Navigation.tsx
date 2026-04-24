'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeviceAnimations } from '@/hooks/useDeviceAnimations';
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
  const { isMobile, isTablet, isDesktop } = useDeviceAnimations();
  const showMobileNav = !isDesktop;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
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
        (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(id); }); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => { document.body.style.overflow = ''; document.body.style.position = ''; document.body.style.width = ''; };
  }, [mobileMenuOpen]);

  const scrollToSection = useCallback((href: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 72, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(20px, 4vw, 60px)',
          background: scrolled ? 'rgba(8, 8, 8, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(245, 196, 0, 0.15)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <button onClick={scrollToTop} className="cursor-hover" aria-label="Scroll to top"
          style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: showMobileNav ? 'pointer' : 'none' }}>
          <div style={{ width: 28, height: 28, transform: 'rotate(45deg)', background: '#F5C400', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ transform: 'rotate(-45deg)', fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, color: '#080808', fontWeight: 700 }}>N</span>
          </div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#F5C400', letterSpacing: '0.1em' }}>NXT FITNESS</span>
        </button>

        {/* Desktop nav links */}
        {!showMobileNav && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button key={link.href} onClick={() => scrollToSection(link.href)} className="cursor-hover"
                  style={{ background: 'none', border: 'none', fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: '0.15em', color: isActive ? '#F5C400' : '#888', cursor: 'none', transition: 'color 0.3s ease', position: 'relative', paddingBottom: 4 }}>
                  {link.label}
                  {isActive && <span style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: '#F5C400' }} />}
                </button>
              );
            })}
          </div>
        )}

        {/* Desktop CTA */}
        {!showMobileNav && (
          <YellowButton variant="solid" size="small" onClick={() => scrollToSection('#pricing')}>JOIN NOW →</YellowButton>
        )}

        {/* Mobile hamburger */}
        {showMobileNav && (
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            style={{ display: 'flex', flexDirection: 'column', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 12, zIndex: 1002, minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' }}>
            <motion.span animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ width: 24, height: 2, background: '#F5C400', display: 'block' }} />
            <motion.span animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={{ duration: 0.3 }} style={{ width: 24, height: 2, background: '#F5C400', display: 'block' }} />
            <motion.span animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ width: 24, height: 2, background: '#F5C400', display: 'block' }} />
          </button>
        )}
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 998, background: '#080808', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '0 40px' }}
          >
            {/* Background diamond watermark */}
            <div className="mobile-menu-diamond" style={{ position: 'absolute', bottom: 60, right: -60, width: 300, height: 300, background: 'rgba(245, 196, 0, 0.03)', transform: 'rotate(45deg)', pointerEvents: 'none' }} />

            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <motion.button
                  key={link.href}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollToSection(link.href)}
                  style={{
                    background: 'none', border: 'none',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(48px, 12vw, 72px)',
                    color: isActive ? '#F5C400' : '#222',
                    textAlign: 'left', cursor: 'pointer',
                    padding: '8px 0', transition: 'color 0.3s ease',
                    letterSpacing: '0.02em',
                    borderLeft: isActive ? '4px solid #F5C400' : '4px solid transparent',
                    paddingLeft: 16,
                  }}
                >
                  {link.label}
                </motion.button>
              );
            })}

            <div style={{ width: 40, height: 1, background: '#1A1A1A', margin: '32px 0', marginLeft: 16 }} />

            <div style={{ display: 'flex', gap: 24, marginLeft: 16 }}>
              <a href="https://instagram.com/nxt_gym" target="_blank" rel="noopener noreferrer" style={{ color: '#F5C400', fontSize: 14, fontFamily: "'Space Mono', monospace", textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /></svg>
                INSTAGRAM
              </a>
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" style={{ color: '#F5C400', fontSize: 14, fontFamily: "'Space Mono', monospace", textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-.9-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.1.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4m-5.4 7.4h0a9.9 9.9 0 01-5-1.4l-.4-.2-3.7 1 1-3.7-.2-.4a9.9 9.9 0 01-1.5-5.3c0-5.4 4.4-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9a9.8 9.8 0 012.9 7c0 5.5-4.4 9.9-9.9 9.9m8.4-18.3A11.8 11.8 0 0012 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.7a11.9 11.9 0 005.7 1.5c6.6 0 11.9-5.3 11.9-11.9a11.8 11.8 0 00-3.5-8.4z" /></svg>
                WHATSAPP
              </a>
            </div>

            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#333', marginTop: 40, marginLeft: 16 }}>CHENNAI · EST. 2021</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
