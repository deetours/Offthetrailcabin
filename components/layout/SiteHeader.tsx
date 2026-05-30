'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { trackConversion } from '@/lib/analytics'
import { LinkButton } from '@/components/ui/button'
import MobileActionBar from '@/components/layout/MobileActionBar'

const navItems = [
  { label: 'The Cafe', href: '/cafe' },
  { label: 'The Cabins', href: '/stays' },
  { label: 'The Trails', href: '/adventures' },
  { label: 'Packages', href: '/packages' },
]

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
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

          <div className="flex items-center justify-self-end gap-2">
            <LinkButton
              href="#stay-desk"
              onClick={() => trackConversion('cta_click', { source: 'site-header', target: '#stay-desk' })}
              variant="booking"
              showArrow
              className="hidden sm:inline-flex"
            >
              Plan My Stay
            </LinkButton>
          </div>
        </div>
      </header>

      <MobileActionBar />
    </>
  )
}
