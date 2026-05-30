import type { Metadata } from 'next'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/Footer'
import BookingFlow from '@/components/booking/BookingFlow'

export const metadata: Metadata = {
  title: 'Plan Your Stay | Off the Trail',
  description: 'Design your stay in the Himalayas. Choose your destination, vibe, and let us coordinate the rest.',
}

export default function BookingPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-surface paper-grain min-h-screen pt-28 pb-32">
        <div className="mx-auto max-w-[900px] px-[clamp(24px,5vw,72px)]">
          <div className="mb-12 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3 block">
              THE BOOKING DESK
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-primary font-normal leading-tight">
              Design your <span className="italic text-accent">mountain stay.</span>
            </h1>
          </div>
          
          <BookingFlow />
        </div>
      </main>
      <Footer />
    </>
  )
}
