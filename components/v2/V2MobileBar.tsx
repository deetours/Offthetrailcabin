'use client'

import React, { useState, useEffect } from 'react'
import { useDestination } from '@/lib/DestinationContext'
import { destinations } from '@/lib/destinations'
import { MessageSquare, ArrowRight } from 'lucide-react'

export default function V2MobileBar() {
  const { selectedDestination } = useDestination()
  const activeDest = destinations.find(d => d.id === selectedDestination)
  
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [pillText, setPillText] = useState<string>('Enquire Stay')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const staysEl = document.getElementById('stays')
      const plansEl = document.getElementById('plans')
      const enquiryEl = document.getElementById('enquiry')

      // Hides pill on very top (hero)
      if (scrollY < 300) {
        setIsVisible(false)
        return
      }

      setIsVisible(true)

      // Dynamic text updates based on scroll boundaries
      if (enquiryEl && scrollY > enquiryEl.offsetTop - 500) {
        // Hides completely when close to the actual enquiry form to avoid overlapping the form buttons
        setIsVisible(false)
      } else if (plansEl && scrollY > plansEl.offsetTop - 300) {
        setPillText(`Select Travel Plan`)
      } else if (staysEl && scrollY > staysEl.offsetTop - 300) {
        setPillText(`Choose a Stay`)
      } else {
        setPillText(`Enquire ${activeDest?.name || 'Stay'}`)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [selectedDestination, activeDest])

  const handleAction = () => {
    const enquirySec = document.getElementById('enquiry')
    if (enquirySec) {
      enquirySec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto px-4 md:hidden">
      <button
        onClick={handleAction}
        className="flex items-center gap-2 rounded-full bg-primary hover:bg-accent border border-border/20 text-surface text-xs font-bold tracking-wider uppercase px-6 py-3.5 shadow-2xl active:scale-95 transition-all duration-200 whitespace-nowrap"
      >
        <MessageSquare size={14} fill="currentColor" className="text-accent animate-pulse" />
        <span>{pillText}</span>
        <ArrowRight size={12} className="ml-1" />
      </button>
    </div>
  )
}
