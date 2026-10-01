import Link from 'next/link'

const GREEN = '#1f6526'
const INK = '#141813'
const BORDER = '#e2e7e1'
const M = "var(--font-body), sans-serif"

const links = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/quote',    label: 'Quote' },
  { href: '/contact',  label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#f3f6f2', fontFamily: M }}>

      {/* CHECKERED BOOKEND */}
      <div style={{ height: 12, background: 'repeating-conic-gradient(#141813 0% 25%, #ffffff 0% 50%)', backgroundSize: '12px 12px' }} />

      {/* MAIN */}
      <div style={{ padding: 'clamp(40px, 6vw, 60px) clamp(20px, 5vw, 80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: 48, borderBottom: `1px solid ${BORDER}` }}>

        {/* BRAND */}
        <div>
          <img src="/abt-logo.png" alt="ABT Auto Body Technicians" style={{ width: 190, height: 'auto', display: 'block', marginBottom: 16 }} />
          <p style={{ fontFamily: M, fontSize: '.88rem', color: '#454c45', lineHeight: 1.8, maxWidth: 280, marginBottom: 20 }}>
            Canberra's trusted smash repairers since 1988.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['Phone', '02 6241 3801'],
              ['Email', 'admin@autobodytech.net.au'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontFamily: M, fontSize: '.66rem', fontWeight: 700, color: GREEN, textTransform: 'uppercase', letterSpacing: '1px', minWidth: 40 }}>{label}</span>
                <span style={{ fontFamily: M, fontSize: '.88rem', color: '#454c45' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NAV */}
        <div>
          <p style={{ fontFamily: M, fontSize: '.7rem', fontWeight: 800, color: INK, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 20 }}>Pages</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {links.map(({ href, label }) => (
              <Link key={href} href={href} style={{ fontFamily: M, fontSize: '.88rem', fontWeight: 500, color: '#454c45', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 12, height: 1, background: GREEN, display: 'inline-block', flexShrink: 0 }} />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <p style={{ fontFamily: M, fontSize: '.7rem', fontWeight: 800, color: INK, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 20 }}>Details</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              ['Hours', 'Mon–Fri 8:00am – 4:30pm'],
              ['ABN', '78 685 130 090'],
              ['Licence', '20000332'],
            ].map(([label, value]) => (
              <div key={label}>
                <p style={{ fontFamily: M, fontSize: '.66rem', fontWeight: 700, color: GREEN, textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 3px' }}>{label}</p>
                <p style={{ fontFamily: M, fontSize: '.88rem', color: '#454c45', margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{ padding: '18px clamp(20px, 5vw, 80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <p style={{ fontFamily: M, fontSize: '.78rem', color: '#5d655d', margin: 0 }}>
          © {new Date().getFullYear()} ABT Auto Body Technicians. All rights reserved.{' '}
          <Link href="/privacy-policy" style={{ color: GREEN, textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</Link>
        </p>
        <p style={{ fontFamily: M, fontSize: '.78rem', color: '#5d655d', margin: 0 }}>
          Managed by{' '}
          <a href="https://empreusitsupport.com.au" target="_blank" rel="noopener noreferrer"
            style={{ color: GREEN, textDecoration: 'none', fontWeight: 700 }}>
            Empreus IT Support
          </a>
        </p>
      </div>

    </footer>
  )
}
