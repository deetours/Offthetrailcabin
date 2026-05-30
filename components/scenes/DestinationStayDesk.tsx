'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Bed, Users, Sparkles } from 'lucide-react'
import { destinations } from '@/lib/destinations'
import { DEFAULT_WHATSAPP_NUMBER, createWhatsAppLink } from '@/lib/enquiry'
import { trackConversion } from '@/lib/analytics'
import { LinkButton } from '@/components/ui/button'

interface DestinationStayDeskProps {
  selectedDestination: 'jibhi' | 'dalhousie'
}

export default function DestinationStayDesk({ selectedDestination }: DestinationStayDeskProps) {
  const activeDest = destinations.find((d) => d.id === selectedDestination) || destinations[0]

  return (
    <section id="stay-desk" className="relative overflow-hidden bg-base py-16 md:py-24 border-t border-[rgba(23,37,31,0.06)]">
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(24px,5vw,72px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-[720px]">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent">
                    SELECTED DESTINATION: {activeDest.name}
                  </p>
                </div>
                <h2 className="font-serif text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-[-0.03em] text-primary">
                  Private {activeDest.name} stays tailored for stillness.
                </h2>
              </div>
              <p className="text-[16px] text-text-muted md:max-w-[320px] leading-relaxed">
                {activeDest.headline}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              {activeDest.stays?.map((stay, index) => (
                <div key={stay.id} className="group flex flex-col bg-surface rounded-[24px] border border-[rgba(23,37,31,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(23,37,31,0.06)] hover:border-[rgba(23,37,31,0.12)]">
                  {/* Image Area */}
                  <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-base">
                    <Image
                      src={stay.image}
                      alt={stay.name}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-[0.32,0.72,0,1] group-hover:scale-[1.04]"
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-surface/90 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                      <Sparkles size={14} className="text-accent" />
                      Best for {stay.bestFor}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex flex-col flex-1 p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-serif text-[28px] md:text-[32px] text-primary leading-tight mb-2">
                          {stay.name}
                        </h3>
                        <p className="text-[14px] text-text-muted uppercase tracking-[0.1em] font-medium">
                          From ₹{stay.fromPrice.toLocaleString()} / night
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center gap-2 text-text text-[15px]">
                        <Bed className="h-5 w-5 text-accent" strokeWidth={1.5} />
                        <span>Private {stay.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text text-[15px]">
                        <Users className="h-5 w-5 text-accent" strokeWidth={1.5} />
                        <span>Sleeps {stay.sleeps}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-[rgba(23,37,31,0.06)] flex flex-col sm:flex-row gap-4">
                      <LinkButton
                        href={createWhatsAppLink(
                          DEFAULT_WHATSAPP_NUMBER,
                          `Hi Off the Trail, I want to enquire about ${stay.name} in ${activeDest.name}.\n\nDates:\nGuests:\nNotes:\n\nPlease share availability.`
                        )}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackConversion('stay_enquiry', { stayId: stay.id, destination: activeDest.id })}
                        variant="booking"
                        showArrow
                        className="h-[54px] w-full flex-1 rounded-[18px] border border-[#133429] bg-[linear-gradient(135deg,#0D2C22_0%,#16503A_100%)] text-[#F8F3E9] shadow-[0_12px_26px_rgba(10,28,22,0.18)] hover:border-[#1E6248] hover:bg-[linear-gradient(135deg,#0F3328_0%,#1C5D44_100%)]"
                      >
                        {stay.cta}
                      </LinkButton>
                    </div>
                  </div>
                </div>
              ))}

              {/* If no stays exist or just 1, add a route context card */}
              {(!activeDest.stays || activeDest.stays.length < 2) && (
                <div className="flex flex-col bg-primary rounded-[24px] p-8 md:p-12 text-surface justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,120,45,0.15),transparent_60%)]" />
                  <h3 className="relative z-10 mb-4 font-serif text-[32px] text-[#F4EFE4]">Route & Context</h3>
                  <ul className="space-y-4 relative z-10 mb-8">
                    {activeDest.routeNotes.map((note) => (
                      <li key={note} className="flex items-start gap-3 text-[16px] text-base/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[14px] italic text-accent relative z-10">
                    {activeDest.footerRouteNote}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
