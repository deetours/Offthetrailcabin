'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDestination } from '@/lib/DestinationContext'
import { destinations } from '@/lib/destinations'
import { Clock, Users, ArrowRight, CheckCircle2, Shield } from 'lucide-react'
import { trackConversion } from '@/lib/analytics'

type PackageCategory = 'couple' | 'friends' | 'workation' | 'adventure'

interface TripPackage {
  id: string
  number: string
  title: string
  duration: string
  category: PackageCategory
  idealFor: string
  price: string
  shortLine: string
  description: string
  image: string
  inclusions: string[]
  comfortNotes: string[]
  destination: 'jibhi' | 'dalhousie' | 'both'
}

const packages: TripPackage[] = [
  {
    id: 'reset',
    number: '01',
    title: '24-Hour Reset',
    duration: '1 day',
    category: 'couple',
    idealFor: 'Quick getaway',
    price: '₹4,500',
    shortLine: 'A quick mountain pause with food, rest, and a short guided walk.',
    description: 'A quick mountain pause. Includes cabin stay, cafe breakfast, and a short guided meadow walk.',
    image: '/images/reset.png',
    inclusions: ['Warm Stay Included', 'Cafe Breakfast', 'Short Meadow Walk', 'Coordinator Help'],
    comfortNotes: ['Insulated Bed', 'Honesty Cafe Access', '24/7 Route Assistance'],
    destination: 'both',
  },
  {
    id: 'escape',
    number: '02',
    title: '48-Hour Hill Escape',
    duration: '2 days',
    category: 'couple',
    idealFor: 'Relaxed immersion',
    price: '₹8,500',
    shortLine: 'The complete basecamp experience with firelit dinner, forest trail, and deep cabin rest.',
    description: 'The complete basecamp experience. Firelight dinner, forest trails, and deep cabin rest.',
    image: '/images/escape.png',
    inclusions: ['Premium Cabin Stay', 'Fireside Cafe Dinner', 'Guided Forest Hike', 'All Meals Included'],
    comfortNotes: ['Plush Carpeting', 'Hot Water Boiler', 'Local Travel Coordinator'],
    destination: 'both',
  },
  {
    id: 'workation',
    number: '03',
    title: 'Work From the Hills',
    duration: '5 days',
    category: 'workation',
    idealFor: 'Remote workers',
    price: '₹15,000',
    shortLine: 'Reliable Wi-Fi, quiet cabin workspace, mountain coffee, and slower working days.',
    description: 'Reliable Wi-Fi, quiet cabin workspace, and unlimited mountain coffee. Your office, upgraded.',
    image: '/images/workation.png',
    inclusions: ['5-Night Cabin Stay', 'Dedicated Work desk', 'Unlimited Cafe Coffee', 'High-Speed Backup Router'],
    comfortNotes: ['Ultra-Quiet Cabin', 'Ergonomic Seating', 'Zero-Lag Zoom Support'],
    destination: 'jibhi',
  },
  {
    id: 'family-getaway',
    number: '04',
    title: 'Family Pine Getaway',
    duration: '3 days',
    category: 'friends',
    idealFor: 'Families & groups',
    price: '₹14,500',
    shortLine: 'Slow-paced exploration, family meals, and guided walks through historic pine ridges.',
    description: 'Perfect for families. Includes premium double room stay, group breakfast, route guides, and a slow-paced nature walk.',
    image: '/images/hero.png',
    inclusions: ['Premium Double Rooms', 'Chef Group Breakfast', 'Slow Pine Nature Walk', 'Private Vehicle Booking Help'],
    comfortNotes: ['Triple Insulated Beds', 'Kids Activity Field', 'In-room Fire Heaters'],
    destination: 'dalhousie',
  },
  {
    id: 'trail-weekend',
    number: '05',
    title: 'Trail Weekend',
    duration: '2 days',
    category: 'adventure',
    idealFor: 'Active explorers',
    price: '₹9,800',
    shortLine: 'Adventure-first days with local experts and a warm meal waiting at basecamp.',
    description: 'Adventure-first. High-altitude trekking with local experts. Return to a warm meal and bed.',
    image: '/images/trail_weekend.png',
    inclusions: ['Local Trail Guide', 'Basecamp Log Cabin Stay', 'Safety Briefing & Med Kit', 'High Calorie Pack Meals'],
    comfortNotes: ['Warm Thermals Provided', 'Hot Water Shower', 'GPS Trackers Included'],
    destination: 'both',
  }
]

const moodFilters = [
  { key: 'all', label: 'All Packages' },
  { key: 'couple', label: 'Couples' },
  { key: 'friends', label: 'Groups & Family' },
  { key: 'workation', label: 'Workation' },
  { key: 'adventure', label: 'Adventure' },
] as const

type MoodKey = (typeof moodFilters)[number]['key']

