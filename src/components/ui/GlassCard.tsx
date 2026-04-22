import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  style = {},
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}
      style={{
        background: 'rgba(245, 196, 0, 0.03)',
        border: '1px solid rgba(245, 196, 0, 0.12)',
        borderRadius: 2,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease',
        ...style,
      }}
    >
      {children}

      <style jsx>{`
        .glass-card-hover:hover {
          border-color: rgba(245, 196, 0, 0.5) !important;
          box-shadow: 0 0 40px rgba(245, 196, 0, 0.1), 0 0 80px rgba(245, 196, 0, 0.05);
        }
      `}</style>
    </div>
  );
}
