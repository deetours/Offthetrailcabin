'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const warmthIndex = [
  { label: 'Heating', value: 'Room heater + evening bonfire' },
  { label: 'Blankets', value: 'Double-layer wool and quilt sets' },
  { label: 'Food Window', value: 'Warm dinner service up to 9:00 PM' },
  { label: 'Hot Water', value: 'Solar primary + electric backup' },
  { label: 'Wi-Fi Honesty', value: 'Stable near cafe, patchy in upper rooms' },
  { label: 'Quiet Policy', value: 'Low-noise hours after 10:00 PM' },
]

const routeStats = [
  { label: 'Road Condition', value: 'Metalled road, final stretch is narrow' },
  { label: 'Parking', value: 'On-site parking with host assistance' },
  { label: 'Best Arrival', value: 'Before 5:00 PM for easy approach' },
  { label: 'Last Strong Signal', value: 'Near Chamba town center' },
]

export default function KnowBeforeYouCome() {
  const [activeTab, setActiveTab] = useState<'route' | 'warmth'>('route')

  return (
    <section className="paper-grain relative w-full overflow-hidden bg-base py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-start gap-20 lg:grid-cols-2">
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Orientation</p>
              <h2 className="text-4xl font-serif leading-tight text-primary md:text-6xl">
                Know before <br /> you come.
              </h2>
              <p className="max-w-xl text-lg font-light leading-relaxed text-text-muted">
                We believe in honesty over hype. Mountain travel has real constraints, and we help you plan around them.
              </p>
            </div>

            <div className="flex gap-4 border-b border-border pb-4">
              <button
                onClick={() => setActiveTab('route')}
                className={`text-sm font-medium uppercase tracking-widest transition-colors ${activeTab === 'route' ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
              >
                The Route
              </button>
              <button
                onClick={() => setActiveTab('warmth')}
                className={`text-sm font-medium uppercase tracking-widest transition-colors ${activeTab === 'warmth' ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
              >
                The Warmth
              </button>
            </div>

            <div className="min-h-[400px]">
              {activeTab === 'route' ? (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {routeStats.map((stat) => (
                      <div key={stat.label} className="rounded-sm border border-border bg-surface p-6">
                        <p className="mb-2 text-[10px] uppercase tracking-widest text-text-muted">{stat.label}</p>
                        <p className="text-lg font-medium text-primary">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-6 rounded-sm bg-primary p-8 text-surface">
                    <h4 className="text-xl font-serif">Route Reality Card</h4>
                    <p className="text-sm font-light leading-relaxed text-surface/70">
                      After booking, we share a Google Maps pin, final-turn video, and a same-day road check update on WhatsApp.
                    </p>
                    <a
                      href="https://maps.google.com/?q=32.5534,76.1258"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block border-b border-accent pb-1 text-xs font-semibold uppercase tracking-widest transition-colors hover:text-accent"
                    >
                      Open Basecamp Pin
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="grid gap-6 sm:grid-cols-2">
                  {warmthIndex.map((item) => (
                    <div key={item.label} className="flex gap-4 rounded-sm border border-border bg-surface p-6">
                      <div className="mt-1 h-2 w-2 rounded-full bg-accent" />
                      <div>
                        <p className="mb-1 text-[10px] uppercase tracking-widest text-text-muted">{item.label}</p>
                        <p className="text-sm font-medium text-primary">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          <div className="rounded-sm border border-border bg-surface p-8">
            <h3 className="text-2xl font-serif text-primary">Basecamp Map Notes</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Coordinates: 32.5534° N, 76.1258° E. Last fuel stop and ATM are in Chamba town. Keep 45-60 minutes buffer after sunset.
            </p>
            <div className="mt-6 space-y-3 text-sm text-primary">
              <p>Nearest bus stand: Chamba (approx 12 km)</p>
              <p>Nearest railway station: Pathankot (approx 120 km)</p>
              <p>Nearest airport: Gaggal, Kangra (approx 130 km)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
