import type { Metadata } from 'next'
import Image from 'next/image'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/Footer'
import BasecampPlansDesk from '@/components/packages/BasecampPlansDesk'

export const metadata: Metadata = {
  title: 'Basecamp Plans | Off the Trail',
  description: 'Simple stay, meal, and trail formats for guests who want Chamba without planning everything from scratch.',
}

const compareRows = [
  { plan: '24-Hour Reset', stay: '1 night', meals: 'Breakfast', trail: 'Short guided walk', route: 'Included', bestFor: 'Quick getaway' },
  { plan: '48-Hour Chamba Escape', stay: '2 nights', meals: '2 breakfasts + 1 dinner', trail: 'Local forest trail', route: 'Included', bestFor: 'Relaxed immersion' },
  { plan: 'Trail Weekend', stay: '2 nights', meals: 'Pre-trail breakfast + warm dinner', trail: 'Guided trail route', route: 'Included', bestFor: 'Active explorers' },
]

const addOns = [
  'Bonfire tea setup Rs 350',
  'Packed trail snack Rs 180 per person',
  'Extra dinner Rs 650 per person',
  'Private guide support Ask availability',
  'Room food ordering Available from cafe',
]

const faq = [
  ['Is payment required now?', 'No. We confirm availability and details first. UPI payment can be done after confirmation.'],
  ['Can the package be customized?', 'Yes, based on dates, guest count, food preferences, and weather.'],
  ['Are trails included in every package?', 'Some packages include guided walks or trails. We confirm suitability before finalizing.'],
  ['Is food included?', 'It depends on the package. Add-ons are available from the cafe.'],
  ['How is the booking confirmed?', 'We confirm details on WhatsApp, then share UPI/payment instructions.'],
]

export default function PackagesPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-[#F4EFE4]">
        <section className="pb-16 pt-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.15fr]">
            <div className="rounded-[28px] border border-[rgba(23,37,31,0.12)] bg-[#FFFCF6] p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6D716B]">Packages / Basecamp Plans</p>
              <h1 className="mt-4 text-5xl font-serif text-[#17251F] md:text-6xl">Choose your basecamp plan.</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#6D716B]">
                Stay, meals, trails, and route help arranged into simple formats.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#plans" className="inline-flex rounded-full bg-[#17251F] px-5 py-3 text-sm font-semibold text-[#FFFCF6]">Explore plans</a>
                <a href="#plan-enquiry" className="inline-flex rounded-full border border-[rgba(23,37,31,0.16)] bg-[#FFFCF6] px-5 py-3 text-sm font-semibold text-[#17251F]">Ask for suggestion</a>
              </div>
              <p className="mt-8 text-sm text-[#6D716B]">No hidden confusion - WhatsApp planning - UPI after confirmation - Local route help</p>
            </div>
            <div className="grid min-h-[500px] gap-4 sm:grid-cols-2 sm:grid-rows-[1.2fr_1fr_1fr]">
              <article className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.10)] sm:row-span-2">
                <Image src="/images/escape.png" alt="Featured basecamp package mood" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </article>
              <article className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.10)]">
                <Image src="/images/offtrail/trail-path.jpg" alt="Trail segment from a package plan" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 22vw" />
              </article>
              <article className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.10)]">
                <Image src="/images/bonfire.png" alt="Fire dinner in basecamp package" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 22vw" />
              </article>
              <article className="rounded-[24px] border border-[rgba(23,37,31,0.10)] bg-[#17251F] p-5 text-[#FFFCF6] sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.15em] text-[#F4EFE4]/75">Most chosen</p>
                <p className="mt-2 text-xl font-serif">48-Hour Chamba Escape</p>
                <p className="mt-1 text-sm">Stay + food + local trail</p>
              </article>
            </div>
          </div>
        </section>

        <BasecampPlansDesk />

        <section className="bg-[#F4EFE4] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-4xl font-serif text-[#17251F] md:text-5xl">Package Comparison</h2>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-[rgba(23,37,31,0.12)] bg-[#FFFCF6]">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#17251F] text-[#FFFCF6]">
                  <tr>
                    <th className="px-4 py-3">Plan</th><th className="px-4 py-3">Stay</th><th className="px-4 py-3">Meals</th><th className="px-4 py-3">Trail</th><th className="px-4 py-3">Route help</th><th className="px-4 py-3">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.plan} className="border-t border-[rgba(23,37,31,0.10)] text-[#17251F]">
                      <td className="px-4 py-3 font-semibold">{row.plan}</td><td className="px-4 py-3">{row.stay}</td><td className="px-4 py-3">{row.meals}</td><td className="px-4 py-3">{row.trail}</td><td className="px-4 py-3">{row.route}</td><td className="px-4 py-3">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-[#FFFCF6] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-4xl font-serif text-[#17251F] md:text-5xl">Add-ons</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {addOns.map((item) => <article key={item} className="rounded-2xl border border-[rgba(23,37,31,0.10)] bg-[#F4EFE4] p-4 text-sm font-semibold text-[#17251F]">{item}</article>)}
            </div>
          </div>
        </section>

        <section className="bg-[#F4EFE4] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-4xl font-serif text-[#17251F] md:text-5xl">FAQs</h2>
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
            <h2 className="text-4xl font-serif text-[#FFFCF6] md:text-5xl">Not sure which plan fits?</h2>
            <p className="max-w-3xl text-base leading-relaxed text-[#F4EFE4]/78">Tell us your dates and group size. We'll suggest the right stay, food, and trail format.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#plan-enquiry" className="inline-flex items-center rounded-full bg-[#FFFCF6] px-6 py-3 text-sm font-semibold text-[#17251F]">Ask for a suggestion</a>
              <a href="#plans" className="inline-flex items-center rounded-full border border-[rgba(244,239,228,0.32)] px-6 py-3 text-sm font-semibold text-[#FFFCF6]">Explore plans</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
