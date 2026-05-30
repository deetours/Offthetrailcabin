'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2, Minus } from 'lucide-react'
import { LinkButton } from '@/components/ui/button'
import BasecampPlansDesk from '@/components/packages/BasecampPlansDesk'

type AtlasPlan = {
  id: string
  number: string
  name: string
  summary: string
  price: string
  bestFor: string
  stay: string
  meals: string
  trail: string
  routeHelp: string
  pace: string
  recommended?: boolean
}

type AddOnGroup = {
  category: string
  note: string
  image: string
  items: Array<{
    name: string
    description: string
    price: string
    pairing: string
  }>
}

const atlasPlans: AtlasPlan[] = [
  {
    id: 'reset',
    number: '01',
    name: '24-Hour Reset',
    summary: 'A clean overnight pause for guests who want the mountain air without building a full itinerary.',
    price: 'INR 4,500 / 2 guests',
    bestFor: 'Quick reset',
    stay: '1 night',
    meals: 'Breakfast service',
    trail: 'Short guided walk',
    routeHelp: 'Arrival and local route notes',
    pace: 'Light, simple, low-commitment',
  },
  {
    id: 'escape',
    number: '02',
    name: '48-Hour Hill Escape',
    summary: 'The signature rhythm: quiet cabin time, warm meals, one local trail, and enough space to actually settle in.',
    price: 'INR 8,500 / 2 guests',
    bestFor: 'Relaxed immersion',
    stay: '2 nights',
    meals: '2 breakfasts + 1 dinner',
    trail: 'Guided local forest trail',
    routeHelp: 'Included before arrival',
    pace: 'Slow, complete, most balanced',
    recommended: true,
  },
  {
    id: 'trail-weekend',
    number: '03',
    name: 'Trail Weekend',
    summary: 'A more active basecamp format built around an early trail day, guide support, and a warm return.',
    price: 'INR 9,800 / 2 guests',
    bestFor: 'Active explorers',
    stay: '2 nights',
    meals: 'Pre-trail breakfast + dinner',
    trail: 'Guided moderate route',
    routeHelp: 'Briefing + weather check',
    pace: 'Trail-first and more physical',
  },
]

const comparisonRows: Array<{ label: string; key: keyof Pick<AtlasPlan, 'stay' | 'meals' | 'trail' | 'routeHelp' | 'bestFor' | 'pace'>; highlightDiff?: boolean }> = [
  { label: 'Stay Duration', key: 'stay' },
  { label: 'Meals Included', key: 'meals', highlightDiff: true },
  { label: 'Guided Trail', key: 'trail', highlightDiff: true },
  { label: 'Route Assistance', key: 'routeHelp' },
  { label: 'Ideal Pace', key: 'pace' },
]

const addOnGroups: AddOnGroup[] = [
  {
    category: 'Fire & Evening',
    note: 'Small rituals that make the stay feel slower after sunset.',
    image: '/images/bonfire.png',
    items: [
      { name: 'Bonfire tea setup', description: 'Evening tea service arranged around the fire for your group.', price: 'INR 350', pairing: 'Best with 48-Hour Hill Escape' },
    ],
  },
  {
    category: 'Trail Support',
    note: 'Light additions for guests planning to spend more time outside.',
    image: '/images/offtrail/trail-path.jpg',
    items: [
      { name: 'Packed trail snack', description: 'Portable food prepared for short and medium route days.', price: 'INR 180 / person', pairing: 'Best with Trail Weekend' },
      { name: 'Private guide support', description: 'Dedicated local support based on route, weather, and guest comfort.', price: 'On request', pairing: 'Best for first-time routes' },
    ],
  },
  {
    category: 'Food & Comfort',
    note: 'Useful when the group wants an easier cabin rhythm.',
    image: '/images/offtrail/cafe-food.jpg',
    items: [
      { name: 'Extra dinner', description: 'Add a second warm dinner service to any package stay.', price: 'INR 650 / person', pairing: 'Best with 24-Hour Reset' },
    ],
  },
  {
    category: 'Host Support',
    note: 'Human planning help before the trip is locked.',
    image: '/images/window.png',
    items: [
      { name: 'Custom stay shaping', description: 'Host guidance for dates, guest count, food preference, and trail suitability.', price: 'Included', pairing: 'Best before booking' },
    ],
  },
]

