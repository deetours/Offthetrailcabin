'use client'

import Link from 'next/link'
import { DEFAULT_WHATSAPP_NUMBER, createWhatsAppLink } from '@/lib/enquiry'
import { trackConversion } from '@/lib/analytics'

interface HumanHelpCTAProps {
  source: string
}

export default function HumanHelpCTA({ source }: HumanHelpCTAProps) {
  const whatsappHref = createWhatsAppLink(
    DEFAULT_WHATSAPP_NUMBER,
    `Hi Off the Trail team, I need help choosing the best plan. Source: ${source}`,
  )

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-text-muted">Human Help</p>
      <h3 className="mt-2 text-2xl font-serif text-primary">Still deciding? We can help.</h3>
      <p className="mt-2 text-sm text-text-muted">
        Tell us your dates and we will reply within 2 hours with the right stay, meal, and trail plan.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-surface"
          onClick={() => trackConversion('cta_click', { source, target: '/contact' })}
        >
          Plan My Stay
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-sm border border-border px-5 py-3 text-sm font-semibold text-primary"
          onClick={() => trackConversion('whatsapp_click', { source })}
        >
          Ask on WhatsApp
        </a>
      </div>
    </div>
  )
}
