'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { EnquiryRequest, EnquiryResponse } from '@/lib/enquiry'
import { LinkButton } from '@/components/ui/button'
import {
  DEFAULT_WHATSAPP_NUMBER,
  buildEnquiryWhatsAppMessage,
  createWhatsAppLink,
} from '@/lib/enquiry'
import { trackConversion } from '@/lib/analytics'

const initialForm: EnquiryRequest = {
  dates: '',
  guests: '2 people',
  interest: 'Stay + Cafe + Trail',
  name: '',
  phone: '',
  notes: '',
  source: 'homepage-final-cta',
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="text-[11px] font-medium uppercase tracking-[0.16em] text-[rgba(244,239,228,0.52)]">
      {children}
    </label>
  )
}

const fieldClass =
  'h-16 w-full rounded-[18px] border border-[rgba(255,252,246,0.12)] bg-[rgba(255,252,246,0.06)] px-4 text-base text-[#FFFCF6] outline-none transition placeholder:text-[rgba(244,239,228,0.44)] focus:border-[rgba(201,120,45,0.65)] focus:shadow-[0_0_0_3px_rgba(201,120,45,0.12)]'

interface FinalHumanCTAProps {
  selectedDestination?: 'jibhi' | 'dalhousie'
}

export default function FinalHumanCTA({ selectedDestination = 'jibhi' }: FinalHumanCTAProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [formData, setFormData] = useState<EnquiryRequest>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryRequest, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [response, setResponse] = useState<EnquiryResponse | null>(null)

  const whatsappHref = useMemo(
    () =>
      createWhatsAppLink(
        DEFAULT_WHATSAPP_NUMBER,
        [
          `Hi Off the Trail, I want to plan a stay.`,
          ``,
          `Destination: ${selectedDestination === 'jibhi' ? 'Jibhi' : 'Dalhousie'}`,
          `Stay/Property: `,
          `Dates: ${formData.dates || ''}`,
          `Guests: ${formData.guests || ''}`,
          `Interest: ${formData.interest || ''}`,
          `Package: `,
          `Name: ${formData.name || ''}`,
          `Phone: ${formData.phone || ''}`,
          `Notes: ${formData.notes || ''}`,
          ``,
          `Please confirm availability, price, route details, and payment steps.`
        ].join('\n')
      ),
    [formData, selectedDestination],
  )

  function setField<K extends keyof EnquiryRequest>(key: K, value: EnquiryRequest[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
    trackConversion('enquiry_form_start', { field: key })
  }

  function validate() {
    const nextErrors: Partial<Record<keyof EnquiryRequest, string>> = {}
    if (!formData.dates.trim()) nextErrors.dates = 'Please share your ideal dates.'
    if (!formData.name.trim()) nextErrors.name = 'Please share your name.'
    if (!formData.phone.trim()) nextErrors.phone = 'Please share your WhatsApp number.'
    if (!formData.interest.trim()) nextErrors.interest = 'Please select your primary interest.'
    return nextErrors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      trackConversion('enquiry_error', { source: formData.source, reason: 'validation' })
      return
    }

    trackConversion('enquiry_submit', { source: formData.source })
    setSubmitting(true)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          notes: `Selected Destination: ${selectedDestination === 'jibhi' ? 'Jibhi' : 'Dalhousie'}\n\n${formData.notes}`
        }),
      })
      if (!res.ok) throw new Error('Failed to submit enquiry')
      const data = (await res.json()) as EnquiryResponse
      setResponse(data)
      setStep('success')
      trackConversion('enquiry_success', { source: formData.source })
      trackConversion('confirmation_view', { source: formData.source })
    } catch {
      setErrors({ notes: 'Could not submit right now. Please try WhatsApp below.' })
      trackConversion('enquiry_error', { source: formData.source, reason: 'network' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="enquiry"
      className="paper-grain relative overflow-hidden bg-[#0F1E19] pb-[120px] pt-[160px]"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(201,120,45,0.10), transparent 34%)' }}
    >
      <div className="mx-auto w-full max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:gap-[clamp(56px,7vw,120px)]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-[18px] text-[12px] font-semibold uppercase tracking-[0.22em] text-[#C9782D]">FINAL STEP</p>
            <h2 className="font-serif text-[clamp(56px,6vw,96px)] leading-[0.9] tracking-[-0.05em] text-[#F4EFE4]">
              Ready to plan
              <br />
              your stay?
            </h2>
            <p className="mt-7 max-w-[540px] text-[18px] leading-[1.65] text-[rgba(244,239,228,0.72)]">
              Choose Jibhi or Dalhousie, share your dates and guests, and we’ll help you confirm the right stay.
            </p>

            <div className="mt-12 max-w-[560px]">
              <p className="mb-3 text-[13px] uppercase tracking-[0.18em] text-[rgba(244,239,228,0.50)]">What happens next</p>
              {[
                'We check stay availability',
                'We suggest the right basecamp plan',
                'We confirm details on WhatsApp',
              ].map((line, idx) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-[rgba(244,239,228,0.10)] py-[18px]"
                >
                  <span className="text-[12px] font-bold tracking-[0.14em] text-[#C9782D]">{String(idx + 1).padStart(2, '0')}</span>
                  <p className="text-[16px] text-[rgba(244,239,228,0.82)]">{line}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div>
            <AnimatePresence mode="wait">
              {step === 'form' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[36px] border border-[rgba(255,252,246,0.14)] bg-[rgba(255,252,246,0.06)] p-8 shadow-[0_32px_100px_rgba(0,0,0,0.18)] backdrop-blur-[18px]"
                >
                  <h3 className="font-serif text-[36px] leading-none tracking-[-0.035em] text-[#F4EFE4]">Plan details</h3>
                  <p className="mb-8 mt-3 text-[15px] leading-[1.6] text-[rgba(244,239,228,0.62)]">
                    No payment needed now. We&apos;ll confirm availability and route details before you decide.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <FieldLabel htmlFor="dates">Ideal dates</FieldLabel>
                        <input
                          id="dates"
                          name="dates"
                          type="text"
                          placeholder="e.g. May 24-26"
                          className={fieldClass}
                          value={formData.dates}
                          onChange={(e) => setField('dates', e.target.value)}
                        />
                        {errors.dates && <p className="text-xs text-[#f5c08f]">{errors.dates}</p>}
                      </div>

                      <div className="space-y-2">
                        <FieldLabel htmlFor="guests">Guest count</FieldLabel>
                        <select
                          id="guests"
                          name="guests"
                          className={fieldClass}
                          value={formData.guests}
                          onChange={(e) => setField('guests', e.target.value)}
                        >
                          <option value="2 people">2 people</option>
                          <option value="3 people">3 people</option>
                          <option value="4 people">4 people</option>
                          <option value="5+ people">5+ people</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          className={fieldClass}
                          value={formData.name}
                          onChange={(e) => setField('name', e.target.value)}
                        />
                        {errors.name && <p className="text-xs text-[#f5c08f]">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <FieldLabel htmlFor="phone">WhatsApp number</FieldLabel>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 ..."
                          className={fieldClass}
                          value={formData.phone}
                          onChange={(e) => setField('phone', e.target.value)}
                        />
                        {errors.phone && <p className="text-xs text-[#f5c08f]">{errors.phone}</p>}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <FieldLabel htmlFor="interest">Primary interest</FieldLabel>
                        <select
                          id="interest"
                          name="interest"
                          className={fieldClass}
                          value={formData.interest}
                          onChange={(e) => setField('interest', e.target.value)}
                        >
                          <option value="Stay + Cafe + Trail">Stay + Cafe + Trail</option>
                          <option value="Cabin stay">Cabin stay</option>
                          <option value="Cafe visit">Cafe visit</option>
                          <option value="Trail / adventure">Trail / adventure</option>
                          <option value="Workation">Workation</option>
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                        {errors.interest && <p className="text-xs text-[#f5c08f]">{errors.interest}</p>}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <FieldLabel htmlFor="notes">Notes</FieldLabel>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={4}
                          placeholder="Arrival time, food preferences, questions..."
                          className="min-h-[120px] w-full rounded-[18px] border border-[rgba(255,252,246,0.12)] bg-[rgba(255,252,246,0.06)] p-4 text-base text-[#FFFCF6] outline-none transition placeholder:text-[rgba(244,239,228,0.44)] focus:border-[rgba(201,120,45,0.65)] focus:shadow-[0_0_0_3px_rgba(201,120,45,0.12)]"
                          value={formData.notes}
                          onChange={(e) => setField('notes', e.target.value)}
                        />
                        {errors.notes && <p className="text-xs text-[#f5c08f]">{errors.notes}</p>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-6 pt-2 md:flex-row md:items-center md:justify-between">
                      <p className="max-w-[360px] text-[14px] leading-[1.5] text-[rgba(244,239,228,0.58)]">
                        No payment required now. We confirm everything on WhatsApp.
                      </p>
                      <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={submitting}
                        className="group inline-flex h-[58px] w-full items-center justify-center gap-[10px] rounded-[16px] bg-[#C9782D] px-7 text-[15px] font-bold text-[#FFFCF6] transition-colors hover:bg-[#D98A3A] disabled:opacity-60 md:w-auto"
                      >
                        <span>{submitting ? 'Sending...' : 'Send stay enquiry'}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[36px] border border-[rgba(255,252,246,0.14)] bg-[rgba(255,252,246,0.06)] p-8 shadow-[0_32px_100px_rgba(0,0,0,0.18)] backdrop-blur-[18px]"
                >
                  <h3 className="font-serif text-[46px] leading-[0.95] tracking-[-0.04em] text-[#F4EFE4]">We&apos;ve got your plan.</h3>
                  <p className="mt-4 text-[16px] leading-[1.6] text-[rgba(244,239,228,0.74)]">
                    We&apos;ll confirm availability, route details, and the best basecamp option on WhatsApp.
                  </p>
                  <p className="mt-2 text-sm text-[rgba(244,239,228,0.56)]">Enquiry ID: {response?.enquiryId}</p>

                  <div className="mt-6 space-y-2 rounded-2xl border border-[rgba(255,252,246,0.14)] bg-[rgba(255,252,246,0.04)] p-4 text-[15px] text-[rgba(244,239,228,0.84)]">
                    <p><strong className="text-[#F4EFE4]">Interest:</strong> {formData.interest}</p>
                    <p><strong className="text-[#F4EFE4]">Guests:</strong> {formData.guests}</p>
                    <p><strong className="text-[#F4EFE4]">Dates:</strong> {formData.dates || 'To be shared'}</p>
                  </div>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackConversion('whatsapp_click', { source: `${formData.source}-success` })}
                    className="group mt-7 inline-flex h-[56px] w-full items-center justify-center gap-2 rounded-[16px] bg-[#C9782D] px-7 text-[15px] font-bold text-[#FFFCF6] transition-colors hover:bg-[#D98A3A] md:w-auto"
                  >
                    <span>Continue on WhatsApp</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-4 rounded-[22px] border border-[rgba(255,252,246,0.10)] bg-[rgba(255,252,246,0.04)] p-[18px]">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[16px] font-medium text-[#F4EFE4]">Prefer a quick answer?</p>
                  <p className="text-[14px] text-[rgba(244,239,228,0.66)]">
                    Ask on WhatsApp. We&apos;ll help you choose before you book.
                  </p>
                </div>
                <LinkButton
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackConversion('whatsapp_click', { source: formData.source })}
                  variant="secondary"
                  showArrow
                  className="w-full whitespace-nowrap border-[#F4EFE4]/30 bg-white/[0.06] px-6 text-[#F4EFE4] shadow-[0_14px_34px_rgba(0,0,0,0.22)] hover:border-[#E5D5B5]/70 hover:bg-white/[0.14] md:w-auto"
                >
                  Ask before booking
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
