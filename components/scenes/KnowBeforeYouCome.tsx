'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LinkButton } from '@/components/ui/button'

const WHATSAPP_NUMBER = "919999999999" // TODO: Replace with real Off the Trail WhatsApp number.

const orientationData = {
  dalhousie: {
    name: "Dalhousie",
    route: {
      title: "Route context for Dalhousie",
      intro: "Pine roads, hill bends, and weather shifts need a little timing awareness.",
      facts: [
        "Best arrival: before 5 PM",
        "Road mood: hill roads, pine bends, weather can slow final approach",
        "Parking: confirm exact parking or reception point before arrival",
        "Network: mostly available near town, can vary around stays",
        "Weather: fog and cold can change quickly"
      ],
      tip: "Dalhousie Route Tip: Start early, avoid late fog-heavy drives, and confirm your final approach point before leaving.",
      cta: "Ask Dalhousie route"
    },
    warmth: {
      title: "Warmth context for Dalhousie",
      intro: "Cooler evenings and changing weather mean comfort details should be confirmed before arrival.",
      facts: [
        "Evenings: cooler after sunset",
        "Bedding: warm bedding recommended",
        "Heating: room heating support depends on property",
        "Hot water: timing should be confirmed",
        "Food: late arrival meals should be planned ahead"
      ],
      tip: "Dalhousie Warmth Tip: Confirm room heating, hot water timing, and meal availability before late check-in.",
      cta: "Ask Dalhousie comfort"
    }
  },
  jibhi: {
    name: "Jibhi",
    route: {
      title: "Route context for Jibhi",
      intro: "Valley roads, forest stretches, and narrow turns make arrival timing important.",
      facts: [
        "Best arrival: before sunset",
        "Road mood: valley roads, forest stretches, narrow local turns",
        "Parking: may differ by stay, confirm before arrival",
        "Network: patchy around forest or river pockets",
        "Weather: rain can change road comfort"
      ],
      tip: "Jibhi Route Tip: Arrive before dark and confirm parking or last-turn guidance before entering forest stretches.",
      cta: "Ask Jibhi route"
    },
    warmth: {
      title: "Warmth context for Jibhi",
      intro: "Forest evenings can feel colder than expected, especially around river pockets.",
      facts: [
        "Evenings: cold around forest stays",
        "Clothing: layered clothing recommended",
        "Cabins: wood/cabin warmth varies by stay",
        "Hot water: timing should be confirmed",
        "Food: meals can be planned with stay or cafe support"
      ],
      tip: "Jibhi Warmth Tip: Confirm bedding, hot water, and dinner timing before choosing a forest-side stay.",
      cta: "Ask Jibhi comfort"
    }
  }
}

interface KnowBeforeYouComeProps {
  selectedDestination: 'jibhi' | 'dalhousie'
}

