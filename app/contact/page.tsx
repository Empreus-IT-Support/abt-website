'use client'
import { useState, useEffect, useRef } from 'react'

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

function useInView(threshold = 0.1) {
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
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
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

const FieldError = ({ msg }: { msg?: string }) => msg
  ? <p style={{ ...M, color: '#c0392b', fontSize: '.78rem', marginTop: '-14px', marginBottom: '16px', letterSpacing: '.5px' }}>⚠ {msg}</p>
  : null

const years = Array.from({ length: 2020 - 1900 + 1 }, (_, i) => 2020 - i)

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: `1px solid ${BORDER}`,
  borderLeft: `3px solid ${BORDER}`,
  fontSize: '.94rem',
  background: BAND,
  outline: 'none',
  fontFamily: "var(--font-body), sans-serif",
  color: INK,
  marginBottom: '20px',
  display: 'block',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '.68rem',
  fontWeight: 700,
  color: MUTED,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginBottom: '8px',
  fontFamily: "var(--font-body), sans-serif",
}

const badgeStyle: React.CSSProperties = {
  width: '28px',
  height: '28px',
  background: GREEN_DARK,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '.78rem',
  fontWeight: 700,
  flexShrink: 0,
}

const sectionHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  marginBottom: '28px',
  paddingBottom: '16px',
  borderBottom: `1px solid ${BORDER}`,
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const mobileRef = useRef<HTMLInputElement>(null)
  const makeRef = useRef<HTMLInputElement>(null)
  const modelRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const websiteRef = useRef<HTMLInputElement>(null) // honeypot — humans never see or fill this

  function validate() {
    const e: Record<string, string> = {}
    if (!nameRef.current?.value.trim()) e.name = 'Name is required'
    if (!emailRef.current?.value.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRef.current.value)) e.email = 'Enter a valid email'
    if (!phoneRef.current?.value.trim()) e.phone = 'Phone number is required'
    if (!messageRef.current?.value.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          phone: phoneRef.current?.value,
          mobile: mobileRef.current?.value,
          make: makeRef.current?.value,
          model: modelRef.current?.value,
          year: yearRef.current?.value,
          message: messageRef.current?.value,
          website: websiteRef.current?.value,
        }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ ...M, background: BG, color: TEXT }}>

      {/* HERO */}
      <div style={{ background: BG, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ height: 12, background: 'repeating-conic-gradient(#141813 0% 25%, #ffffff 0% 50%)', backgroundSize: '12px 12px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 48, alignItems: 'center', padding: 'clamp(44px, 7vw, 80px) clamp(20px, 5vw, 80px) clamp(40px, 6vw, 70px)', maxWidth: 1440, margin: '0 auto' }}>
          <div>
            <div style={{ animation: 'fadeup 0.8s ease 0.2s both' }}><Label text="Get in touch" /></div>
            <div style={{ animation: 'fadeup 0.8s ease 0.4s both' }}>
              <h1 style={{ ...D, fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: INK, lineHeight: 1, margin: '0 0 8px' }}>CONTACT</h1>
              <h1 style={{ ...D, fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 300, color: GREEN_DARK, lineHeight: 1.1, margin: '0 0 24px', letterSpacing: '4px' }}>ABT</h1>
            </div>
            <div style={{ animation: 'fadeup 0.8s ease 0.6s both' }}>
              <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 20 }} />
              <p style={{ ...M, fontSize: '1.02rem', color: TEXT, lineHeight: 1.8, maxWidth: 480, margin: 0 }}>
                Please fill in the details below and we will contact you as soon as we can.
              </p>
            </div>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.5s both' }}>
            <div className="hcard" style={{ border: `1px solid ${BORDER}`, borderTop: `3px solid ${GREEN}`, boxShadow: '0 12px 40px rgba(20,24,19,0.10)' }}>
              <img
                src="/images/photo-1625047509168-a7026f36de04.jpg"
                alt="Technician inspecting a vehicle in the workshop"
                style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* QUICK INFO STRIP */}
      <div style={{ background: GREEN_DARK, padding: '0 clamp(20px, 5vw, 80px)', display: 'flex', flexWrap: 'wrap' }}>
        {[
          { label: 'Trading Hours', value: 'Mon – Fri: 8:00am – 4:30pm' },
          { label: 'Phone', value: '02 6241 3801' },
          { label: 'Towing', value: 'Discount Towing Canberra · 0411 259 945' },
          { label: 'Guarantee', value: 'All Repairs Guaranteed' },
        ].map(({ label, value }, i) => (
          <div key={label} style={{ padding: '20px 40px 20px 0', marginRight: '40px', borderRight: i < 3 ? '1px solid rgba(255,255,255,.25)' : 'none' }}>
            <p style={{ ...M, fontSize: '.66rem', fontWeight: 700, color: 'rgba(255,255,255,.75)', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 4px' }}>{label}</p>
            <p style={{ ...M, fontSize: '.9rem', fontWeight: 700, color: '#fff', margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>

        {/* FORM */}
        <div style={{ flex: '1 1 560px', minWidth: 0, padding: 'clamp(40px, 6vw, 64px) clamp(20px, 5vw, 80px)', borderRight: `1px solid ${BORDER}` }}>
          <FadeUp>
            <Label text="Send us a message" />
            <h2 style={{ ...D, fontSize: 'clamp(1.75rem, 4vw, 2.2rem)', fontWeight: 900, color: INK, marginBottom: 8, textTransform: 'uppercase' }}>
              Get In <span style={{ color: GREEN_DARK, fontWeight: 300 }}>Touch</span>
            </h2>
            <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 40 }} />
          </FadeUp>

          {submitted ? (
            <FadeUp>
              <div style={{ padding: '48px 40px', background: BAND, border: `1px solid ${BORDER}`, borderTop: `4px solid ${GREEN}`, textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', background: GREEN_DARK, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p style={{ ...M, fontSize: '1.2rem', fontWeight: 700, color: INK, marginBottom: '10px' }}>Message Sent!</p>
                <p style={{ ...M, color: MUTED, fontSize: '.96rem', lineHeight: 1.7, margin: 0 }}>Thank you for contacting us. We will get back to you as soon as possible.</p>
              </div>
            </FadeUp>
          ) : (
            <>
              <p style={{ ...M, color: MUTED, fontSize: '.84rem', fontStyle: 'italic', marginBottom: '40px' }}>* details must be entered</p>

              <FadeUp delay={0.1}>
                <div style={{ marginBottom: '48px' }}>
                  <div style={sectionHeaderStyle}>
                    <div style={badgeStyle}>1</div>
                    <h2 style={{ ...D, fontSize: '1rem', fontWeight: 700, color: INK, margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>Contact Details</h2>
                  </div>
                  <input ref={websiteRef} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }} />
                  <label style={labelStyle}>name: *</label>
                  <input ref={nameRef} type="text" placeholder="Full name"
                    style={{ ...inputStyle, borderLeftColor: errors.name ? '#c0392b' : BORDER }} />
                  <FieldError msg={errors.name} />
                  <label style={labelStyle}>email: *</label>
                  <input ref={emailRef} type="email" placeholder="your@email.com"
                    style={{ ...inputStyle, borderLeftColor: errors.email ? '#c0392b' : BORDER }} />
                  <FieldError msg={errors.email} />
                  <label style={labelStyle}>Ph: *</label>
                  <input ref={phoneRef} type="tel" placeholder="Phone number"
                    style={{ ...inputStyle, borderLeftColor: errors.phone ? '#c0392b' : BORDER }} />
                  <FieldError msg={errors.phone} />
                  <label style={labelStyle}>Mobile:</label>
                  <input ref={mobileRef} type="tel" placeholder="Mobile number" style={inputStyle} />
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div style={{ marginBottom: '48px' }}>
                  <div style={sectionHeaderStyle}>
                    <div style={badgeStyle}>2</div>
                    <h2 style={{ ...D, fontSize: '1rem', fontWeight: 700, color: INK, margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>Vehicle Information</h2>
                  </div>
                  <label style={labelStyle}>Make:</label>
                  <input ref={makeRef} type="text" placeholder="e.g. Toyota" style={inputStyle} />
                  <label style={labelStyle}>Model:</label>
                  <input ref={modelRef} type="text" placeholder="e.g. Corolla" style={inputStyle} />
                  <label style={labelStyle}>Year of Manufacture:</label>
                  <select ref={yearRef} style={{ ...inputStyle, color: TEXT }}>
                    <option value="">(pls select)</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div style={{ marginBottom: '40px' }}>
                  <div style={sectionHeaderStyle}>
                    <div style={badgeStyle}>3</div>
                    <h2 style={{ ...D, fontSize: '1rem', fontWeight: 700, color: INK, margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>Message</h2>
                  </div>
                  <label style={labelStyle}>Message: *</label>
                  <textarea ref={messageRef} placeholder="How can we help you?"
                    style={{ ...inputStyle, minHeight: '140px', resize: 'vertical', borderLeftColor: errors.message ? '#c0392b' : BORDER }} />
                  <FieldError msg={errors.message} />
                </div>
              </FadeUp>

              {error && <p style={{ ...M, color: '#c0392b', fontSize: '.9rem', marginBottom: '16px' }}>{error}</p>}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn-lift" onClick={handleSubmit} disabled={loading}
                  style={{ ...M, background: GREEN_DARK, color: '#fff', padding: '16px 44px', border: 'none', fontSize: '.8rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '1.5px', textTransform: 'uppercase', opacity: loading ? 0.7 : 1, borderRadius: '2px' }}>
                  {loading ? 'Sending...' : 'Submit'}
                </button>
                <button type="button"
                  style={{ ...M, background: 'transparent', color: TEXT, padding: '16px 32px', border: `1px solid ${BORDER}`, fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px' }}>
                  Reset
                </button>
              </div>
            </>
          )}
        </div>

        {/* SIDEBAR */}
        <div style={{ flex: '1 1 300px', background: BAND, position: 'sticky', top: 0, borderLeft: `1px solid ${BORDER}` }}>
          <div style={{ padding: '40px 32px', borderBottom: `1px solid ${BORDER}` }}>
            <Label text="Location & Details" />
            <p style={{ ...M, fontSize: '.96rem', fontWeight: 700, color: INK, marginBottom: '20px' }}>ABT Auto Body Technicians</p>
            {[
              { label: 'Workshop', value: '25 Winchcombe Court\nMitchell ACT 2911' },
              { label: 'Postal', value: 'as above' },
              { label: 'Phone', value: '02 6241 3801' },
              { label: 'Email', value: 'admin@autobodytech.net.au', green: true },
              { label: 'ABN', value: '78 685 130 090' },
              { label: 'Licence', value: '20000332' },
            ].map(({ label, value, green }) => (
              <div key={label} style={{ display: 'flex', gap: '10px', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${BORDER}` }}>
                <p style={{ ...M, fontSize: '.68rem', fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '1.5px', margin: 0, minWidth: '60px', flexShrink: 0, paddingTop: '2px' }}>{label}:</p>
                <p style={{ ...M, fontSize: '.88rem', color: green ? GREEN_DARK : TEXT, whiteSpace: 'pre-line', lineHeight: 1.6, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: '28px 32px', borderBottom: `1px solid ${BORDER}`, background: CARD }}>
            <Label text="Towing Service" />
            <p style={{ ...M, fontSize: '.94rem', color: INK, fontWeight: 700, marginBottom: '4px' }}>Discount Towing Canberra</p>
            <p style={{ ...M, fontSize: '.8rem', color: MUTED, lineHeight: 1.7, margin: 0 }}>
              24 Hours a Day, 365 Days a Year<br />
              Phone: 0411 259 945
            </p>
          </div>

          <div style={{ padding: '28px 32px' }}>
            <Label text="Trusted Brands" />
            <p style={{ ...M, fontSize: '.8rem', color: MUTED, lineHeight: 1.7, margin: 0 }}>
              Auto Body Technicians use some of Australia's most recognised and trusted brands to deliver first class collision repairs.
            </p>
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
