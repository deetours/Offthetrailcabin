import Footer from '@/components/Footer'
import SiteHeader from '@/components/layout/SiteHeader'
import MobileActionBar from '@/components/layout/MobileActionBar'
import OpeningFrameEditorial from '@/components/sections/OpeningFrameEditorial'
import ThreeWaysIn from '@/components/scenes/ThreeWaysIn'
import BasecampPromise from '@/components/scenes/BasecampPromise'
import ChooseYourTrip from '@/components/scenes/ChooseYourTrip'
import TheRealPlace from '@/components/scenes/TheRealPlace'
import KnowBeforeYouCome from '@/components/scenes/KnowBeforeYouCome'
import FinalHumanCTA from '@/components/scenes/FinalHumanCTA'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden">
        <OpeningFrameEditorial />
        <ThreeWaysIn />
        <BasecampPromise />
        <ChooseYourTrip />
        <TheRealPlace />
        <KnowBeforeYouCome />
        <FinalHumanCTA />
      </main>
      <MobileActionBar />
      <Footer />
    </>
  )
}
