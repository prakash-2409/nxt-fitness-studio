'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const [hoverType, setHoverType] = useState<'default' | 'button' | 'image'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only enable on devices with hover capability
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover || window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isButton = target.closest('button, a, [role="button"], .cursor-hover');
      const isImage = target.closest('img, video, .cursor-image');

      if (isImage) {
        setHoverType('image');
      } else if (isButton) {
        setHoverType('button');
      } else {
        setHoverType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Lerp animation loop
    const animate = () => {
      const lerp = 0.12;
      circlePos.current.x += (mousePos.current.x - circlePos.current.x) * lerp;
      circlePos.current.y += (mousePos.current.y - circlePos.current.y) * lerp;

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${circlePos.current.x - 18}px, ${circlePos.current.y - 18}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  // Don't render on mobile/touch
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  const circleScale = hoverType === 'image' ? 'scale(4)' : hoverType === 'button' ? 'scale(2.5)' : 'scale(1)';

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#F5C400',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {/* Circle */}
      <div
        ref={circleRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: hoverType === 'default' ? '1.5px solid #F5C400' : 'none',
          background: hoverType === 'button'
            ? 'rgba(245, 196, 0, 0.15)'
            : hoverType === 'image'
              ? 'rgba(245, 196, 0, 0.12)'
              : 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          mixBlendMode: 'difference',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease, width 0.4s ease, height 0.4s ease, background 0.3s ease, border 0.3s ease',
        }}
      >
        {hoverType === 'image' && (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: '#F5C400',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}
          >
            VIEW
          </span>
        )}
      </div>

      <style jsx>{`
        div[ref] {
          will-change: transform;
        }
      `}</style>
    </>
  );
}
