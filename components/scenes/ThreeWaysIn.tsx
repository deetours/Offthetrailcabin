'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { trackConversion } from '@/lib/analytics'

type DoorCard = {
  label: string
  title: string
  description: string
  cta: string
  href: string
  image: string
  alt: string
  microcopy?: string
  desktopClass: string
  minHeightClass: string
  titleClass: string
  contentClass: string
}

const cards: DoorCard[] = [
  {
    label: 'STAY',
    title: 'The Cabins',
    description: 'Sleep warm. Wake close to the hills.',
    microcopy: 'Quiet rooms · Warm beds · Cafe nearby',
    cta: 'Explore cabins',
    href: '/stays',
    image: '/images/cabins.png',
    alt: 'Warm cabin at Off the Trail',
    desktopClass: 'lg:col-start-1 lg:row-[1/span_2] md:col-span-2 lg:col-span-1',
    minHeightClass: 'min-h-[460px] md:min-h-[520px] lg:min-h-[640px]',
    titleClass: 'text-[clamp(52px,4.2vw,76px)]',
    contentClass: 'left-10 right-10 bottom-10',
  },
  {
    label: 'EAT',
    title: 'The Cafe',
    description: 'Start at the table. Coffee, food, and mountain silence.',
    cta: 'Visit the cafe',
    href: '/cafe',
    image: '/images/cafe.png',
    alt: 'Coffee and cafe table at Off the Trail',
    desktopClass: 'lg:col-start-2 lg:row-start-1',
    minHeightClass: 'min-h-[340px] md:min-h-[360px] lg:min-h-[308px]',
    titleClass: 'text-[clamp(34px,2.8vw,48px)]',
    contentClass: 'left-7 right-7 bottom-7',
  },
  {
    label: 'EXPLORE',
    title: 'The Trails',
    description: 'Guided local days through quieter hill routes.',
    cta: 'Explore trails',
    href: '/adventures',
    image: '/images/trails.png',
    alt: 'Misty forest trail in the hills',
    desktopClass: 'lg:col-start-2 lg:row-start-2',
    minHeightClass: 'min-h-[340px] md:min-h-[360px] lg:min-h-[308px]',
    titleClass: 'text-[clamp(34px,2.8vw,48px)]',
    contentClass: 'left-7 right-7 bottom-7',
  },
]

export default function ThreeWaysIn() {
  return (
    <section className="paper-grain relative w-full overflow-hidden bg-[#F4EFE4] py-[120px] pb-[140px]">
      <div className="mx-auto w-full max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#C9782D]">THREE WAYS IN</p>
          <h2 className="font-serif text-[clamp(48px,5vw,76px)] leading-[0.95] tracking-[-0.045em] text-[#17251F]">Choose your way in.</h2>
          <p className="mx-auto mt-[18px] max-w-[620px] text-[17px] leading-[1.6] text-[#6D716B]">
            Start at the table, stay by the hills, or step into the hills&apos; quieter trails.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:grid-rows-[minmax(280px,1fr)_minmax(280px,1fr)]">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`${card.desktopClass} ${card.minHeightClass}`}
            >
              <Link
                href={card.href}
                onClick={() => trackConversion('cta_click', { source: 'three-ways-editorial', target: card.href })}
                className="group relative block h-full overflow-hidden rounded-[26px] border border-[rgba(23,37,31,0.10)] bg-[#17251F] isolate md:rounded-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9782D]"
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.22)_45%,rgba(0,0,0,0.72)_100%)]" />

                <div className={`absolute z-20 ${card.contentClass}`}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[rgba(255,252,246,0.72)]">{card.label}</p>
                  <h3 className={`mt-[14px] font-serif leading-[0.95] tracking-[-0.045em] text-[#FFFCF6] ${card.titleClass}`}>{card.title}</h3>
                  <p className="mt-[14px] max-w-[430px] text-[16px] leading-[1.55] text-[rgba(255,252,246,0.84)]">{card.description}</p>

                  {card.microcopy && (
                    <p className="mt-[18px] text-[14px] text-[rgba(255,252,246,0.72)]">{card.microcopy}</p>
                  )}

                  <span className="mt-[22px] inline-flex items-center gap-2 text-[14px] font-bold text-[#FFFCF6]">
                    <span>{card.cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
