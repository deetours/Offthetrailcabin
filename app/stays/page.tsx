import type { Metadata } from 'next'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/Footer'
import StayBrowserLayout from '@/components/stays/StayBrowserLayout'

export const metadata: Metadata = {
  title: 'Stays & Cabins Browser | Off the Trail',
  description: 'Browse our verified wooden cabins and ridge rooms across Jibhi and Dalhousie.',
}

export default function StaysPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-surface paper-grain">
        <StayBrowserLayout />
      </main>
      <Footer />
    </>
  )
}
