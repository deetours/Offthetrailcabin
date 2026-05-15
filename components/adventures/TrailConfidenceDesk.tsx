'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'

type Trail = {
  id: string
  number: string
  title: string
  difficulty: string
  suitability: string
  duration: string
  distance: string
  elevation: string
  season: string
  guide: string
  weather: string
  image: string
  shortLine: string
  carry: string[]
  cta: string
}

const WHATSAPP_NUMBER = '919999999999' // TODO: Replace with real Off the Trail WhatsApp number.

const trails: Trail[] = [
  {
    id: 'ridge-sunrise',
    number: '01',
    title: 'Ridge Sunrise Trail',
    difficulty: 'Moderate',
    suitability: 'Active beginners',
    duration: '4-5 hours',
    distance: '7 km round trip',
    elevation: '420m elevation gain',
    season: 'March to June, September to November',
    guide: 'Professional local guide available',
    weather: 'Avoid during heavy rain or snow build-up.',
    image: '/images/trails.png', // TODO: Replace with /images/trails/ridge-sunrise.jpg
    shortLine: 'A ridge walk for guests who want a real trail day without going extreme.',
    carry: ['Water', 'Good shoes', 'Light jacket', 'Snack'],
    cta: 'Ask if this trail suits me',
  },
  {
    id: 'forest-loop',
    number: '02',
    title: 'Forest Loop Walk',
    difficulty: 'Gentle',
    suitability: 'Families / first-time walkers',
    duration: '1.5-2 hours',
    distance: '3.5 km round trip',
    elevation: '120m elevation gain',
    season: 'Year-round except peak storm days',
    guide: 'Community host guide available',
    weather: 'Stable except heavy rain days.',
    image: '/images/offtrail/trail-path.jpg', // TODO: Replace with /images/trails/forest-loop.jpg
    shortLine: 'A calm forest route for slow walkers, families, and first-time guests.',
    carry: ['Water', 'Comfortable shoes', 'Rain shell if cloudy'],
    cta: 'Plan this walk',
  },
  {
    id: 'village-edge',
    number: '03',
    title: 'Village Edge Walk',
    difficulty: 'Easy',
    suitability: 'Slow travelers / couples',
    duration: '1-1.5 hours',
    distance: '2 km',
    elevation: 'Minimal',
    season: 'Most of the year',
    guide: 'Optional host guidance',
    weather: 'Best in clear mornings and late afternoons.',
    image: '/images/hero.png', // TODO: Replace with /images/trails/village-edge.jpg
    shortLine: 'A light walk near basecamp for quiet views without a hard climb.',
    carry: ['Water', 'Light layer', 'Camera'],
    cta: 'Ask about this route',
  },
]

export default function TrailConfidenceDesk() {
  const [selectedTrailId, setSelectedTrailId] = useState('ridge-sunrise')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(2)
  const [fitness, setFitness] = useState('Moderate')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  const selected = useMemo(() => trails.find((t) => t.id === selectedTrailId) ?? trails[0], [selectedTrailId])

  const whatsappHref = useMemo(() => {
    const text = [
      'Hi Off the Trail, I want to enquire about a guided trail.',
      '',
      `Trail: ${selected.title}`,
      `Preferred date: ${date || 'Not shared yet'}`,
      `Guests: ${guests}`,
      `Fitness comfort: ${fitness}`,
      `Name: ${name || 'Not shared yet'}`,
      `Phone: ${phone || 'Not shared yet'}`,
      `Notes: ${notes || 'None'}`,
      '',
      'Please confirm weather, guide availability, difficulty, and what to carry.',
    ].join('\n')
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  }, [selected, date, guests, fitness, name, phone, notes])

  return (
    <section id="trails" className="bg-[#FFFCF6] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6D716B]">Trail confidence selector</p>
        <h2 className="mt-3 text-4xl font-serif text-[#17251F] md:text-5xl">Choose with confidence before you step out</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <article className="relative overflow-hidden rounded-[24px] border border-[rgba(23,37,31,0.12)] min-h-[460px]">
            <Image src={selected.image} alt={selected.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,30,25,0.82),rgba(15,30,25,0.18))]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-[#FFFCF6]">
              <span className="rounded-full border border-[rgba(255,252,246,0.5)] px-3 py-1 text-xs">{selected.difficulty}</span>
              <h3 className="mt-3 text-4xl font-serif">{selected.title}</h3>
              <p className="mt-2 text-sm max-w-xl">{selected.shortLine}</p>
              <p className="mt-3 text-sm">{selected.duration} · {selected.distance} · {selected.elevation}</p>
              <p className="text-sm">{selected.guide}</p>
            </div>
          </article>

          <aside className="space-y-4">
            <div className="rounded-[24px] border border-[rgba(23,37,31,0.12)] bg-[#F4EFE4] p-4">
              {trails.map((trail) => {
                const active = selectedTrailId === trail.id
                return (
                  <button
                    key={trail.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedTrailId(trail.id)}
                    className={`mb-2 w-full rounded-2xl border px-4 py-3 text-left ${
                      active ? 'border-[#17251F] bg-[#17251F] text-[#FFFCF6]' : 'border-[rgba(23,37,31,0.12)] bg-[#FFFCF6] text-[#17251F]'
                    }`}
                  >
                    <p className="text-xs">{trail.number}</p>
                    <p className="text-base font-semibold">{trail.title}</p>
                    <p className="text-xs opacity-80">{trail.difficulty} · {trail.duration}</p>
                  </button>
                )
              })}
            </div>
            <div className="rounded-[24px] border border-[rgba(23,37,31,0.12)] bg-[#FFFCF6] p-5 text-sm">
              <p className="font-semibold text-[#17251F]">Trail confidence</p>
              <p className="mt-2 text-[#6D716B]"><strong className="text-[#17251F]">Suitable for:</strong> {selected.suitability}</p>
              <p className="text-[#6D716B]"><strong className="text-[#17251F]">Weather:</strong> {selected.weather}</p>
              <p className="text-[#6D716B]"><strong className="text-[#17251F]">Best season:</strong> {selected.season}</p>
              <p className="text-[#6D716B]"><strong className="text-[#17251F]">Carry:</strong> {selected.carry.join(', ')}</p>
            </div>
          </aside>
        </div>

        <div id="trail-enquiry" className="mt-8 rounded-[24px] border border-[rgba(23,37,31,0.12)] bg-[#F4EFE4] p-6">
          <h3 className="text-3xl font-serif text-[#17251F]">Ask trail suitability</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-[#17251F]">Selected trail
              <input readOnly value={selected.title} className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm" />
            </label>
            <label className="text-sm text-[#17251F]">Preferred date
              <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="e.g. 26 May" className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm" />
            </label>
            <label className="text-sm text-[#17251F]">Guests
              <input type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value) || 1)} className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm" />
            </label>
            <label className="text-sm text-[#17251F]">Fitness comfort
              <select value={fitness} onChange={(e) => setFitness(e.target.value)} className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm">
                <option>Easy</option>
                <option>Moderate</option>
                <option>Active</option>
              </select>
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
            Ask trail suitability on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
