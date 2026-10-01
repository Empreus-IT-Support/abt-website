'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '35+', label: 'Years in Canberra' },
  { value: '90%', label: 'Completed on time' },
  { value: '2×',  label: 'Repairer of the Year' },
  { value: '100%',label: 'Repairs guaranteed' },
]

const reasons = [
  'Because we take pride in our work',
  'Because we use modern equipment',
  'Because we ensure the repair process is simple and our clients are inconvenienced as little as possible.',
  'Because we have highly trained and motivated technicians.',
  'Because we repair all vehicles makes and models.',
]

const services = [
  { title: 'Smash Repairs', desc: 'We take pride in our workmanship from the very beginning of repairs to the completion when our valued clients collect their vehicle.', href: '/services', cta: 'About our smash repairs' },
  { title: 'Repair Process', desc: 'Bring your vehicle and claim number in. We take images in under 15 minutes and organise the entire process from there.', href: '/services', cta: 'How our repair process works' },
  { title: 'Our Services', desc: 'Browse through to see the range of services available at our Mitchell workshop.', href: '/services', cta: 'Browse all our services' },
  { title: 'Vehicle Damaged?', desc: 'Feel free to contact us and we would be pleased to answer any questions you may have.', href: '/contact', cta: 'Contact Us' },
]

