import type { Metadata } from 'next'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/Footer'
import CafeClient from '@/components/cafe/CafeClient'

export const metadata: Metadata = {
  title: 'The Mountain Table | Off the Trail',
  description: 'Warm food, clear timings, and room ordering for slow days in the hills.',
}

export default function CafePage() {
  return (
    <>
      <SiteHeader />
      <CafeClient />
      <Footer />
    </>
  )
}
