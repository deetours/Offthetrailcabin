'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { trackConversion } from '@/lib/analytics'
import { useDestination } from '@/lib/DestinationContext'
import { DEFAULT_WHATSAPP_NUMBER, createWhatsAppLink, buildGlobalWhatsAppMessage } from '@/lib/enquiry'
import { LinkButton } from '@/components/ui/button'

const navItems = [
  { label: 'The Cafe', href: '/cafe', tone: 'Kitchen and cabin dining' },
  { label: 'The Cabins', href: '/stays', tone: 'Quiet mountain stays' },
  { label: 'The Trails', href: '/adventures', tone: 'Route-led local days' },
  { label: 'Packages', href: '/packages', tone: 'Stay formats and planning' },
]

const secondaryItems = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'Know Before You Come', href: '/#know-before-you-come' },
]

const dockTransition = { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const }
const itemTransition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const }

export default function MobileActionBar() {
  const { selectedDestination } = useDestination()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', onKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  const whatsappHref = createWhatsAppLink(
    DEFAULT_WHATSAPP_NUMBER,
    buildGlobalWhatsAppMessage(selectedDestination),
  )

  const destinationLabel = selectedDestination === 'jibhi' ? 'Jibhi' : 'Dalhousie'

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <div className="lg:hidden">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close mobile navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              className="fixed inset-0 z-40 bg-[rgba(8,14,12,0.46)] backdrop-blur-[8px]"
              onClick={() => {
                trackConversion('mobile_menu_close', { source: 'mobile-nav-backdrop', destination: selectedDestination })
                closeMenu()
              }}
            />

            <motion.section
              initial={{ opacity: 0, y: 42, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.985 }}
              transition={dockTransition}
              className="fixed inset-x-3 bottom-[88px] z-50 overflow-hidden rounded-[30px] border border-[rgba(244,239,228,0.12)] bg-[linear-gradient(180deg,rgba(22,33,28,0.98)_0%,rgba(14,24,20,0.98)_100%)] text-[#F4EFE4] shadow-[0_28px_90px_rgba(3,8,7,0.42)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,120,45,0.15),transparent_38%),radial-gradient(circle_at_12%_18%,rgba(229,213,181,0.08),transparent_24%)]" />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(229,213,181,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(229,213,181,0.16) 1px, transparent 1px)',
                  backgroundSize: '84px 84px',
                }}
              />

              <div className="relative px-5 pb-5 pt-5">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E5D5B5]">
                      Mobile basecamp
                    </p>
                    <h2 className="mt-3 font-serif text-[34px] leading-[0.94] tracking-[-0.03em] text-white">
                      Start with {destinationLabel}.
                    </h2>
                    <p className="mt-3 max-w-[280px] text-[14px] leading-relaxed text-[#F4EFE4]/66">
                      A quicker way into stays, food, trails, and host help without hunting through a drawer.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      trackConversion('mobile_menu_close', { source: 'mobile-nav-close', destination: selectedDestination })
                      closeMenu()
                    }}
                    className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F4EFE4]/80 transition-colors hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>

                <nav className="mt-5 space-y-2" aria-label="Mobile navigation">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ ...itemTransition, delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => {
                          trackConversion('mobile_menu_nav', { label: item.label, destination: selectedDestination })
                          closeMenu()
                        }}
                        className="group flex items-end justify-between rounded-[22px] border border-white/0 px-1 py-3 transition-colors hover:border-white/10 hover:bg-white/[0.03]"
                      >
                        <div>
                          <p className="font-serif text-[34px] leading-[0.92] tracking-[-0.035em] text-white">
                            {item.label}
                          </p>
                          <p className="mt-1 text-[12px] uppercase tracking-[0.16em] text-[#F4EFE4]/40">
                            {item.tone}
                          </p>
                        </div>
                        <span className="pb-1 text-[#E5D5B5] transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-5 border-t border-white/10 pt-5">
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-[#F4EFE4]/48">
                    {secondaryItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          trackConversion('mobile_menu_secondary_nav', { label: item.label, destination: selectedDestination })
                          closeMenu()
                        }}
                        className="rounded-full border border-white/10 px-3 py-2 transition-colors hover:border-white/24 hover:text-[#F4EFE4]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <p className="mt-4 text-[13px] leading-relaxed text-[#F4EFE4]/58">
                    Host assist stays human. We confirm timing, route reality, and the right stay rhythm before payment.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <LinkButton
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      trackConversion('whatsapp_click', { source: 'mobile-menu', destination: selectedDestination })
                      closeMenu()
                    }}
                    variant="secondary"
                    showArrow
                    className="border-[#F4EFE4]/20 bg-white/[0.05] text-[#F4EFE4] hover:border-[#E5D5B5]/60 hover:bg-white/[0.12]"
                  >
                    Ask on WhatsApp
                  </LinkButton>

                  <LinkButton
                    href="/#enquiry"
                    onClick={() => {
                      trackConversion('cta_click', { source: 'mobile-menu', target: '/#enquiry', destination: selectedDestination })
                      closeMenu()
                    }}
                    variant="booking"
                    showArrow
                  >
                    Plan My Stay
                  </LinkButton>
                </div>
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          y: isOpen ? 2 : 0,
          scale: isOpen ? 0.985 : 1,
          opacity: isOpen ? 0.96 : 1,
        }}
        transition={dockTransition}
        className="fixed inset-x-3 bottom-3 z-50"
      >
        <div className="mx-auto max-w-[480px] rounded-[26px] border border-[rgba(23,37,31,0.10)] bg-[rgba(255,252,246,0.88)] p-2 shadow-[0_24px_70px_rgba(23,37,31,0.20)] backdrop-blur-[22px]">
          <div className="grid grid-cols-[0.9fr_1fr_1fr] gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                const nextOpen = !isOpen
                trackConversion(nextOpen ? 'mobile_menu_open' : 'mobile_menu_close', {
                  source: 'mobile-nav-dock',
                  destination: selectedDestination,
                })
                setIsOpen(nextOpen)
              }}
              className={`group relative inline-flex h-[54px] items-center justify-center overflow-hidden rounded-[20px] px-4 text-[13px] font-semibold tracking-[-0.01em] transition-colors ${
                isOpen
                  ? 'bg-[#17251F] text-[#F4EFE4] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]'
                  : 'bg-transparent text-[#17251F] hover:bg-[rgba(23,37,31,0.05)]'
              }`}
            >
              <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.22)_50%,transparent_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative z-[1] flex items-center gap-2">
                <span>Menu</span>
                <span className="text-[10px] uppercase tracking-[0.16em] opacity-70">Basecamp</span>
              </span>
            </motion.button>

            <LinkButton
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackConversion('whatsapp_click', { source: 'mobile-action-bar', destination: selectedDestination })}
              variant="secondary"
              className="h-[54px] rounded-[20px] border-[rgba(23,37,31,0.10)] bg-[#F8F2E8] text-[#17251F] shadow-[0_10px_22px_rgba(23,37,31,0.08)] hover:bg-[#FFF8EE]"
            >
              WhatsApp
            </LinkButton>

            <LinkButton
              href="/#enquiry"
              onClick={() => trackConversion('cta_click', { source: 'mobile-action-bar', target: '/#enquiry', destination: selectedDestination })}
              variant="booking"
              showArrow
              className="h-[54px] rounded-[20px]"
            >
              Plan stay
            </LinkButton>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
