export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Results', href: '#transformations' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  const programLinks = [
    'Personal Training',
    'Strength & Conditioning',
    'Weight Loss',
    'Muscle Building',
    'Diet & Nutrition',
    'Group Sessions',
  ];

  return (
    <footer style={{ background: '#050505', position: 'relative' }}>
      {/* Warning stripes top border */}
      <div className="warning-stripes" style={{ width: '100%', height: 6 }} />

      {/* Large background text */}
      <div
        style={{
          textAlign: 'center',
          paddingTop: 64,
          marginBottom: 0,
        }}
      >
        <p
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(48px, 10vw, 96px)',
            color: 'rgba(245, 196, 0, 0.06)',
            lineHeight: 1,
            letterSpacing: '0.05em',
            userSelect: 'none',
          }}
        >
          NXT FITNESS
        </p>
      </div>

      {/* Logo section */}
      <div style={{ textAlign: 'center', padding: '24px 0 48px' }}>
        <div
          style={{
            width: 48,
            height: 48,
            transform: 'rotate(45deg)',
            background: '#F5C400',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              transform: 'rotate(-45deg)',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 18,
              color: '#080808',
              fontWeight: 700,
            }}
          >
            N
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 20,
            color: '#F0F0F0',
            letterSpacing: '0.1em',
            marginBottom: 4,
          }}
        >
          NXT FITNESS STUDIO
        </p>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            color: '#444',
            letterSpacing: '0.2em',
          }}
        >
          CHENNAI · EST. 2021
        </p>
      </div>

      {/* Link columns */}
      <div
        className="footer-columns"
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 clamp(20px, 5vw, 80px) 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
        }}
      >
        {/* Quick Links */}
        <div>
          <h4
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: '#666',
              letterSpacing: '0.2em',
              marginBottom: 20,
            }}
          >
            QUICK LINKS
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-hover"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  color: '#555',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F5C400')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div>
          <h4
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: '#666',
              letterSpacing: '0.2em',
              marginBottom: 20,
            }}
          >
            PROGRAMS
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {programLinks.map((prog) => (
              <span
                key={prog}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 12,
                  color: '#555',
                }}
              >
                {prog}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: '#666',
              letterSpacing: '0.2em',
              marginBottom: 20,
            }}
          >
            CONTACT
          </h4>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 16 }}>
            123 Example Street, Anna Nagar
            <br />
            Chennai, Tamil Nadu 600040
          </p>
          <a
            href="tel:+91XXXXXXXXXX"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: '#F5C400',
              textDecoration: 'none',
              display: 'block',
              marginBottom: 20,
            }}
          >
            +91 XXXXX XXXXX
          </a>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 16 }}>
            <a
              href="https://instagram.com/nxt_gym"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="cursor-hover"
              style={{ transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F5C400')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#666' }}>
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="cursor-hover"
              style={{ transition: 'color 0.3s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F5C400')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#666')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#666' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid #1A1A1A',
          padding: '20px clamp(20px, 5vw, 80px)',
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#333' }}>
          © {currentYear} NXT FITNESS STUDIO. ALL RIGHTS RESERVED.
        </span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: '#333' }}>
          BUILT WITH ⚡
        </span>
      </div>
    </footer>
  );
}