export default function KnowBeforeYouCome({ selectedDestination }: KnowBeforeYouComeProps) {
  const [internalDest, setInternalDest] = useState<'dalhousie' | 'jibhi'>(selectedDestination || 'dalhousie')
  const [mode, setMode] = useState<'route' | 'warmth'>('route')

  useEffect(() => {
    if (selectedDestination) {
      setInternalDest(selectedDestination)
    }
  }, [selectedDestination])

  const currentData = orientationData[internalDest]
  const modeData = currentData[mode]

  const getWhatsAppLink = () => {
    const text = `Hi Off the Trail, I have a question before booking.\n\nDestination: ${currentData.name}\nTopic: ${mode === 'route' ? 'Route' : 'Warmth'}\n\nQuestion:\nPlease help me understand the road, weather, warmth, parking, and arrival details before I confirm my stay.`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  }

  return (
    <section id="know-before-you-come" className="relative w-full bg-base py-32 md:py-48 overflow-hidden">
      <div className="paper-grain absolute inset-0 opacity-40 pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[1440px] px-[clamp(24px,5vw,72px)]">
        
        {/* Top Header */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 mb-24 md:mb-32 items-end border-b border-primary/10 pb-16">
          <div>
            <h2 className="font-serif text-[clamp(56px,8vw,96px)] leading-[0.9] tracking-[-0.04em] text-primary">
              Know<br/>before you<br/><span className="italic">arrive.</span>
            </h2>
          </div>
          <div className="max-w-[480px]">
            <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-accent mb-6">
              Orientation Protocol
            </p>
            <p className="text-[20px] leading-[1.6] text-primary/70 font-light">
              Honest road, weather, warmth, and arrival notes for {currentData.name} before you commit to a stay.
            </p>
          </div>
        </div>

        {/* Console Area */}
        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-16 lg:gap-24">
          
          {/* Controls */}
          <div className="flex flex-col gap-16 md:gap-20">
            
            {/* Destination Toggle */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 mb-6">Basecamp</p>
              <div className="flex flex-col items-start gap-4">
                {['dalhousie', 'jibhi'].map((dest) => (
                  <button
                    key={`dest-${dest}`}
                    onClick={() => setInternalDest(dest as 'dalhousie' | 'jibhi')}
                    className={`relative text-[28px] md:text-[40px] font-serif transition-colors duration-500 focus-visible:outline-none ${internalDest === dest ? 'text-primary' : 'text-primary/20 hover:text-primary/50'}`}
                  >
                    <span className="capitalize tracking-tight">{dest}</span>
                    {internalDest === dest && (
                      <motion.div layoutId="dest-indicator-minimal" className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent hidden md:block" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode Toggle */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 mb-6">View Context</p>
              <div className="flex flex-col items-start gap-4">
                {['route', 'warmth'].map((m) => (
                  <button
                    key={`mode-${m}`}
                    onClick={() => setMode(m as 'route' | 'warmth')}
                    className={`relative text-[20px] md:text-[24px] font-light transition-colors duration-500 focus-visible:outline-none ${mode === m ? 'text-primary' : 'text-primary/30 hover:text-primary/60'}`}
                  >
                    <span className="capitalize">The {m}</span>
                    {mode === m && (
                      <motion.div layoutId="mode-indicator-minimal" className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary hidden md:block" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Main Content (Spec Sheet) */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${internalDest}-${mode}`}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(8px)', y: -20 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="flex flex-col gap-24"
              >
                {/* Intro */}
                <div className="max-w-[640px]">
                  <h3 className="text-[28px] text-primary mb-6 font-serif tracking-tight">{modeData.title}</h3>
                  <p className="text-[18px] text-primary/60 leading-relaxed font-light">{modeData.intro}</p>
                </div>

                {/* Facts Grid */}
                <div className="grid sm:grid-cols-2 gap-x-16 gap-y-24">
                  {modeData.facts.map((fact, idx) => {
                    const [label, ...descArr] = fact.split(': ')
                    const desc = descArr.join(': ')
                    
                    return (
                      <div key={idx} className="relative flex flex-col gap-4 group">
                        <span className="font-serif text-[clamp(80px,10vw,140px)] leading-[0.7] tracking-[-0.05em] text-primary/[0.04] group-hover:text-primary/[0.08] transition-colors duration-700 select-none">
                          0{idx + 1}
                        </span>
                        <div className="mt-[-30px] md:mt-[-50px] pl-4 md:pl-10 relative z-10">
                          <p className="text-[13px] font-bold uppercase tracking-widest text-primary mb-3">{label}</p>
                          <p className="text-[16px] leading-[1.65] text-primary/70 max-w-[280px]">{desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Guidance Footer */}
                <div className="mt-12 pt-16 border-t border-primary/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                  <div className="max-w-[540px]">
                    <p className="text-[20px] leading-[1.5] text-primary/90 font-serif italic tracking-tight">
                      "{modeData.tip}"
                    </p>
                  </div>
                  <LinkButton
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    variant="conversion"
                    showArrow
                    className="shrink-0 md:min-w-[240px]"
                  >
                    {modeData.cta}
                  </LinkButton>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