export default function V2ChooseYourPlan() {
  const { selectedDestination, setSelectedStay, setSelectedPackage } = useDestination()
  const [activeMood, setActiveMood] = useState<MoodKey>('all')
  const [selectedPackageId, setSelectedPackageId] = useState<string>('escape')

  // Filter packages on destination and active mood - FIXED filter bug!
  const filteredPackages = useMemo(() => {
    // 1. Filter by destination first
    const destPackages = packages.filter(
      (pkg) => pkg.destination === 'both' || pkg.destination === selectedDestination
    )

    // 2. Filter by mood category (strictly matches selected mood)
    if (activeMood === 'all') return destPackages
    return destPackages.filter((pkg) => pkg.category === activeMood)
  }, [activeMood, selectedDestination])

  // If active package is no longer in filtered list, select the first visible package
  useEffect(() => {
    if (filteredPackages.length === 0) return
    const isSelectedVisible = filteredPackages.some((pkg) => pkg.id === selectedPackageId)
    if (!isSelectedVisible) {
      setSelectedPackageId(filteredPackages[0].id)
    }
  }, [filteredPackages, selectedPackageId])

  // Hide the workation filter if Dalhousie is selected (no workation packages)
  const visibleFilters = useMemo(() => {
    if (selectedDestination === 'dalhousie') {
      return moodFilters.filter((filter) => filter.key !== 'workation')
    }
    return moodFilters
  }, [selectedDestination])

  // Reset mood filter to 'all' if selected filter becomes hidden (e.g. switching Jibhi -> Dalhousie while on Workation tab)
  useEffect(() => {
    if (selectedDestination === 'dalhousie' && activeMood === 'workation') {
      setActiveMood('all')
    }
  }, [selectedDestination, activeMood])

  const currentPackage = useMemo(() => {
    return filteredPackages.find((p) => p.id === selectedPackageId) || filteredPackages[0] || packages[0]
  }, [filteredPackages, selectedPackageId])

  const handleSelectPackage = (pkg: TripPackage) => {
    trackConversion(`select_package_${pkg.id}`, 'package_preview')
    setSelectedPackage(pkg.title)
    // Auto-prefill stays or details in form based on package
    if (pkg.id === 'workation') {
      setSelectedStay('The Cedar Room')
    } else if (selectedDestination === 'dalhousie') {
      setSelectedStay('The Pine Room')
    } else {
      setSelectedStay('The Forest Cabin')
    }
    
    const enquirySec = document.getElementById('enquiry')
    if (enquirySec) {
      enquirySec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="plans" className="bg-base py-20 border-b border-border/50 paper-grain scroll-mt-16">
      <div className="mx-auto max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        
        {/* Title */}
        <div className="mb-12 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2.5 block">
            Plan your Experience
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary font-normal">
            {destinations.find(d => d.id === selectedDestination)?.name} Packages for <span className="italic text-accent">trail & cabin.</span>
          </h2>
          <p className="mt-4 text-text-muted text-sm md:text-base leading-relaxed">
            Move from browsing to booking. Select standard itineraries that take the guesswork out of route preparation, food, and guides.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-border/30">
          {visibleFilters.map((filter) => {
            const isActive = activeMood === filter.key
            return (
              <button
                key={filter.key}
                onClick={() => setActiveMood(filter.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-surface shadow' 
                    : 'bg-surface/50 border border-border/60 text-text hover:bg-surface hover:border-primary/30'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        {/* Dynamic Detail Viewer (Side-by-side or stacked on mobile) */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Package List Grid (Left) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {filteredPackages.map((pkg) => {
                const isSelected = pkg.id === selectedPackageId
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`w-full text-left p-5 rounded-lg border transition-all duration-300 ${
                      isSelected 
                        ? 'border-accent bg-surface ring-1 ring-accent shadow-sm' 
                        : 'border-border/60 bg-surface/40 hover:bg-surface/90'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] text-accent uppercase font-bold tracking-widest block mb-1">
                          Package {pkg.number}
                        </span>
                        <h4 className="font-serif text-xl text-primary font-normal mb-1">
                          {pkg.title}
                        </h4>
                        <p className="text-xs text-text-muted font-sans line-clamp-2">
                          {pkg.shortLine}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs text-primary font-bold uppercase tracking-wider block bg-base px-2 py-0.5 rounded border border-border/50">
                          {pkg.duration}
                        </span>
                        <span className="text-sm font-semibold text-accent block mt-1.5">
                          {pkg.price}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Selected Package Details Panel (Right) */}
            <div className="lg:col-span-7 bg-surface border border-border/80 rounded-lg p-6 md:p-8 shadow-sm paper-grain">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPackage.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/40 pb-5 mb-6 gap-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 border border-border/50">
                        <img src={currentPackage.image} alt={currentPackage.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-xs text-accent uppercase font-bold tracking-widest block mb-1">
                          Comfort Package · {currentPackage.duration}
                        </span>
                        <h3 className="font-serif text-3xl text-primary font-normal">
                          {currentPackage.title}
                        </h3>
                      </div>
                    </div>
                    <div className="bg-base/70 border border-border/60 px-4 py-2 rounded-md text-center">
                      <span className="text-[10px] text-text-muted uppercase tracking-wider block">Estimated Price</span>
                      <span className="text-lg font-bold text-accent font-sans">{currentPackage.price}</span>
                    </div>
                  </div>

                  <p className="text-text/90 text-sm leading-relaxed mb-6 font-sans">
                    {currentPackage.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Inclusions */}
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-primary mb-3">
                        What's Included
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {currentPackage.inclusions.map((inc, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-text font-sans">
                            <CheckCircle2 size={14} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Comfort notes */}
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-bold text-primary mb-3">
                        Basecamp Safeguards
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {currentPackage.comfortNotes.map((note, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-text-muted font-sans">
                            <Shield size={14} className="text-accent-slate mt-0.5 flex-shrink-0" />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectPackage(currentPackage)}
                    className="w-full flex items-center justify-center gap-2 rounded bg-primary py-3 px-6 text-xs font-semibold text-surface tracking-wider uppercase hover:bg-accent transition-all duration-200 shadow-sm mt-auto"
                  >
                    <span>Plan {currentPackage.title}</span>
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        ) : (
          <div className="bg-surface rounded-lg p-12 text-center border border-border/60">
            <p className="text-text-muted text-sm font-medium">No packages found matching this filter.</p>
          </div>
        )}

      </div>
    </section>
  )
}
