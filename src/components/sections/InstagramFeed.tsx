'use client';

import { motion } from 'framer-motion';
import { useDeviceAnimations } from '@/hooks/useDeviceAnimations';
import SectionLabel from '@/components/ui/SectionLabel';
import YellowButton from '@/components/ui/YellowButton';

const posts = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  likes: Math.floor(Math.random() * 200) + 50,
}));

export default function InstagramFeed() {
  const { isMobile, isTouch } = useDeviceAnimations();

  return (
    <section
      id="instagram"
      style={{
        padding: '80px 0',
        background: '#080808',
      }}
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="ig-header"
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div style={{ marginBottom: 24 }}>
            <SectionLabel index="06" label="FOLLOW THE JOURNEY" />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(32px, 5vw, 64px)',
              color: '#F0F0F0',
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              @NXT_GYM
            </span>{' '}
            on Instagram
          </h2>
        </motion.div>

        {/* Grid */}
        {/* TODO: Replace with Behold.so embed widget for live Instagram feed */}
        <div
          className="ig-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: 4,
            marginBottom: 48,
          }}
        >
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="ig-cell cursor-image"
              style={{
                aspectRatio: '1/1',
                position: 'relative',
                overflow: 'hidden',
                background: `linear-gradient(${135 + post.id * 30}deg, #1A1A1A 0%, #111 50%, #0D0D0D 100%)`,
                cursor: 'none',
              }}
            >
              {/* Gym atmosphere placeholder */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at ${30 + post.id * 10}% ${40 + post.id * 5}%, rgba(245, 196, 0, 0.04) 0%, transparent 50%)`,
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: isMobile ? 32 : 48,
                  color: 'rgba(245, 196, 0, 0.06)',
                  userSelect: 'none',
                }}
              >
                NXT
              </span>

              {/* Hover overlay - Disable on touch devices for cleaner mobile UX */}
              {!isTouch && (
                <div
                  className="ig-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(245, 196, 0, 0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transform: 'translateY(100%)',
                    transition: 'transform 0.4s ease',
                  }}
                >
                  <span style={{ fontSize: 24 }}>♥</span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 14,
                      color: '#080808',
                      fontWeight: 700,
                    }}
                  >
                    {post.likes}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10,
                      color: '#080808',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    VIEW POST
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <YellowButton
            variant="outline"
            href="https://instagram.com/nxt_gym"
            style={isMobile ? { width: '100%', minHeight: 52, justifyContent: 'center' } : undefined}
          >
            FOLLOW @NXT_GYM →
          </YellowButton>
        </motion.div>
      </div>

      <style jsx>{`
        .ig-cell:hover .ig-overlay {
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
}
