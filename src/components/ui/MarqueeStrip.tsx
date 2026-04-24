'use client';

interface MarqueeStripProps {
  items: string[];
  speed?: 'normal' | 'fast';
  bgColor?: string;
  textColor?: string;
  separator?: string;
  className?: string;
  reverse?: boolean;
}

export default function MarqueeStrip({
  items,
  speed = 'normal',
  bgColor = '#0F0F0F',
  textColor = '#F5C400',
  separator = '◆',
  className = '',
  reverse = false,
}: MarqueeStripProps) {
  const duration = speed === 'fast' ? '20s' : '40s';

  // Double the items for seamless loop
  const repeatedContent = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`marquee-strip ${className}`}
      style={{
        width: '100%',
        height: 48,
        background: bgColor,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${duration} linear infinite`,
          gap: 0,
          willChange: 'transform',
        }}
      >
        {repeatedContent.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 18,
              letterSpacing: '0.1em',
              color: textColor,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 24,
              paddingRight: 24,
            }}
          >
            {item}
            <span style={{ fontSize: 10, opacity: 0.6 }}>{separator}</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        .marquee-strip:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
