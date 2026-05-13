'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { DEFAULT_WHATSAPP_NUMBER, createWhatsAppLink } from '@/lib/enquiry'
import { trackConversion } from '@/lib/analytics'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const whatsappHref = createWhatsAppLink(
    DEFAULT_WHATSAPP_NUMBER,
    'Hi Off the Trail team, I would like help planning my trip.',
  )

  const experienceLinks = [
    { label: 'The Cafe', href: '/cafe' },
    { label: 'The Cabins', href: '/stays' },
    { label: 'The Trails', href: '/adventures' },
    { label: 'Packages', href: '/packages' },
  ]

  const basecampLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/contact' },
  ]

  const routeNotes = [
    'Best arrival: before 5 PM for clear mountain roads and easy check-in.',
    'Parking: available on-site with host-guided final approach.',
    'Network: strongest near Chamba town, patchy on upper stretches.',
    'Weather: ask before you come.',
  ]

  return (
    <footer className="overflow-hidden border-t border-[rgba(244,239,228,0.10)] bg-[#0F1E19] pb-10 pt-24 text-[#F4EFE4]">
      <div className="mx-auto w-full max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.6fr_0.6fr_1fr] lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link href="/" className="font-serif text-[42px] tracking-[-0.04em] text-[#F4EFE4]">
              Off the Trail
            </Link>
            <p className="mt-6 max-w-[420px] text-[17px] leading-[1.65] text-[rgba(244,239,228,0.66)]">
              A Chamba basecamp for warm food, quiet cabins, and guided days off the trail.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackConversion('whatsapp_click', { source: 'footer' })}
              className="group mt-8 inline-flex h-12 items-center gap-2 rounded-xl border border-[rgba(244,239,228,0.18)] px-[22px] text-[14px] font-semibold text-[#F4EFE4] transition-colors hover:border-[#C9782D]"
            >
              <span>Ask on WhatsApp</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
            <h4 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#C9782D]">Experience</h4>
            <ul className="space-y-4">
              {experienceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[15px] text-[rgba(244,239,228,0.70)] transition-colors hover:text-[#F4EFE4]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}>
            <h4 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#C9782D]">Basecamp</h4>
            <ul className="space-y-4">
              {basecampLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[15px] text-[rgba(244,239,228,0.70)] transition-colors hover:text-[#F4EFE4]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.24 }}>
            <h4 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#C9782D]">Route Reality</h4>
            <div className="space-y-4">
              {routeNotes.map((note) => (
                <p key={note} className="border-b border-[rgba(244,239,228,0.08)] pb-4 text-[15px] leading-[1.55] text-[rgba(244,239,228,0.66)]">
                  {note}
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 overflow-hidden whitespace-nowrap font-serif text-[clamp(56px,9.5vw,160px)] leading-[0.82] tracking-[-0.065em] text-[rgba(244,239,228,0.06)]"
        >
          OFF THE TRAIL
        </motion.p>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[rgba(244,239,228,0.08)] pt-6 text-[13px] text-[rgba(244,239,228,0.46)] md:flex-row">
          <p>© {currentYear} Off the Trail Basecamp. Built with intention.</p>
          <p>Chamba, Himachal Pradesh · 32.5534° N, 76.1258° E</p>
        </div>
      </div>
    </footer>
  )
}
