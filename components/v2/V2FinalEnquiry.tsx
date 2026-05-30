'use client'

import React, { useState, useEffect } from 'react'
import { useDestination } from '@/lib/DestinationContext'
import { destinations } from '@/lib/destinations'
import { 
  createWhatsAppLink, 
  buildEnquiryWhatsAppMessage, 
  buildGlobalWhatsAppMessage,
  DEFAULT_WHATSAPP_NUMBER 
} from '@/lib/enquiry'
import { trackConversion } from '@/lib/analytics'
import { MessageSquare, Calendar, Users, Home, User, Phone, CheckCircle, Compass, ShieldCheck } from 'lucide-react'

export default function V2FinalEnquiry() {
  const { selectedDestination, setSelectedDestination, selectedStay, setSelectedStay, selectedPackage } = useDestination()
  
  const activeDestObj = destinations.find(d => d.id === selectedDestination)
  const stays = activeDestObj?.stays || []

  // Form states
  const [formStay, setFormStay] = useState<string>('')
  const [formPackage, setFormPackage] = useState<string>('Custom / None')
  const [dates, setDates] = useState<string>('')
  const [guests, setGuests] = useState<string>('2 guests')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  // Sync selectedStay context change with form preferred stay select field
  useEffect(() => {
    if (selectedStay) {
      setFormStay(selectedStay)
    } else if (stays.length > 0) {
      setFormStay(stays[0].name)
    }
  }, [selectedStay, selectedDestination, stays])

  // Sync selectedPackage context change with form package select field
  useEffect(() => {
    if (selectedPackage) {
      setFormPackage(selectedPackage)
    }
  }, [selectedPackage])

  const handleDestinationToggle = () => {
    const nextDest = selectedDestination === 'jibhi' ? 'dalhousie' : 'jibhi'
    setSelectedDestination(nextDest)
    setSelectedStay(null) // reset stay selection to default
  }

  // Quick WhatsApp Enquiry
  const handleQuickWhatsApp = () => {
    trackConversion('quick_whatsapp_enquiry', 'click_whatsapp_direct')
    const message = buildGlobalWhatsAppMessage(selectedDestination)
    const link = createWhatsAppLink(DEFAULT_WHATSAPP_NUMBER, message)
    window.open(link, '_blank')
  }

  // Form Submit Handler
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Track Analytics
    trackConversion('submit_enquiry_form', 'click_form_submit')

    // Construct detailed WhatsApp message payload
    const payload = {
      source: 'Homepage V2 Form',
      destination: activeDestObj?.name || selectedDestination,
      stay: formStay,
      package: formPackage,
      dates,
      guests,
      interest: 'Stay booking request',
      name,
      phone,
      notes
    }

    const message = buildEnquiryWhatsAppMessage(payload)
    const link = createWhatsAppLink(DEFAULT_WHATSAPP_NUMBER, message)
    
    // Open WhatsApp
    window.open(link, '_blank')
    
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
    }, 4000)
  }

  return (
    <section id="enquiry" className="bg-surface py-20 border-b border-border/40 paper-grain scroll-mt-16">
      <div className="mx-auto max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Quick Conversion info */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3 block">
              SECURE YOUR DATES
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary font-normal mb-6">
              Plan your enquiry in <span className="italic text-accent">60 seconds.</span>
            </h2>
            <p className="text-text-muted text-sm font-sans leading-relaxed mb-8">
              Send us a direct request. No initial booking deposits, no credit card checks. Our coordinators verify cabin slots and road conditions before payment confirmation.
            </p>

            {/* Quick WhatsApp CTA Card */}
            <div className="bg-base/30 border border-border/80 rounded-lg p-6 paper-grain relative shadow-sm text-center">
              <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold block mb-2">
                Fastest Response Path
              </span>
              <h3 className="font-serif text-xl text-primary font-normal mb-3">
                Skip forms. Message directly.
              </h3>
              <p className="text-xs text-text-muted font-sans leading-relaxed mb-6 max-w-xs mx-auto">
                Opens directly in WhatsApp. Send an automated request in one tap to check availability for {activeDestObj?.name}.
              </p>

              <button
                onClick={handleQuickWhatsApp}
                className="w-full flex items-center justify-center gap-2 rounded bg-[#25D366] text-surface font-sans text-xs font-semibold py-3 px-6 uppercase tracking-wider hover:bg-[#20ba59] transition-all shadow-sm active:scale-95 duration-150"
              >
                <MessageSquare size={16} fill="currentColor" />
                <span>Chat via WhatsApp</span>
              </button>
              
              <span className="text-[10px] text-text-muted mt-3 block">
                Typical reply in 15 minutes · Live coordinator access
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Web Form */}
          <div className="lg:col-span-7 bg-surface border border-border/80 rounded-lg p-6 md:p-8 shadow-sm paper-grain">
            <form onSubmit={handleSubmitForm} className="flex flex-col gap-5">
              
              {/* Destination badge Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-base/40 border border-border/60 rounded-md p-4 mb-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <div className="text-sm font-sans text-text">
                    <span className="text-text-muted">Currently planning for:</span>{' '}
                    <span className="font-bold text-primary">{activeDestObj?.name} stays</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDestinationToggle}
                  className="text-xs font-bold text-accent border-b border-dashed border-accent hover:text-accent/80 transition-colors uppercase self-start sm:self-auto"
                >
                  Switch Destination
                </button>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Stay Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-stay" className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                    <Home size={12} className="text-accent" />
                    <span>Preferred Stay</span>
                  </label>
                  <select
                    id="form-stay"
                    value={formStay}
                    onChange={(e) => setFormStay(e.target.value)}
                    className="w-full bg-surface border border-border/80 rounded p-2.5 text-xs text-primary font-medium focus:outline-none focus:border-accent"
                    required
                  >
                    {stays.map((stay) => (
                      <option key={stay.id} value={stay.name}>
                        {stay.name} ({stay.type})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Package Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-package" className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                    <Compass size={12} className="text-accent" />
                    <span>Experience Package</span>
                  </label>
                  <select
                    id="form-package"
                    value={formPackage}
                    onChange={(e) => setFormPackage(e.target.value)}
                    className="w-full bg-surface border border-border/80 rounded p-2.5 text-xs text-primary font-medium focus:outline-none focus:border-accent"
                  >
                    <option value="Custom / None">Custom / None</option>
                    <option value="24-Hour Reset">24-Hour Reset</option>
                    <option value="48-Hour Hill Escape">48-Hour Hill Escape</option>
                    <option value="Work From the Hills">Work From the Hills</option>
                    <option value="Family Pine Getaway">Family Pine Getaway</option>
                    <option value="Trail Weekend">Trail Weekend</option>
                  </select>
                </div>

                {/* Dates Text input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-dates" className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                    <Calendar size={12} className="text-accent" />
                    <span>Travel Dates</span>
                  </label>
                  <input
                    id="form-dates"
                    type="text"
                    placeholder="e.g. June 15 - June 20"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="w-full bg-surface border border-border/80 rounded p-2.5 text-xs text-primary focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                {/* Guest dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-guests" className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                    <Users size={12} className="text-accent" />
                    <span>Number of Guests</span>
                  </label>
                  <select
                    id="form-guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-surface border border-border/80 rounded p-2.5 text-xs text-primary font-medium focus:outline-none focus:border-accent"
                    required
                  >
                    <option value="1 guest">1 guest</option>
                    <option value="2 guests">2 guests</option>
                    <option value="3 guests">3 guests</option>
                    <option value="4 guests">4 guests</option>
                    <option value="5+ guests">5+ guests (Group)</option>
                  </select>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-name" className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                    <User size={12} className="text-accent" />
                    <span>Your Name</span>
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    placeholder="e.g. Siddharth Mehra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface border border-border/80 rounded p-2.5 text-xs text-primary focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="form-phone" className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                    <Phone size={12} className="text-accent" />
                    <span>Phone / WhatsApp Number</span>
                  </label>
                  <input
                    id="form-phone"
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface border border-border/80 rounded p-2.5 text-xs text-primary focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                {/* Notes/Custom requests */}
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="form-notes" className="text-xs font-bold text-primary uppercase tracking-wide">
                    Custom Requirements or Questions
                  </label>
                  <textarea
                    id="form-notes"
                    rows={3}
                    placeholder="e.g. Driving a hatchback (need route tips), or require coffee station in cabin."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-surface border border-border/80 rounded p-2.5 text-xs text-primary focus:outline-none focus:border-accent resize-none"
                  />
                </div>

              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded bg-primary py-3 px-6 text-xs font-semibold text-surface tracking-wider uppercase hover:bg-accent hover:text-surface transition-all duration-200 shadow-sm mt-3"
              >
                <span>Send {activeDestObj?.name} Stay Enquiry</span>
              </button>

              {/* UPI Reassurance Note */}
              <div className="flex items-start gap-2 mt-2">
                <ShieldCheck size={14} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-text-muted leading-relaxed font-sans">
                  No payment required now. You will receive a secure UPI payment link on WhatsApp only after our coordinator confirms availability and route safety for your dates.
                </p>
              </div>

              {/* Toast Success Message */}
              {isSubmitted && (
                <div className="flex items-center gap-2.5 rounded bg-accent/10 border border-accent/30 p-4 text-xs text-accent font-medium mt-2 animate-pulse">
                  <CheckCircle size={16} />
                  <span>Your request has been formulated! Opening WhatsApp portal for slots verification...</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  )
}
