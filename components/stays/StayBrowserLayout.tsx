'use client'

import React, { useState, useMemo } from 'react'
import { destinations, Stay } from '@/lib/destinations'
import PropertyCard from './PropertyCard'
import PropertyDetailsModal from './PropertyDetailsModal'
import { MapPin, Flame, LayoutGrid, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DEFAULT_WHATSAPP_NUMBER, createWhatsAppLink } from '@/lib/enquiry'

type VibeFilter = 'all' | 'couples' | 'groups' | 'workation'

export default function StayBrowserLayout() {
  const [activeDestId, setActiveDestId] = useState<string>('jibhi')
  const [activeVibe, setActiveVibe] = useState<VibeFilter>('all')
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null)

  const activeDest = destinations.find(d => d.id === activeDestId) || destinations[0]

  const filteredStays = useMemo(() => {
    let stays = activeDest.stays || []
    if (activeVibe !== 'all') {
      stays = stays.filter(stay => {
        const lowerBestFor = stay.bestFor.toLowerCase()
        if (activeVibe === 'couples' && lowerBestFor.includes('couple')) return true
        if (activeVibe === 'groups' && (lowerBestFor.includes('group') || lowerBestFor.includes('family') || lowerBestFor.includes('friends'))) return true
        if (activeVibe === 'workation' && (lowerBestFor.includes('workation') || lowerBestFor.includes('solo'))) return true
        return false
      })
    }
    return stays
  }, [activeDest, activeVibe])

  return (
    <div className="bg-surface min-h-screen pt-24 pb-32">
      <div className="mx-auto max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        
        {/* Header & Dest Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-border/40 pb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3 block">
              THE BROWSER
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-primary font-normal leading-tight">
              Select your <span className="italic text-accent">basecamp.</span>
            </h1>
            <p className="mt-6 text-text-muted text-base font-sans leading-relaxed">
              Explore our verified wooden cabins and ridge rooms. Filter by vibe, view property details, and directly ask for route assistance.
            </p>
          </div>

          <div className="flex bg-base/50 p-1.5 rounded-lg border border-border/80 shadow-sm w-full md:w-auto">
            {destinations.map(d => {
              const isActive = activeDestId === d.id
              return (
                <button
                  key={d.id}
                  onClick={() => {
                    setActiveDestId(d.id)
                    setActiveVibe('all')
                  }}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition-all duration-300 ${
                    isActive 
                      ? 'bg-surface text-primary shadow border border-border/60' 
                      : 'text-text-muted hover:text-primary hover:bg-surface/50'
                  }`}
                >
                  <MapPin size={16} className={isActive ? 'text-accent' : ''} />
                  <span>{d.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <div className="flex items-center gap-2 mr-4 text-xs font-bold uppercase tracking-widest text-primary">
            <LayoutGrid size={14} className="text-accent-slate" />
            <span>Vibe Filter:</span>
          </div>
          
          {[
            { id: 'all', label: 'All Stays' },
            { id: 'couples', label: 'Couples & Duos' },
            { id: 'groups', label: 'Groups & Family' },
            { id: 'workation', label: 'Workation' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveVibe(filter.id as VibeFilter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                activeVibe === filter.id 
                  ? 'bg-primary text-surface shadow' 
                  : 'bg-base border border-border/60 text-text hover:bg-surface hover:border-primary/30'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        <div className="min-h-[400px]">
          {filteredStays.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredStays.map(stay => (
                  <PropertyCard 
                    key={stay.id} 
                    stay={stay} 
                    destinationName={activeDest.name}
                    onSelect={setSelectedStay}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="bg-base border border-border/60 rounded-xl p-16 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
              <Flame size={32} className="text-accent/40 mb-4" />
              <h3 className="font-serif text-2xl text-primary font-normal mb-2">No matching stays</h3>
              <p className="text-text-muted text-sm max-w-sm">
                We don't currently have a property matching this exact vibe in {activeDest.name}. Try switching the destination or clearing filters.
              </p>
              <button 
                onClick={() => setActiveVibe('all')}
                className="mt-6 text-xs font-bold uppercase tracking-widest text-accent border-b border-accent pb-0.5 hover:text-accent/80"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Quick Enquiry Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary/95 backdrop-blur-md border-t border-border/20 text-surface p-4 z-40 transform translate-y-0 transition-transform duration-300">
        <div className="mx-auto max-w-[1320px] px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-serif text-xl block sm:inline">Can't decide? </span>
            <span className="text-surface/80 text-sm font-sans block sm:inline sm:ml-2">
              Let our coordinator suggest the best cabin based on your dates.
            </span>
          </div>
          <button 
            onClick={() => window.open(createWhatsAppLink(DEFAULT_WHATSAPP_NUMBER, 'Hi Off the Trail, I need help picking a stay. I am looking for...'), '_blank')}
            className="flex items-center gap-2 bg-[#25D366] text-surface px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#20ba59] transition-colors whitespace-nowrap mx-auto sm:mx-0"
          >
            <MessageSquare size={16} />
            <span>Ask on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedStay && (
        <PropertyDetailsModal 
          stay={selectedStay} 
          destinationName={activeDest.name}
          onClose={() => setSelectedStay(null)}
        />
      )}
    </div>
  )
}
