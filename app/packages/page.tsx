import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BasecampCard from '@/components/BasecampCard'
import HumanHelpCTA from '@/components/HumanHelpCTA'

export const metadata: Metadata = {
  title: 'Packages | Off the Trail',
  description: 'Choose a Chamba basecamp plan with clear inclusions for stay, food, and trail.',
}

const packageCards = [
  {
    name: '24-Hour Reset',
    elevation: 'Near Chamba valley floor',
    distance: '1 day plan',
    stay: { beds: '1 night cabin stay', amenities: ['Heater', 'Hot Water', 'Breakfast'] },
    meal: { description: 'Dinner + breakfast at the cafe', price: '₹4,500 for 2 guests' },
    adventure: { title: 'Short local trail', duration: '2-3 hours guided walk' },
  },
  {
    name: '48-Hour Chamba Escape',
    elevation: 'Mid-hill basecamp',
    distance: '2 day plan',
    stay: { beds: '2 nights quiet cabin', amenities: ['Heater', 'Bonfire', 'Parking'] },
    meal: { description: '2 breakfasts + 1 dinner', price: '₹8,500 for 2 guests' },
    adventure: { title: 'Full day trail', duration: '5-6 hours with local guide' },
  },
  {
    name: 'Trail Weekend',
    elevation: 'Upper route basecamp',
    distance: '2 day plan',
    stay: { beds: '2 nights with early start support', amenities: ['Packed meal', 'Guide', 'Route briefing'] },
    meal: { description: 'Pre-trail breakfast + warm dinner', price: '₹9,800 for 2 guests' },
    adventure: { title: 'Advanced trail route', duration: '6-8 hours guided trek' },
  },
]

export default function PackagesPage() {
  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        <section className="bg-base pb-12 pt-32">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="mb-4 text-5xl font-serif text-primary md:text-6xl">Choose Your Trip</h1>
            <p className="max-w-2xl text-xl text-text-muted">
              Clear package formats that combine stay, meal, and trail support with no hidden confusion.
            </p>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2 lg:grid-cols-3">
            {packageCards.map((pkg) => (
              <BasecampCard key={pkg.name} {...pkg} />
            ))}
          </div>
        </section>

        <section className="bg-base py-20">
          <div className="mx-auto max-w-6xl px-6">
            <HumanHelpCTA source="packages-page" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
