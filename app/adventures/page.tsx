import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import TrailConfidencePanel from '@/components/TrailConfidencePanel'
import HumanHelpCTA from '@/components/HumanHelpCTA'

export const metadata: Metadata = {
  title: 'Adventures | Off the Trail',
  description: 'Guided Chamba trails with clear difficulty, weather, and preparation notes.',
}

const adventures = [
  {
    trailName: 'Ridge Sunrise Trail',
    difficulty: { level: 'Moderate' as const, description: 'Steady incline, suitable for active beginners', icon: 'ridge' },
    guide: { available: true, name: 'Local guide team', experience: 'Route-first guidance with weather updates.' },
    weather: { condition: 'Cool mornings, quick afternoon cloud build-up in monsoon windows', bestSeason: 'March to June, September to November' },
    distance: '7 km round trip',
    elevation: '420m elevation gain',
    estimatedTime: '4-5 hours',
  },
  {
    trailName: 'Forest Loop Walk',
    difficulty: { level: 'Gentle' as const, description: 'Low elevation stress and broad trail path', icon: 'forest' },
    guide: { available: true, name: 'Community host guide', experience: 'Great for families and first-time walkers.' },
    weather: { condition: 'Stable except heavy rain days', bestSeason: 'Year-round except peak storm days' },
    distance: '3.5 km round trip',
    elevation: '120m elevation gain',
    estimatedTime: '1.5-2 hours',
  },
]

export default function AdventuresPage() {
  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        <section className="bg-base pb-12 pt-32">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="mb-4 text-5xl font-serif text-primary md:text-6xl">Guided Trails</h1>
            <p className="max-w-2xl text-xl text-text-muted">
              Choose routes with clear confidence markers so you know exactly what the day demands.
            </p>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-6xl space-y-12 px-6">
            {adventures.map((adventure) => (
              <TrailConfidencePanel key={adventure.trailName} {...adventure} />
            ))}
          </div>
        </section>

        <section className="bg-base py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-6 text-4xl font-serif text-primary">What to Carry</h2>
            <ul className="space-y-3 text-text-muted">
              <li>• Layered clothing and rain shell</li>
              <li>• Good-traction shoes</li>
              <li>• 1.5L water and light snacks</li>
              <li>• Personal medication and sun protection</li>
            </ul>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-6xl px-6">
            <HumanHelpCTA source="adventures-page" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
