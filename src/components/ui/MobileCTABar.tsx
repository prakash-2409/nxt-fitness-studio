'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);

    // Slide in after 3 seconds
    const timer = setTimeout(() => setVisible(true), 3000);

    return () => {
      window.removeEventListener('resize', check);
      clearTimeout(timer);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div style={{ height: 64 }} />

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: visible ? 0 : 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          background: 'rgba(8, 8, 8, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(245, 196, 0, 0.2)',
          display: 'flex',
          zIndex: 900,
        }}
      >
        {/* Call */}
        <a
          href="tel:+91XXXXXXXXXX"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            textDecoration: 'none',
            color: '#999',
          }}
        >
          <span style={{ fontSize: 18 }}>📞</span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.1em',
            }}
          >
            CALL
          </span>
        </a>

        {/* WhatsApp (highlighted) */}
        <a
          href="https://wa.me/91XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            textDecoration: 'none',
            background: '#F5C400',
            color: '#080808',
          }}
        >
          <span style={{ fontSize: 18 }}>💬</span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.1em',
              fontWeight: 700,
            }}
          >
            WHATSAPP
          </span>
        </a>

        {/* Directions */}
        <a
          href="https://maps.google.com/?q=Chennai"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            textDecoration: 'none',
            color: '#999',
          }}
        >
          <span style={{ fontSize: 18 }}>📍</span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.1em',
            }}
          >
            DIRECTIONS
          </span>
        </a>
      </motion.div>
    </>
  );
}
