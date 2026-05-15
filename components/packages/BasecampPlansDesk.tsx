'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'

type Plan = {
  id: string
  number: string
  title: string
  duration: string
  bestFor: string
  price: string
  image: string
  shortLine: string
  includes: string[]
  itinerary: string[]
}

const WHATSAPP_NUMBER = '919999999999' // TODO: Replace with real Off the Trail WhatsApp number.

const plans: Plan[] = [
  {
    id: 'reset',
    number: '01',
    title: '24-Hour Reset',
    duration: '1 day',
    bestFor: 'Quick getaway',
    price: 'Rs 4,500 for 2 guests',
    image: '/images/reset.png',
    shortLine: 'A quick mountain pause with food, rest, and a short guided walk.',
    includes: ['1 night cabin stay', 'Breakfast at the cafe', 'Short guided walk', 'Route help'],
    itinerary: ['Arrive by afternoon', 'Cafe meal', 'Short meadow walk', 'Cabin rest'],
  },
  {
    id: 'escape',
    number: '02',
    title: '48-Hour Chamba Escape',
    duration: '2 days',
    bestFor: 'Relaxed immersion',
    price: 'Rs 8,500 for 2 guests',
    image: '/images/escape.png',
    shortLine: 'The complete basecamp experience with firelit dinner, forest trail, and deep cabin rest.',
    includes: ['2 nights quiet cabin stay', 'Breakfast', '1 dinner', 'Local forest trail', 'Route help', 'Optional bonfire tea setup'],
    itinerary: ['Arrive and settle into the cabin', 'Cafe dinner and firelit evening', 'Breakfast + guided local trail', 'Slow return'],
  },
  {
    id: 'trail-weekend',
    number: '03',
    title: 'Trail Weekend',
    duration: '2 days',
    bestFor: 'Active explorers',
    price: 'Rs 9,800 for 2 guests',
    image: '/images/trail_weekend.png',
    shortLine: 'Adventure-first days with local experts and a warm meal waiting at basecamp.',
    includes: ['2 nights stay', 'Early start support', 'Packed meal or breakfast', 'Guided trail route', 'Route briefing', 'Warm dinner'],
    itinerary: ['Arrive at basecamp', 'Briefing and warm meal', 'Guided trail day', 'Return to cabin'],
  },
]

export default function BasecampPlansDesk() {
  const [selectedPlanId, setSelectedPlanId] = useState('escape')
  const [dates, setDates] = useState('')
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  const selectedPlan = useMemo(() => plans.find((p) => p.id === selectedPlanId) ?? plans[1], [selectedPlanId])

  const whatsappHref = useMemo(() => {
    const text = [
      'Hi Off the Trail, I want to enquire about a package.',
      '',
      `Package: ${selectedPlan.title}`,
      `Dates: ${dates || 'Not shared yet'}`,
      `Guests: ${guests}`,
      `Name: ${name || 'Not shared yet'}`,
      `Phone: ${phone || 'Not shared yet'}`,
      `Notes: ${notes || 'None'}`,
      '',
      'Please confirm availability, price, food options, and trail suitability.',
    ].join('\n')
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  }, [selectedPlan, dates, guests, name, phone, notes])

  return (
    <section id="plans" className="bg-[#FFFCF6] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6D716B]">Featured basecamp planner</p>
        <h2 className="mt-3 text-4xl font-serif text-[#17251F] md:text-5xl">Pick a format, then confirm on WhatsApp</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <article className="relative overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.12)] min-h-[460px]">
            <Image src={selectedPlan.image} alt={selectedPlan.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,30,25,0.82),rgba(15,30,25,0.2))]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-[#FFFCF6]">
              <p className="text-xs uppercase tracking-[0.12em]">Most chosen format</p>
              <h3 className="mt-2 text-4xl font-serif">{selectedPlan.title}</h3>
              <p className="mt-2 text-sm">{selectedPlan.duration} · {selectedPlan.bestFor}</p>
              <p className="mt-3 text-sm max-w-xl">{selectedPlan.shortLine}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedPlan.includes.map((item) => (
                  <span key={item} className="rounded-full border border-[rgba(255,252,246,0.4)] px-3 py-1 text-xs">{item}</span>
                ))}
              </div>
              <p className="mt-4 text-lg font-semibold">{selectedPlan.price}</p>
            </div>
          </article>

          <aside className="space-y-4">
            <div className="rounded-[24px] border border-[rgba(23,37,31,0.12)] bg-[#F4EFE4] p-4">
              {plans.map((plan) => {
                const active = selectedPlanId === plan.id
                return (
                  <button
                    key={plan.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`mb-2 w-full rounded-2xl border px-4 py-3 text-left transition ${
                      active ? 'border-[#17251F] bg-[#17251F] text-[#FFFCF6]' : 'border-[rgba(23,37,31,0.12)] bg-[#FFFCF6] text-[#17251F]'
                    }`}
                  >
                    <p className="text-xs">{plan.number}</p>
                    <p className="text-base font-semibold">{plan.title}</p>
                    <p className="text-xs opacity-80">{plan.duration} · {plan.price}</p>
                  </button>
                )
              })}
            </div>

            <div className="rounded-[24px] border border-[rgba(23,37,31,0.12)] bg-[#FFFCF6] p-5">
              <p className="text-base font-semibold text-[#17251F]">Your plan includes</p>
              <ul className="mt-3 space-y-1 text-sm text-[#6D716B]">
                {selectedPlan.itinerary.map((step) => <li key={step}>- {step}</li>)}
              </ul>
              <p className="mt-4 text-xs text-[#6D716B]">No payment now. We confirm availability and trail suitability on WhatsApp first.</p>
            </div>
          </aside>
        </div>

        <div id="plan-enquiry" className="mt-8 rounded-[24px] border border-[rgba(23,37,31,0.12)] bg-[#F4EFE4] p-6">
          <h3 className="text-3xl font-serif text-[#17251F]">Plan this package</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-[#17251F]">Selected package
              <input readOnly value={selectedPlan.title} className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm" />
            </label>
            <label className="text-sm text-[#17251F]">Dates
              <input value={dates} onChange={(e) => setDates(e.target.value)} placeholder="e.g. 24-26 May" className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm" />
            </label>
            <label className="text-sm text-[#17251F]">Guests
              <input type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value) || 1)} className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm" />
            </label>
            <label className="text-sm text-[#17251F]">Name
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm" />
            </label>
            <label className="text-sm text-[#17251F]">WhatsApp number
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm" />
            </label>
            <label className="text-sm text-[#17251F] md:col-span-2">Notes
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 min-h-[84px] w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm" />
            </label>
          </div>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-xl bg-[#17251F] px-5 py-3 text-sm font-semibold text-[#FFFCF6]">
            Send package enquiry on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
