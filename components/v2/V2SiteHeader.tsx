'use client'

import React from 'react'
import { useDestination } from '@/lib/DestinationContext'
import { destinations } from '@/lib/destinations'
import { MapPin, MessageSquare } from 'lucide-react'

export default function V2SiteHeader() {
  const { selectedDestination } = useDestination()
  const activeDest = destinations.find(d => d.id === selectedDestination)

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-surface/80 backdrop-blur-md paper-grain">
      <div className="mx-auto flex max-w-[1320px] h-16 items-center justify-between px-[clamp(24px,5vw,72px)]">
        {/* Brand Logotype */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer group flex flex-col"
        >
          <span className="font-serif text-xl tracking-tight text-primary leading-none">
            Off the Trail
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-sans mt-0.5 group-hover:text-accent transition-colors">
            Basecamps & Stays
          </span>
        </div>

        {/* Navigation & Destination Indicator */}
        <div className="flex items-center gap-6">
          {/* Active Destination Indicator Badge */}
          {activeDest && (
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-border/80 bg-base/40 px-3 py-1 text-xs font-sans text-text transition-all duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-text-muted">Exploring:</span>
              <span className="font-semibold text-primary">{activeDest.name}</span>
            </div>
          )}

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-text-muted">
            <button 
              onClick={() => handleScrollTo('stays')} 
              className="hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-primary after:transition-all"
            >
              Stays
            </button>
            <button 
              onClick={() => handleScrollTo('plans')} 
              className="hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-primary after:transition-all"
            >
              Plans
            </button>
            <button 
              onClick={() => handleScrollTo('timeline')} 
              className="hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-primary after:transition-all"
            >
              How it Works
            </button>
            <button 
              onClick={() => handleScrollTo('route')} 
              className="hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-primary after:transition-all"
            >
              Field Guide
            </button>
          </nav>

          {/* Call to Action Button */}
          <button
            onClick={() => handleScrollTo('enquiry')}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold tracking-wide text-surface hover:bg-primary/95 transition-all shadow-sm hover:shadow active:scale-95 duration-150"
          >
            <MessageSquare size={14} />
            <span>Plan Booking</span>
          </button>
        </div>
      </div>
    </header>
  )
}
