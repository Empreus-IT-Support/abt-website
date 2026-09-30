'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const GREEN = '#44b94a'
const GREEN_DARK = '#1f6526'
const INK = '#141813'
const BG = '#ffffff'
const BAND = '#f3f6f2'
const CARD = '#ffffff'
const BORDER = '#e2e7e1'
const TEXT = '#2e342e'
const MUTED = '#5d655d'
const M: React.CSSProperties = { fontFamily: 'var(--font-body), sans-serif' }
const D: React.CSSProperties = { fontFamily: 'var(--font-display), var(--font-body), sans-serif' }

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode, delay?: number, style?: React.CSSProperties }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  )
}

const Label = ({ text, light = false }: { text: string, light?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
    <div style={{ width: 28, height: 1, background: light ? GREEN : GREEN_DARK }} />
    <p style={{ ...M, fontSize: '.68rem', fontWeight: 700, letterSpacing: '3px', color: light ? GREEN : GREEN_DARK, textTransform: 'uppercase', margin: 0 }}>{text}</p>
  </div>
)

const offerings = [
  'Smash repairs for all vehicle makes and models',
  'Private, fleet, commercial and insurance work',
  'Repairs for all major insurance companies',
  'Refinishing in state of the art paint booths',
  'All repairs guaranteed',
]

const support = [
  {
    title: 'Quoting with iBodyShop',
    body: 'We use iBodyShop, an industry-leading estimating and quoting system, to prepare fast, accurate quotes for you and your insurance company.',
  },
  {
    title: '24/7 Towing',
    body: 'Around-the-clock towing is provided by Discount Towing Canberra — 24 hours a day, 365 days a year. Phone 0411 259 945.',
  },
  {
    title: 'Simple Repair Process',
    body: 'Bring your vehicle and claim number in — we take images in under 15 minutes and organise the entire process from there.',
  },
]

export default function Services() {
  return (
    <div style={{ ...M, background: BG, color: TEXT }}>

      {/* ── HERO ── */}
      <div style={{ background: BG, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ height: 12, background: 'repeating-conic-gradient(#141813 0% 25%, #ffffff 0% 50%)', backgroundSize: '12px 12px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 48, alignItems: 'center', padding: 'clamp(44px, 7vw, 80px) clamp(20px, 5vw, 80px) clamp(40px, 6vw, 70px)', maxWidth: 1440, margin: '0 auto' }}>
          <div>
            <div style={{ animation: 'fadeup 0.8s ease 0.2s both' }}>
              <Label text="What we do" />
            </div>
            <div style={{ animation: 'fadeup 0.8s ease 0.4s both' }}>
              <h1 style={{ ...D, fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: INK, lineHeight: 1, margin: '0 0 8px' }}>OUR</h1>
              <h1 style={{ ...D, fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 300, color: GREEN_DARK, lineHeight: 1.1, margin: '0 0 24px', letterSpacing: '4px' }}>SERVICES</h1>
            </div>
            <div style={{ animation: 'fadeup 0.8s ease 0.6s both' }}>
              <div style={{ width: 48, height: 3, background: GREEN }} />
            </div>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.5s both' }}>
            <div className="hcard" style={{ border: `1px solid ${BORDER}`, borderTop: `3px solid ${GREEN}`, boxShadow: '0 12px 40px rgba(20,24,19,0.10)' }}>
              <img
                src="/images/photo-1504222490345-c075b6008014.jpg"
                alt="Mechanic working under the bonnet at the workshop"
                style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── WHAT WE OFFER ── */}
      <div style={{ background: BG, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 5vw, 80px)', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <FadeUp>
            <Label text="Quality repairs since 1988" />
            <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 900, color: INK, margin: '0 0 24px' }}>WHAT WE OFFER</h2>
            <p style={{ ...M, fontSize: '1.02rem', color: TEXT, lineHeight: 1.9, marginBottom: 48 }}>
              Auto Body Technicians is a privately owned boutique smash repair business. We keep it simple: quality collision repairs, clear communication, and a process that inconveniences you as little as possible.
            </p>
          </FadeUp>
          <div>
            {offerings.map((text, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '22px 0', borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ width: 34, height: 34, background: 'rgba(68,185,74,0.12)', border: `1px solid ${GREEN}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GREEN_DARK} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <p style={{ ...M, fontSize: '1rem', fontWeight: 600, color: INK, margin: 0 }}>{text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW WE SUPPORT YOU ── */}
      <div style={{ background: BAND, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 5vw, 80px)', borderBottom: `1px solid ${BORDER}` }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Label text="Making it easy" /></div>
            <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 900, color: INK, margin: 0 }}>HOW WE SUPPORT YOU</h2>
          </div>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {support.map(({ title, body }, i) => (
            <FadeUp key={title} delay={i * 0.12}>
              <div className="hcard" style={{ background: CARD, border: `1px solid ${BORDER}`, borderTop: `3px solid ${GREEN}`, padding: '44px 36px', height: '100%', boxSizing: 'border-box', boxShadow: '0 2px 12px rgba(20,24,19,0.04)' }}>
                <h3 style={{ ...M, fontSize: '1rem', fontWeight: 800, color: INK, marginBottom: 18, textTransform: 'uppercase' }}>{title}</h3>
                <p style={{ ...M, fontSize: '.96rem', color: MUTED, lineHeight: 1.9, margin: 0 }}>{body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ position: 'relative', overflow: 'hidden', background: GREEN_DARK }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0 14px, transparent 14px 28px)' }} />
        <div style={{ position: 'relative', padding: 'clamp(44px, 6.5vw, 70px) clamp(20px, 5vw, 80px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <h2 style={{ ...D, fontSize: 'clamp(1.55rem, 3.5vw, 1.8rem)', fontWeight: 900, color: '#fff', margin: '0 0 8px', textTransform: 'uppercase' }}>Ready to get started?</h2>
            <p style={{ ...M, fontSize: '.96rem', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.8 }}>
              Request a quote online or get in touch — we'll take it from there.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', flexShrink: 0 }}>
            <Link href="/quote" className="btn-lift" style={{ ...M, background: '#141813', color: '#fff', padding: '14px 36px', textDecoration: 'none', fontSize: '.74rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', borderRadius: '2px' }}>
              Request a Quote
            </Link>
            <Link href="/contact" className="btn-lift" style={{ ...M, background: 'transparent', color: '#fff', padding: '14px 36px', textDecoration: 'none', fontSize: '.74rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '2px' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes zoomin { from { transform: scale(1); } to { transform: scale(1.06); } }
        @keyframes fadeup { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

    </div>
  )
}
