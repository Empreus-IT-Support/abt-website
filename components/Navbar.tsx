'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const GREEN = '#1f6526'
const INK = '#141813'
const BORDER = '#e2e7e1'

const links = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/quote',    label: 'Quote' },
  { href: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* HAMBURGER BUTTON — always visible */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 200,
          background: 'rgba(255,255,255,0.92)', border: `1px solid ${BORDER}`,
          borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          cursor: 'pointer', display: 'flex',
          flexDirection: 'column', gap: 5, padding: '12px 10px',
        }}
        aria-label="Open menu"
      >
        <span style={{ width: 24, height: 2, background: INK, display: 'block' }} />
        <span style={{ width: 17, height: 2, background: INK, display: 'block' }} />
        <span style={{ width: 24, height: 2, background: INK, display: 'block' }} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(20,24,19,0.45)',
            animation: 'fadein 0.2s ease',
          }}
        />
      )}

      {/* SIDEBAR PANEL */}
      <div style={{
        position: 'fixed', top: 0, left: 0, zIndex: 400,
        width: 220, height: '100vh',
        background: '#ffffff',
        borderRight: `1px solid ${BORDER}`,
        boxShadow: open ? '4px 0 24px rgba(0,0,0,0.08)' : 'none',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "var(--font-body), sans-serif",
      }}>

        {/* CLOSE + LOGO */}
        <div style={{ padding: '28px 24px 22px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <img src="/abt-logo.png" alt="ABT Auto Body Technicians" style={{ width: 140, height: 'auto', display: 'block' }} />
          <button
            onClick={() => setOpen(false)}
            style={{ background: 'transparent', border: 'none', color: '#79827a', cursor: 'pointer', fontSize: '1.2rem', padding: 0, marginTop: 4 }}
          >✕</button>
        </div>

        {/* NAV LINKS */}
        <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '13px 24px',
                fontFamily: "var(--font-body), sans-serif",
                fontSize: '.7rem', fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase',
                color: active ? GREEN : '#454c45',
                textDecoration: 'none',
                borderLeft: active ? `2px solid ${GREEN}` : '2px solid transparent',
                background: active ? 'rgba(43,138,52,0.07)' : 'transparent',
                transition: 'color .2s',
              }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* BOTTOM */}
        <div style={{ padding: '20px 24px', borderTop: `1px solid ${BORDER}` }}>
          <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: '.68rem', fontWeight: 500, color: '#79817a', lineHeight: 1.8, marginBottom: 8 }}>
            25 Winchcombe Court<br />Mitchell ACT 2911
          </p>
          <p style={{ fontFamily: "var(--font-body), sans-serif", fontSize: '.9rem', fontWeight: 800, color: GREEN, letterSpacing: '1px', margin: 0 }}>
            02 6241 3801
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  )
}
