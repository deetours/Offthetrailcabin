'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { destinations } from '@/lib/destinations'
import { trackConversion } from '@/lib/analytics'
import { LinkButton } from '@/components/ui/button'
import gsap from 'gsap'

interface DestinationGatewayProps {
  selectedDestination: 'jibhi' | 'dalhousie'
  onSelectDestination: (id: 'jibhi' | 'dalhousie') => void
}

export default function DestinationGateway({
  selectedDestination,
  onSelectDestination,
}: DestinationGatewayProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('.gateway-header', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo('.portal-container', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  const handleSelect = (id: 'jibhi' | 'dalhousie') => {
    if (id !== selectedDestination) {
      onSelectDestination(id)
      trackConversion('destination_select', { destination: id })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90svh] overflow-hidden bg-base flex flex-col pt-24 pb-12"
    >
      <div className="gateway-header relative z-10 mx-auto w-full max-w-[1440px] px-[clamp(24px,5vw,72px)] text-center mb-12">
        <h1 className="font-serif text-[clamp(44px,10vw,72px)] leading-[0.95] tracking-[-0.04em] text-primary">
          Stay in the hills. <span className="italic">Choose where.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[500px] text-[18px] leading-[1.65] text-text-muted font-sans">
          Pick Dalhousie or Jibhi, then let Off the Trail plan your stay, meals, and route.
        </p>
      </div>

      {/* Portal Grid */}
      <div className="relative z-0 mx-auto w-full max-w-[1440px] px-[clamp(16px,4vw,72px)] flex-1 flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-10 perspective-1000">
        {destinations.map((dest) => {
          const isSelected = selectedDestination === dest.id
          
          return (
            <motion.div
              key={dest.id}
              layoutId={`portal-${dest.id}`}
              onClick={() => handleSelect(dest.id as 'jibhi' | 'dalhousie')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleSelect(dest.id as 'jibhi' | 'dalhousie')
                }
              }}
              tabIndex={0}
              role="button"
              aria-selected={isSelected}
              className="portal-container relative w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[32px] overflow-hidden group"
              animate={{
                flex: isSelected ? 1.6 : 0.8,
                scale: isSelected ? 1 : 0.96,
                opacity: isSelected ? 1 : 0.65,
                zIndex: isSelected ? 20 : 10,
                filter: isSelected ? 'blur(0px)' : 'blur(1.5px)',
              }}
              transition={{
                duration: 0.7,
                ease: [0.32, 0.72, 0, 1]
              }}
              style={{ height: 'clamp(420px, 60vh, 600px)' }}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={dest.image}
                  alt={`Scenic view of ${dest.name}`}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-[0.32,0.72,0,1] group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-[#0F1E19]/90 via-[#0F1E19]/30 to-transparent transition-opacity duration-700 ${isSelected ? 'opacity-80' : 'opacity-100'}`} />
              </div>

              {/* Portal Content */}
              <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/90 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                    {dest.label}
                  </span>
                  
                  {/* Selection Indicator */}
                  <motion.div
                    animate={{ 
                      backgroundColor: isSelected ? 'var(--accent)' : 'transparent',
                      borderColor: isSelected ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
                      color: isSelected ? 'var(--surface)' : '#FFFFFF'
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-300"
                  >
                    {isSelected ? (
                      <Check className="h-6 w-6" strokeWidth={2.5} />
                    ) : (
                      <ArrowRight className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </motion.div>
                </div>

                <div className="text-surface">
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent mb-2">
                    {dest.idealFor}
                  </p>
                  <h2 className="font-serif text-[clamp(40px,6vw,56px)] leading-[0.95] tracking-[-0.03em] mb-4">
                    {dest.name}
                  </h2>
                  
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        key={`content-${dest.id}`}
                        initial={{ opacity: 0, height: 0, y: 10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 10 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <p className="text-[16px] leading-[1.6] text-[rgba(255,252,246,0.85)] font-serif italic max-w-[400px] mb-8">
                          {dest.mood}
                        </p>
                        
                        <LinkButton href="#stay-desk" variant="secondary" className="bg-surface text-primary border-transparent hover:bg-base hover:border-transparent">
                          {dest.cta}
                        </LinkButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
