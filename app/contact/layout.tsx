import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Mitchell, Canberra ACT',
  description:
    'Contact ABT Auto Body Technicians: 25 Winchcombe Court, Mitchell ACT 2911. Phone 02 6241 3801. Open Monday to Friday, 8:00am – 4:30pm.',
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
