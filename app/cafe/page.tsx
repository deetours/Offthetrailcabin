import type { Metadata } from 'next'
import Image from 'next/image'
import SiteHeader from '@/components/layout/SiteHeader'
import Footer from '@/components/Footer'
import CafeMenuBoard from '@/components/cafe/CafeMenuBoard'

export const metadata: Metadata = {
  title: 'The Mountain Table | Off the Trail',
  description: 'Warm food, clear timings, and room ordering for slow days in Chamba.',
}

const mealRhythm = [
  {
    slot: 'Morning',
    title: 'Breakfast 7:00 AM - 9:30 AM',
    description: 'Simple high-energy starts for trail and road days.',
  },
  {
    slot: 'Midday',
    title: 'Lunch 12:30 PM - 2:30 PM',
    description: 'Balanced meals for short recoveries and mid-day breaks.',
  },
  {
    slot: 'Evening',
    title: 'Dinner 7:00 PM - 9:00 PM',
    description: 'Warm service after sunset with fixed and custom options.',
  },
]

const favorites = [
  {
    title: 'Mountain breakfast tray',
    description: 'A warm start with local staples before you step out.',
    image: '/images/offtrail/cafe-food.jpg',
    cta: 'Add to order',
  },
  {
    title: 'Firelit dinner',
    description: 'Comfort plates that land best after sunset.',
    image: '/images/bonfire.png',
    cta: 'Ask availability',
  },
  {
    title: 'Tea by the window',
    description: 'Slow sips with Chamba in full view.',
    image: '/images/window.png',
    cta: 'Add to order',
  },
  {
    title: 'Packed trail snack',
    description: 'Light fuel for short local walks and road turns.',
    image: '/images/food.png',
    cta: 'Ask availability',
  },
]

const dietaryCards = [
  'Vegetarian friendly',
  'Low-spice available',
  'Kids/simple meals',
  'Trail packed snacks',
  'Custom group meals',
]

export default function CafePage() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden bg-[#F4EFE4]">
        <section className="pb-16 pt-28">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.15fr]">
            <div className="rounded-[28px] border border-[rgba(23,37,31,0.12)] bg-[#FFFCF6] p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6D716B]">Cafe / Room Ordering</p>
              <h1 className="mt-4 text-5xl font-serif text-[#17251F] md:text-6xl">The Mountain Table</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#6D716B]">
                Warm food, clear timings, and room ordering for slow days in Chamba.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#menu-board"
                  className="inline-flex items-center rounded-full bg-[#17251F] px-5 py-3 text-sm font-semibold text-[#FFFCF6] transition hover:bg-[#20372E]"
                >
                  Order from room
                </a>
                <a
                  href="#menu-board"
                  className="inline-flex items-center rounded-full border border-[rgba(23,37,31,0.16)] bg-[#FFFCF6] px-5 py-3 text-sm font-semibold text-[#17251F] transition hover:border-[#17251F]"
                >
                  View menu
                </a>
              </div>
              <p className="mt-8 text-sm text-[#6D716B]">Breakfast - Lunch - Dinner - Tea - Custom preferences</p>
            </div>

            <div className="grid min-h-[480px] gap-4 sm:grid-cols-2 sm:grid-rows-[1.3fr_1fr_1fr]">
              <article className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.10)] sm:row-span-2">
                <Image
                  src="/images/offtrail/cafe-food.jpg"
                  alt="Warm food served at the mountain table"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </article>

              <article className="relative min-h-[220px] overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.10)]">
                <Image
                  src="/images/window.png"
                  alt="Coffee and tea by the window"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 22vw"
                />
              </article>

              <article className="rounded-[24px] border border-[rgba(23,37,31,0.10)] bg-[#FFFCF6] p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-[#6D716B]">Order from your room</p>
                <p className="mt-3 text-sm leading-relaxed text-[#17251F]">
                  Choose your meal and share your cabin number. We'll confirm timing on WhatsApp.
                </p>
              </article>

              <article className="rounded-[24px] border border-[rgba(23,37,31,0.10)] bg-[#17251F] p-5 text-[#FFFCF6] sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.15em] text-[#F4EFE4]/75">Today's timings</p>
                <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                  <p>Breakfast 7:00-9:30</p>
                  <p>Lunch 12:30-2:30</p>
                  <p>Dinner 7:00-9:00</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <CafeMenuBoard />

        <section className="bg-[#F4EFE4] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6D716B]">Meal Rhythm</p>
            <h2 className="mt-3 text-4xl font-serif text-[#17251F] md:text-5xl">A calm pace through the day</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {mealRhythm.map((item) => (
                <article key={item.slot} className="rounded-[24px] border border-[rgba(23,37,31,0.10)] bg-[#FFFCF6] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6D716B]">{item.slot}</p>
                  <h3 className="mt-3 text-2xl font-serif text-[#17251F]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6D716B]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FFFCF6] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6D716B]">Guest Favorites</p>
            <h2 className="mt-3 text-4xl font-serif text-[#17251F] md:text-5xl">What guests return to</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {favorites.map((item, index) => (
                <article
                  key={item.title}
                  className={`overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.10)] bg-[#FFFCF6] ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  <div className={`relative ${index === 0 ? 'h-72 md:h-80' : 'h-56'}`}>
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-2xl font-serif text-[#17251F]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6D716B]">{item.description}</p>
                    <button
                      type="button"
                      className="mt-4 rounded-full border border-[rgba(23,37,31,0.16)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#17251F] transition hover:border-[#17251F]"
                    >
                      {item.cta}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F4EFE4] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-4xl font-serif text-[#17251F] md:text-5xl">Food that fits the day.</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6D716B]">
              Vegetarian, vegan, low-spice, and simple comfort meals can be arranged if shared in advance.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {dietaryCards.map((item) => (
                <article key={item} className="rounded-2xl border border-[rgba(23,37,31,0.10)] bg-[#FFFCF6] p-4">
                  <p className="text-sm font-semibold text-[#17251F]">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#17251F] py-20 text-[#FFFCF6]">
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-5 px-6 text-left">
            <h2 className="text-4xl font-serif text-[#FFFCF6] md:text-5xl">Staying with us? Order from your room.</h2>
            <p className="max-w-3xl text-base leading-relaxed text-[#F4EFE4]/78">
              Choose your meal, share your room or cabin, and we'll confirm timing on WhatsApp.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#menu-board"
                className="inline-flex items-center rounded-full bg-[#FFFCF6] px-6 py-3 text-sm font-semibold text-[#17251F] transition hover:bg-[#F4EFE4]"
              >
                Order on WhatsApp
              </a>
              <a
                href="#menu-board"
                className="inline-flex items-center rounded-full border border-[rgba(244,239,228,0.3)] px-6 py-3 text-sm font-semibold text-[#FFFCF6] transition hover:border-[#FFFCF6]"
              >
                Ask food preferences
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
