import type { Metadata } from 'next'
import Image from 'next/image'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/Footer'
import CabinBookingDesk from '@/components/stays/CabinBookingDesk'

export const metadata: Metadata = {
  title: 'The Cabin Booking Desk | Off the Trail',
  description: 'Choose your cabin, share your dates, and confirm your stay through UPI and WhatsApp.',
}

const comfortIndex = [
  {
    title: 'Warmth',
    text: 'Heater available, two-layer bedding, winter-ready blankets.',
  },
  {
    title: 'Water',
    text: 'Hot water available with solar and backup support.',
  },
  {
    title: 'Food',
    text: 'Cafe nearby, breakfast and dinner add-ons available.',
  },
  {
    title: 'Trail support',
    text: 'Early breakfast and local route briefing on request.',
  },
  {
    title: 'Connectivity',
    text: 'Network varies by weather and location. Ask before arrival.',
  },
  {
    title: 'Quiet level',
    text: 'Low-noise cabin zone built for rest after road and trail days.',
  },
]

const routeFacts = [
  'Best arrival: before 5 PM',
  'Parking: available near reception point',
  'Final approach: host-guided if needed',
  'Network: strongest near Chamba town, patchy on upper stretches',
  'Weather: ask before you come',
  'Driving time from main road: approx. 45 minutes',
]

const faqs = [
  {
    q: 'Is payment required before confirmation?',
    a: 'Yes, booking is confirmed after UPI payment is verified on WhatsApp.',
  },
  {
    q: 'Can I pay by UPI?',
    a: 'Yes. Use the QR/UPI details shown after selecting your stay.',
  },
  {
    q: 'How do I confirm payment?',
    a: 'Tap "I have paid. Confirm on WhatsApp" and share your payment screenshot.',
  },
  {
    q: 'Is hot water available?',
    a: 'Yes, with solar and backup support depending on weather.',
  },
  {
    q: 'Is heating available?',
    a: 'Heater support is available. We also provide warm bedding.',
  },
  {
    q: 'Is food included?',
    a: 'Food depends on your plan. Breakfast, dinner, and cafe add-ons can be selected.',
  },
  {
    q: 'Can I order from the cafe?',
    a: 'Yes, guests can order from the cafe during service timings.',
  },
  {
    q: 'Is parking available?',
    a: 'Parking is available near the reception point.',
  },
]

const whatsappRouteHelp = 'https://wa.me/919999999999?text=Hi%20Off%20the%20Trail%2C%20please%20share%20route%20help%20for%20arrival.'

export default function StaysPage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-[#F4EFE4]">
        <section className="pb-16 pt-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.15fr]">
            <div className="rounded-[28px] border border-[rgba(23,37,31,0.12)] bg-[#FFFCF6] p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6D716B]">Stay / Cabins</p>
              <h1 className="mt-4 text-5xl font-serif text-[#17251F] md:text-6xl">Stay warm, close to the hills.</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#6D716B]">
                Choose your cabin, share your dates, and confirm your stay through UPI and WhatsApp.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#cabin-booking"
                  className="inline-flex items-center rounded-full bg-[#17251F] px-5 py-3 text-sm font-semibold text-[#FFFCF6] transition hover:bg-[#20372E]"
                >
                  Check availability
                </a>
                <a
                  href="#cabin-booking"
                  className="inline-flex items-center rounded-full border border-[rgba(23,37,31,0.16)] bg-[#FFFCF6] px-5 py-3 text-sm font-semibold text-[#17251F] transition hover:border-[#17251F]"
                >
                  View cabins
                </a>
              </div>
              <p className="mt-8 text-sm text-[#6D716B]">Warm beds - Hot water - Cafe nearby - Route help</p>
            </div>

            <div className="grid min-h-[500px] gap-4 sm:grid-cols-2 sm:grid-rows-[1.2fr_1fr_1fr]">
              <article className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.10)] sm:row-span-2">
                <Image
                  src="/images/offtrail/cabin-window.jpg"
                  alt="Cabin main view with hills"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </article>
              <article className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.10)]">
                <Image
                  src="/images/cabins.png"
                  alt="Cabin room interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 22vw"
                />
              </article>
              <article className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.10)]">
                <Image
                  src="/images/offtrail/trail-path.jpg"
                  alt="View near cabin trail start"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 22vw"
                />
              </article>
              <article className="rounded-[24px] border border-[rgba(23,37,31,0.10)] bg-[#17251F] p-5 text-[#FFFCF6] sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.15em] text-[#F4EFE4]/75">Stay planning support</p>
                <p className="mt-3 text-sm leading-relaxed">
                  Share your dates and group size. We will guide cabin, route, and meal add-ons before payment.
                </p>
              </article>
            </div>
          </div>
        </section>

        <CabinBookingDesk />

        <section className="bg-[#F4EFE4] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-4xl font-serif text-[#17251F] md:text-5xl">Comfort, without overpromising.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {comfortIndex.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[rgba(23,37,31,0.10)] bg-[#FFFCF6] p-5">
                  <h3 className="text-2xl font-serif text-[#17251F]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6D716B]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FFFCF6] py-20">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[1.05fr_1fr]">
            <article className="relative min-h-[320px] overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.10)]">
              <Image
                src="/images/offtrail/trail-path.jpg"
                alt="Route reality preview near cabin road approach"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </article>
            <article className="rounded-[24px] border border-[rgba(23,37,31,0.10)] bg-[#F4EFE4] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6D716B]">Know before you arrive</p>
              <h2 className="mt-3 text-4xl font-serif text-[#17251F]">Route Reality</h2>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-[#17251F]">
                {routeFacts.map((fact) => (
                  <li key={fact}>- {fact}</li>
                ))}
              </ul>
              <a
                href={whatsappRouteHelp}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-[#17251F] px-5 py-3 text-sm font-semibold text-[#FFFCF6]"
              >
                Ask route on WhatsApp
              </a>
            </article>
          </div>
        </section>

        <section className="bg-[#F4EFE4] py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-4xl font-serif text-[#17251F] md:text-5xl">Policies and FAQs</h2>
            <div className="mt-8 space-y-3">
              {faqs.map((item) => (
                <details key={item.q} className="rounded-2xl border border-[rgba(23,37,31,0.20)] bg-[#FFFCF6] p-5 text-[#17251F]">
                  <summary className="cursor-pointer list-none">
                    <span style={{ color: '#17251F', fontWeight: 700, fontSize: '1rem', lineHeight: 1.5 }}>{item.q}</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#6D716B]">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#17251F] py-20 text-[#FFFCF6]">
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-5 px-6">
            <h2 className="text-4xl font-serif text-[#FFFCF6] md:text-5xl">Not sure which cabin to choose?</h2>
            <p className="max-w-3xl text-base leading-relaxed text-[#F4EFE4]/78">
              Tell us your dates and group size. We will suggest the right cabin, food plan, and route guidance.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappRouteHelp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-[#FFFCF6] px-6 py-3 text-sm font-semibold text-[#17251F]"
              >
                Ask on WhatsApp
              </a>
              <a
                href="#cabin-booking"
                className="inline-flex items-center rounded-full border border-[rgba(244,239,228,0.32)] px-6 py-3 text-sm font-semibold text-[#FFFCF6]"
              >
                Check availability
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