const testimonials = [
  { quote: 'The best repair shop I have ever been to. Staff members are all very professional. After the repairs, the vehicle was as good as new.', sign: 'Tom C' },
  { quote: 'I expected the process to be lengthy and stressful. Thank you for ensuring it was not. The customer service was excellent and my Mazda looks beautiful.', sign: 'Murrumbateman customer' },
  { quote: "From the quotation to the repairs, very short down time, and the finished product is 'WOW'.", sign: 'Satisfied customer' },
]

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
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode, delay?: number, style?: React.CSSProperties }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transition: `opacity 0.8s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

function SlideIn({ children, from = 'left', delay = 0, style = {} }: { children: React.ReactNode, from?: 'left' | 'right', delay?: number, style?: React.CSSProperties }) {
  const { ref, visible } = useInView()
  const x = from === 'left' ? '-40px' : '40px'
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : `translateX(${x})`,
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      ...style,
    }}>
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

export default function Home() {
  return (
    <div style={{ ...M, background: BG, color: TEXT }}>

      {/* ── 1. HERO ── */}
      <div style={{ background: BG, borderBottom: `1px solid ${BORDER}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: 12, background: 'repeating-conic-gradient(#141813 0% 25%, #ffffff 0% 50%)', backgroundSize: '12px 12px' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '55%', height: '100%', background: 'radial-gradient(circle at 68% 42%, rgba(68,185,74,0.09), transparent 62%)', pointerEvents: 'none' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 56, alignItems: 'center', padding: 'clamp(44px, 7vw, 70px) clamp(20px, 5vw, 80px) clamp(48px, 7vw, 90px)', minHeight: '76vh', boxSizing: 'border-box', position: 'relative', maxWidth: 1440, margin: '0 auto' }}>
          <div>
            <div style={{ animation: 'fadeup 0.8s ease 0.1s both' }}>
              <img
                src="/abt-logo.png"
                alt="ABT Auto Body Technicians"
                style={{ width: 400, maxWidth: '100%', height: 'auto', display: 'block', marginBottom: 36 }}
              />
            </div>
            <div style={{ animation: 'fadeup 0.8s ease 0.35s both' }}>
              <h1 style={{ ...D, fontSize: 'clamp(2.1rem, 5vw, 3.4rem)', fontWeight: 800, color: INK, lineHeight: 1.12, margin: '0 0 22px', textTransform: 'uppercase' }}>
                Canberra's trusted smash repairers<br />
                <span style={{ color: GREEN_DARK, fontWeight: 300 }}>since 1988</span>
              </h1>
              <div style={{ width: 56, height: 4, background: GREEN, marginBottom: 26 }} />
              <p style={{ ...M, fontSize: '1.1rem', fontWeight: 400, color: TEXT, lineHeight: 1.85, marginBottom: 38, maxWidth: 500 }}>
                Serving Canberra's motorists since 1988 with private, fleet, commercial and insurance work. One of the most dependable smash repairers in the Northside.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, animation: 'fadeup 0.8s ease 0.6s both' }}>
              <Link href="/quote" className="btn-lift" style={{ ...M, background: GREEN_DARK, color: '#fff', padding: '16px 40px', textDecoration: 'none', fontSize: '.8rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px' }}>
                Request a Quote
              </Link>
              <Link href="/contact" className="btn-lift" style={{ ...M, background: 'transparent', color: INK, padding: '16px 40px', textDecoration: 'none', fontSize: '.8rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', border: `1.5px solid ${INK}`, borderRadius: '2px' }}>
                Contact Us
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', marginTop: 34, animation: 'fadeup 0.8s ease 0.75s both' }}>
              {['All repairs guaranteed', 'All major insurers', '24/7 towing available'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={GREEN_DARK} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ ...M, fontSize: '.84rem', fontWeight: 600, color: TEXT }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.45s both' }}>
            <div className="hcard" style={{ border: `1px solid ${BORDER}`, borderTop: `3px solid ${GREEN}`, boxShadow: '0 16px 48px rgba(20,24,19,0.12)' }}>
              <img
                src="/images/photo-1555215695-3004980ad54e.jpg"
                alt="Repaired car on the road"
                style={{ width: '100%', height: 460, objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. STATS BAR ── */}
      <div style={{ background: BAND, borderBottom: `1px solid ${BORDER}`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))' }}>
        {stats.map(({ value, label }, i) => (
          <FadeUp key={label} delay={i * 0.1}>
            <div style={{ padding: '30px 20px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ ...M, fontSize: '2.6rem', fontWeight: 900, color: GREEN_DARK, marginBottom: 6 }}>{value}</div>
              <div style={{ ...M, fontSize: '.72rem', fontWeight: 700, color: MUTED, letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* ── 3. ABOUT US ── */}
      <div style={{ background: BG, borderBottom: `1px solid ${BORDER}`, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', overflow: 'hidden' }}>
        <SlideIn from="left" style={{ height: 600, overflow: 'hidden', position: 'relative' }}>
          <img
            src="/images/photo-1615906655593-ad0386982a0f.jpg"
            alt="Technician working in the workshop"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 70%, #ffffff 100%)' }} />
        </SlideIn>
        <SlideIn from="right">
          <div style={{ padding: '60px 60px 60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <FadeUp delay={0.2}><Label text="Est. October 1988" /></FadeUp>
            <FadeUp delay={0.3}>
              <h2 style={{ ...D, fontSize: 'clamp(1.7rem, 3.8vw, 2rem)', fontWeight: 900, color: INK, margin: '0 0 4px' }}>ABOUT</h2>
              <h2 style={{ ...D, fontSize: 'clamp(1.7rem, 3.8vw, 2rem)', fontWeight: 300, color: GREEN_DARK, margin: '0 0 20px', letterSpacing: '4px' }}>US</h2>
              <div style={{ width: 40, height: 3, background: GREEN, marginBottom: 24 }} />
            </FadeUp>
            <FadeUp delay={0.4}>
              <p style={{ ...M, fontSize: '1.02rem', fontWeight: 400, color: TEXT, lineHeight: 1.9, marginBottom: 14 }}>
                Auto Body Technicians has been operating in Canberra since October 1988. We are a privately owned boutique smash repairs business specialising in quality repairs.
              </p>
              <p style={{ ...M, fontSize: '1.02rem', fontWeight: 400, color: TEXT, lineHeight: 1.9, marginBottom: 14 }}>
                Customer service is a priority. We are proud of the strong relationships we have with our clients, insurance companies, fleet companies and suppliers.
              </p>
              <p style={{ ...M, fontSize: '1.02rem', fontWeight: 400, color: TEXT, lineHeight: 1.9, marginBottom: 28 }}>
                Auto Body Technicians carry out repairs for all major insurance companies and have won the Primary Repairer of the Year award twice.
              </p>
            </FadeUp>
            <FadeUp delay={0.5}>
              <Link href="/about" style={{ ...M, fontSize: '.72rem', fontWeight: 700, color: GREEN_DARK, textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 24, height: 1, background: GREEN_DARK, display: 'inline-block' }} />More about ABT
              </Link>
            </FadeUp>
          </div>
        </SlideIn>
      </div>

      {/* ── 4. WHY CHOOSE US ── */}
      <div style={{ background: BAND, padding: 'clamp(52px, 7.5vw, 90px) clamp(20px, 5vw, 80px)', borderBottom: `1px solid ${BORDER}`, overflow: 'hidden' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 70 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Label text="Why choose us" /></div>
            <h2 style={{ ...D, fontSize: 'clamp(1.85rem, 4.2vw, 2.4rem)', fontWeight: 900, color: INK, margin: '0 0 4px' }}>WHY GET YOUR VEHICLE</h2>
            <h2 style={{ ...D, fontSize: 'clamp(1.85rem, 4.2vw, 2.4rem)', fontWeight: 300, color: GREEN_DARK, margin: 0, letterSpacing: '3px' }}>REPAIRED WITH US?</h2>
          </div>
        </FadeUp>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          {reasons.map((text, i) => (
            <FadeUp key={i} delay={i * 0.12} style={{ flex: '0 0 auto', width: 'calc(33% - 16px)', minWidth: 240 }}>
              <div style={{ position: 'relative', padding: '40px 32px 32px', border: `1px solid ${BORDER}`, background: CARD, overflow: 'hidden', height: '100%', boxSizing: 'border-box', boxShadow: '0 2px 12px rgba(20,24,19,0.04)' }}>
                <div style={{ ...M, position: 'absolute', top: -10, right: 16, fontSize: '7rem', fontWeight: 900, color: GREEN, opacity: 0.08, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: GREEN }} />
                <div style={{ ...M, fontSize: '.68rem', fontWeight: 700, color: GREEN_DARK, letterSpacing: '3px', marginBottom: 16 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p style={{ ...M, fontSize: '1.02rem', fontWeight: 500, color: TEXT, lineHeight: 1.8, margin: 0, position: 'relative' }}>{text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── 5. SERVICES ── */}
      <div style={{ background: BG, padding: 'clamp(52px, 7.5vw, 90px) clamp(20px, 5vw, 80px)', borderBottom: `1px solid ${BORDER}` }}>
        <FadeUp>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <Label text="What we do" />
              <h2 style={{ ...D, fontSize: 'clamp(1.85rem, 4.2vw, 2.4rem)', fontWeight: 900, color: INK, margin: 0 }}>OUR SERVICES</h2>
            </div>
            <Link href="/services" style={{ ...M, fontSize: '.72rem', fontWeight: 700, color: GREEN_DARK, textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 20, height: 1, background: GREEN_DARK, display: 'inline-block' }} />View all services
            </Link>
          </div>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {services.map(({ title, desc, href, cta }, i) => (
            <FadeUp key={title} delay={i * 0.12}>
              <div className="hcard" style={{ background: CARD, border: `1px solid ${BORDER}`, padding: '40px 32px', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box', boxShadow: '0 2px 12px rgba(20,24,19,0.04)' }}>
                <div style={{ width: 36, height: 2, background: GREEN, marginBottom: 24 }} />
                <h3 style={{ ...M, fontSize: '1rem', fontWeight: 800, color: INK, marginBottom: 14, textTransform: 'uppercase' }}>{title}</h3>
                <p style={{ ...M, fontSize: '.98rem', fontWeight: 400, color: MUTED, lineHeight: 1.9, marginBottom: 28, flex: 1 }}>{desc}</p>
                <Link href={href} style={{ ...M, fontSize: '.7rem', fontWeight: 700, color: GREEN_DARK, textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 1, background: GREEN_DARK, display: 'inline-block' }} />{cta}
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── 6. TESTIMONIALS BELT ── */}
      <div style={{ background: BAND, borderBottom: `1px solid ${BORDER}`, padding: '56px 0', overflow: 'hidden' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 40, padding: '0 clamp(20px, 5vw, 80px)' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Label text="What our customers say" /></div>
            <h2 style={{ ...D, fontSize: 'clamp(1.55rem, 3.5vw, 1.8rem)', fontWeight: 900, color: INK, margin: 0 }}>TESTIMONIALS</h2>
          </div>
        </FadeUp>
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 24, width: 'max-content', animation: 'belt 45s linear infinite' }}>
            {[...testimonials, ...testimonials].map(({ quote, sign }, i) => (
              <div key={i} style={{ width: 'min(420px, 84vw)', flexShrink: 0, background: CARD, border: `1px solid ${BORDER}`, borderTop: `3px solid ${GREEN}`, padding: '32px 34px', boxSizing: 'border-box', boxShadow: '0 2px 12px rgba(20,24,19,0.04)' }}>
                <div style={{ ...M, fontSize: 'clamp(1.7rem, 3.8vw, 2rem)', fontWeight: 900, color: GREEN, lineHeight: 1, marginBottom: 12 }}>"</div>
                <p style={{ ...M, fontSize: '.96rem', fontWeight: 400, color: TEXT, lineHeight: 1.9, margin: '0 0 18px', fontStyle: 'italic' }}>{quote}</p>
                <p style={{ ...M, fontSize: '.74rem', fontWeight: 800, color: GREEN_DARK, letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>— {sign}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 7. CTA ── */}
      <FadeIn>
        <div style={{ position: 'relative', overflow: 'hidden', background: GREEN_DARK }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0 14px, transparent 14px 28px)' }} />
          <div style={{ position: 'relative', padding: 'clamp(44px, 6.5vw, 70px) clamp(20px, 5vw, 80px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 1, background: '#fff' }} />
                <p style={{ ...M, fontSize: '.72rem', fontWeight: 700, letterSpacing: '3px', color: '#fff', textTransform: 'uppercase', margin: 0 }}>Get in touch</p>
              </div>
              <h2 style={{ ...D, fontSize: 'clamp(1.7rem, 3.8vw, 2rem)', fontWeight: 900, color: '#fff', margin: '0 0 8px', textTransform: 'uppercase' }}>Has your vehicle been damaged?</h2>
              <p style={{ ...M, fontSize: '.96rem', fontWeight: 400, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.8 }}>
                Contact us today. We make the repair process as simple as possible. All repairs are guaranteed.
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
      </FadeIn>

      <style>{`
        @keyframes zoomin {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        @keyframes fadeup {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
        @keyframes belt {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

    </div>
  )
}
