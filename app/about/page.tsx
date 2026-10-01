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

function SlideIn({ children, from = 'left', delay = 0, style = {} }: { children: React.ReactNode, from?: 'left' | 'right', delay?: number, style?: React.CSSProperties }) {
  const { ref, visible } = useInView()
  const x = from === 'left' ? '-40px' : '40px'
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : `translateX(${x})`, transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`, ...style }}>
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

const awards = [
  { num: '01', text: 'Primary Repairer of the Year — twice awarded by a major fleet company, "in recognition of quality repairs and customer service"' },
  { num: '02', text: 'Nominated for Paint and Panel Autobody Repairer of the Year (2013)' },
  { num: '03', text: "Two apprentices have won 'Apprentice of the Year' in Canberra since inception" },
  { num: '04', text: 'Member of the Motor Trades Association since inception' },
]

const steps = [
  { title: 'Book a Quote', desc: 'Contact Auto Body Technicians to book in for a quote for your vehicle.' },
  { title: 'Images & Assessment', desc: 'Images are taken on your vehicle and quote prepared for the insurance company, forwarded for assessment and authority.' },
  { title: 'Schedule Repairs', desc: 'Once approved, your vehicle is booked in at a mutually convenient time. Parts and sublets are organised prior to delivery.' },
  { title: 'Repairs Carried Out', desc: 'The vehicle is allocated to a technician and a pre-repair checklist completed. Repaired to its pre-accident condition.' },
  { title: 'Paint & Fit-Up', desc: 'Paint is applied using one of our state of the art paint booths. Once dry, fit-up of the panels and associated parts takes place.' },
  { title: 'Vehicle Collection', desc: 'We will contact you by 1:30pm on the day of completion to organise collection or delivery of your vehicle.' },
]

const workshopPhotos = [
  { src: '/images/photo-1558618666-fcd25c85cd64.jpg', alt: 'Spray painting a vehicle' },
  { src: '/images/photo-1487754180451-c456f719a1fc.jpg', alt: 'Technician topping up engine oil' },
  { src: '/images/photo-1599256872237-5dcc0fbe9668.jpg', alt: 'Panel work with hand tools' },
  { src: '/images/photo-1486262715619-67b85e0b08d3.jpg', alt: 'Engine belt and pulleys close up' },
]

export default function About() {
  return (
    <div style={{ ...M, background: BG, color: TEXT }}>

      {/* ── HERO ── */}
      <div style={{ background: BG, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ height: 12, background: 'repeating-conic-gradient(#141813 0% 25%, #ffffff 0% 50%)', backgroundSize: '12px 12px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 48, alignItems: 'center', padding: 'clamp(44px, 7vw, 80px) clamp(20px, 5vw, 80px) clamp(40px, 6vw, 70px)', maxWidth: 1440, margin: '0 auto' }}>
          <div>
            <div style={{ animation: 'fadeup 0.8s ease 0.2s both' }}>
              <Label text="Who we are" />
            </div>
            <div style={{ animation: 'fadeup 0.8s ease 0.4s both' }}>
              <h1 style={{ ...D, fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: INK, lineHeight: 1, margin: '0 0 8px' }}>ABOUT</h1>
              <h1 style={{ ...D, fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 300, color: GREEN_DARK, lineHeight: 1.1, margin: '0 0 24px', letterSpacing: '4px' }}>ABT</h1>
            </div>
            <div style={{ animation: 'fadeup 0.8s ease 0.6s both' }}>
              <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 20 }} />
              <p style={{ ...M, fontSize: '1.02rem', color: TEXT, lineHeight: 1.8, maxWidth: 460, margin: 0 }}>
                A privately owned boutique smash repairs business, serving Canberra's motorists since October 1988.
              </p>
            </div>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.5s both' }}>
            <div className="hcard" style={{ border: `1px solid ${BORDER}`, borderTop: `3px solid ${GREEN}`, boxShadow: '0 12px 40px rgba(20,24,19,0.10)' }}>
              <img
                src="/images/photo-1619642751034-765dfdf7c58e.jpg"
                alt="Technician working on an engine"
                style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── ABOUT US ── */}
      <div style={{ background: BAND, borderBottom: `1px solid ${BORDER}`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', overflow: 'hidden' }}>
        <SlideIn from="left" style={{ height: 580, overflow: 'hidden', position: 'relative' }}>
          <img
            src="/images/photo-1625047509248-ec889cbff17f.jpg"
            alt="Technician working under a bonnet"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #f3f6f2 100%)' }} />
        </SlideIn>
        <SlideIn from="right">
          <div style={{ padding: '70px 70px 70px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <FadeUp delay={0.2}><Label text="Est. October 1988" /></FadeUp>
            <FadeUp delay={0.3}>
              <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 900, color: INK, margin: '0 0 4px' }}>ABOUT</h2>
              <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 300, color: GREEN_DARK, margin: '0 0 24px', letterSpacing: '4px' }}>US</h2>
              <div style={{ width: 40, height: 3, background: GREEN, marginBottom: 36 }} />
            </FadeUp>
            <FadeUp delay={0.4}>
              <p style={{ ...M, fontSize: '1.02rem', color: TEXT, lineHeight: 1.9, marginBottom: 16 }}>
                Auto Body Technicians has been operating in Canberra since October 1988. We are a privately owned boutique smash repairs business specialising in quality repairs.
              </p>
              <p style={{ ...M, fontSize: '1.02rem', color: TEXT, lineHeight: 1.9, marginBottom: 16 }}>
                Customer service is a priority for our company and we are proud of the strong relationships we have with our clients, insurance companies, fleet companies and suppliers.
              </p>
              <p style={{ ...M, fontSize: '1.02rem', color: TEXT, lineHeight: 1.9, marginBottom: 32 }}>
                Auto Body Technicians carry out repairs for all major insurance companies.
              </p>
            </FadeUp>
            <FadeUp delay={0.5}>
              <Link href="/contact" style={{ ...M, fontSize: '.72rem', fontWeight: 700, color: GREEN_DARK, textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 24, height: 1, background: GREEN_DARK, display: 'inline-block' }} />Get in touch
              </Link>
            </FadeUp>
          </div>
        </SlideIn>
      </div>

      {/* ── AWARDS ── */}
      <div style={{ background: BG, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 5vw, 80px) 60px', borderBottom: `1px solid ${BORDER}` }}>
        <FadeUp>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <Label text="Recognition" />
              <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 900, color: INK, margin: '0 0 4px' }}>AWARDS &</h2>
              <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 300, color: GREEN_DARK, margin: 0, letterSpacing: '3px' }}>ACHIEVEMENTS</h2>
            </div>
            <div style={{ width: 48, height: 3, background: GREEN }} />
          </div>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, paddingBottom: 40 }}>
          {awards.map(({ num, text }, i) => (
            <FadeUp key={num} delay={i * 0.12}>
              <div className="hcard" style={{ background: CARD, border: `1px solid ${BORDER}`, padding: '44px 36px', position: 'relative', overflow: 'hidden', height: '100%', boxSizing: 'border-box', boxShadow: '0 2px 12px rgba(20,24,19,0.04)' }}>
                <div style={{ ...M, position: 'absolute', top: -8, right: 16, fontSize: '7rem', fontWeight: 900, color: GREEN, opacity: 0.07, lineHeight: 1, userSelect: 'none' }}>{num}</div>
                <div style={{ width: 32, height: 2, background: GREEN, marginBottom: 24 }} />
                <p style={{ ...M, fontSize: '1.02rem', fontWeight: 500, color: TEXT, lineHeight: 1.9, margin: 0, position: 'relative' }}>{text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── REPAIR PROCESS ── */}
      <div style={{ background: BAND, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 5vw, 80px)', borderBottom: `1px solid ${BORDER}` }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Label text="Step by step" /></div>
            <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 900, color: INK, margin: '0 0 4px' }}>COLLISION REPAIR</h2>
            <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 300, color: GREEN_DARK, margin: 0, letterSpacing: '3px' }}>PROCESS</h2>
          </div>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {steps.map(({ title, desc }, i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <div className="hcard" style={{ background: CARD, border: `1px solid ${BORDER}`, borderTop: `3px solid ${GREEN}`, padding: '44px 36px', position: 'relative', overflow: 'hidden', height: '100%', boxSizing: 'border-box', boxShadow: '0 2px 12px rgba(20,24,19,0.04)' }}>
                <div style={{ ...M, position: 'absolute', top: -8, right: 16, fontSize: '6rem', fontWeight: 900, color: INK, opacity: 0.04, lineHeight: 1, userSelect: 'none' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ ...M, fontSize: '.7rem', fontWeight: 700, color: GREEN_DARK, letterSpacing: '2px', marginBottom: 20 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ width: 28, height: 2, background: GREEN, marginBottom: 20 }} />
                <h3 style={{ ...M, fontSize: '1rem', fontWeight: 800, color: INK, marginBottom: 16, textTransform: 'uppercase' }}>{title}</h3>
                <p style={{ ...M, fontSize: '.94rem', color: MUTED, lineHeight: 1.9, margin: 0 }}>{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── IMAGE BREAK ── */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden', background: GREEN_DARK }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0 14px, transparent 14px 28px)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
          <FadeUp>
            <h2 style={{ ...D, fontSize: '1.6rem', fontWeight: 300, color: '#fff', maxWidth: 620, lineHeight: 1.7, fontStyle: 'italic', textAlign: 'center' }}>
              "We are constantly working to finetune our already exceptional customer service and ensure your collision repair experience is a <span style={{ color: '#fff', fontWeight: 900, fontStyle: 'italic' }}>positive one.</span>"
            </h2>
          </FadeUp>
        </div>
      </div>

      {/* ── OUR WORKSHOP ── */}
      <div style={{ background: BG, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 5vw, 80px)', borderBottom: `1px solid ${BORDER}` }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Label text="Behind the scenes" /></div>
            <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 900, color: INK, margin: '0 0 4px' }}>OUR</h2>
            <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 300, color: GREEN_DARK, margin: 0, letterSpacing: '3px' }}>WORKSHOP</h2>
          </div>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {workshopPhotos.map(({ src, alt }, i) => (
            <FadeUp key={src} delay={i * 0.1}>
              <div style={{ height: 260, overflow: 'hidden', border: `1px solid ${BORDER}`, boxShadow: '0 2px 12px rgba(20,24,19,0.04)' }}>
                <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── WORKPLACE & COMPLIANCE ── */}
      <div style={{ background: BAND, padding: 'clamp(56px, 8vw, 100px) clamp(20px, 5vw, 80px)' }}>
        <FadeUp>
          <Label text="Our commitments" />
          <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 900, color: INK, margin: '0 0 4px' }}>WORKPLACE &</h2>
          <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 300, color: GREEN_DARK, margin: '0 0 56px', letterSpacing: '3px' }}>COMPLIANCE</h2>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            {
              title: 'WH&S Policies & Procedures',
              body: 'Auto Body Technicians has all WH&S Policies and Procedures in place with a commitment to safe work practices. An assessment is undertaken every 6 months by an outside company to ensure they are up to date. We have a clean, safe and well maintained environment for our staff.',
            },
            {
              title: 'Ablaze Total Solutions',
              body: 'Work Health & Safety laws are in place to prevent injuries and illness. We choose to use Ablaze Total Solutions to assist our business.\n\nCanberra Technology Park\n49 Phillip Ave, WATSON ACT 2602\n02 6262 2589',
            },
            {
              title: 'Privacy Policy',
              body: 'Auto Body Technicians (ABT) is committed to providing quality services to you and this policy outlines our ongoing obligations to you in respect of how we manage your Personal Information.',
              link: { label: 'Read Privacy Policy →', href: '/privacy-policy' },
            },
          ].map(({ title, body, link }, i) => (
            <FadeUp key={title} delay={i * 0.12}>
              <div className="hcard" style={{ background: CARD, border: `1px solid ${BORDER}`, padding: '44px 36px', borderTop: `3px solid ${GREEN}`, height: '100%', boxSizing: 'border-box', boxShadow: '0 2px 12px rgba(20,24,19,0.04)' }}>
                <h3 style={{ ...M, fontSize: '1rem', fontWeight: 800, color: INK, marginBottom: 20, textTransform: 'uppercase' }}>{title}</h3>
                <p style={{ ...M, fontSize: '.96rem', color: MUTED, lineHeight: 1.9, marginBottom: link ? 28 : 0, whiteSpace: 'pre-line' }}>{body}</p>
                {link && (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ ...M, fontSize: '.72rem', fontWeight: 700, color: GREEN_DARK, textDecoration: 'none', letterSpacing: '1.5px' }}>
                    {link.label}
                  </a>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes zoomin { from { transform: scale(1); } to { transform: scale(1.06); } }
        @keyframes fadeup { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

    </div>
  )
}
