'use client'

import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Stay } from '@/lib/destinations'
import { X, CheckCircle2, Shield } from 'lucide-react'
import { createWhatsAppLink, DEFAULT_WHATSAPP_NUMBER } from '@/lib/enquiry'

interface PropertyDetailsModalProps {
  stay: Stay | null
  destinationName: string
  onClose: () => void
}

export default function PropertyDetailsModal({ stay, destinationName, onClose }: PropertyDetailsModalProps) {
  if (!stay) return null

  const handleEnquire = () => {
    const message = `Hi Off the Trail, I want to plan a stay.\n\nDestination: ${destinationName}\nStay/Property: ${stay.name}\nDates:\nGuests:\nInterest:\nPackage:\nName:\nPhone:\nNotes:\n\nPlease confirm availability, price, route details, and payment steps.`
    const link = createWhatsAppLink(DEFAULT_WHATSAPP_NUMBER, message)
    window.open(link, '_blank')
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative w-full max-w-4xl bg-surface rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] z-10"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-surface/50 backdrop-blur-md hover:bg-surface border border-border/50 text-text p-2 rounded-full transition-all"
          >
            <X size={18} />
          </button>

          {/* Left: Image */}
          <div className="md:w-1/2 relative h-64 md:h-auto bg-base">
            <Image
              src={stay.image}
              alt={stay.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Details */}
          <div className="md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
            <span className="text-xs text-accent uppercase font-bold tracking-[0.2em] block mb-2">
              {destinationName} · {stay.type}
            </span>
            <h2 className="font-serif text-4xl text-primary font-normal mb-2">{stay.name}</h2>
            <p className="text-sm text-text-muted font-sans mb-6">
              Ideal for {stay.bestFor.toLowerCase()}. Comfortably sleeps up to {stay.sleeps} guests.
            </p>

            <div className="bg-base border border-border/60 rounded-lg p-5 mb-8">
              <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold block mb-1">Starting Price</span>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-serif text-primary">₹{stay.fromPrice}</span>
                <span className="text-xs text-text-muted mb-1.5">/ night</span>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest font-bold text-primary mb-4">
                Cabin Amenities
              </h4>
              <ul className="flex flex-col gap-3">
                {stay.amenities.map((amenity, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-text font-sans">
                    <CheckCircle2 size={16} className="text-accent flex-shrink-0" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-6 border-t border-border/40">
              <button 
                onClick={handleEnquire}
                className="w-full flex items-center justify-center gap-2 rounded bg-primary py-4 px-6 text-sm font-semibold text-surface tracking-wider uppercase hover:bg-accent transition-all duration-300 shadow-md"
              >
                <span>{stay.cta}</span>
              </button>
              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-text-muted">
                <Shield size={12} className="text-accent-slate" />
                <span>Secure UPI payment only after WhatsApp confirmation</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
