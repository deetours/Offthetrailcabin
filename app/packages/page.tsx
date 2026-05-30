import type { Metadata } from 'next'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/Footer'
import PackagesClient from '@/components/packages/PackagesClient'

export const metadata: Metadata = {
  title: 'Basecamp Plans | Off the Trail',
  description: 'Simple stay, meal, and trail formats for guests who want the hills without planning everything from scratch.',
}

export default function PackagesPage() {
  return (
    <>
      <SiteHeader />
      <PackagesClient />
      <Footer />
    </>
  )
}
