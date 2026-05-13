'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Clock3, Coffee, Footprints, Home, Map } from 'lucide-react'
import { trackConversion } from '@/lib/analytics'

type PackageCategory = 'couple' | 'friends' | 'workation' | 'adventure'

type TripPackage = {
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
  imageAlt: string
  inclusions: string[]
  itinerary: { label: string; items: string[] }[]
  comfortNotes: string[]
}

const moodFilters = [
  { key: 'all', label: 'All' },
  { key: 'couple', label: 'Couple' },
  { key: 'friends', label: 'Friends' },
  { key: 'workation', label: 'Workation' },
  { key: 'adventure', label: 'Adventure' },
] as const

type MoodKey = (typeof moodFilters)[number]['key']

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
    imageAlt: 'Short basecamp reset experience in Chamba',
    inclusions: ['Cabin stay', 'Cafe breakfast', 'Short walk', 'Route help'],
    itinerary: [
      {
        label: 'Day 1',
        items: ['Arrive by afternoon', 'Cafe meal', 'Short meadow walk', 'Cabin rest'],
      },
    ],
    comfortNotes: ['Warm bed', 'Cafe access', 'Route help'],
  },
  {
    id: 'escape',
    number: '02',
    title: '48-Hour Chamba Escape',
    duration: '2 days',
    category: 'couple',
    idealFor: 'Relaxed immersion',
    price: '₹8,500',
    shortLine: 'The complete basecamp experience with firelit dinner, forest trail, and deep cabin rest.',
    description: 'The complete basecamp experience. Firelight dinner, forest trails, and deep cabin rest.',
    image: '/images/escape.png',
    imageAlt: 'Two-day Chamba basecamp package',
    inclusions: ['Cabin stay', 'Breakfast', 'Guided trail', 'Dinner'],
    itinerary: [
      {
        label: 'Day 1',
        items: ['Arrive and settle into the cabin', 'Cafe dinner', 'Firelit evening'],
      },
      {
        label: 'Day 2',
        items: ['Breakfast', 'Guided local trail', 'Slow return'],
      },
    ],
    comfortNotes: ['Warm bed', 'Food included', 'Local guide', 'WhatsApp planning'],
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
    imageAlt: 'Workation package in mountain cabins',
    inclusions: ['Cabin stay', 'Work desk', 'Cafe access', 'Wi-Fi honesty'],
    itinerary: [
      {
        label: 'Work days',
        items: ['Morning coffee', 'Focus hours', 'Evening walk'],
      },
    ],
    comfortNotes: ['Quiet cabin', 'Cafe nearby', 'Wi-Fi clarity', 'Long stay support'],
  },
  {
    id: 'trail-weekend',
    number: '04',
    title: 'Trail Weekend',
    duration: '2 days',
    category: 'adventure',
    idealFor: 'Active explorers',
    price: '₹9,800',
    shortLine: 'Adventure-first days with local experts and a warm meal waiting at basecamp.',
    description: 'Adventure-first. High-altitude trekking with local experts. Return to a warm meal and bed.',
    image: '/images/trail_weekend.png',
    imageAlt: 'Guided trail weekend in Chamba hills',
    inclusions: ['Guided trail', 'Cabin stay', 'Meals', 'Safety briefing'],
    itinerary: [
      {
        label: 'Day 1',
        items: ['Arrive at basecamp', 'Briefing and warm meal'],
      },
      {
        label: 'Day 2',
        items: ['Guided trail day', 'Return to cabin'],
      },
    ],
    comfortNotes: ['Local guide', 'Meals', 'Route help', 'Warm bed'],
  },
]

function dynamicCtaLabel(pkg: TripPackage) {
  if (pkg.id === 'workation') return 'Plan my workation'
  if (pkg.id === 'trail-weekend') return 'Plan this trail weekend'
  return 'Plan this escape'
}

