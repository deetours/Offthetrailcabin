'use client'

import React from 'react'
import V2SiteHeader from '@/components/v2/V2SiteHeader'
import V2HeroGateway from '@/components/v2/V2HeroGateway'
import V2StayPreview from '@/components/v2/V2StayPreview'
import V2ChooseYourPlan from '@/components/v2/V2ChooseYourPlan'
import V2HowBookingWorks from '@/components/v2/V2HowBookingWorks'
import V2ThreeWaysIn from '@/components/v2/V2ThreeWaysIn'
import V2RouteReality from '@/components/v2/V2RouteReality'
import V2ProofMosaic from '@/components/v2/V2ProofMosaic'
import V2FinalEnquiry from '@/components/v2/V2FinalEnquiry'
import V2MobileBar from '@/components/v2/V2MobileBar'
import V2Footer from '@/components/v2/V2Footer'

export default function HomeV2() {
  return (
    <>
      <V2SiteHeader />
      <main className="overflow-hidden">
        <V2HeroGateway />
        <V2StayPreview />
        <V2ChooseYourPlan />
        <V2HowBookingWorks />
        <V2ThreeWaysIn />
        <V2RouteReality />
        <V2ProofMosaic />
        <V2FinalEnquiry />
      </main>
      <V2MobileBar />
      <V2Footer />
    </>
  )
}
