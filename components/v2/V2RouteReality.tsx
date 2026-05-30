'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDestination } from '@/lib/DestinationContext'
import { destinations } from '@/lib/destinations'
import { Compass, CloudSun, Map, Smartphone } from 'lucide-react'

export default function V2RouteReality() {
  const { selectedDestination } = useDestination()
  const activeDestObj = destinations.find(d => d.id === selectedDestination)
  const warmthIndex = activeDestObj?.warmthIndex || []

  return (
    <section id="route" className="bg-surface py-20 border-b border-border/40 paper-grain scroll-mt-16">
      <div className="mx-auto max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Field Guide Card */}
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3 block">
              LOCAL KNOWLEDGE
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary font-normal mb-6">
              The mountain <span className="italic text-accent">field guide.</span>
            </h2>
            <p className="text-text-muted text-sm font-sans leading-relaxed mb-8">
              We track microclimate weather patterns, elevation acclimatization indexes, and real-time road conditions so you arrive fully prepared.
            </p>

            {/* Premium Journal Card */}
            <div className="bg-base/30 border border-border/80 rounded-lg p-6 paper-grain relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 h-16 w-16 bg-accent/5 rounded-bl-full flex items-center justify-center text-accent">
                <Compass size={20} className="translate-x-1.5 -translate-y-1.5" />
              </div>

              <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold block mb-4">
                Altitude & Warmth Indeces
              </span>

              {/* Dynamic indices list */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDestination}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4 mb-6 border-b border-border/40 pb-5"
                >
                  {warmthIndex.map((index, i) => (
                    <div key={i} className="flex justify-between items-center text-sm font-sans">
                      <span className="text-text-muted">{index.metric}</span>
                      <div className="text-right">
                        <span className="text-primary font-bold block">{index.value}</span>
                        <span className="text-[10px] text-text-muted leading-none block">{index.label}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Dynamic route footer tip */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDestination}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-surface/80 border border-border/60 p-4 rounded text-xs leading-relaxed text-text font-sans"
                >
                  <span className="font-bold text-accent block mb-1">Coordinator Route Note:</span>
                  {activeDestObj?.footerRouteNote}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <button 
              onClick={() => window.open(`https://wa.me/919876543210?text=Hi, I have a route question about driving to ${activeDestObj?.name}.`, '_blank')}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded border border-[#25D366] text-[#25D366] py-3 px-6 text-xs font-semibold tracking-wider uppercase hover:bg-[#25D366] hover:text-surface transition-all duration-200 shadow-sm"
            >
              <Smartphone size={16} />
              <span>Ask route question</span>
            </button>
          </div>

          {/* Right Column: Three Pillars of Confidence */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Live Weather Pillar */}
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded bg-base flex items-center justify-center text-accent flex-shrink-0 border border-border/60">
                <CloudSun size={22} />
              </div>
              <div>
                <h4 className="font-serif text-xl text-primary font-normal mb-1.5">
                  Microclimate Weather Analysis
                </h4>
                <p className="text-text-muted text-xs leading-relaxed font-sans">
                  {selectedDestination === 'jibhi' 
                    ? 'The Tirthan valley experiences wildly specific rainfall and river wind currents. Before you travel, we analyze hourly reports from your exact room location.' 
                    : 'The Dhauladhar range experiences rapid cloud movements and temperature drops. Before you travel, we analyze hourly reports from your exact ridge location.'}
                </p>
              </div>
            </div>

            {/* Clear Route Safety Pillar */}
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded bg-base flex items-center justify-center text-accent-slate flex-shrink-0 border border-border/60">
                <Map size={22} />
              </div>
              <div>
                <h4 className="font-serif text-xl text-primary font-normal mb-1.5">
                  Precise pre-arrival maps & spots
                </h4>
                <p className="text-text-muted text-xs leading-relaxed font-sans">
                  {selectedDestination === 'jibhi'
                    ? 'Forget generic maps that send sedans onto dirt tracks. We provide offline maps and exact photo coordinates for Jibhi valley roads and host-supported parking.'
                    : 'Forget generic maps that mislead you on steep gradients. We provide offline maps and exact photo coordinates for Dalhousie ridge climbs and host-supported parking.'}
                </p>
              </div>
            </div>

            {/* Verified Host communication */}
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded bg-base flex items-center justify-center text-primary flex-shrink-0 border border-border/60">
                <Smartphone size={22} />
              </div>
              <div>
                <h4 className="font-serif text-xl text-primary font-normal mb-1.5">
                  Dedicated local coordinator assignment
                </h4>
                <p className="text-text-muted text-xs leading-relaxed font-sans">
                  The moment your booking request clears, a real human host who lives within 2km of your {activeDestObj?.name} stay is assigned to your WhatsApp chat to answer any local questions immediately.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
