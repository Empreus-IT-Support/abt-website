import type { NextConfig } from 'next'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'

const csp = [
  "default-src 'self'",
  // Next.js requires inline scripts for hydration; Turbopack needs eval in dev
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: path.join(__dirname),
  },
  // old-site URLs (indexed by Google / bookmarked) → new equivalents at cutover
  async redirects() {
    return [
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/about.php', destination: '/about', permanent: true },
      { source: '/services.php', destination: '/services', permanent: true },
      { source: '/quote.php', destination: '/quote', permanent: true },
      { source: '/contact.php', destination: '/contact', permanent: true },
      { source: '/location.php', destination: '/contact', permanent: true },
      { source: '/facilities.php', destination: '/about', permanent: true },
      { source: '/gallery.php', destination: '/about', permanent: true },
      { source: '/testimonials.php', destination: '/', permanent: true },
      { source: '/files/accidentChecklist.pdf', destination: '/quote', permanent: true },
      { source: '/files/PrivacyPolicyClientsInformation.pdf', destination: '/files/privacy-policy.pdf', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
