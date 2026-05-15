import type { Metadata } from 'next'
import Image from 'next/image'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/Footer'
import TrailConfidenceDesk from '@/components/adventures/TrailConfidenceDesk'

export const metadata: Metadata = {
  title: 'Guided Days Off the Trail | Off the Trail',
  description: 'Clear difficulty, weather notes, guide support, and route guidance before you step out.',
}

const carry = ['Layered clothing', 'Good-traction shoes', '1.5L water', 'Trail snack', 'Personal medicine', 'Rain shell / sun protection']
const weatherCards = ['Best mornings: early starts are calmer and clearer.', 'Monsoon caution: route adjustments are normal.', 'Snow/ice check: guide confirms conditions first.', 'Guide decision: safety over fixed itinerary.', 'Route update shared on WhatsApp before departure.']
const faq = [
  ['Do I need a guide?', 'For selected routes, guide support is recommended and can be arranged.'],
  ['Can beginners do these trails?', 'Some trails are beginner-friendly. We confirm based on comfort and weather.'],
  ['What if weather changes?', 'We adjust or postpone routes based on safety and conditions.'],
  ['What should I carry?', 'Water, shoes, layers, snack, personal medication, and weather protection.'],
  ['Can families join?', 'Gentle walks may suit families. We confirm route suitability first.'],
  ['Is payment required now?', 'No. We confirm route, guide, and weather first.'],
]

export default function AdventuresPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-[#F4EFE4]">
        <section className="pb-16 pt-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.15fr]">
            <div className="rounded-[28px] border border-[rgba(23,37,31,0.12)] bg-[#FFFCF6] p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6D716B]">Trails / Local Guidance</p>
              <h1 className="mt-4 text-5xl font-serif text-[#17251F] md:text-6xl">Guided trails, chosen with care.</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#6D716B]">Clear difficulty, weather notes, guide support, and route guidance before you step out.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#trails" className="inline-flex rounded-full bg-[#17251F] px-5 py-3 text-sm font-semibold text-[#FFFCF6]">Explore trails</a>
                <a href="#trail-enquiry" className="inline-flex rounded-full border border-[rgba(23,37,31,0.16)] bg-[#FFFCF6] px-5 py-3 text-sm font-semibold text-[#17251F]">Ask suitability</a>
              </div>
              <p className="mt-8 text-sm text-[#6D716B]">Local guide - Weather-aware - Difficulty marked - Route briefing</p>
            </div>
            <div className="grid min-h-[500px] gap-4 sm:grid-cols-2 sm:grid-rows-[1.3fr_1fr_1fr]">
              <article className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.10)] sm:row-span-2">
                <Image src="/images/offtrail/trail-path.jpg" alt="Misty trail view near Chamba" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </article>
              <article className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.10)]">
                <Image src="/images/trails.png" alt="Trail route planning visual" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 22vw" />
              </article>
              <article className="rounded-[24px] border border-[rgba(23,37,31,0.10)] bg-[#FFFCF6] p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-[#6D716B]">Best season</p>
                <p className="mt-2 text-sm text-[#17251F]">March to June and September to November</p>
              </article>
              <article className="rounded-[24px] border border-[rgba(23,37,31,0.10)] bg-[#17251F] p-5 text-[#FFFCF6] sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.15em] text-[#F4EFE4]/75">Guide support</p>
                <p className="mt-2 text-sm">Routes are confirmed with local guide support and weather checks before departure.</p>
              </article>
            </div>
          </div>
        </section>

        <TrailConfidenceDesk />

        <section className="bg-[#FFFCF6] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-4xl font-serif text-[#17251F] md:text-5xl">Difficulty Guide</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-[rgba(23,37,31,0.10)] bg-[#F4EFE4] p-5"><h3 className="text-2xl font-serif text-[#17251F]">Gentle</h3><p className="mt-2 text-sm text-[#6D716B]">Easy walks, families, slow mornings.</p></article>
              <article className="rounded-2xl border border-[rgba(23,37,31,0.10)] bg-[#F4EFE4] p-5"><h3 className="text-2xl font-serif text-[#17251F]">Moderate</h3><p className="mt-2 text-sm text-[#6D716B]">Steady walking and basic comfort with climbs.</p></article>
              <article className="rounded-2xl border border-[rgba(23,37,31,0.10)] bg-[#F4EFE4] p-5"><h3 className="text-2xl font-serif text-[#17251F]">Harder / Weather dependent</h3><p className="mt-2 text-sm text-[#6D716B]">Only after guide confirmation.</p></article>
            </div>
          </div>
        </section>

        <section className="bg-[#F4EFE4] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-4xl font-serif text-[#17251F] md:text-5xl">What to carry</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {carry.map((item) => <article key={item} className="rounded-2xl border border-[rgba(23,37,31,0.10)] bg-[#FFFCF6] p-4 text-sm font-semibold text-[#17251F]">{item}</article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#FFFCF6] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-4xl font-serif text-[#17251F] md:text-5xl">Weather-aware planning</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#6D716B]">Routes are confirmed based on weather, trail condition, and group comfort. We would rather adjust the plan than force a bad trail day.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {weatherCards.map((item) => <article key={item} className="rounded-2xl border border-[rgba(23,37,31,0.10)] bg-[#F4EFE4] p-4 text-sm text-[#17251F]">{item}</article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#F4EFE4] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-4xl font-serif text-[#17251F] md:text-5xl">FAQ</h2>
            <div className="mt-8 space-y-3">
              {faq.map(([q, a]) => (
                <details key={q} className="rounded-2xl border border-[rgba(23,37,31,0.20)] bg-[#FFFCF6] p-5 text-[#17251F]">
                  <summary className="cursor-pointer list-none">
                    <span style={{ color: '#17251F', fontWeight: 700, fontSize: '1rem', lineHeight: 1.5 }}>{q}</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#6D716B]">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#17251F] py-20 text-[#FFFCF6]">
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-5 px-6">
            <h2 className="text-4xl font-serif text-[#FFFCF6] md:text-5xl">Not sure which trail fits?</h2>
            <p className="max-w-3xl text-base leading-relaxed text-[#F4EFE4]/78">Tell us your date, group size, and comfort level. We will suggest the right route.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#trail-enquiry" className="inline-flex items-center rounded-full bg-[#FFFCF6] px-6 py-3 text-sm font-semibold text-[#17251F]">Ask trail suitability</a>
              <a href="/packages" className="inline-flex items-center rounded-full border border-[rgba(244,239,228,0.32)] px-6 py-3 text-sm font-semibold text-[#FFFCF6]">View basecamp packages</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
