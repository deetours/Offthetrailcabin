'use client'

import React from 'react'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  quote: string
  author: string
  stay: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    quote: "The Forest Cabin in Jibhi was an absolute dream. Waking up to cedar river sounds every morning, while having rock-solid high-speed Wi-Fi to join our scrum calls, was a perfect balance. Extremely cozy.",
    author: "Siddharth M.",
    stay: "Stayed at The Forest Cabin, Jibhi",
    rating: 5,
  },
  {
    quote: "We brought our family to the Dalhousie Pine Room. The route reality card and coordinates provided by the coordinator were 100% spot on. We were warmly welcomed and had a wonderful experience.",
    author: "Natasha R.",
    stay: "Stayed at The Pine Room, Dalhousie",
    rating: 5,
  },
  {
    quote: "The food at the cafe is incredible. Local ingredients, homestyle cooking, and amazing pour-overs. WhatsApp booking is highly efficient — they aligned on weather and route status before taking our UPI.",
    author: "Aman S.",
    stay: "Stayed at The Cedar Room, Jibhi",
    rating: 5,
  }
]

export default function V2ProofMosaic() {
  return (
    <section className="bg-base py-20 border-b border-border/50 paper-grain">
      <div className="mx-auto max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2.5 block">
            VISUAL PROOF & TESTIMONIALS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary font-normal">
            Real guest stories from <span className="italic text-accent">the trail.</span>
          </h2>
          <p className="mt-4 text-text-muted text-sm font-sans leading-relaxed">
            We let the experiences speak for themselves. Transparent reviews focusing on sleep comfort, Wi-Fi reliability, route accuracy, and mountain warmth.
          </p>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="relative h-60 rounded-lg overflow-hidden border border-border/60 bg-surface shadow-sm group">
            <img 
              src="/images/cabins.png" 
              alt="Jibhi forest cabin deck" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-sm text-[10px] text-surface font-semibold px-2.5 py-1 rounded">
              Forest Cabin Deck · Jibhi
            </div>
          </div>
          <div className="relative h-60 rounded-lg overflow-hidden border border-border/60 bg-surface shadow-sm group">
            <img 
              src="/images/hero.png" 
              alt="Dalhousie pine views" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-sm text-[10px] text-surface font-semibold px-2.5 py-1 rounded">
              High Pine Ridges · Dalhousie
            </div>
          </div>
          <div className="relative h-60 rounded-lg overflow-hidden border border-border/60 bg-surface shadow-sm group">
            <img 
              src="/images/window.png" 
              alt="Cozy room window look" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-sm text-[10px] text-surface font-semibold px-2.5 py-1 rounded">
              Warm Pine Bed · Dalhousie
            </div>
          </div>
          <div className="relative h-60 rounded-lg overflow-hidden border border-border/60 bg-surface shadow-sm group">
            <img 
              src="/images/workation.png" 
              alt="Cedar wood workspace room" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-sm text-[10px] text-surface font-semibold px-2.5 py-1 rounded">
              Cedar workspace · Jibhi
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div 
              key={idx} 
              className="bg-surface border border-border/85 rounded-lg p-6 flex flex-col justify-between shadow-sm relative paper-grain hover:shadow transition-shadow"
            >
              <div className="absolute top-6 right-6 text-accent/15">
                <Quote size={32} />
              </div>

              <div>
                {/* Stars */}
                <div className="flex items-center gap-0.5 text-accent mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="text-text font-sans text-xs md:text-sm leading-relaxed mb-6 italic">
                  "{test.quote}"
                </p>
              </div>

              <div className="border-t border-border/40 pt-4">
                <span className="font-serif text-base text-primary font-normal block leading-none mb-1">
                  {test.author}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-muted font-sans font-semibold block">
                  {test.stay}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
