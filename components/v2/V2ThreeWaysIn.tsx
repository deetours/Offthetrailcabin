'use client'

import React from 'react'
import Link from 'next/link'
import { Utensils, Footprints, Home, ArrowRight } from 'lucide-react'

interface ExperienceVibe {
  id: string
  label: string
  title: string
  italicTitle: string
  description: string
  icon: React.ReactNode
  image: string
  bullets: string[]
  cta: string
  href: string
}

const experiences: ExperienceVibe[] = [
  {
    id: 'table',
    label: 'LOCAL MEALS & COFFEE',
    title: 'The',
    italicTitle: 'Table',
    description: 'Slow-cooked Himachali mountain food, morning single-origin coffee brews, and shared dinners around the cedar fire.',
    icon: <Utensils size={18} />,
    image: '/images/reset.png',
    bullets: ['Forest herbs and local ingredients', 'Fresh pour-over coffee bar', 'Daily homestyle group meals'],
    cta: 'View Cafe',
    href: '/activities'
  },
  {
    id: 'trail',
    label: 'GUIDED HIKES & WALKS',
    title: 'The',
    italicTitle: 'Trail',
    description: 'Avoid tourist-heavy routes. Explore pine-canopied paths, hidden river glades, and historic ridges known only to local hosts.',
    icon: <Footprints size={18} />,
    image: '/images/trail_weekend.png',
    bullets: ['Personal host-led trails', 'Safety-mapped walking routes', 'Stunning uncrowded viewpoints'],
    cta: 'View Treks',
    href: '/treks'
  },
  {
    id: 'cabin',
    label: 'QUIET DESKS & SANCTUARIES',
    title: 'The',
    italicTitle: 'Cabin',
    description: 'Handcrafted log cabins featuring private wood decks, warm mountain insulation, and power-backed high-speed Wi-Fi.',
    icon: <Home size={18} />,
    image: '/images/workation.png',
    bullets: ['Silent workspace corners', 'Double-layered cozy bedding', 'Dedicated power backup setups'],
    cta: 'View Stays',
    href: '/stays'
  }
]

export default function V2ThreeWaysIn() {
  return (
    <section className="bg-base py-20 border-b border-border/50 paper-grain">
      <div className="mx-auto max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        
        {/* Editorial header */}
        <div className="mb-16 max-w-xl">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2.5 block">
            THE MOUNTAIN LIFESTYLE
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary font-normal">
            More than a bed.<br />
            A complete <span className="italic text-accent">mountain immersion.</span>
          </h2>
          <p className="mt-4 text-text-muted text-sm font-sans leading-relaxed">
            We spent years orchestrating the delicate intersection of delicious food, safe trail exploration, and cozy workspaces in the hills.
          </p>
        </div>

        {/* Cinematic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div 
              key={exp.id} 
              className="group flex flex-col bg-surface border border-border/80 rounded-lg overflow-hidden shadow-sm hover:shadow transition-all duration-300"
            >
              {/* Image poster with zoom */}
              <div className="relative h-56 overflow-hidden bg-base">
                <img 
                  src={exp.image} 
                  alt={`${exp.title} ${exp.italicTitle}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
                
                {/* Vibe badge icon */}
                <div className="absolute top-4 left-4 h-9 w-9 rounded-full bg-surface/90 backdrop-blur-sm flex items-center justify-center text-accent shadow-sm">
                  {exp.icon}
                </div>
              </div>

              {/* Poster Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold block mb-1.5">
                    {exp.label}
                  </span>
                  
                  <h3 className="font-serif text-3xl text-primary font-normal mb-3">
                    {exp.title} <span className="italic text-accent">{exp.italicTitle}</span>
                  </h3>
                  
                  <p className="text-text-muted text-xs leading-relaxed mb-6 font-sans">
                    {exp.description}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="border-t border-border/40 pt-4 mb-5 flex flex-col gap-2">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] text-text font-sans font-medium">
                      <span className="h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Link href={exp.href} className="w-full flex items-center justify-between rounded border border-primary py-2 px-4 text-xs font-semibold text-primary tracking-wider uppercase hover:bg-primary hover:text-surface transition-all duration-200 mt-auto">
                  <span>{exp.cta}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
