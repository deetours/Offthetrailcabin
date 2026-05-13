'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BasecampPromise() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef)
      const promise1 = q('.promise-1')
      const promise2 = q('.promise-2')
      const promise3 = q('.promise-3')
      const promiseFinal = q('.promise-final')

      // Reveal each problem line one-by-one while scrolling through the pinned section.
      gsap.set([promise1, promise2, promise3], { autoAlpha: 0, y: 24 })
      gsap.set(promiseFinal, { autoAlpha: 0, y: 24 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      tl.to(promise1, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'none' }, 0.06)
        .to(promise2, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'none' }, 0.34)
        .to(promise3, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'none' }, 0.6)
        .to(promiseFinal, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'none' }, 0.8)

      // Trail line animation triggered by GSAP ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 50%',
        onEnter: () => {
          if (!pathRef.current) return
          const pathLength = pathRef.current.getTotalLength()
          gsap.fromTo(
            pathRef.current,
            { strokeDasharray: pathLength, strokeDashoffset: pathLength },
            {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: 'sine.inOut',
              delay: 0.5,
            },
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-primary text-surface flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Subtle Map Grid Overlay */}
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(216, 208, 195, 0.2) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div ref={pinRef} className="space-y-12">
          <div className="promise-1 space-y-4">
            <span className="text-xs font-sans font-semibold text-accent tracking-[0.2em] uppercase">The Problem</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-surface">No scattered planning.</h2>
          </div>
          
          <div className="promise-2 space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-surface">No unclear stays.</h2>
          </div>

          <div className="promise-3 space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif leading-tight text-surface">No guessing the route.</h2>
          </div>

          <div className="promise-final pt-12 space-y-8">
            <div className="h-px w-24 bg-accent mx-auto" />
            <h3 className="text-3xl md:text-5xl font-serif italic text-base">
              Just food, rest, and local guidance in one place.
            </h3>
            <p className="text-surface/60 font-sans font-light text-lg max-w-xl mx-auto">
              Built for travelers who want Chamba to feel simple again: a warm meal, a clean bed, and someone local to point them toward the right trail.
            </p>
          </div>
        </div>
      </div>

      {/* SVG Trail Animation */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            ref={pathRef}
            d="M-50,200 C200,100 400,400 600,200 S800,0 1100,300" 
            stroke="#C9782D" 
            strokeWidth="2" 
            strokeDasharray="8 8"
          />
        </svg>
      </div>
    </section>
  )
}
