'use client'

import { useDestination } from '@/lib/DestinationContext'
import Footer from '@/components/Footer'
import SiteHeader from '@/components/layout/SiteHeader'
import DestinationGateway from '@/components/sections/DestinationGateway'
import DestinationStayDesk from '@/components/scenes/DestinationStayDesk'
import HowBookingWorks from '@/components/scenes/HowBookingWorks'
import ThreeWaysIn from '@/components/scenes/ThreeWaysIn'
import BasecampPromise from '@/components/scenes/BasecampPromise'
import ChooseYourTrip from '@/components/scenes/ChooseYourTrip'
import TheRealPlace from '@/components/scenes/TheRealPlace'
import KnowBeforeYouCome from '@/components/scenes/KnowBeforeYouCome'
import FinalHumanCTA from '@/components/scenes/FinalHumanCTA'

export default function Home() {
  const { selectedDestination, setSelectedDestination } = useDestination()

  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden">
        <DestinationGateway
          selectedDestination={selectedDestination}
          onSelectDestination={setSelectedDestination}
        />
        <DestinationStayDesk selectedDestination={selectedDestination} />
        <HowBookingWorks />
        <ThreeWaysIn />
        <BasecampPromise />
        <ChooseYourTrip selectedDestination={selectedDestination} />
        <TheRealPlace />
        <KnowBeforeYouCome selectedDestination={selectedDestination} />
        <FinalHumanCTA selectedDestination={selectedDestination} />
      </main>
      <Footer />
    </>
  )
}
