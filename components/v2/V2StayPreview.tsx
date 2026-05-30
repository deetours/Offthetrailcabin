'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDestination } from '@/lib/DestinationContext'
import { destinations } from '@/lib/destinations'
import { Users, IndianRupee, ArrowRight, Star } from 'lucide-react'

export default function V2StayPreview() {
  const { selectedDestination, setSelectedStay } = useDestination()
  const activeDestObj = destinations.find(d => d.id === selectedDestination)
  const stays = activeDestObj?.stays || []

  const handleEnquireStay = (stayName: string) => {
    setSelectedStay(stayName)
    const enquirySec = document.getElementById('enquiry')
    if (enquirySec) {
      enquirySec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 }
    }
  }

  return (
    <section id="stays" className="bg-surface py-20 border-b border-border/40 paper-grain scroll-mt-16">
      <div className="mx-auto max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2.5 block">
              Handpicked Lodgings
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary font-normal">
              {activeDestObj?.name} Stays — <span className="italic text-accent">Private lodgings in {activeDestObj?.label}.</span>
            </h2>
          </div>
          <p className="text-text-muted text-sm md:text-base max-w-sm font-sans leading-relaxed">
            Every room and cabin is fully managed by our local hospitality coordinators. High speed Wi-Fi, mountain warmth, and local food as standard.
          </p>
        </div>

        {/* Dynamic AnimatePresence Stay Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedDestination}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            {stays.map((stay, index) => {
              // Asymmetric grid logic: first stay spans more columns if there are multiple stays
              // For Dalhousie (1 stay), it spans full width
              // For Jibhi (3 stays), first is col-span-8, next two are col-span-4 or similar. Let's make first full width on md, or 8.
              // Let's use: if stays.length === 1 -> col-span-12. If index === 0 -> col-span-12 lg:col-span-8. Others -> col-span-12 lg:col-span-4.
              const colSpanClass = stays.length === 1 
                ? 'md:col-span-12 lg:col-span-8 lg:col-start-3' 
                : index === 0 ? 'md:col-span-12 lg:col-span-7' : 'md:col-span-6 lg:col-span-5'

              return (
                <motion.div
                  key={stay.id}
                  variants={cardVariants}
                  className={`group flex flex-col bg-surface border border-border/80 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-border/40 transition-all duration-300 ${colSpanClass}`}
                >
                {/* Stay Image Frame */}
                <div className="relative h-64 overflow-hidden bg-base">
                  <img 
                    src={stay.image} 
                    alt={stay.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-surface text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full">
                    {stay.type}
                  </span>
                  {/* From Price Overlay */}
                  <div className="absolute bottom-4 right-4 bg-surface px-3 py-1.5 rounded-md shadow-sm border border-border/40 flex items-center gap-0.5 text-xs text-primary font-semibold">
                    <span className="text-[10px] text-text-muted font-normal mr-1">from</span>
                    <IndianRupee size={12} className="text-accent" />
                    <span>{stay.fromPrice}</span>
                    <span className="text-[10px] text-text-muted font-normal">/night</span>
                  </div>
                </div>

                {/* Card Content body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif text-2xl text-primary font-normal group-hover:text-accent transition-colors">
                        {stay.name}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-text-muted font-medium bg-base/50 px-2 py-0.5 rounded-full border border-border/40">
                        <Users size={12} className="text-accent" />
                        <span>Sleeps {stay.sleeps}</span>
                      </div>
                    </div>
                    
                    <span className="text-xs text-accent font-medium uppercase tracking-wider block mb-4">
                      Best for: {stay.bestFor}
                    </span>

                    {/* Key Amenities Tag Grid */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {stay.amenities.map((amenity, i) => (
                        <span 
                          key={i} 
                          className="text-[11px] font-sans text-text/80 bg-base/40 border border-border/60 rounded px-2.5 py-1"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Handoff CTA */}
                  <button
                    onClick={() => handleEnquireStay(stay.name)}
                    className="w-full flex items-center justify-between rounded bg-primary py-2.5 px-4 text-xs font-semibold text-surface tracking-wider uppercase hover:bg-accent hover:text-surface transition-all shadow-sm duration-200 group-hover:bg-primary"
                  >
                    <span>{stay.cta}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )
          })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
