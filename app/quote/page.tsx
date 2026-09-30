'use client'
import { useState, useRef, useEffect } from 'react'

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

const years = Array.from({ length: 2021 - 1900 + 1 }, (_, i) => 2021 - i)

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

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  border: `1px solid ${BORDER}`,
  borderLeft: `3px solid ${BORDER}`,
  fontSize: '.9rem',
  background: BAND,
  outline: 'none',
  fontFamily: "var(--font-body), sans-serif",
  color: INK,
  marginBottom: '20px',
  display: 'block',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
} as React.CSSProperties

const labelStyle = {
  display: 'block',
  fontSize: '.7rem',
  fontWeight: 700,
  color: MUTED,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  marginBottom: '8px',
  fontFamily: "var(--font-body), sans-serif",
} as React.CSSProperties

const photoTips = [
  { title: 'Overall Shot', desc: 'Take an overall picture where the complete car is in shot and the damaged section is in the centre.' },
  { title: 'Not Too Close', desc: "Don't take images too close up — it's important that we can see as much of the damaged area as possible." },
  { title: 'Good Lighting', desc: 'Take photos under bright lights or natural sunlight — make sure the damaged area isn\'t in shadow.' },
]

export default function Quote() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const mobileRef = useRef<HTMLInputElement>(null)
  const makeRef = useRef<HTMLInputElement>(null)
  const modelRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLSelectElement>(null)
  const colourRef = useRef<HTMLInputElement>(null)
  const regoRef = useRef<HTMLInputElement>(null)
  const vinRef = useRef<HTMLInputElement>(null)
  const insurerRef = useRef<HTMLInputElement>(null)
  const claimRef = useRef<HTMLInputElement>(null)
  const damageRef = useRef<HTMLTextAreaElement>(null)
  const websiteRef = useRef<HTMLInputElement>(null) // honeypot — humans never see or fill this

  async function handleSubmit() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/quote', {
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
          colour: colourRef.current?.value,
          rego: regoRef.current?.value,
          vin: vinRef.current?.value,
          insurer: insurerRef.current?.value,
          claimNumber: claimRef.current?.value,
          damage: damageRef.current?.value,
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

  const Section = ({ num, title, children }: { num: number, title: string, children: React.ReactNode }) => (
    <FadeUp style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, paddingBottom: 16, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ ...M, width: 36, height: 36, background: GREEN_DARK, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.74rem', fontWeight: 700, flexShrink: 0 }}>
          {String(num).padStart(2, '0')}
        </div>
        <h2 style={{ ...D, fontSize: '1rem', fontWeight: 800, color: INK, margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h2>
      </div>
      {children}
    </FadeUp>
  )

  return (
    <div style={{ ...M, background: BG, color: TEXT }}>

      {/* HERO */}
      <div style={{ background: BG, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ height: 12, background: 'repeating-conic-gradient(#141813 0% 25%, #ffffff 0% 50%)', backgroundSize: '12px 12px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 48, alignItems: 'center', padding: 'clamp(44px, 7vw, 80px) clamp(20px, 5vw, 80px) clamp(40px, 6vw, 70px)', maxWidth: 1440, margin: '0 auto' }}>
          <div>
            <div style={{ animation: 'fadeup 0.8s ease 0.2s both' }}><Label text="Get started" /></div>
            <div style={{ animation: 'fadeup 0.8s ease 0.4s both' }}>
              <h1 style={{ ...D, fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: INK, lineHeight: 1, margin: '0 0 8px' }}>NEED A</h1>
              <h1 style={{ ...D, fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 300, color: GREEN_DARK, lineHeight: 1.1, margin: '0 0 24px', letterSpacing: '4px' }}>QUOTE?</h1>
            </div>
            <div style={{ animation: 'fadeup 0.8s ease 0.6s both' }}>
              <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 20 }} />
              <p style={{ ...M, fontSize: '.96rem', color: TEXT, lineHeight: 1.8, maxWidth: 500, margin: 0 }}>
                Currently only for insurance claims when clients have their relevant claim numbers. Submitting this form does not bind you into a formal agreement.
              </p>
            </div>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.5s both' }}>
            <div className="hcard" style={{ border: `1px solid ${BORDER}`, borderTop: `3px solid ${GREEN}`, boxShadow: '0 12px 40px rgba(20,24,19,0.10)' }}>
              <img
                src="/images/photo-1530046339160-ce3e530c7d2f.jpg"
                alt="Workshop tools ready for your repair"
                style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>

        {/* FORM */}
        <div style={{ flex: '1 1 560px', minWidth: 0, padding: 'clamp(40px, 6vw, 70px) clamp(20px, 5vw, 70px) clamp(40px, 6vw, 70px) clamp(20px, 5vw, 80px)', borderRight: `1px solid ${BORDER}` }}>

          {submitted ? (
            <FadeUp>
              <div style={{ padding: '60px 40px', background: BAND, border: `1px solid ${BORDER}`, borderTop: `4px solid ${GREEN}`, textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, background: GREEN_DARK, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 style={{ ...D, fontSize: '1.4rem', fontWeight: 900, color: INK, marginBottom: 12, textTransform: 'uppercase' }}>Quote Request Sent!</h2>
                <p style={{ ...M, fontSize: '.96rem', color: MUTED, lineHeight: 1.8, margin: 0 }}>Thank you. We will be in touch with you as soon as possible.</p>
              </div>
            </FadeUp>
          ) : (
            <>
              <FadeUp style={{ marginBottom: 40 }}>
                <p style={{ ...M, fontSize: '.78rem', fontWeight: 600, color: MUTED, letterSpacing: '1px' }}>* details must be entered</p>
              </FadeUp>

              <Section num={1} title="Contact Details">
                <input ref={websiteRef} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }} />
                <label style={labelStyle}>name: *</label>
                <input ref={nameRef} type="text" placeholder="Full name" style={inputStyle} />
                <label style={labelStyle}>email: *</label>
                <input ref={emailRef} type="email" placeholder="your@email.com" style={inputStyle} />
                <label style={labelStyle}>Business Phone: *</label>
                <input ref={phoneRef} type="tel" placeholder="Business phone number" style={inputStyle} />
                <label style={labelStyle}>Mobile:</label>
                <input ref={mobileRef} type="tel" placeholder="Mobile number" style={inputStyle} />
              </Section>

              <Section num={2} title="Vehicle Information">
                <label style={labelStyle}>Make:</label>
                <input ref={makeRef} type="text" placeholder="e.g. Toyota" style={inputStyle} />
                <label style={labelStyle}>Model:</label>
                <input ref={modelRef} type="text" placeholder="e.g. Corolla" style={inputStyle} />
                <label style={labelStyle}>Year of Manufacture:</label>
                <select ref={yearRef} style={{ ...inputStyle, color: TEXT }}>
                  <option value="">(pls select)</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <label style={labelStyle}>Colour:</label>
                <input ref={colourRef} type="text" placeholder="e.g. Silver" style={inputStyle} />
                <label style={labelStyle}>Registration No:</label>
                <input ref={regoRef} type="text" placeholder="e.g. ABC123" style={inputStyle} />
                <label style={labelStyle}>VIN Number:</label>
                <input ref={vinRef} type="text" placeholder="Vehicle Identification Number" style={inputStyle} />
              </Section>

              <Section num={3} title="Insurer Information">
                <label style={labelStyle}>Insurer Details:</label>
                <input ref={insurerRef} type="text" placeholder="e.g. NRMA, AAMI, Allianz" style={inputStyle} />
                <label style={labelStyle}>Claim Number:</label>
                <input ref={claimRef} type="text" placeholder="Your claim number" style={inputStyle} />
                <p style={{ ...M, fontSize: '.8rem', color: MUTED, marginBottom: 16, marginTop: -10, lineHeight: 1.7 }}>
                  If unsure how to obtain a claim number, contact our friendly office staff and they will help.
                </p>
                <label style={labelStyle}>Description of Damage:</label>
                <textarea ref={damageRef} placeholder="Describe any damage not visible in photos..." style={{ ...inputStyle, minHeight: 110, resize: 'vertical' }} />
              </Section>

              <Section num={4} title="Photos — Optional">
                <p style={{ ...M, fontSize: '.88rem', color: MUTED, lineHeight: 1.8, marginBottom: 20 }}>
                  Sending suitable photos will give us the ability to quote your job immediately.
                </p>
                <div style={{ height: 180, overflow: 'hidden', marginBottom: 24, border: `1px solid ${BORDER}` }}>
                  <img
                    src="/images/photo-1580273916550-e323be2ae537.jpg"
                    alt="Example photo — complete car in shot"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                {['image01:', 'image02:', 'image03:', 'image04:'].map(label => (
                  <div key={label}>
                    <label style={labelStyle}>{label}</label>
                    <input type="file" accept="image/*" style={{ ...inputStyle, color: MUTED, padding: '10px 14px' }} />
                  </div>
                ))}
              </Section>

              {error && <p style={{ ...M, color: '#c0392b', fontSize: '.9rem', marginBottom: 16 }}>{error}</p>}

              <FadeUp style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button type="button" className="btn-lift" onClick={handleSubmit} disabled={loading}
                  style={{ ...M, background: GREEN_DARK, color: '#fff', padding: '16px 44px', border: 'none', fontSize: '.8rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '1.5px', textTransform: 'uppercase', opacity: loading ? 0.7 : 1, borderRadius: '2px' }}>
                  {loading ? 'Sending...' : 'Request Quote'}
                </button>
                <button type="button"
                  style={{ ...M, background: 'transparent', color: TEXT, padding: '16px 32px', border: `1px solid ${BORDER}`, fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px' }}>
                  Reset
                </button>
              </FadeUp>
            </>
          )}
        </div>

        {/* SIDEBAR */}
        <div style={{ flex: '1 1 300px', background: BAND, position: 'sticky', top: 0, borderLeft: `1px solid ${BORDER}`, minHeight: '100vh' }}>

          {/* LOCATION */}
          <div style={{ padding: '40px 32px', borderBottom: `1px solid ${BORDER}` }}>
            <Label text="Location & Details" />
            {[
              { label: 'Workshop', value: '25 Winchcombe Court\nMitchell ACT 2911' },
              { label: 'Phone', value: '02 6241 3801' },
              { label: 'Email', value: 'admin@autobodytech.net.au' },
              { label: 'Hours', value: 'Mon–Fri 8:00am – 4:30pm' },
              { label: 'Repair Licence', value: '20000332' },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${BORDER}` }}>
                <p style={{ ...M, fontSize: '.68rem', fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 3 }}>{label}</p>
                <p style={{ ...M, fontSize: '.9rem', color: INK, whiteSpace: 'pre-line', lineHeight: 1.6, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>

          {/* PHOTO TIPS */}
          <div style={{ padding: '32px 32px' }}>
            <Label text="Photo Tips" />
            {photoTips.map(({ title, desc }, i) => (
              <div key={title} style={{ marginBottom: 20, paddingBottom: 20, borderBottom: i < photoTips.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 6, height: 6, background: GREEN_DARK, borderRadius: '50%', flexShrink: 0 }} />
                  <h4 style={{ ...M, fontSize: '.8rem', fontWeight: 800, color: INK, margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h4>
                </div>
                <p style={{ ...M, fontSize: '.84rem', color: MUTED, lineHeight: 1.7, margin: 0, paddingLeft: 16 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* TOWING */}
          <div style={{ margin: '0 32px 32px', padding: '20px 24px', background: CARD, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${GREEN}` }}>
            <p style={{ ...M, fontSize: '.68rem', fontWeight: 700, color: GREEN_DARK, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 10 }}>Towing</p>
            <p style={{ ...M, fontSize: '.94rem', color: INK, fontWeight: 700, marginBottom: 4 }}>Discount Towing Canberra</p>
            <p style={{ ...M, fontSize: '.84rem', color: MUTED, lineHeight: 1.6, margin: 0 }}>24 Hours a Day, 365 Days a Year<br />Phone: 0411 259 945</p>
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
