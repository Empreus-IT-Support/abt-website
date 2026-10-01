import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Canberra Smash Repairers Since 1988',
  description:
    'Auto Body Technicians is a privately owned boutique smash repair business operating in Canberra since October 1988, twice awarded Primary Repairer of the Year.',
  alternates: { canonical: '/about' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
