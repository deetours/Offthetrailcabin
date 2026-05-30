'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDestination } from '@/lib/DestinationContext'
import { destinations } from '@/lib/destinations'
import { Check, ArrowRight, ShieldCheck } from 'lucide-react'

export default function V2HeroGateway() {
  const { selectedDestination, setSelectedDestination } = useDestination()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  }

  const activeDestObj = destinations.find(d => d.id === selectedDestination)

  const handleScrollToStays = () => {
    const staysSec = document.getElementById('stays')
    if (staysSec) {
      staysSec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden bg-base py-16 md:py-24 paper-grain border-b border-border/50">
      <div className="mx-auto max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Editorial Title and Core USP */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.span 
              variants={itemVariants} 
              className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3 block"
            >
              Mountain Stays & Cabins
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              className="font-serif text-[clamp(44px,6.5vw,76px)] leading-[1.05] tracking-tight text-primary mb-6"
            >
              Stay in the hills.<br />
              <span className="italic font-normal text-accent">Choose where.</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-text/80 text-lg leading-relaxed mb-8 max-w-md font-sans"
            >
              Unplug in handcrafted wooden cabins by the river in Jibhi, or seek deep alpine views along the high pine ridges of Dalhousie. Choose a basecamp to begin.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col gap-3.5 border-t border-border/60 pt-6"
            >
              {/* Trust Badge Grid */}
              <div className="flex items-center gap-3 text-sm text-primary font-medium">
                <ShieldCheck size={18} className="text-accent flex-shrink-0" />
                <span>Zero-Friction Mountain Booking Process</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px] uppercase tracking-wider text-text-muted font-semibold">
                <div className="flex flex-col">
                  <span className="text-[10px] text-accent">Step 1</span>
                  <span>1. Choose Stay</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-accent">Step 2</span>
                  <span>2. WhatsApp Chat</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-accent">Step 3</span>
                  <span>3. UPI & Secure</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Split Destination Selectors */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {destinations.map((dest) => {
                const isActive = dest.id === selectedDestination
                return (
                  <motion.button
                    layout
                    key={dest.id}
                    onClick={() => setSelectedDestination(dest.id as 'jibhi' | 'dalhousie')}
                    className={`group relative text-left rounded-lg overflow-hidden border flex flex-col justify-end p-6 ${
                      isActive 
                        ? 'border-accent ring-2 ring-accent bg-surface/10 shadow-lg h-[460px] sm:h-[500px]' 
                        : 'border-border/60 grayscale-[25%] opacity-85 hover:opacity-100 hover:grayscale-0 hover:border-primary/40 bg-surface/5 shadow-sm h-[360px] sm:h-[400px]'
                    }`}
                    transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                  >
                    {/* Full-bleed background image */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={dest.image} 
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />
                    </div>

                    {/* Badge Indicator */}
                    <div className="absolute top-4 right-4 z-10">
                      {isActive ? (
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-accent text-surface shadow">
                          <Check size={16} />
                        </span>
                      ) : (
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-surface/20 backdrop-blur-sm text-surface border border-surface/30 group-hover:bg-surface/40 transition-colors">
                          <ArrowRight size={16} />
                        </span>
                      )}
                    </div>

                    {/* Content text */}
                    <div className="relative z-10 text-surface">
                      <motion.span layout="position" className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-1.5 block">
                        {dest.label}
                      </motion.span>
                      <motion.h3 layout="position" className="font-serif text-2xl md:text-3xl text-surface mb-2 font-normal">
                        {dest.name}
                      </motion.h3>
                      <motion.p layout="position" className="text-xs text-surface/80 leading-relaxed font-sans line-clamp-2 mb-4 group-hover:text-surface transition-colors">
                        {dest.headline}
                      </motion.p>
                      
                      {/* Quick Facts overlay */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-2 gap-2 mb-4 text-[10px] text-surface/90 uppercase tracking-widest font-sans overflow-hidden"
                          >
                            <div>Altitude: <span className="font-bold text-surface">{dest.id === 'jibhi' ? '1,600m' : '1,970m'}</span></div>
                            <div>Season: <span className="font-bold text-surface">{dest.id === 'jibhi' ? 'Year-round' : 'March - Nov'}</span></div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* CTA inside active button */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className="w-full rounded-md bg-accent text-surface font-sans text-xs font-semibold py-2.5 px-4 text-center tracking-wider uppercase hover:bg-accent/90 transition-all flex items-center justify-center gap-1.5 shadow"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleScrollToStays()
                            }}
                          >
                            <span>Explore {dest.name} Stays</span>
                            <ArrowRight size={12} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>

            {/* Below-card AnimatePresence info panel */}
            <motion.div 
              variants={itemVariants}
              className="bg-surface/80 backdrop-blur-sm rounded-lg border border-border/80 p-5 shadow-sm font-sans flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <span className="text-[10px] uppercase tracking-widest text-accent font-bold block mb-1">
                  Active Vibe Match
                </span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedDestination}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-text text-sm font-medium leading-relaxed"
                  >
                    Ideal for: <span className="text-primary font-bold">{activeDestObj?.idealFor}</span>. Vibe captures {activeDestObj?.mood}.
                  </motion.p>
                </AnimatePresence>
              </div>
              <button 
                onClick={handleScrollToStays}
                className="flex-shrink-0 flex items-center justify-center gap-1 text-xs font-semibold tracking-wide text-primary border-b border-primary pb-0.5 hover:text-accent hover:border-accent transition-all uppercase"
              >
                <span>View Stays</span>
                <ArrowRight size={12} />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