export default function ChooseYourTrip() {
  const [activeMood, setActiveMood] = useState<MoodKey>('all')
  const [selectedPackageId, setSelectedPackageId] = useState<string>('escape')

  const filteredPackages = useMemo(() => {
    if (activeMood === 'all') return packages
    return packages.filter((pkg) => pkg.category === activeMood || (activeMood === 'friends' && pkg.id !== 'workation'))
  }, [activeMood])

  useEffect(() => {
    if (filteredPackages.length === 0) return
    const selectedStillVisible = filteredPackages.some((pkg) => pkg.id === selectedPackageId)
    if (!selectedStillVisible) {
      setSelectedPackageId(filteredPackages[0].id)
    }
  }, [filteredPackages, selectedPackageId])

  const selectedPackage =
    filteredPackages.find((pkg) => pkg.id === selectedPackageId) ?? filteredPackages[0] ?? packages[1]

  return (
    <section className="relative overflow-hidden bg-[#F4EFE4] pb-[160px] pt-[140px]">
      <div className="mx-auto w-full max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        <div className="mb-16 grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#C9782D]">CHOOSE YOUR TRIP</p>
            <h2 className="max-w-[720px] font-serif text-[clamp(48px,5vw,76px)] leading-[0.95] tracking-[-0.045em] text-[#17251F]">
              Move from browsing to decision.
            </h2>
            <p className="mt-6 max-w-[720px] text-[17px] leading-[1.6] text-[#6D716B]">
              Selected experiences that combine the best of the table, the cabin, and the trail.
            </p>
          </motion.div>

          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:mx-0 lg:overflow-visible lg:px-0" role="tablist" aria-label="Choose by mood">
            {moodFilters.map((filter) => {
              const isActive = activeMood === filter.key
              return (
                <button
                  key={filter.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveMood(filter.key)
                    trackConversion('package_filter', { mood: filter.key })
                  }}
                  className="relative h-11 shrink-0 overflow-hidden rounded-full border border-[rgba(23,37,31,0.12)] px-[22px] text-[14px] font-semibold"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTripMood"
                      className="absolute inset-0 bg-[#17251F]"
                      transition={{ type: 'spring', stiffness: 350, damping: 34 }}
                    />
                  )}
                  <span className={`relative ${isActive ? 'text-[#FFFCF6]' : 'text-[#4F5852]'}`}>{filter.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]">
          <motion.div
            layout
            className="relative isolate min-h-[520px] overflow-hidden rounded-[30px] border border-[rgba(23,37,31,0.10)] bg-[#17251F] md:min-h-[640px] md:rounded-[36px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPackage.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ scale: 1.025 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={selectedPackage.image} alt={selectedPackage.imageAlt} fill className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.18)_45%,rgba(0,0,0,0.78)_100%)]" />

                <div className="absolute bottom-8 left-8 right-8 z-20 md:bottom-10 md:left-10 md:right-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[rgba(255,252,246,0.70)]">SELECTED BASECAMP PLAN</p>
                  <span className="mt-4 inline-flex h-[30px] items-center rounded-full border border-[rgba(255,252,246,0.20)] bg-[rgba(255,252,246,0.14)] px-3 text-[12px] font-semibold text-[#FFFCF6]">
                    {selectedPackage.duration}
                  </span>

                  <motion.h3
                    key={`${selectedPackage.id}-title`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mt-4 font-serif text-[clamp(40px,4.8vw,82px)] leading-[0.92] tracking-[-0.05em] text-[#FFFCF6]"
                  >
                    {selectedPackage.title}
                  </motion.h3>

                  <motion.p
                    key={`${selectedPackage.id}-line`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className="mt-[18px] max-w-[620px] text-[18px] leading-[1.55] text-[rgba(255,252,246,0.84)]"
                  >
                    {selectedPackage.shortLine}
                  </motion.p>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {selectedPackage.inclusions.map((item) => (
                      <span
                        key={`${selectedPackage.id}-${item}`}
                        className="inline-flex h-[34px] items-center rounded-full bg-[rgba(255,252,246,0.12)] px-3 text-[13px] text-[rgba(255,252,246,0.84)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.14em] text-[rgba(255,252,246,0.60)]">Starting at</p>
                      <p className="font-serif text-[34px] leading-none text-[#FFFCF6]">{selectedPackage.price}</p>
                    </div>

                    <a
                      href="#enquiry"
                      onClick={() => trackConversion('cta_click', { source: 'trip-planner-featured', package: selectedPackage.id, target: '#enquiry' })}
                      className="group inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-[14px] bg-[#FFFCF6] px-6 text-[15px] font-bold text-[#17251F] md:w-auto"
                    >
                      <span>{dynamicCtaLabel(selectedPackage)}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div>
            <div className="rounded-[28px] border border-[rgba(23,37,31,0.10)] bg-[#FFFCF6] p-[18px]">
              <h3 className="mb-4 font-serif text-[28px] tracking-[-0.03em] text-[#17251F]">Choose a basecamp plan</h3>
              <div className="space-y-2">
                {filteredPackages.map((pkg) => {
                  const isActive = selectedPackage.id === pkg.id
                  return (
                    <motion.button
                      key={pkg.id}
                      type="button"
                      aria-pressed={isActive}
                      whileHover={isActive ? undefined : { y: -2 }}
                      onClick={() => {
                        setSelectedPackageId(pkg.id)
                        trackConversion('package_select', { package: pkg.id })
                      }}
                      className={`relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[20px] px-4 py-4 text-left transition-colors ${
                        isActive
                          ? 'border border-[#17251F] bg-[#17251F] text-[#FFFCF6]'
                          : 'border border-[rgba(23,37,31,0.08)] bg-transparent text-[#17251F] hover:bg-[rgba(23,37,31,0.04)]'
                      }`}
                    >
                      {isActive && <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-[#C9782D]" aria-hidden="true" />}
                      <p className="text-[12px] font-bold tracking-[0.14em]">{pkg.number}</p>
                      <div>
                        <p className="font-serif text-[24px] leading-none tracking-[-0.035em]">{pkg.title}</p>
                        <p className={`mt-1 text-[13px] ${isActive ? 'text-[rgba(255,252,246,0.70)]' : 'text-[#6D716B]'}`}>
                          {pkg.duration} · {pkg.idealFor}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[15px] font-bold">{pkg.price}</p>
                        <ArrowRight className={`ml-auto mt-1 h-3.5 w-3.5 ${isActive ? 'opacity-100' : 'opacity-40'}`} />
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 rounded-[28px] border border-[rgba(23,37,31,0.10)] bg-[#FFFCF6] p-7">
              <h3 className="font-serif text-[28px] text-[#17251F]">Your plan includes</h3>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`itinerary-${selectedPackage.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 space-y-4"
                >
                  {selectedPackage.itinerary.map((day, dayIndex) => (
                    <motion.div
                      key={`${selectedPackage.id}-${day.label}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: dayIndex * 0.06, duration: 0.25 }}
                      className="rounded-2xl border border-[rgba(23,37,31,0.08)] p-4"
                    >
                      <p className="mb-2 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6D716B]">
                        <Clock3 className="h-3.5 w-3.5" />
                        {day.label}
                      </p>
                      <ul className="space-y-1.5 text-[14px] text-[#17251F]">
                        {day.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#C9782D]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-5 flex flex-wrap gap-2">
                {selectedPackage.comfortNotes.map((note, i) => {
                  const icons = [Home, Coffee, Footprints, Map]
                  const Icon = icons[i % icons.length]
                  return (
                    <span
                      key={`${selectedPackage.id}-${note}`}
                      className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[rgba(23,37,31,0.10)] bg-[#F4EFE4] px-3 text-[12px] text-[#4F5852]"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {note}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
