import { atlasConfigured, sendAtlasEmail } from '@/lib/atlas'
import { NextRequest, NextResponse } from 'next/server'
import { sanitizeFormBody } from '../utils'

export async function POST(req: NextRequest) {
  if (!atlasConfigured()) {
    return NextResponse.json({ error: 'Email service is not configured' }, { status: 503 })
  }
  try {
    const body = sanitizeFormBody(await req.json())
    if (body.website) {
      // honeypot filled — silently accept so bots don't learn
      return NextResponse.json({ success: true })
    }
    const { name, email, phone, mobile, make, model, year, message } = body

    const result = await sendAtlasEmail({
      // Must be a bare address Atlas authorises for this key — see lib/atlas.ts.
      from: process.env.CONTACT_FROM ?? 'DoNotReply@autobodytech.net.au',
      to: process.env.CONTACT_RECIPIENT ?? 'admin@autobodytech.net.au',
      replyTo: email,
      subject: `New Contact Form Submission — ${name}`,
      text: [
        'New Contact Form Submission',
        '',
        'Contact Details',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Mobile: ${mobile || 'N/A'}`,
        '',
        'Vehicle Information',
        `Make: ${make || 'N/A'}`,
        `Model: ${model || 'N/A'}`,
        `Year: ${year || 'N/A'}`,
        '',
        'Message',
        message,
        '',
        'Sent from the autobodytech.net.au contact form',
      ].join('\n'),
    })

    if (!result.ok) {
      console.error(`[contact] Atlas send failed ${result.status}: ${result.detail}`)
      return NextResponse.json({ error: 'Something went wrong' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}