'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'

type Cabin = {
  id: string
  name: string
  line: string
  bestFor: string
  sleeps: string
  nightlyRate: number
  image: string
  features: string[]
  comfort: string[]
}

type AddOn = {
  id: string
  label: string
  price: number
  perPerson: boolean
}

const WHATSAPP_NUMBER = '919999999999' // TODO: Replace with real Off the Trail WhatsApp number.
const UPI_ID = 'offtrail@upi' // TODO: Replace with real UPI ID before production.

const cabins: Cabin[] = [
  {
    id: 'pine-deck',
    name: 'Pine Deck Cabin',
    line: 'Balanced comfort for couples and small groups close to the cafe zone.',
    bestFor: 'Couples / small groups',
    sleeps: '2-3 guests',
    nightlyRate: 4500,
    image: '/images/offtrail/cabin-window.jpg', // TODO: Replace with /images/cabins/pine-deck.jpg
    features: ['Heater available', 'Hot water', 'Two-layer wool bedding', 'Cafe nearby', 'Bonfire access'],
    comfort: ['Winter nights: 2C to 8C', 'Daytime: 10C to 18C'],
  },
  {
    id: 'trail-view',
    name: 'Trail View Cabin',
    line: 'A quieter cabin for guests prioritizing early mornings and trail starts.',
    bestFor: 'Trail-first guests',
    sleeps: '2 guests',
    nightlyRate: 5200,
    image: '/images/trails.png', // TODO: Replace with /images/cabins/trail-view.jpg
    features: ['Early breakfast support', 'Hot water', 'Drying rack', 'Trail briefing', 'Quiet zone'],
    comfort: ['Winter nights: 0C to 5C', 'Daytime: 9C to 16C'],
  },
]

const addOns: AddOn[] = [
  { id: 'breakfast', label: 'Breakfast add-on', price: 350, perPerson: true },
  { id: 'dinner', label: 'Dinner add-on', price: 650, perPerson: true },
  { id: 'bonfire-tea', label: 'Bonfire tea setup', price: 350, perPerson: false },
  { id: 'trail-snack', label: 'Packed trail snack', price: 180, perPerson: true },
  { id: 'guided-walk', label: 'Local guided walk', price: 1200, perPerson: false },
]

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

function formatDate(date: string) {
  if (!date) return 'Not selected'
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function dateDiffNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0
  const inDate = new Date(checkIn)
  const outDate = new Date(checkOut)
  const diff = outDate.getTime() - inDate.getTime()
  const nights = Math.floor(diff / (1000 * 60 * 60 * 24))
  return nights > 0 ? nights : 0
}

