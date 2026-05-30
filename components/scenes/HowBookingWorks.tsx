'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Button, LinkButton } from '@/components/ui/button'

const steps = [
  {
    id: 'step-1',
    num: '01',
    title: 'Choose Dalhousie or Jibhi',
    desc: 'Select your preferred basecamp at the top of the homepage to explore its unique atmosphere and operational realities.',
  },
  {
    id: 'step-2',
    num: '02',
    title: 'Pick a stay or package',
    desc: 'Select from our quiet forest cabins, warm rooms, or curated escape packages built for slow days.',
  },
  {
    id: 'step-3',
    num: '03',
    title: 'Send dates on WhatsApp',
    desc: 'Click any "Plan on WhatsApp" button to send your dates, guest count, and notes directly to our local host team.',
  },
  {
    id: 'step-4',
    num: '04',
    title: 'We confirm availability & route',
    desc: 'We personally review availability, check current route weather, and confirm all booking details within 24 hours.',
  },
  {
    id: 'step-5',
    num: '05',
    title: 'Pay by UPI after confirmation',
    desc: 'Zero upfront friction. Pay via UPI only after we personally confirm your stay and guide you through the route.',
  },
]

export default function HowBookingWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 80%']
  })

  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-32 text-surface">
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, var(--accent), transparent 60%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-[clamp(24px,5vw,72px)]">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
          
          {/* Left: Sticky Header Area */}
          <div className="lg:sticky lg:top-32 h-fit">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent mb-6">
              BOOKING PROCESS
            </p>
            <h2 className="font-serif text-[clamp(44px,5vw,64px)] leading-[1] tracking-[-0.03em] mb-6 text-surface">
              No blind bookings. No surprise payments.
            </h2>
            <p className="text-[18px] leading-[1.6] text-surface/70 font-sans mb-10 max-w-[480px]">
              We believe in honest mountain travel. No automated engines, no generic confirmations. Every stay is personally verified on WhatsApp before you pay a single rupee.
            </p>
            
            <div className="hidden lg:block">
              <LinkButton href="#stay-desk" variant="conversion" showArrow>
                Browse Stays
              </LinkButton>
            </div>
          </div>

          {/* Right: The Timeline */}
          <div ref={containerRef} className="relative py-4 md:py-10">
            {/* Background Line */}
            <div className="absolute left-[27px] md:left-[39px] top-0 bottom-0 w-[2px] bg-surface/10" />
            
            {/* Animated Draw Line */}
            <motion.div 
              className="absolute left-[27px] md:left-[39px] top-0 bottom-0 w-[2px] bg-accent origin-top"
              style={{ scaleY: scrollYProgress }}
            />

            <div className="space-y-16 md:space-y-24 relative z-10">
              {steps.map((step) => (
                <div key={step.id} className="relative flex gap-8 md:gap-12 group">
                  {/* Step Number Bubble */}
                  <div className="relative shrink-0 flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full bg-primary border-2 border-surface/20 group-hover:border-accent transition-colors duration-500">
                    <span className="font-serif text-xl md:text-3xl text-surface">{step.num}</span>
                  </div>
                  
                  {/* Step Content */}
                  <div className="pt-2 md:pt-4 pb-8 border-b border-surface/10 flex-1 group-last:border-0">
                    <h3 className="font-serif text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] mb-4 text-surface group-hover:text-accent transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="text-[16px] md:text-[18px] leading-[1.65] text-surface/70 font-sans max-w-[480px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 lg:hidden block">
            <LinkButton href="#stay-desk" variant="conversion" className="w-full" showArrow>
              Browse Stays
            </LinkButton>
          </div>

        </div>
      </div>
    </section>
  )
}
