'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { trackConversion } from '@/lib/analytics'

const navItems = [
  { label: 'The Cafe', href: '/cafe' },
  { label: 'The Cabins', href: '/stays' },
  { label: 'The Trails', href: '/adventures' },
  { label: 'Packages', href: '/packages' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-border/50 bg-base/80 py-4 backdrop-blur-md' : 'bg-transparent py-6'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        <Link href="/" className="group">
          <span className={`font-serif text-2xl transition-colors ${scrolled ? 'text-primary' : 'text-surface'}`}>
            Off the Trail
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`font-sans text-[13px] uppercase tracking-widest transition-colors ${
                scrolled ? 'text-text-muted hover:text-primary' : 'text-surface/70 hover:text-surface'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`rounded-sm px-8 py-2 text-xs font-medium uppercase tracking-widest transition-all ${
              scrolled ? 'bg-primary text-surface hover:bg-primary/90' : 'bg-surface text-primary hover:bg-surface/90'
            }`}
            onClick={() => trackConversion('cta_click', { source: 'nav', target: '/contact' })}
          >
            Plan My Stay
          </Link>
        </div>

        <button
          onClick={() => setIsOpen((value) => !value)}
          className="group flex h-6 w-6 flex-col justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className={`h-0.5 w-full origin-center transition-colors ${scrolled || isOpen ? 'bg-primary' : 'bg-surface'}`}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className={`h-0.5 w-full transition-colors ${scrolled || isOpen ? 'bg-primary' : 'bg-surface'}`}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className={`h-0.5 w-full origin-center transition-colors ${scrolled || isOpen ? 'bg-primary' : 'bg-surface'}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-0 z-40 flex h-screen flex-col items-center justify-center space-y-12 bg-surface md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-serif text-primary transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => {
                trackConversion('cta_click', { source: 'nav-mobile', target: '/contact' })
                setIsOpen(false)
              }}
              className="rounded-sm bg-primary px-12 py-4 text-sm font-semibold uppercase tracking-widest text-surface"
            >
              Plan My Stay
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
