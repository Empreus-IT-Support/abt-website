import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Request a smash repair quote from ABT Auto Body Technicians in Mitchell, Canberra. Private, fleet, commercial and insurance work, with all repairs guaranteed.',
  alternates: { canonical: '/quote' },
}

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children
}
