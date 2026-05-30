'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { destinations } from '@/lib/destinations'
import { createWhatsAppLink, DEFAULT_WHATSAPP_NUMBER } from '@/lib/enquiry'
import { MapPin, Briefcase, Footprints, Flame, Calendar, Users, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

type Step = 1 | 2 | 3 | 4

export default function BookingFlow() {
  const [step, setStep] = useState<Step>(1)
  
  // Form State
  const [destinationId, setDestinationId] = useState<string>('')
  const [intent, setIntent] = useState<string>('')
  const [dates, setDates] = useState<string>('')
  const [guests, setGuests] = useState<string>('2 guests')

  const activeDest = destinations.find(d => d.id === destinationId)

  const handleNext = () => setStep(s => Math.min(4, s + 1) as Step)
  const handlePrev = () => setStep(s => Math.max(1, s - 1) as Step)

  const handleEnquire = () => {
    const payload = {
      destination: activeDest?.name || '',
      intent,
      dates,
      guests
    }
    const message = `Hi Off the Trail, I want to request a booking.\n\nDestination: ${payload.destination}\nTravel Intent: ${payload.intent}\nDates: ${payload.dates}\nGuests: ${payload.guests}\n\nPlease confirm availability and guide me on the next steps.`
    const link = createWhatsAppLink(DEFAULT_WHATSAPP_NUMBER, message)
    window.open(link, '_blank')
  }

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  }
  const direction = 1 // Simplified for basic flow

  return (
    <div className="bg-surface border border-border/80 rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden min-h-[500px] flex flex-col">
      
      {/* Progress Indicator */}
      <div className="flex items-center gap-2 mb-10">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex-1 h-1.5 rounded-full bg-border/50 overflow-hidden">
            <motion.div 
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: step >= i ? '100%' : '0%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        
        {/* STEP 1: DESTINATION */}
        {step === 1 && (
          <motion.div
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-2">Step 1 of 4</span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8">Where are you heading?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {destinations.map(d => (
                <button
                  key={d.id}
                  onClick={() => setDestinationId(d.id)}
                  className={`relative text-left rounded-xl border p-4 transition-all duration-200 overflow-hidden group ${
                    destinationId === d.id 
                      ? 'border-accent ring-1 ring-accent bg-base shadow-sm' 
                      : 'border-border/80 hover:border-accent/50 bg-surface'
                  }`}
                >
                  <div className="relative h-32 w-full rounded-lg overflow-hidden mb-4">
                    <Image src={d.image} alt={d.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-primary/20" />
                  </div>
                  <h3 className="font-serif text-2xl text-primary mb-1">{d.name}</h3>
                  <p className="text-xs text-text-muted font-sans leading-relaxed">{d.headline}</p>
                </button>
              ))}
            </div>

            <button
              disabled={!destinationId}
              onClick={handleNext}
              className="mt-auto w-full md:w-auto self-end flex items-center justify-center gap-2 rounded bg-primary py-3 px-8 text-xs font-semibold text-surface tracking-wider uppercase hover:bg-accent disabled:opacity-50 disabled:hover:bg-primary transition-all duration-200"
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

        {/* STEP 2: INTENT */}
        {step === 2 && (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-2">Step 2 of 4</span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8">What brings you to {activeDest?.name}?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: 'relax', label: 'Deep Rest & Cafe', icon: <Flame size={24} />, desc: 'Slow mornings, books, and fireside dinners.' },
                { id: 'workation', label: 'Remote Workation', icon: <Briefcase size={24} />, desc: 'Reliable Wi-Fi, desk setups, and coffee.' },
                { id: 'trails', label: 'Active Trails', icon: <Footprints size={24} />, desc: 'Guided hikes, ridges, and outdoor movement.' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setIntent(opt.label)}
                  className={`flex flex-col p-6 rounded-xl border transition-all duration-200 ${
                    intent === opt.label
                      ? 'border-accent bg-base ring-1 ring-accent shadow-sm'
                      : 'border-border/80 hover:border-accent/50 bg-surface'
                  }`}
                >
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${intent === opt.label ? 'bg-accent/10 text-accent' : 'bg-base text-text-muted'}`}>
                    {opt.icon}
                  </div>
                  <h3 className="font-serif text-xl text-primary mb-2 text-left">{opt.label}</h3>
                  <p className="text-xs text-text-muted text-left font-sans">{opt.desc}</p>
                </button>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider hover:text-primary transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
              <button
                disabled={!intent}
                onClick={handleNext}
                className="flex items-center justify-center gap-2 rounded bg-primary py-3 px-8 text-xs font-semibold text-surface tracking-wider uppercase hover:bg-accent disabled:opacity-50 disabled:hover:bg-primary transition-all duration-200"
              >
                <span>Continue</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: DATES & GUESTS */}
        {step === 3 && (
          <motion.div
            key="step3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-2">Step 3 of 4</span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-8">When are you traveling?</h2>
            
            <div className="max-w-md w-full space-y-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                  <Calendar size={14} className="text-accent" />
                  <span>Travel Dates</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next weekend, or June 15-20"
                  value={dates}
                  onChange={e => setDates(e.target.value)}
                  className="w-full bg-base border border-border/80 rounded p-4 text-sm text-primary focus:outline-none focus:border-accent"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                  <Users size={14} className="text-accent" />
                  <span>Number of Guests</span>
                </label>
                <select
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                  className="w-full bg-base border border-border/80 rounded p-4 text-sm text-primary font-medium focus:outline-none focus:border-accent"
                >
                  <option value="1 guest">1 guest</option>
                  <option value="2 guests">2 guests</option>
                  <option value="3 guests">3 guests</option>
                  <option value="4 guests">4 guests</option>
                  <option value="5+ guests">5+ guests (Group)</option>
                </select>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider hover:text-primary transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
              <button
                disabled={!dates}
                onClick={handleNext}
                className="flex items-center justify-center gap-2 rounded bg-primary py-3 px-8 text-xs font-semibold text-surface tracking-wider uppercase hover:bg-accent disabled:opacity-50 disabled:hover:bg-primary transition-all duration-200"
              >
                <span>Continue</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: FORMULATION */}
        {step === 4 && (
          <motion.div
            key="step4"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center text-center py-8"
          >
            <div className="h-16 w-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3">Request Formulated</h2>
            <p className="text-sm text-text-muted font-sans leading-relaxed max-w-md mb-8">
              Your request for {activeDest?.name} ({intent}) is ready. Our coordinator will verify availability and send you a secure UPI link on WhatsApp.
            </p>
            
            <div className="w-full max-w-sm flex flex-col gap-4">
              <button
                onClick={handleEnquire}
                className="w-full flex items-center justify-center gap-2 rounded bg-[#25D366] py-3.5 px-8 text-xs font-semibold text-surface tracking-wider uppercase hover:bg-[#20ba59] transition-all duration-200 shadow-sm"
              >
                <span>Send WhatsApp Request</span>
              </button>
              <button
                onClick={handlePrev}
                className="text-xs font-semibold text-text-muted uppercase tracking-wider hover:text-primary transition-colors py-2"
              >
                Make a change
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
