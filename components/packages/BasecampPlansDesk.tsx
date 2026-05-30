'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { LinkButton } from '@/components/ui/button'

type PlanSpec = {
  label: string
  value: string
}

type Plan = {
  id: string
  number: string
  title: string
  duration: string
  bestFor: string
  price: string
  image: string
  summary: string
  specs: PlanSpec[]
}

const WHATSAPP_NUMBER = '919999999999'

const plans: Plan[] = [
  {
    id: 'reset',
    number: '01',
    title: '24-Hour Reset',
    duration: '1 day / 1 night',
    bestFor: 'Quick Getaway',
    price: 'INR 4,500 / 2 guests',
    image: '/images/reset.png',
    summary: 'A deliberate mountain pause designed to clear the mind. Includes simple warm food and a guided introductory forest walk.',
    specs: [
      { label: 'Meals Included', value: 'Breakfast service' },
      { label: 'Guided Trail', value: 'Short introductory walk' },
    ],
  },
  {
    id: 'escape',
    number: '02',
    title: '48-Hour Hill Escape',
    duration: '2 days / 2 nights',
    bestFor: 'Relaxed Immersion',
    price: 'INR 8,500 / 2 guests',
    image: '/images/escape.png',
    summary: 'Our signature mountain rhythm. Dive deep into the silence of the valley with slow breakfasts, a dedicated forest trail, and firelit evenings.',
    specs: [
      { label: 'Meals Included', value: '2 breakfasts + 1 dinner' },
      { label: 'Guided Trail', value: 'Guided pine forest trail' },
    ],
  },
  {
    id: 'trail-weekend',
    number: '03',
    title: 'Trail Weekend',
    duration: '2 days / 2 nights',
    bestFor: 'Active Explorers',
    price: 'INR 9,800 / 2 guests',
    image: '/images/trail_weekend.png',
    summary: 'An adventure-focused itinerary for active hikers. Led by local guides, backed by early-morning trail food and restorative dinners.',
    specs: [
      { label: 'Meals Included', value: 'Pre-trail breakfast + dinner' },
      { label: 'Guided Trail', value: 'Full moderate difficulty route' },
    ],
  },
]

export default function BasecampPlansDesk() {
  const [activePlanId, setActivePlanId] = useState<string>('escape')
  const [guests, setGuests] = useState<number>(2)
  const [dates, setDates] = useState<string>('')

  return (
    <section id="package-gallery" className="relative bg-white py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-[clamp(24px,5vw,72px)]">

        {/* Section Header */}
        <div className="mb-20 grid gap-8 lg:grid-cols-2 lg:items-end max-w-[1440px] mx-auto">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8C7A6B]">The Package Gallery</p>
            <h2 className="mt-4 text-[clamp(44px,6vw,72px)] font-serif leading-[1.05] tracking-tight text-primary">
              Choose your basecamp blueprint.
            </h2>
          </div>
          <p className="max-w-[520px] text-[18px] leading-relaxed text-primary/70 lg:justify-self-end">
            Each format is custom-shaped for a unique mountain cadence. Select a plan below to view details and start your request.
          </p>
        </div>

        {/* Interactive Accordion Layout */}
        <div className="flex h-[85vh] min-h-[600px] max-h-[900px] w-full flex-col gap-4 lg:flex-row lg:gap-6">
          {plans.map((plan) => {
            const isActive = activePlanId === plan.id

            // Generate WhatsApp Link
            const message = [
              'Hi Off the Trail team,',
              '',
              `I'd like to book the ${plan.title} for ${guests} guest(s) around ${dates || 'my preferred dates'}.`,
              '',
              'Please confirm stay availability, custom options, and cabin choices.',
            ].join('%0A')
            const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

            return (
              <motion.article
                key={plan.id}
                layout
                onClick={() => setActivePlanId(plan.id)}
                className={`group relative flex cursor-pointer overflow-hidden rounded-[32px] transition-all duration-700 ease-[0.32,0.72,0,1] ${
                  isActive ? 'lg:flex-[2.5]' : 'lg:flex-[1]'
                } ${isActive ? 'flex-[3]' : 'flex-[1]'}`}
              >
                {/* Background Image */}
                <Image
                  src={plan.image}
                  alt={plan.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Overlays */}
                <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'bg-black/50 mix-blend-multiply' : 'bg-black/40'}`} />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-80'}`} />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-[40px] leading-none text-[#E5D5B5] lg:text-[60px]">{plan.number}</span>
                    <motion.div layout="position">
                      <p className={`text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>{plan.bestFor}</p>
                      <h3 className="mt-1 font-serif text-[24px] leading-tight text-white lg:text-[32px]">{plan.title}</h3>
                    </motion.div>
                  </div>

                  {/* Expanded Content Details */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[500px] text-[16px] leading-relaxed text-white/80">{plan.summary}</p>
                        
                        <div className="mt-8 grid max-w-[600px] gap-6 border-t border-white/20 pt-8 sm:grid-cols-2">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E5D5B5]">Experience Rate</p>
                            <p className="mt-2 font-serif text-[22px] text-white">{plan.price}</p>
                          </div>
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#E5D5B5]">Duration</p>
                            <p className="mt-2 font-serif text-[22px] text-white">{plan.duration}</p>
                          </div>
                          {plan.specs.map(spec => (
                            <div key={spec.label}>
                              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50">{spec.label}</p>
                              <p className="mt-1 text-[15px] font-medium text-white/90">{spec.value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Interactive Booking Strip */}
                        <div className="mt-10 flex max-w-[600px] flex-col gap-4 sm:flex-row sm:items-center rounded-2xl bg-white/10 p-4 backdrop-blur-md border border-white/20">
                          <div className="flex flex-1 items-center gap-3">
                            <input
                              type="number"
                              min={1}
                              value={guests}
                              onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))}
                              onClick={(e) => e.stopPropagation()}
                              className="w-16 rounded-lg bg-black/20 px-3 py-2 text-center text-[15px] text-white outline-none focus:ring-1 focus:ring-[#E5D5B5]"
                              aria-label="Guests"
                            />
                            <span className="text-[12px] uppercase tracking-[0.1em] text-white/60">Guests</span>
                          </div>
                          <div className="flex flex-[2] items-center gap-3">
                            <input
                              type="text"
                              value={dates}
                              onChange={(e) => setDates(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              placeholder="Preferred dates"
                              className="w-full rounded-lg bg-black/20 px-4 py-2 text-[15px] text-white outline-none focus:ring-1 focus:ring-[#E5D5B5] placeholder:text-white/30"
                              aria-label="Dates"
                            />
                          </div>
                          <LinkButton 
                            href={whatsappHref} 
                            target="_blank" 
                            className="w-full justify-center bg-white text-primary hover:bg-[#E5D5B5] sm:w-auto" 
                            onClick={(e) => e.stopPropagation()}
                          >
                            Request
                          </LinkButton>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
