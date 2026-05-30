'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { LinkButton } from '@/components/ui/button'
import TrailConfidenceDesk from '@/components/adventures/TrailConfidenceDesk'

const carry = ['Layered clothing', 'Good-traction shoes', '1.5L water', 'Trail snack', 'Personal medicine', 'Rain shell / sun protection']
const weatherCards = [
  'Best mornings: early starts are calmer and clearer.', 
  'Monsoon caution: route adjustments are normal.', 
  'Snow/ice check: guide confirms conditions first.', 
  'Guide decision: safety over fixed itinerary.', 
  'Route update shared on WhatsApp before departure.'
]
const faq = [
  ['Do I need a guide?', 'For selected routes, guide support is recommended and can be arranged.'],
  ['Can beginners do these trails?', 'Some trails are beginner-friendly. We confirm based on comfort and weather.'],
  ['What if weather changes?', 'We adjust or postpone routes based on safety and conditions.'],
  ['What should I carry?', 'Water, shoes, layers, snack, personal medication, and weather protection.'],
  ['Can families join?', 'Gentle walks may suit families. We confirm route suitability first.'],
  ['Is payment required now?', 'No. We confirm route, guide, and weather first.'],
]

export default function AdventuresClient() {
  const heroRef = useRef(null)
  const elevationRef = useRef(null)

  // Hero Parallax
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const yImage1 = useTransform(heroScroll, [0, 1], [0, 100])
  const yImage2 = useTransform(heroScroll, [0, 1], [0, -80])
  const opacityHero = useTransform(heroScroll, [0, 0.8], [1, 0])

  // Elevation Path
  const { scrollYProgress: elevationScroll } = useScroll({
    target: elevationRef,
    offset: ["start 70%", "end 50%"]
  })

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="overflow-hidden bg-base text-primary">
      
      {/* 1. Parallax Canopy Hero */}
      <section ref={heroRef} className="relative pb-24 pt-40 md:pt-48 min-h-[90vh] flex items-center">
        <div className="paper-grain absolute inset-0 opacity-40 pointer-events-none" />
        <motion.div style={{ opacity: opacityHero }} className="relative mx-auto w-full max-w-[1440px] px-[clamp(24px,5vw,72px)]">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-center">
            
            {/* Staggered Entry Text */}
            <motion.div 
              initial="hidden" animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
              className="max-w-[720px] relative z-10"
            >
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent mb-6">
                Trails / Local Guidance
              </motion.p>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }} className="text-[clamp(48px,6vw,80px)] font-serif leading-[1] tracking-[-0.03em] text-primary mb-8">
                Guided trails,<br/><span className="italic text-primary/80">chosen with care.</span>
              </motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-[18px] md:text-[20px] leading-[1.6] text-primary/70 font-light mb-10 max-w-[540px]">
                Clear difficulty, weather notes, guide support, and route guidance before you step out into the mountains.
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-wrap gap-4 items-center">
                <LinkButton href="#trails" variant="booking" showArrow>
                  Explore trails
                </LinkButton>
                <LinkButton href="#trail-enquiry" variant="secondary">
                  Ask suitability
                </LinkButton>
              </motion.div>
            </motion.div>

            {/* Parallax Image Grid */}
            <div className="relative h-[500px] w-full hidden sm:block">
              <motion.div style={{ y: yImage1 }} className="absolute top-0 right-0 w-[70%] h-[80%] rounded-[32px] overflow-hidden shadow-2xl z-10">
                <Image src="/images/offtrail/trail-path.jpg" alt="Trail" fill className="object-cover" sizes="40vw" priority />
              </motion.div>
              <motion.div style={{ y: yImage2 }} className="absolute bottom-0 left-0 w-[50%] h-[60%] rounded-[32px] overflow-hidden shadow-xl z-20">
                <Image src="/images/trails.png" alt="Map" fill className="object-cover" sizes="22vw" />
              </motion.div>
              <div className="absolute top-[60%] right-[-10%] z-30 rounded-full bg-primary/95 text-surface px-6 py-4 shadow-lg backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.2em] text-surface/60 mb-1">Best season</p>
                <p className="text-[14px] font-serif italic">Mar-Jun & Sep-Nov</p>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* 2. Trail Desk (Mad Libs) */}
      <TrailConfidenceDesk />

      {/* 3. The Elevation Guide */}
      <section ref={elevationRef} className="relative bg-surface py-32 md:py-48 overflow-hidden border-b border-primary/5">
        <div className="mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)]">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32">
            <div>
              <h2 className="text-[clamp(40px,5vw,64px)] font-serif text-primary tracking-tight mb-6">
                Elevation<br/><span className="italic">Climb.</span>
              </h2>
              <p className="text-[18px] text-primary/70 font-light max-w-[320px]">
                Mountain routes are not generic features. They require a gradient of awareness.
              </p>
            </div>
            
            <div className="relative flex flex-col gap-24 pt-10">
              {/* The Draw Line */}
              <div className="absolute left-[13px] top-10 bottom-0 w-px bg-primary/10" />
              <motion.div 
                className="absolute left-[13px] top-10 bottom-0 w-px bg-accent origin-top"
                style={{ scaleY: elevationScroll }}
              />

              {[
                { title: 'Gentle', desc: 'Easy walks, perfect for families and slow mornings. Minimal elevation.' },
                { title: 'Moderate', desc: 'Steady walking and basic comfort with climbs. Requires decent fitness.' },
                { title: 'Harder', desc: 'Weather dependent. Only undertaken after guide confirmation and physical check.' }
              ].map((tier, i) => (
                <div key={i} className="relative flex gap-12 group">
                  <div className="relative z-10 w-[27px] h-[27px] rounded-full bg-surface border-2 border-accent mt-3 shrink-0 transition-transform duration-500 group-hover:scale-125" />
                  <div>
                    <h3 className="text-[32px] md:text-[40px] font-serif text-primary mb-4 transition-colors duration-500 group-hover:text-accent">{tier.title}</h3>
                    <p className="text-[16px] md:text-[18px] leading-[1.6] text-primary/70 max-w-[480px] font-light">{tier.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Tactical Grid (Field Kit & Weather) */}
      <section className="bg-base py-32 md:py-48 border-t border-primary/5">
        <div className="mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)]">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-32 items-start">
            
            {/* Field Kit (Architectural List) */}
            <div className="sticky top-32">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent mb-6">
                The Field Kit
              </h2>
              <p className="text-[20px] md:text-[28px] font-serif text-primary mb-12 max-w-[320px] leading-[1.2] tracking-tight">
                Essential carries for any trail. Pack light, pack smart.
              </p>
              <div className="flex flex-col border-t border-primary/20">
                {carry.map((item, i) => (
                  <div 
                    key={item} 
                    className="py-5 border-b border-primary/10 flex justify-between items-center group"
                  >
                    <span className="text-[15px] text-primary/80 font-medium group-hover:text-primary transition-colors">{item}</span>
                    <span className="text-[12px] font-serif italic text-primary/30">0{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Protocol (Scroll Spy List) */}
            <div className="relative pt-10 lg:pt-0">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent mb-6 lg:hidden">
                Weather Protocol
              </h2>
              <div className="flex flex-col border-t border-primary/20">
                {weatherCards.map((item, i) => {
                  const [title, desc] = item.split(': ')
                  return (
                    <motion.div 
                      initial={{ opacity: 0.25 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ margin: "-35% 0px -35% 0px", amount: 'some' }}
                      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                      key={item} 
                      className="py-16 md:py-24 border-b border-primary/10 grid grid-cols-[auto_1fr] gap-8 md:gap-16 items-start group"
                    >
                      <span className="font-serif text-[48px] md:text-[80px] leading-[0.8] tracking-tight text-primary/10 transition-colors duration-500 group-hover:text-accent/30 select-none">
                        0{i+1}
                      </span>
                      <div>
                        <h3 className="text-[24px] md:text-[32px] font-serif text-primary mb-4 tracking-tight">
                          {title}
                        </h3>
                        <p className="text-[16px] md:text-[18px] leading-[1.7] text-primary/60 font-light max-w-[480px]">
                          {desc}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Fluid FAQ */}
      <section className="bg-surface py-32 md:py-48 border-t border-primary/5">
        <div className="mx-auto max-w-[800px] px-[clamp(24px,5vw,72px)]">
          <h2 className="text-[clamp(40px,5vw,64px)] font-serif text-primary tracking-tight text-center mb-24">
            Commonly Asked
          </h2>
          <div className="flex flex-col">
            {faq.map(([q, a], i) => {
              const isOpen = openFaq === i
              return (
                <div key={q} className="border-b border-primary/10 last:border-0">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full py-8 flex justify-between items-center text-left focus-visible:outline-none group"
                  >
                    <span className={`text-[20px] md:text-[24px] font-serif transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-primary/70 group-hover:text-primary'}`}>
                      {q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: 'backOut' }}
                      className={`text-[24px] font-light transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-primary/30 group-hover:text-primary/60'}`}
                    >
                      +
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-[16px] md:text-[18px] leading-relaxed text-primary/60 font-light max-w-[600px]">
                          {a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary py-32 md:py-48 text-surface text-center">
        <div className="mx-auto max-w-[800px] px-[clamp(24px,5vw,72px)]">
          <h2 className="text-[clamp(48px,6vw,80px)] font-serif leading-[1] tracking-[-0.03em] mb-8">
            Not sure which<br/><span className="italic text-surface/80">trail fits?</span>
          </h2>
          <p className="text-[18px] md:text-[20px] leading-relaxed text-surface/70 font-light mb-16 max-w-[540px] mx-auto">
            Tell us your date, group size, and comfort level. We will suggest the right route for your pace.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <LinkButton href="#trail-enquiry" variant="conversion" showArrow>
              Ask trail suitability
            </LinkButton>
            <LinkButton href="/packages" variant="secondary" className="bg-transparent border-surface/20 text-surface hover:bg-surface/10 hover:border-surface/30 hover:text-surface">
              View basecamp packages
            </LinkButton>
          </div>
        </div>
      </section>

    </main>
  )
}
