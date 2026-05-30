import type { Metadata } from 'next'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/Footer'
import AdventuresClient from '@/components/adventures/AdventuresClient'

export const metadata: Metadata = {
  title: 'Guided Days Off the Trail | Off the Trail',
  description: 'Clear difficulty, weather notes, guide support, and route guidance before you step out.',
}

export default function AdventuresPage() {
  return (
    <>
      <SiteHeader />
      <AdventuresClient />
      <Footer />
    </>
  )
}
