'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { trackConversion } from '@/lib/analytics'
import { DEFAULT_WHATSAPP_NUMBER, createWhatsAppLink } from '@/lib/enquiry'

const navItems = [
  { label: 'The Cafe', href: '/cafe' },
  { label: 'The Cabins', href: '/stays' },
  { label: 'The Trails', href: '/adventures' },
  { label: 'Packages', href: '/packages' },
]

const menuItems = [
  ...navItems,
  { label: 'Gallery', href: '/gallery' },
  { label: 'Know Before You Come', href: '/#know-before-you-come' },
]

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
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
    'Hi Off the Trail team, I would like help planning my trip.',
  )

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-[rgba(23,37,31,0.10)] bg-[rgba(244,239,228,0.82)] backdrop-blur-[16px]'
          : 'border-transparent bg-[#F4EFE4]'
      }`}
    >
      <div className="mx-auto grid h-[88px] w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-[clamp(24px,5vw,72px)]">
        <Link
          href="/"
          className="justify-self-start font-serif text-[30px] leading-none tracking-[-0.035em] text-[#17251F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9782D]"
        >
          Off the Trail
        </Link>

        <nav className="hidden items-center gap-[42px] lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[15px] font-medium tracking-[-0.01em] text-[#17251F] transition-colors hover:text-[#C9782D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9782D]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="justify-self-end flex items-center gap-2">
          <a
            href="#enquiry"
            onClick={() => trackConversion('cta_click', { source: 'site-header', target: '#enquiry' })}
            className="group hidden h-[52px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#17251F] px-7 text-[15px] font-semibold tracking-[-0.01em] leading-none text-[#FFFCF6] transition-colors duration-200 hover:bg-[#20372E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9782D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EFE4] sm:inline-flex lg:h-[52px]"
          >
            <span>Plan My Stay</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            className="group inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(23,37,31,0.12)] bg-[#FFFCF6]/70 text-[#17251F] transition-colors hover:bg-[#FFFCF6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9782D] lg:hidden"
          >
            <span className="relative h-4 w-5">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-0 h-px w-5 bg-current"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="absolute left-0 top-2 h-px w-5 bg-current"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-4 h-px w-5 bg-current"
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-[#17251F] p-6 sm:p-8"
          >
            <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col">
              <div className="mb-10 flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-[30px] leading-none tracking-[-0.035em] text-[#F4EFE4]"
                >
                  Off the Trail
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(244,239,228,0.22)] text-[#F4EFE4]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="space-y-4" aria-label="Mobile">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: index * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="font-serif text-[42px] leading-[0.95] tracking-[-0.035em] text-[#F4EFE4] transition-colors hover:text-[#C9782D]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-3 pt-10">
                <a
                  href="#enquiry"
                  onClick={() => {
                    trackConversion('cta_click', { source: 'mobile-menu', target: '#enquiry' })
                    setIsOpen(false)
                  }}
                  className="inline-flex h-[56px] w-full items-center justify-center rounded-2xl bg-[#F4EFE4] px-6 text-[15px] font-semibold tracking-[-0.01em] text-[#17251F]"
                >
                  Plan My Stay
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackConversion('whatsapp_click', { source: 'mobile-menu' })
                    setIsOpen(false)
                  }}
                  className="inline-flex h-[54px] w-full items-center justify-center rounded-xl border border-[rgba(244,239,228,0.22)] text-sm font-semibold text-[#F4EFE4]"
                >
                  Ask on WhatsApp
                </a>
                <div className="pt-4 text-xs text-[#F4EFE4]/70">
                  <p>Chamba, Himachal Pradesh</p>
                  <p className="mt-1">Cafe â€¢ Cabins â€¢ Guided trails â€¢ Route help</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