const trustCues = ['No payment before confirmation', 'Route suitability checked first', 'Meals and add-ons confirmed on WhatsApp']

// 2% noise texture for tactility
const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: "url('/images/noise.png')" }} />
)

export default function PackagesClient() {
  const heroRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Cinematic Parallax
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 180])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const heroCopyY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <main className="relative overflow-hidden bg-[#FDFBF7] text-primary">
      <NoiseOverlay />
      
      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative flex min-h-[90svh] flex-col justify-end overflow-hidden pb-20 pt-36 md:pt-48">
        <motion.div style={{ y: heroImageY, scale: heroImageScale }} className="absolute inset-0">
          <Image src="/images/escape.png" alt="Mountain basecamp stay at Off The Trail" fill priority className="object-cover" sizes="100vw" />
        </motion.div>
        
        {/* Scrims to rescue legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <motion.div
          style={{ opacity: heroFade, y: heroCopyY }}
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
          className="relative z-10 mx-auto grid w-full max-w-[1440px] gap-10 px-[clamp(24px,5vw,72px)] lg:grid-cols-[1.25fr_0.75fr] lg:items-end"
        >
          <div>
            <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="mb-6 text-[12px] font-bold uppercase tracking-[0.25em] text-[#E5D5B5]">
              Packages / Basecamp Atlas
            </motion.p>
            <motion.h1 variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }} className="max-w-[920px] text-[clamp(56px,8vw,110px)] font-serif leading-[0.92] tracking-[-0.035em] text-white">
              Choose the mountain rhythm that fits.
            </motion.h1>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mt-8 max-w-[650px] text-[18px] leading-relaxed text-white/80 md:text-[22px]">
              Stay, food, route help, and trail guidance shaped into three calm formats. Pick the pace, then let a host confirm the details.
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }} className="mt-12 flex flex-wrap gap-5">
              <LinkButton href="#package-gallery" variant="conversion" className="bg-[#E5D5B5] text-primary hover:bg-white" showArrow>
                Explore blueprints
              </LinkButton>
              <LinkButton href="#basecamp-atlas" variant="secondary" className="border-white/30 text-white hover:bg-white/10 hover:border-white">
                Compare formats
              </LinkButton>
            </motion.div>
          </div>

          <motion.aside
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            className="rounded-[24px] border border-white/20 bg-white/10 p-8 text-white shadow-[0_32px_64px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5D5B5]">Most guests choose</p>
            <p className="mt-3 font-serif text-[36px] leading-tight">48-Hour<br/>Hill Escape</p>
            <div className="mt-6 grid grid-cols-3 divide-x divide-white/20 border-y border-white/20 py-5 text-center">
              <div>
                <p className="font-serif text-[32px] leading-none">2</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-white/60">nights</p>
              </div>
              <div>
                <p className="font-serif text-[32px] leading-none">3</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-white/60">meals</p>
              </div>
              <div>
                <p className="font-serif text-[32px] leading-none">1</p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-white/60">trail</p>
              </div>
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-white/70">A balanced format for guests who want cabin rest, food, and one guided forest route without overplanning.</p>
          </motion.aside>
        </motion.div>
      </section>

      <BasecampPlansDesk />
      <BasecampAtlasComparison />
      <EnhancementBoard />
      <HostHandoffCTA />
    </main>
  )
}

function BasecampAtlasComparison() {
  const [activePlanId, setActivePlanId] = useState('escape')
  const activePlan = atlasPlans.find((plan) => plan.id === activePlanId) ?? atlasPlans[1]

  return (
    <section id="basecamp-atlas" className="relative overflow-hidden bg-[#F4F1EA] py-32 md:py-48">
      {/* Subtle grid pattern overlay for precision feel */}
      <div className="absolute inset-0 opacity-[0.25] [background-image:linear-gradient(rgba(31,36,33,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(31,36,33,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
      
      <div className="relative mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end mb-24">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8C7A6B]">Plan Comparison</p>
            <h2 className="mt-5 max-w-[620px] text-[clamp(44px,6vw,72px)] font-serif leading-[1] tracking-tight text-primary">
              Your basecamp decision table.
            </h2>
          </div>
          <p className="max-w-[600px] text-[18px] leading-relaxed text-primary/70 lg:justify-self-end">
            Compare the stay rhythm first, not just the price. The right package should feel obvious by pace, food, trail support, and how much planning you want us to carry.
          </p>
        </div>

        <div className="grid gap-12 xl:grid-cols-[340px_1fr] xl:gap-20">
          
          {/* Sticky Controller */}
          <div className="xl:sticky xl:top-32 self-start space-y-4">
            {atlasPlans.map((plan) => {
              const isActive = activePlan.id === plan.id
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setActivePlanId(plan.id)}
                  className={`group relative w-full overflow-hidden rounded-[24px] border border-primary/10 p-6 text-left transition-colors ${
                    isActive ? 'bg-primary text-white shadow-xl' : 'bg-white hover:border-primary/30'
                  }`}
                >
                  <span className={`block text-[11px] font-bold uppercase tracking-[0.2em] ${isActive ? 'text-[#E5D5B5]' : 'text-primary/40'}`}>
                    Format {plan.number}
                  </span>
                  <span className={`mt-2 block font-serif text-[28px] leading-tight ${isActive ? 'text-white' : 'text-primary'}`}>
                    {plan.name}
                  </span>
                  <span className={`mt-3 block text-[14px] leading-relaxed ${isActive ? 'text-white/70' : 'text-primary/60'}`}>
                    {plan.bestFor}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Table Area */}
          <div className="overflow-hidden rounded-[32px] border border-primary/10 bg-white shadow-2xl">
            <div className="overflow-x-auto">
              <div className="min-w-[720px]">
                {/* Sticky Header row */}
                <div className="sticky top-0 z-10 grid grid-cols-[200px_repeat(3,minmax(180px,1fr))] border-b border-primary/15 bg-white/90 backdrop-blur-md">
                  <div className="p-6 flex items-end text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40">Feature</div>
                  {atlasPlans.map((plan) => (
                    <div key={plan.id} className={`border-l border-primary/10 p-6 transition-colors ${plan.id === activePlan.id ? 'bg-[#FDFBF7]' : ''}`}>
                      <p className="font-serif text-[24px] leading-tight text-primary">{plan.name}</p>
                      <p className="mt-2 text-[14px] font-semibold text-[#8C7A6B]">{plan.price}</p>
                    </div>
                  ))}
                </div>

                {/* Rows */}
                {comparisonRows.map((row, index) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="group grid grid-cols-[200px_repeat(3,minmax(180px,1fr))] border-b border-primary/5 transition-colors hover:bg-primary/5"
                  >
                    <div className="flex items-center p-6 text-[12px] font-bold uppercase tracking-[0.15em] text-primary/60">{row.label}</div>
                    
                    {atlasPlans.map((plan) => {
                      const isHighlighted = plan.id === activePlan.id
                      return (
                        <div key={`${plan.id}-${row.key}`} className={`flex gap-3 border-l border-primary/10 p-6 text-[14px] leading-relaxed transition-colors ${isHighlighted ? 'bg-[#FDFBF7] text-primary font-medium' : 'text-primary/70'}`}>
                          {plan[row.key] !== 'None' ? (
                            <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${isHighlighted ? 'text-[#8C7A6B]' : 'text-primary/30'}`} strokeWidth={2} />
                          ) : (
                            <Minus className="mt-0.5 size-4 shrink-0 text-primary/20" strokeWidth={2} />
                          )}
                          <span>{plan[row.key]}</span>
                        </div>
                      )
                    })}
                  </motion.div>
                ))}
                
                {/* CTA Row */}
                <div className="grid grid-cols-[200px_repeat(3,minmax(180px,1fr))] bg-white">
                  <div className="p-6"></div>
                  {atlasPlans.map((plan) => (
                    <div key={`cta-${plan.id}`} className={`border-l border-primary/10 p-6 flex items-center justify-center ${plan.id === activePlan.id ? 'bg-[#FDFBF7]' : ''}`}>
                      {plan.id === activePlan.id && (
                        <LinkButton href="#package-gallery" variant="conversion" className="w-full justify-center">
                          Select {plan.name}
                        </LinkButton>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function EnhancementBoard() {
  return (
    <section className="bg-[#FDFBF7] py-32 md:py-48">
      <div className="mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)]">
        <div className="flex flex-col items-center text-center mb-24">
          <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8C7A6B]">Add-ons</p>
          <h2 className="mt-5 text-[clamp(44px,6vw,72px)] font-serif leading-[1] tracking-tight text-primary">Tactical enhancements.</h2>
          <p className="mt-6 max-w-[620px] text-[18px] leading-relaxed text-primary/70">
            Add-ons should feel like useful host-led upgrades, not a loose list of extras. Choose the service layer that makes your stay easier.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {addOnGroups.map((group, groupIndex) => (
            <motion.article
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: groupIndex * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col overflow-hidden rounded-[32px] border border-primary/10 bg-white shadow-xl transition-shadow hover:shadow-2xl"
            >
              {/* Image Header with slight zoom */}
              <div className="relative h-[220px] w-full overflow-hidden">
                <Image 
                  src={group.image} 
                  alt={group.category} 
                  fill 
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5D5B5]">0{groupIndex + 1}</p>
                  <h3 className="mt-2 font-serif text-[32px] leading-tight text-white">{group.category}</h3>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 p-8 md:p-10">
                <p className="text-[15px] leading-relaxed text-primary/60 mb-8 border-b border-primary/10 pb-8">{group.note}</p>
                <div className="space-y-8">
                  {group.items.map((item) => (
                    <div key={item.name} className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="max-w-[320px]">
                        <p className="font-serif text-[24px] font-medium leading-tight text-primary">{item.name}</p>
                        <p className="mt-2 text-[14px] leading-relaxed text-primary/60">{item.description}</p>
                        <p className="mt-3 inline-block rounded-full bg-[#F4F1EA] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8C7A6B]">
                          {item.pairing}
                        </p>
                      </div>
                      <p className="mt-1 font-serif text-[18px] font-semibold text-primary">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function HostHandoffCTA() {
  return (
    <section className="relative overflow-hidden bg-primary py-32 text-white md:py-48">
      <Image src="/images/offtrail/trail-path.jpg" alt="Forest trail near Off The Trail basecamp" fill className="object-cover opacity-[0.2] mix-blend-overlay" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      
      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-16 px-[clamp(24px,5vw,72px)] lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#E5D5B5]">Host handoff</p>
          <h2 className="mt-6 max-w-[800px] text-[clamp(48px,6.5vw,90px)] font-serif leading-[0.94] tracking-[-0.02em] text-white">
            Tell us your dates. We will shape the basecamp.
          </h2>
          <p className="mt-8 max-w-[600px] text-[20px] leading-relaxed text-white/80">
            Send your guest count and travel window. A host will confirm the best package, meal rhythm, trail suitability, and add-ons before payment.
          </p>
        </div>

        <aside className="rounded-[32px] border border-white/20 bg-white/5 p-10 backdrop-blur-xl shadow-2xl">
          <div className="border-b border-white/20 pb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5D5B5]">Before you pay</p>
            <p className="mt-3 font-serif text-[34px] leading-tight">Confidence first, payment second.</p>
          </div>
          <div className="py-8 space-y-6">
            {trustCues.map((cue) => (
              <div key={cue} className="flex items-start gap-4 text-[16px] text-white/80">
                <CheckCircle2 className="mt-1 size-5 shrink-0 text-[#E5D5B5]" strokeWidth={2} />
                <span className="leading-relaxed">{cue}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <LinkButton href="#package-gallery" variant="conversion" className="bg-white text-primary hover:bg-[#E5D5B5]" showArrow>
              Start with your dates
            </LinkButton>
          </div>
        </aside>
      </div>
    </section>
  )
}