export default function CabinBookingDesk() {
  const [selectedCabinId, setSelectedCabinId] = useState<string>(cabins[0].id)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>({})
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [showPaymentStep, setShowPaymentStep] = useState(false)

  const selectedCabin = cabins.find((c) => c.id === selectedCabinId) ?? cabins[0]
  const nights = useMemo(() => dateDiffNights(checkIn, checkOut), [checkIn, checkOut])

  const addOnTotal = useMemo(() => {
    return addOns.reduce((sum, addOn) => {
      if (!selectedAddOns[addOn.id]) return sum
      return sum + (addOn.perPerson ? addOn.price * guests : addOn.price)
    }, 0)
  }, [selectedAddOns, guests])

  const estimate = useMemo(() => {
    if (!nights) return 0
    return selectedCabin.nightlyRate * nights + addOnTotal
  }, [selectedCabin, nights, addOnTotal])

  const selectedAddOnLabels = addOns.filter((addOn) => selectedAddOns[addOn.id]).map((addOn) => addOn.label)

  const canContinueToPayment =
    Boolean(selectedCabin) && Boolean(checkIn) && Boolean(checkOut) && nights > 0 && guests > 0 && Boolean(name.trim()) && Boolean(phone.trim())

  const whatsappMessage = useMemo(() => {
    const message = [
      'Hi Off the Trail, I have made a UPI payment for my cabin booking.',
      '',
      `Cabin: ${selectedCabin.name}`,
      `Check-in: ${formatDate(checkIn)}`,
      `Check-out: ${formatDate(checkOut)}`,
      `Guests: ${guests}`,
      `Nights: ${nights || 'Not selected'}`,
      `Add-ons: ${selectedAddOnLabels.length ? selectedAddOnLabels.join(', ') : 'None'}`,
      `Estimated amount: ${currency.format(estimate)}`,
      `Name: ${name || 'Not shared'}`,
      `Phone: ${phone || 'Not shared'}`,
      `Notes: ${notes || 'None'}`,
      '',
      'I will share the payment screenshot here.',
    ].join('\n')

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }, [selectedCabin, checkIn, checkOut, guests, nights, selectedAddOnLabels, estimate, name, phone, notes])

  return (
    <section id="cabin-booking" className="bg-[#FFFCF6] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6D716B]">Choose your cabin</p>
        <h2 className="mt-3 text-4xl font-serif text-[#17251F] md:text-5xl">The Cabin Booking Desk</h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            {cabins.map((cabin) => {
              const isSelected = selectedCabinId === cabin.id
              return (
                <article
                  key={cabin.id}
                  className={`overflow-hidden rounded-[24px] border bg-[#FFFCF6] transition ${
                    isSelected
                      ? 'border-[#17251F] shadow-[0_16px_30px_rgba(23,37,31,0.12)]'
                      : 'border-[rgba(23,37,31,0.10)]'
                  }`}
                >
                  <div className="grid md:grid-cols-[1.1fr_1fr]">
                    <div className="relative min-h-[240px]">
                      <Image src={cabin.image} alt={cabin.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-3xl font-serif text-[#17251F]">{cabin.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6D716B]">{cabin.line}</p>
                      <p className="mt-4 text-sm font-medium text-[#17251F]">
                        {cabin.sleeps} · {cabin.bestFor}
                      </p>
                      <ul className="mt-4 space-y-1 text-sm text-[#6D716B]">
                        {cabin.features.slice(0, 3).map((feature) => (
                          <li key={feature}>- {feature}</li>
                        ))}
                      </ul>
                      <p className="mt-4 text-xl font-semibold text-[#17251F]">From {currency.format(cabin.nightlyRate)} / night</p>
                      <button
                        type="button"
                        onClick={() => setSelectedCabinId(cabin.id)}
                        className={`mt-4 rounded-full px-5 py-2 text-sm font-semibold transition ${
                          isSelected ? 'bg-[#17251F] text-[#FFFCF6]' : 'border border-[rgba(23,37,31,0.18)] text-[#17251F]'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select cabin'}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <aside className="h-fit rounded-[24px] border border-[rgba(23,37,31,0.12)] bg-[#F4EFE4] p-6 lg:sticky lg:top-24">
            <h3 className="text-3xl font-serif text-[#17251F]">Your stay plan</h3>
            <p className="mt-2 text-sm text-[#6D716B]">No booking is confirmed until UPI payment is verified on WhatsApp.</p>

            <div className="mt-5 rounded-2xl border border-[rgba(23,37,31,0.10)] bg-[#FFFCF6] p-4">
              <p className="text-sm font-semibold text-[#17251F]">{selectedCabin.name}</p>
              <p className="mt-1 text-xs text-[#6D716B]">{selectedCabin.sleeps}</p>
              <p className="text-xs text-[#6D716B]">{selectedCabin.bestFor}</p>
              <p className="mt-2 text-sm font-semibold text-[#17251F]">{currency.format(selectedCabin.nightlyRate)} / night</p>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="text-sm font-medium text-[#17251F]">
                Check-in date
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.16)] bg-[#FFFCF6] px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-medium text-[#17251F]">
                Check-out date
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.16)] bg-[#FFFCF6] px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-medium text-[#17251F]">
                Guests
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value) || 1)}
                  className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.16)] bg-[#FFFCF6] px-3 py-2 text-sm"
                />
              </label>
            </div>

            <fieldset className="mt-5">
              <legend className="text-sm font-medium text-[#17251F]">Add-ons</legend>
              <div className="mt-2 space-y-2">
                {addOns.map((addOn) => (
                  <label key={addOn.id} className="flex items-start gap-2 text-sm text-[#17251F]">
                    <input
                      type="checkbox"
                      checked={Boolean(selectedAddOns[addOn.id])}
                      onChange={(e) =>
                        setSelectedAddOns((prev) => ({
                          ...prev,
                          [addOn.id]: e.target.checked,
                        }))
                      }
                      className="mt-1"
                    />
                    <span>
                      {addOn.label} ({currency.format(addOn.price)}
                      {addOn.perPerson ? ' per person' : ''})
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-5 grid gap-4">
              <label className="text-sm font-medium text-[#17251F]">
                Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.16)] bg-[#FFFCF6] px-3 py-2 text-sm"
                  placeholder="Your name"
                />
              </label>
              <label className="text-sm font-medium text-[#17251F]">
                WhatsApp number
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.16)] bg-[#FFFCF6] px-3 py-2 text-sm"
                  placeholder="+91..."
                />
              </label>
              <label className="text-sm font-medium text-[#17251F]">
                Notes
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 min-h-[80px] w-full rounded-xl border border-[rgba(23,37,31,0.16)] bg-[#FFFCF6] px-3 py-2 text-sm"
                  placeholder="Any preferences"
                />
              </label>
            </div>

            <div className="mt-5 rounded-2xl border border-[rgba(23,37,31,0.12)] bg-[#FFFCF6] p-4">
              {nights > 0 ? (
                <>
                  <p className="text-sm text-[#6D716B]">Nights: {nights}</p>
                  <p className="mt-1 text-lg font-semibold text-[#17251F]">Estimate: {currency.format(estimate)}</p>
                </>
              ) : (
                <p className="text-sm text-[#6D716B]">Select dates to see estimate.</p>
              )}
            </div>

            <button
              type="button"
              disabled={!canContinueToPayment}
              onClick={() => setShowPaymentStep(true)}
              className={`mt-5 w-full rounded-xl px-4 py-3 text-sm font-semibold ${
                canContinueToPayment ? 'bg-[#17251F] text-[#FFFCF6]' : 'bg-[#17251F]/40 text-[#FFFCF6]'
              }`}
            >
              Continue to UPI
            </button>
          </aside>
        </div>

        {showPaymentStep && (
          <section id="upi-payment" className="mt-10 rounded-[24px] border border-[rgba(23,37,31,0.12)] bg-[#F4EFE4] p-6 md:p-8">
            <h3 className="text-3xl font-serif text-[#17251F]">Pay using UPI</h3>
            <p className="mt-2 text-sm text-[#6D716B]">
              Your booking is confirmed only after payment verification on WhatsApp. Please send the payment screenshot after paying.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-[1fr_280px]">
              <div className="rounded-2xl border border-[rgba(23,37,31,0.10)] bg-[#FFFCF6] p-5 text-sm text-[#17251F]">
                <p><strong>Cabin:</strong> {selectedCabin.name}</p>
                <p><strong>Check-in:</strong> {formatDate(checkIn)}</p>
                <p><strong>Check-out:</strong> {formatDate(checkOut)}</p>
                <p><strong>Guests:</strong> {guests}</p>
                <p><strong>Nights:</strong> {nights}</p>
                <p><strong>Estimated amount:</strong> {currency.format(estimate)}</p>
                <p className="mt-3"><strong>UPI ID:</strong> {UPI_ID}</p>
              </div>
              <div className="rounded-2xl border border-dashed border-[rgba(23,37,31,0.25)] bg-[#FFFCF6] p-5 text-center">
                <p className="text-xs uppercase tracking-[0.12em] text-[#6D716B]">UPI QR</p>
                <div className="mt-3 flex h-[220px] items-center justify-center rounded-xl border border-[rgba(23,37,31,0.10)] bg-[#F4EFE4] px-4 text-sm text-[#6D716B]">
                  UPI QR will be added here.
                </div>
                <p className="mt-3 text-xs text-[#6D716B]">TODO: Add `/images/payment/upi-qr.png` before production.</p>
              </div>
            </div>

            <a
              href={whatsappMessage}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-xl bg-[#17251F] px-5 py-3 text-sm font-semibold text-[#FFFCF6]"
            >
              I have paid. Confirm on WhatsApp
            </a>
            <p className="mt-2 text-xs text-[#6D716B]">Please do not close this page until you send the WhatsApp confirmation.</p>
          </section>
        )}
      </div>
    </section>
  )
}
