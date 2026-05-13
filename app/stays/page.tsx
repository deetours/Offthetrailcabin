import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WarmthIndex from '@/components/WarmthIndex'
import RouteRealityCard from '@/components/RouteRealityCard'
import HumanHelpCTA from '@/components/HumanHelpCTA'

export const metadata: Metadata = {
  title: 'Stays | Off the Trail',
  description: 'Quiet Chamba cabins with clear comfort and route reality before you book.',
}

const stays = [
  {
    basecampName: 'Pine Deck Cabin',
    temperature: 'Winter nights: 2°C to 8°C · Daytime: 10°C to 18°C',
    description: 'Balanced comfort for couples and small groups close to the cafe zone.',
    amenities: [
      { name: 'Room Heater', description: 'Night heater with backup power support', rating: 'Essential' as const },
      { name: 'Hot Water', description: 'Solar + electric backup in all bathrooms', rating: 'Comfort' as const },
      { name: 'Blankets', description: 'Two-layer wool bedding setup', rating: 'Comfort' as const },
      { name: 'Bonfire Access', description: 'Shared evening bonfire area', rating: 'Essential' as const },
    ],
  },
  {
    basecampName: 'Trail View Cabin',
    temperature: 'Winter nights: 0°C to 6°C · Daytime: 9°C to 16°C',
    description: 'A quieter corner for guests prioritizing trail starts and early mornings.',
    amenities: [
      { name: 'Quiet Wing', description: 'Low-noise zone near upper trail path', rating: 'Essential' as const },
      { name: 'Early Breakfast', description: 'Pre-7:00 AM meal support on request', rating: 'Comfort' as const },
      { name: 'Drying Rack', description: 'Gear drying support after wet trail days', rating: 'Comfort' as const },
      { name: 'Host Briefing', description: 'Daily weather and route briefing', rating: 'Luxury' as const },
    ],
  },
]

const routes = [
  {
    fromLocation: 'Chamba town center',
    roadCondition: {
      type: 'Metalled road with narrow final section',
      description: 'Standard cars can reach in clear weather. Slower approach recommended after sunset.',
      drivingTime: '35-45 minutes',
    },
    parking: {
      availability: 'On-site parking near reception point',
      capacity: '10-12 cars',
      fee: 'No additional fee for staying guests',
    },
    arrivalProcess: {
      steps: [
        'Share ETA on WhatsApp 30 minutes before arrival',
        'Host confirms final turn landmark',
        'Park at reception and complete 5-minute check-in',
      ],
      totalTime: '10-15 minutes',
    },
    elevation: 'Approx. 1,900m',
  },
]

export default function StaysPage() {
  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        <section className="bg-base pb-12 pt-32">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="mb-4 text-5xl font-serif text-primary md:text-6xl">Cabin Stays</h1>
            <p className="max-w-2xl text-xl text-text-muted">
              Warm cabins, practical amenities, and honest details before you commit.
            </p>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-6xl space-y-20 px-6">
            {stays.map((stay) => (
              <WarmthIndex key={stay.basecampName} {...stay} />
            ))}
          </div>
        </section>

        <section className="bg-base py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-8 text-4xl font-serif text-primary">Route Reality</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {routes.map((route) => (
                <RouteRealityCard key={route.fromLocation} {...route} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-6xl px-6">
            <HumanHelpCTA source="stays-page" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
