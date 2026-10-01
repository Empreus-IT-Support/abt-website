import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | Smash Repairs & Insurance Work',
  description:
    'Quality smash repairs for private, fleet, commercial and insurance clients in Canberra. We repair all vehicle makes and models, with all repairs guaranteed.',
  alternates: { canonical: '/services' },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
