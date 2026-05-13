'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  {
    image: '/images/bonfire.png',
    size: 'large',
    review: '"The silence here is actual. No cars, no noise, just the crackle of the fire and the mountain wind. Exactly what we needed."',
    author: 'Siddharth & Megha',
    location: 'NCR'
  },
  {
    image: '/images/food.png',
    size: 'small',
    review: '"Best siddu we had in Himachal. The cafe feels like a warm hug after a long trail day."',
    author: 'Aryan',
    location: 'Chandigarh'
  },
  {
    image: '/images/window.png',
    size: 'small',
    review: '"Waking up to that window view... you can\'t put a price on it. It\'s not just a stay, it\'s a reset."',
    author: 'Priya',
    location: 'Remote Worker'
  }
]

export default function TheRealPlace() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.gallery-item')
      
      items.forEach((item: any, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          },
          opacity: 0,
          y: 60,
          scale: 0.95,
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full bg-surface py-28 md:py-32 overflow-hidden paper-grain">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-xs font-sans font-semibold text-accent tracking-[0.2em] uppercase mb-4">
            The Real Place
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-primary mb-6">
            Proof before promise.
          </h2>
          <p className="text-text-muted font-sans font-light text-lg max-w-2xl mx-auto">
            We don't use stock photos. We don't perform. This is the basecamp as it is: real food, real rest, and real trails.
          </p>
        </div>

        {/* Cinematic Gallery + Reviews */}
        <div className="space-y-32">
          {galleryItems.map((item, idx) => (
            <div 
              key={idx} 
              className={`gallery-item flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
            >
              {/* Image Column */}
              <div className={`relative w-full ${item.size === 'large' ? 'md:w-3/5' : 'md:w-2/5'} aspect-[16/9] md:aspect-auto md:h-[600px] overflow-hidden rounded-sm`}>
                <Image 
                  src={item.image}
                  alt="Off the Trail Moment"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Review Column */}
              <div className="w-full md:w-2/5 space-y-8">
                <div className="space-y-6">
                  <svg className="w-12 h-12 text-accent/20" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8v8h6v12h-12v-12h2v-8h4zM22 8v8h6v12h-12v-12h2v-8h4z" />
                  </svg>
                  <blockquote className="text-2xl md:text-3xl font-serif italic text-primary leading-tight">
                    {item.review}
                  </blockquote>
                  <div className="pt-4">
                    <p className="font-sans font-semibold text-primary">{item.author}</p>
                    <p className="text-sm text-text-muted font-sans uppercase tracking-widest">{item.location}</p>
                  </div>
                </div>
                
                <div className="h-px w-16 bg-border" />
                
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg key={star} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="mt-32 pt-20 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-serif text-primary mb-2">6</p>
            <p className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest">Cedar Cabins</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-serif text-primary mb-2">12+</p>
            <p className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest">Guided Trails</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-serif text-primary mb-2">0</p>
            <p className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest">Network Noise</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-serif text-primary mb-2">1</p>
            <p className="text-xs font-sans font-semibold text-text-muted uppercase tracking-widest">Basecamp Goal</p>
          </div>
        </div>
      </div>
    </section>
  )
}
