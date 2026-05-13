'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { trackConversion } from '@/lib/analytics'

export default function OpeningFrame() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } })
      tl.fromTo(imageRef.current, { scale: 1.04 }, { scale: 1 })
        .fromTo(overlayRef.current, { opacity: 0.72 }, { opacity: 0.45 }, 0)
        .fromTo('.gsap-label', { opacity: 0, y: 8 }, { opacity: 1, y: 0 }, 0.4)
        .fromTo('.gsap-title', { opacity: 0, y: 24 }, { opacity: 1, y: 0 }, 0.6)
        .fromTo('.gsap-sub', { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, 0.8)
        .fromTo('.gsap-cta', { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 1.0)
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-primary">
      <div
        ref={imageRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      />
      <div ref={overlayRef} className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center md:px-12">
        <div className="gsap-label mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent md:text-sm">
            Chamba, Himachal Pradesh
          </p>
        </div>

        <h1 className="gsap-title mb-8 text-5xl font-serif leading-[1.1] text-surface md:text-8xl">
          <span className="block">Eat well.</span>
          <span className="block">Sleep warm.</span>
          <span className="block italic">Head off trail.</span>
        </h1>

        <p className="gsap-sub mx-auto mb-12 max-w-2xl text-base font-light leading-relaxed text-surface/90 md:text-xl">
          A mountain cafe, cabin stay, and local adventure basecamp built for travelers who want the hills without the confusion.
        </p>

        <div className="gsap-cta flex flex-col items-center justify-center gap-6 sm:flex-row">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="inline-block rounded-sm bg-accent px-10 py-4 text-lg font-medium text-surface transition-colors hover:bg-accent/90"
              onClick={() => trackConversion('cta_click', { source: 'opening-frame', target: '/contact' })}
            >
              Plan My Stay
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/cafe"
              className="inline-block rounded-sm border border-surface/30 px-10 py-4 text-lg font-medium text-surface transition-colors hover:bg-surface/10"
              onClick={() => trackConversion('cta_click', { source: 'opening-frame', target: '/cafe' })}
            >
              Visit the Cafe
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
