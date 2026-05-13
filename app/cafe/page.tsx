import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import HumanHelpCTA from '@/components/HumanHelpCTA'

export const metadata: Metadata = {
  title: 'Cafe | Off the Trail',
  description: 'Mountain cafe service with local meals, practical timing, and warm post-trail comfort.',
}

const meals = [
  {
    time: 'Breakfast',
    description: 'Simple high-energy starts for trail and road days.',
    examples: ['Paratha + curd', 'Eggs + toast', 'Tea and local honey'],
    timing: '7:00 AM to 9:30 AM',
  },
  {
    time: 'Lunch',
    description: 'Balanced meals for short recoveries and mid-day breaks.',
    examples: ['Dal rice plate', 'Seasonal sabzi + roti', 'Soup + bread'],
    timing: '12:30 PM to 2:30 PM',
  },
  {
    time: 'Dinner',
    description: 'Warm service after sunset with fixed and custom options.',
    examples: ['Rice + curry set', 'Grilled seasonal vegetables', 'Simple dessert'],
    timing: '7:00 PM to 9:00 PM',
  },
]

export default function CafePage() {
  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        <section className="bg-base pb-12 pt-32">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="mb-4 text-5xl font-serif text-primary md:text-6xl">The Cafe</h1>
            <p className="max-w-2xl text-xl text-text-muted">
              Good food, clear timings, and warm service for guests and day visitors.
            </p>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-8 md:grid-cols-3">
              {meals.map((meal) => (
                <div key={meal.time} className="rounded-lg border border-border bg-base p-8">
                  <p className="text-xs uppercase tracking-widest text-text-muted">Served</p>
                  <p className="mt-1 text-sm text-text-muted">{meal.timing}</p>
                  <h2 className="mt-4 text-2xl font-serif text-primary">{meal.time}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{meal.description}</p>
                  <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-primary">
                    {meal.examples.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-base py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-4xl font-serif text-primary">Dietary Notes</h2>
            <p className="mt-4 max-w-3xl text-text-muted">
              Vegetarian, vegan, and low-spice options are available. Share preferences during enquiry so we can prepare in advance.
            </p>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-6xl px-6">
            <HumanHelpCTA source="cafe-page" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
