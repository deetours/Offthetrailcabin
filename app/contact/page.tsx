'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import type { EnquiryRequest, EnquiryResponse } from '@/lib/enquiry'
import {
  DEFAULT_WHATSAPP_NUMBER,
  buildEnquiryWhatsAppMessage,
  createWhatsAppLink,
} from '@/lib/enquiry'
import { trackConversion } from '@/lib/analytics'

const initialForm: EnquiryRequest = {
  dates: '',
  guests: '2',
  interest: 'Plan My Stay',
  name: '',
  phone: '',
  notes: '',
  source: 'contact-page',
}

export default function ContactPage() {
  const [formData, setFormData] = useState<EnquiryRequest>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryRequest, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [response, setResponse] = useState<EnquiryResponse | null>(null)

  const whatsappHref = useMemo(
    () =>
      createWhatsAppLink(
        DEFAULT_WHATSAPP_NUMBER,
        buildEnquiryWhatsAppMessage({
          source: formData.source,
          dates: formData.dates,
          guests: formData.guests,
          interest: formData.interest,
          name: formData.name,
          phone: formData.phone,
        }),
      ),
    [formData],
  )

  function setField<K extends keyof EnquiryRequest>(key: K, value: EnquiryRequest[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate() {
    const nextErrors: Partial<Record<keyof EnquiryRequest, string>> = {}
    if (!formData.name.trim()) nextErrors.name = 'Please add your name.'
    if (!formData.phone.trim()) nextErrors.phone = 'Please add your phone number.'
    if (!formData.dates.trim()) nextErrors.dates = 'Please add your dates.'
    if (!formData.notes.trim()) nextErrors.notes = 'Please add a short plan note.'
    return nextErrors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      trackConversion('enquiry_error', { source: 'contact-page', reason: 'validation' })
      return
    }

    setSubmitting(true)
    trackConversion('enquiry_submit', { source: 'contact-page' })
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Failed')
      const data = (await res.json()) as EnquiryResponse
      setResponse(data)
      trackConversion('enquiry_success', { source: 'contact-page' })
      trackConversion('confirmation_view', { source: 'contact-page' })
      setFormData(initialForm)
    } catch {
      setErrors({ notes: 'Submission failed. Please continue on WhatsApp.' })
      trackConversion('enquiry_error', { source: 'contact-page', reason: 'network' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navigation />
      <main className="overflow-hidden">
        <section className="bg-base pb-12 pt-32">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="mb-4 text-5xl font-serif text-primary md:text-6xl">Plan With a Real Host</h1>
            <p className="max-w-2xl text-xl text-text-muted">
              Share your dates and we will help you choose the right stay, meal, and trail plan for Chamba.
            </p>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="space-y-8 md:col-span-1">
                <h2 className="text-2xl font-serif text-primary">Contact</h2>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-text-muted">Phone</p>
                  <a href="tel:+919876543210" className="mt-2 block text-lg text-primary">
                    +91 98765 43210
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-text-muted">WhatsApp</p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-lg text-primary underline underline-offset-4"
                    onClick={() => trackConversion('whatsapp_click', { source: 'contact-page' })}
                  >
                    Ask on WhatsApp
                  </a>
                </div>
                <p className="text-sm text-text-muted">
                  Response window: within 2 hours, 8:00 AM to 9:00 PM IST.
                </p>
              </div>

              <div className="md:col-span-2">
                {response ? (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-border bg-base p-8">
                    <h3 className="text-2xl font-serif text-primary">We’ve got your plan.</h3>
                    <p className="mt-3 text-text-muted">
                      Enquiry ID: {response.enquiryId}. Expected response: {response.estimatedResponseTime}.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-primary">
                      {response.nextSteps.map((step) => (
                        <li key={step}>• {step}</li>
                      ))}
                    </ul>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-block rounded-sm bg-accent px-6 py-3 font-semibold text-surface"
                      onClick={() => trackConversion('whatsapp_click', { source: 'contact-page-success' })}
                    >
                      Continue on WhatsApp
                    </a>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-border bg-base p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">Name</label>
                        <input className="mt-2 w-full rounded-sm border border-border bg-surface px-3 py-2" value={formData.name} onChange={(e) => setField('name', e.target.value)} />
                        {errors.name && <p className="mt-1 text-xs text-accent">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">Phone</label>
                        <input className="mt-2 w-full rounded-sm border border-border bg-surface px-3 py-2" value={formData.phone} onChange={(e) => setField('phone', e.target.value)} />
                        {errors.phone && <p className="mt-1 text-xs text-accent">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">Dates</label>
                        <input className="mt-2 w-full rounded-sm border border-border bg-surface px-3 py-2" value={formData.dates} onChange={(e) => setField('dates', e.target.value)} />
                        {errors.dates && <p className="mt-1 text-xs text-accent">{errors.dates}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">Guests</label>
                        <select className="mt-2 w-full rounded-sm border border-border bg-surface px-3 py-2" value={formData.guests} onChange={(e) => setField('guests', e.target.value)}>
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="3">3 People</option>
                          <option value="4+">4+ People</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">Primary Interest</label>
                      <select className="mt-2 w-full rounded-sm border border-border bg-surface px-3 py-2" value={formData.interest} onChange={(e) => setField('interest', e.target.value)}>
                        <option>Plan My Stay</option>
                        <option>Visit the Cafe</option>
                        <option>Explore Adventures</option>
                        <option>Stay + Cafe + Trail</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-widest text-text-muted">Notes</label>
                      <textarea rows={4} className="mt-2 w-full rounded-sm border border-border bg-surface px-3 py-2" value={formData.notes} onChange={(e) => setField('notes', e.target.value)} />
                      {errors.notes && <p className="mt-1 text-xs text-accent">{errors.notes}</p>}
                    </div>
                    <button disabled={submitting} className="rounded-sm bg-primary px-6 py-3 font-semibold text-surface disabled:opacity-60">
                      {submitting ? 'Sending...' : 'Send My Enquiry'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
