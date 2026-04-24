'use client';

import { useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface YellowButtonProps {
  children: ReactNode;
  variant?: 'solid' | 'outline';
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  size?: 'default' | 'small';
  className?: string;
  style?: React.CSSProperties;
}

export default function YellowButton({
  children,
  variant = 'solid',
  href,
  onClick,
  icon,
  size = 'default',
  className = '',
  style,
}: YellowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const magnetRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX * distX + distY * distY);

    if (dist < 80) {
      magnetRef.current = { x: distX * 0.3, y: distY * 0.3 };
      gsap.to(buttonRef.current, {
        x: magnetRef.current.x,
        y: magnetRef.current.y,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const isSolid = variant === 'solid';
  const isSmall = size === 'small';

  const baseStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: isSmall ? 14 : 18,
    letterSpacing: '0.1em',
    padding: isSmall ? '10px 24px' : '16px 40px',
    border: isSolid ? 'none' : '1px solid #F5C400',
    borderRadius: 2,
    background: isSolid ? '#F5C400' : 'transparent',
    color: isSolid ? '#080808' : '#F5C400',
    cursor: 'none',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease, color 0.3s ease, border-color 0.3s ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  };

  const content = (
    <>
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
      {/* Hover pseudo-element via CSS */}
      <span
        className="btn-hover-fill"
        style={{
          position: 'absolute',
          inset: 0,
          background: isSolid ? '#C49A00' : 'rgba(245, 196, 0, 0.1)',
          transform: 'translateX(-100%)',
          transition: 'transform 0.4s ease',
          zIndex: 1,
        }}
      />
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={href.startsWith('http') || href.startsWith('wa.me') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        style={{ ...baseStyles, ...style }}
        className={`yellow-button cursor-hover ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      style={{ ...baseStyles, ...style }}
      className={`yellow-button cursor-hover ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
