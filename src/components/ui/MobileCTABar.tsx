'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => { window.removeEventListener('resize', check); clearTimeout(timer); };
  }, []);

  // Hide on fast scroll down, show on scroll up or stop
  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      if (delta > 15) {
        setHidden(true);
        clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => setHidden(false), 800);
      } else if (delta < -5) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); clearTimeout(scrollTimer.current); };
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <>
      <div style={{ height: 64 }} />
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: visible && !hidden ? 0 : 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="mobile-cta-bar"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          height: 'calc(64px + env(safe-area-inset-bottom, 0px))',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          background: 'rgba(8, 8, 8, 0.96)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(245, 196, 0, 0.2)',
          display: 'flex', zIndex: 900,
        }}
      >
        <a href="tel:+91XXXXXXXXXX" className="cta-touch" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, textDecoration: 'none', color: '#999' }}>
          <span style={{ fontSize: 18 }}>📞</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.1em' }}>CALL</span>
        </a>
        <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="cta-touch cta-whatsapp" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, textDecoration: 'none', background: '#F5C400', color: '#080808' }}>
          <span style={{ fontSize: 18 }}>💬</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.1em', fontWeight: 700 }}>WHATSAPP</span>
        </a>
        <a href="https://maps.google.com/?q=Chennai" target="_blank" rel="noopener noreferrer" className="cta-touch" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, textDecoration: 'none', color: '#999' }}>
          <span style={{ fontSize: 18 }}>📍</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '0.1em' }}>DIRECTIONS</span>
        </a>
      </motion.div>

      <style jsx>{`
        .cta-touch:active { transform: scale(0.95); transition: transform 0.1s; }
        @keyframes cta-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
        .cta-whatsapp { animation: cta-pulse 2s ease-in-out infinite; }
      `}</style>
    </>
  );
}
