import { ReactNode } from 'react';

interface DiamondBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap = {
  sm: 24,
  md: 40,
  lg: 80,
};

const fontSizeMap = {
  sm: 10,
  md: 14,
  lg: 24,
};

export default function DiamondBadge({
  size = 'md',
  children,
  className = '',
  style = {},
}: DiamondBadgeProps) {
  const px = sizeMap[size];
  const fontSize = fontSizeMap[size];

  return (
    <div
      className={className}
      style={{
        width: px,
        height: px,
        transform: 'rotate(45deg)',
        background: '#F5C400',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...style,
      }}
    >
      {children && (
        <span
          style={{
            transform: 'rotate(-45deg)',
            fontFamily: "'Space Mono', monospace",
            fontSize,
            fontWeight: 700,
            color: '#080808',
            lineHeight: 1,
          }}
        >
          {children}
        </span>
      )}
    </div>
  );
}
