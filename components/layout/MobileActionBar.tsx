'use client'

import { ArrowRight } from 'lucide-react'
import { trackConversion } from '@/lib/analytics'
import { DEFAULT_WHATSAPP_NUMBER, createWhatsAppLink } from '@/lib/enquiry'

export default function MobileActionBar() {
  const whatsappHref = createWhatsAppLink(
    DEFAULT_WHATSAPP_NUMBER,
    'Hi Off the Trail team, I would like help planning my trip.',
  )

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-2 gap-2 rounded-[18px] border border-[rgba(23,37,31,0.12)] bg-[rgba(255,252,246,0.90)] p-2 shadow-[0_18px_60px_rgba(23,37,31,0.16)] backdrop-blur-[18px] md:hidden">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackConversion('whatsapp_click', { source: 'mobile-action-bar' })}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[rgba(23,37,31,0.12)] bg-[#F4EFE4] text-sm font-semibold text-[#17251F]"
      >
        Ask on WhatsApp
      </a>
      <a
        href="#enquiry"
        onClick={() => trackConversion('cta_click', { source: 'mobile-action-bar', target: '#enquiry' })}
        className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#17251F] px-4 text-[15px] font-semibold tracking-[-0.01em] text-[#FFFCF6]"
      >
        <span>Plan My Stay</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </a>
    </div>
  )
}

