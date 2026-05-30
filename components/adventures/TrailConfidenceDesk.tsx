'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { LinkButton } from '@/components/ui/button'

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
    image: '/images/trails.png', 
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
    image: '/images/offtrail/trail-path.jpg',
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
    image: '/images/hero.png', 
    shortLine: 'A light walk near basecamp for quiet views without a hard climb.',
    carry: ['Water', 'Light layer', 'Camera'],
    cta: 'Ask about this route',
  },
]

export default function TrailConfidenceDesk() {
  const [selectedTrailId, setSelectedTrailId] = useState('ridge-sunrise')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState<number | ''>(2)
  const [fitness, setFitness] = useState('moderate')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const selected = useMemo(() => trails.find((t) => t.id === selectedTrailId) ?? trails[0], [selectedTrailId])

  const whatsappHref = useMemo(() => {
    const text = [
      'Hi Off the Trail, I want to enquire about a guided trail.',
      '',
      `Trail: ${selected.title}`,
      `Preferred date: ${date || 'Not shared yet'}`,
      `Guests: ${guests || 1}`,
      `Fitness comfort: ${fitness}`,
      `Name: ${name || 'Not shared yet'}`,
      `Phone: ${phone || 'Not shared yet'}`,
      '',
      'Please confirm weather, guide availability, difficulty, and what to carry.',
    ].join('\n')
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  }, [selected, date, guests, fitness, name, phone])

  const inputClass = "inline-block bg-transparent border-b border-primary/30 text-primary font-serif italic text-center outline-none focus:border-accent transition-colors placeholder:text-primary/20 placeholder:not-italic min-w-[80px] px-2 pb-0.5 mx-1"
  const selectClass = "appearance-none inline-block bg-transparent border-b border-primary/30 text-primary font-serif italic text-center outline-none focus:border-accent transition-colors cursor-pointer px-2 pb-0.5 mx-1"

  return (
    <section id="trails" className="relative w-full bg-base py-32 overflow-hidden border-t border-primary/10">
      <div className="mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)]">
        
        <div className="grid lg:grid-cols-[1fr_1.25fr] gap-16 lg:gap-24 items-center">
          
          {/* Left: Cinematic Trail Card */}
          <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                <Image src={selected.image} alt={selected.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,37,31,0.9)_0%,rgba(23,37,31,0.2)_50%,transparent_100%)]" />
                
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-surface">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-serif text-[18px] text-accent/80 italic">{selected.number}</span>
                    <span className="h-px w-8 bg-surface/30" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-surface/80">{selected.difficulty}</span>
                  </div>
                  <h3 className="text-[clamp(36px,4vw,48px)] font-serif leading-[1.1] tracking-tight mb-4">
                    {selected.title}
                  </h3>
                  <p className="text-[16px] text-surface/80 leading-relaxed max-w-[400px] mb-8 font-light">
                    {selected.shortLine}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-6 border-t border-surface/15">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-surface/50 mb-1">Duration</p>
                      <p className="text-[14px] text-surface/90">{selected.duration}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-surface/50 mb-1">Suitability</p>
                      <p className="text-[14px] text-surface/90">{selected.suitability}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Mad Libs Editorial Form */}
          <div className="flex flex-col justify-center max-w-[640px]">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent mb-8">
              Trail Enquiry
            </p>
            <h2 className="text-[32px] md:text-[44px] font-serif leading-[1.6] text-primary mb-12">
              Hello Off the Trail, I am interested in exploring the 
              <select 
                className={selectClass} 
                value={selectedTrailId} 
                onChange={(e) => setSelectedTrailId(e.target.value)}
              >
                {trails.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
              route. We are a group of 
              <input 
                type="number" 
                min={1} 
                className={inputClass} 
                style={{ width: '60px' }}
                value={guests} 
                onChange={(e) => setGuests(e.target.value === '' ? '' : Number(e.target.value))} 
                placeholder="2" 
              /> 
              guests, hoping to step out around 
              <input 
                type="text" 
                className={inputClass} 
                style={{ width: '120px' }}
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                placeholder="May 26" 
              />. 
              I would describe our general fitness level as 
              <select 
                className={selectClass} 
                value={fitness} 
                onChange={(e) => setFitness(e.target.value)}
              >
                <option value="easy">easy</option>
                <option value="moderate">moderate</option>
                <option value="active">active</option>
              </select>. 
              My name is 
              <input 
                type="text" 
                className={inputClass} 
                style={{ width: '160px' }}
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Jane Doe" 
              /> 
              and you can reach me on WhatsApp at 
              <input 
                type="tel" 
                className={inputClass} 
                style={{ width: '180px' }}
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="+91..." 
              />.
            </h2>
            
            <div className="flex items-center">
              <LinkButton
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                variant="conversion"
                showArrow
              >
                {selected.cta}
              </LinkButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
