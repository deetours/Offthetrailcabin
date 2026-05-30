'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ArrowRight, Coffee, Footprints, House, Map } from 'lucide-react'
import { trackConversion } from '@/lib/analytics'

const trustItems = [
  { label: 'Cafe', icon: Coffee },
  { label: 'Cabins', icon: House },
  { label: 'Guided trails', icon: Footprints },
  { label: 'Route help', icon: Map },
]

function HeroButton({
  href,
  variant,
  label,
  source,
}: {
  href: string
  variant: 'primary' | 'secondary'
  label: string
  source: string
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={reducedMotion ? undefined : { scale: 1.01 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full sm:w-auto"
    >
      <Link
        href={href}
        onClick={() => trackConversion('cta_click', { source, target: href })}
        className={`group inline-flex h-14 w-full shrink-0 items-center justify-center gap-3 rounded-[14px] px-7 text-[15px] font-semibold leading-none tracking-[-0.01em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9782D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EFE4] sm:w-auto ${
          variant === 'primary'
            ? 'bg-[#17251F] text-[#FFFCF6] hover:bg-[#20372E]'
            : 'border border-[rgba(23,37,31,0.22)] bg-transparent text-[#17251F] hover:border-[rgba(23,37,31,0.42)]'
        }`}
      >
        <span>{label}</span>
        <motion.span
          whileHover={reducedMotion ? undefined : { x: 4 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="inline-flex"
          aria-hidden="true"
        >
          <ArrowRight size={16} strokeWidth={2} />
        </motion.span>
      </Link>
    </motion.div>
  )
}

export default function OpeningFrameEditorial() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('.hero-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 })
        .fromTo('.hero-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.05')
        .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .fromTo('.hero-trust', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.15')
        .fromTo(
          '.hero-image',
          { opacity: 0, scale: 1.03, clipPath: 'inset(12% 0 0 0 round 28px)' },
          { opacity: 1, scale: 1, clipPath: 'inset(0% 0 0 0 round 28px)', duration: 0.8 },
          '-=0.1',
        )
        .fromTo('.hero-package', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.12')
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden bg-[#F4EFE4] pb-14 pt-10 lg:pt-12">
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(24px,5vw,72px)]">
        <div className="mt-12 grid items-center gap-[clamp(48px,6vw,96px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.28fr)]">
          <div className="max-w-[560px]">
            <div className="hero-label mb-7 flex items-center gap-3">
              <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-[#C9782D]">OFF THE TRAIL</p>
              <svg width="24" height="10" viewBox="0 0 24 10" fill="none" aria-hidden="true">
                <path
                  d="M1 9L6 3.8L8.8 6.9L13 1.8L16.2 5.2L19 2.9L23 7"
                  stroke="#8D6B4F"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="hero-title mb-7 font-serif text-[clamp(48px,14vw,68px)] leading-[0.92] tracking-[-0.045em] text-[#17251F] md:text-[clamp(68px,6.4vw,108px)] md:leading-[0.88] md:tracking-[-0.055em]">
              <span className="block">Choose your way</span>
              <span className="block italic lg:whitespace-nowrap">into the hills.</span>
            </h1>

            <p className="hero-sub mb-9 max-w-[540px] text-[18px] leading-[1.65] tracking-[-0.015em] text-[#4F5852]">
              Pick Jibhi or Dalhousie, then plan your stay, meals, and local route support with Off the Trail.
            </p>

            <div className="hero-cta mb-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <HeroButton href="/contact" label="Plan My Stay" source="hero-editorial-main" variant="primary" />
              <HeroButton href="/cafe" label="Visit the Cafe" source="hero-editorial-main" variant="secondary" />
            </div>

            <div className="hero-trust border-t border-[rgba(23,37,31,0.12)] pt-6">
              <ul className="grid grid-cols-2 gap-3 text-[15px] text-[#444D47] md:flex md:items-center md:gap-6">
                {trustItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label} className="inline-flex items-center gap-2">
                      <Icon className="h-4 w-4" strokeWidth={1.7} />
                      <span>{item.label}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div>
            <div className="relative grid h-auto grid-cols-1 gap-4 lg:h-[clamp(520px,62vh,640px)] lg:grid-cols-[1.45fr_1fr] lg:grid-rows-2">
              <div className="hero-image relative overflow-hidden rounded-[28px] lg:col-start-1 lg:row-span-2">
                {/* Replace with cohesive warm set: interior cabin+mtns, cafe table, quiet trail */}
                <Image
                  src="/images/offtrail/cabin-window.jpg"
                  alt="Warm cabin interior looking out toward the mountains"
                  fill
                  className="object-cover object-center lg:object-[52%_50%]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.20))]" />

                <div className="hero-package absolute bottom-6 right-6 hidden w-[min(380px,calc(100%-48px))] rounded-[22px] border border-[rgba(23,37,31,0.10)] bg-[rgba(255,252,246,0.94)] p-6 shadow-[0_24px_80px_rgba(23,37,31,0.12)] backdrop-blur-[18px] lg:block">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6D716B]">FEATURED PACKAGE</p>
                  <h3 className="mt-4 font-serif text-[30px] leading-[1.05] tracking-[-0.025em] text-[#17251F]">48-hour Hill escape</h3>
                  <p className="mt-3 text-[15px] text-[#4F5852]">Stay + food + local trail guidance</p>
                  <Link
                    href="/packages"
                    onClick={() => trackConversion('cta_click', { source: 'hero-editorial-package', target: '/packages' })}
                    className="group mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[#C9782D] transition-colors hover:text-[#a65f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9782D]"
                  >
                    <span>Explore this package</span>
                    <motion.span
                      whileHover={reducedMotion ? undefined : { x: 4 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="inline-flex"
                      aria-hidden="true"
                    >
                      <ArrowRight size={16} strokeWidth={2} />
                    </motion.span>
                  </Link>
                </div>
              </div>

              <div className="hero-image relative hidden overflow-hidden rounded-[24px] lg:col-start-2 lg:row-start-1 lg:block">
                <Image
                  src="/images/offtrail/cafe-food.jpg"
                  alt="Coffee and food at Off the Trail cafe"
                  fill
                  className="object-cover object-[52%_56%]"
                  sizes="(max-width: 1024px) 0vw, 20vw"
                />
              </div>

              <div className="hero-image relative hidden overflow-hidden rounded-[24px] lg:col-start-2 lg:row-start-2 lg:block">
                <Image
                  src="/images/offtrail/trail-path.jpg"
                  alt="Mountain trail near basecamp"
                  fill
                  className="object-cover object-[52%_58%]"
                  sizes="(max-width: 1024px) 0vw, 20vw"
                />
              </div>
            </div>

            <div className="hero-package mt-5 rounded-[22px] border border-[rgba(23,37,31,0.10)] bg-[rgba(255,252,246,0.94)] p-6 shadow-[0_24px_80px_rgba(23,37,31,0.12)] backdrop-blur-[18px] lg:hidden">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6D716B]">FEATURED PACKAGE</p>
              <h3 className="mt-4 font-serif text-[30px] leading-[1.05] tracking-[-0.025em] text-[#17251F]">48-hour Hill escape</h3>
              <p className="mt-3 text-[15px] text-[#4F5852]">Stay + food + local trail guidance</p>
              <Link
                href="/packages"
                onClick={() => trackConversion('cta_click', { source: 'hero-editorial-package-mobile', target: '/packages' })}
                className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[#C9782D] transition-colors hover:text-[#a65f1f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9782D]"
              >
                <span>Explore this package</span>
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-4 hidden grid-cols-2 gap-4 sm:grid lg:hidden">
              <div className="hero-image relative h-48 overflow-hidden rounded-[20px]">
                <Image
                  src="/images/offtrail/cafe-food.jpg"
                  alt="Coffee and food at Off the Trail cafe"
                  fill
                  className="object-cover object-[52%_56%]"
                  sizes="(max-width: 1024px) 50vw, 0vw"
                />
              </div>
              <div className="hero-image relative h-48 overflow-hidden rounded-[20px]">
                <Image
                  src="/images/offtrail/trail-path.jpg"
                  alt="Mountain trail near basecamp"
                  fill
                  className="object-cover object-[52%_58%]"
                  sizes="(max-width: 1024px) 50vw, 0vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
