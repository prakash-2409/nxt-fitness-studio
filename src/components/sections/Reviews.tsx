'use client';

import { motion } from 'framer-motion';
import { useDeviceAnimations } from '@/hooks/useDeviceAnimations';
import SectionLabel from '@/components/ui/SectionLabel';
import GlassCard from '@/components/ui/GlassCard';

const reviews = [
  { name: 'Aditya R.', stars: 5, text: 'Best gym in Chennai. Trainers actually care about your progress. Transformed in 3 months flat.', date: '2 weeks ago' },
  { name: 'Preethi S.', stars: 5, text: 'Private studio feel is unmatched. No waiting for equipment, ever. Worth every rupee.', date: '1 month ago' },
  { name: 'Kiran M.', stars: 5, text: 'Coach Vikram helped me deadlift 180kg. Technique-focused training like nowhere else.', date: '3 weeks ago' },
  { name: 'Swathi V.', stars: 5, text: 'Lost 18kgs in 6 months. The diet consultation included in the plan is a game-changer.', date: '2 months ago' },
  { name: 'Rajesh K.', stars: 5, text: 'Clean, serious, well-equipped. This is not your average commercial gym. Highly recommend.', date: '1 week ago' },
  { name: 'Lakshmi N.', stars: 5, text: 'As a woman, I feel completely comfortable here. Professional coaches, great environment.', date: '1 month ago' },
  { name: 'Deepak J.', stars: 5, text: 'The batch size limit means I never wait for anything. Personal attention guaranteed.', date: '3 months ago' },
  { name: 'Ananya B.', stars: 5, text: 'Started as a complete beginner. 4 months later, I feel stronger than ever. Thank you NXT!', date: '2 months ago' },
];

export default function Reviews() {
  const { isMobile } = useDeviceAnimations();
  const row1 = reviews.slice(0, 4);
  const row2 = reviews.slice(4, 8);

  return (
    <section
      id="reviews"
      style={{
        padding: '80px 0',
        background: '#0A0A0A',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="reviews-header section-container"
        style={{ textAlign: 'center', marginBottom: 48 }}
      >
        <div style={{ marginBottom: 24 }}>
          <SectionLabel index="05" label="WHAT MEMBERS SAY" />
        </div>

        {/* Google badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: '#fff',
            color: '#000',
            padding: '10px 24px',
            borderRadius: 999,
            marginBottom: 8,
          }}
        >
          {/* Google G */}
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600 }}>
            4.9 ★ on Google Reviews
          </span>
        </div>
      </motion.div>

      {/* Row 1 — moves left */}
      <div className="review-row" style={{ marginBottom: 16 }}>
        <div
          className="reviews-row"
          style={{
            display: 'flex',
            gap: 16,
            animation: 'marquee 60s linear infinite',
            width: 'max-content',
          }}
        >
          {[...row1, ...row1, ...row1, ...row1].map((review, i) => (
            <ReviewCard key={`r1-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Row 2 — moves right */}
      <div className="review-row">
        <div
          className="reviews-row"
          style={{
            display: 'flex',
            gap: 16,
            animation: 'marquee-reverse 60s linear infinite',
            width: 'max-content',
          }}
        >
          {[...row2, ...row2, ...row2, ...row2].map((review, i) => (
            <ReviewCard key={`r2-${i}`} review={review} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .review-row:hover > div {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div style={{ width: 300, flexShrink: 0 }}>
      <GlassCard style={{ padding: 24 }}>
        <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, color: '#F0F0F0', marginBottom: 8 }}>
          {review.name}
        </p>
        <p style={{ fontSize: 18, color: '#F5C400', marginBottom: 8, letterSpacing: 2 }}>
          {'★'.repeat(review.stars)}
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: '#888', lineHeight: 1.6, marginBottom: 12 }}>
          &ldquo;{review.text}&rdquo;
        </p>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#444' }}>
          {review.date}
        </span>
      </GlassCard>
    </div>
  );
}
