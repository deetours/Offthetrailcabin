'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Compass, FileText, MessageSquare, CreditCard, HelpCircle } from 'lucide-react'

interface Step {
  id: number
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  color: string
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Choose Stay',
    subtitle: 'Step 1: Pick lodging',
    description: 'Select either slow wooden cabins by the Jibhi river, or high altitude pine ridge rooms in Dalhousie.',
    icon: <MapPin size={20} />,
    color: '#C9782D',
  },
  {
    id: 2,
    title: 'Select Plan',
    subtitle: 'Step 2: Vibe match',
    description: 'Choose a matching itinerary — from a quick 24h reset to focus-rich workations or guided trail weekends.',
    icon: <Compass size={20} />,
    color: '#4A6472',
  },
  {
    id: 3,
    title: 'Submit Request',
    subtitle: 'Step 3: Web enquiry',
    description: 'Provide your dates, guest count, and notes in the final form. No credit cards or upfront fees requested.',
    icon: <FileText size={20} />,
    color: '#17251F',
  },
  {
    id: 4,
    title: 'WhatsApp Chat',
    subtitle: 'Step 4: Align coordinator',
    description: 'Our host connects via WhatsApp within minutes to confirm slots, route blockages, and weather forecasts.',
    icon: <MessageSquare size={20} />,
    color: '#25D366',
  },
  {
    id: 5,
    title: 'Secure UPI',
    subtitle: 'Step 5: Direct confirm',
    description: 'Pay securely via UPI only after you are completely comfortable with availability, roads, and dates.',
    icon: <CreditCard size={20} />,
    color: '#C9782D',
  }
]

export default function V2HowBookingWorks() {
  const [activeStepId, setActiveStepId] = useState<number>(1)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(lineRef.current,
          { width: "0%" },
          {
            width: "100%",
            ease: "sine.inOut",
            duration: 0.9,
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  const activeStep = steps.find(s => s.id === activeStepId) || steps[0]

  return (
    <section id="timeline" className="bg-surface py-20 border-b border-border/40 paper-grain scroll-mt-16">
      <div className="mx-auto max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        
        {/* Title Block */}
        <div className="mb-16 text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2.5 block">
            CONFIDENT BOOKING PATHWAY
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary font-normal">
            No blind bookings.<br />
            <span className="italic text-accent">Real human confirmation.</span>
          </h2>
          <p className="mt-4 text-text-muted text-sm font-sans leading-relaxed">
            Mountain weather and high roads change quickly. We verify route access, coordinate with local hosts, and clarify availability before asking for payments.
          </p>
        </div>

        {/* Horizontal Timeline (Desktop) */}
        <div className="hidden md:block relative mb-12">
          {/* Connecting Line (Background) */}
          <div className="absolute top-8 left-[10%] right-[10%] h-[1px] bg-border z-0" />
          
          {/* Animated Connecting Line (Foreground) */}
          <div className="absolute top-8 left-[10%] right-[10%] h-[1px] z-0">
             <div ref={lineRef} className="h-full bg-accent origin-left" style={{ width: '0%' }} />
          </div>
          
          <div className="relative z-10 flex justify-between items-center px-4">
            {steps.map((step) => {
              const isActive = step.id === activeStepId
              const isCompleted = step.id < activeStepId
              
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className="flex flex-col items-center group focus:outline-none w-[18%]"
                >
                  {/* Step Bubble Icon */}
                  <div 
                    className={`h-16 w-16 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary border-primary text-surface ring-4 ring-primary/15 scale-110 shadow' 
                        : isCompleted
                          ? 'bg-base border-accent text-accent'
                          : 'bg-surface border-border hover:border-primary/40 text-text-muted'
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Step Title */}
                  <span className={`text-xs font-semibold tracking-wider uppercase mt-4 text-center transition-colors ${
                    isActive ? 'text-primary font-bold' : 'text-text-muted group-hover:text-primary'
                  }`}>
                    {step.title}
                  </span>
                  
                  {/* Small step number */}
                  <span className="text-[10px] text-text-muted mt-1 uppercase">0{step.id}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Vertical List (Mobile) */}
        <div className="md:hidden flex flex-col gap-4 mb-8">
          {steps.map((step) => {
            const isActive = step.id === activeStepId
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={`w-full text-left p-4 rounded-lg border flex items-start gap-4 transition-all duration-200 ${
                  isActive 
                    ? 'border-accent bg-base/40 ring-1 ring-accent' 
                    : 'border-border/60 bg-surface/30'
                }`}
              >
                <div 
                  className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 border ${
                    isActive 
                      ? 'bg-primary border-primary text-surface' 
                      : 'bg-surface border-border text-text-muted'
                  }`}
                >
                  {step.icon}
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-accent font-bold block">
                    0{step.id} · {step.subtitle}
                  </span>
                  <h4 className="font-serif text-lg text-primary font-normal">
                    {step.title}
                  </h4>
                  {isActive && (
                    <p className="text-xs text-text-muted font-sans mt-1.5 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Timeline Details Drawer (Desktop only, animated) */}
        <div className="hidden md:block bg-base/50 border border-border/80 rounded-lg p-6 md:p-8 text-center max-w-2xl mx-auto shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-[10px] text-accent uppercase font-bold tracking-[0.2em] block mb-2">
                {activeStep.subtitle}
              </span>
              <h3 className="font-serif text-2xl text-primary font-normal mb-3">
                {activeStep.title}
              </h3>
              <p className="text-sm text-text font-sans leading-relaxed max-w-lg mx-auto">
                {activeStep.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center hidden md:block">
          <button 
            onClick={() => {
              const enquirySec = document.getElementById('enquiry')
              if (enquirySec) enquirySec.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center justify-center gap-2 rounded bg-primary py-3 px-8 text-xs font-semibold text-surface tracking-wider uppercase hover:bg-accent transition-all duration-200 shadow-sm"
          >
            Start your enquiry
          </button>
        </div>

      </div>
    </section>
  )
}
