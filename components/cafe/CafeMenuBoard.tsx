'use client'

import { useMemo, useState } from 'react'

type MenuCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Drinks' | 'Add-ons'

type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  tags: string[]
}

type MenuData = Record<MenuCategory, MenuItem[]>

const WHATSAPP_NUMBER = '919999999999' // TODO: Replace with real Off the Trail WhatsApp number.

const menuData: MenuData = {
  Breakfast: [
    {
      id: 'breakfast-paratha-curd',
      name: 'Paratha + curd',
      description: 'Mountain breakfast with fresh curd and pickle.',
      price: 180,
      tags: ['Vegetarian'],
    },
    {
      id: 'breakfast-egg-toast',
      name: 'Egg toast',
      description: 'Simple high-energy start for trail days.',
      price: 160,
      tags: ['Protein'],
    },
    {
      id: 'breakfast-tea-honey',
      name: 'Tea + local honey',
      description: 'Warm tea with local honey.',
      price: 80,
      tags: ['Warm'],
    },
    {
      id: 'breakfast-porridge-bowl',
      name: 'Porridge bowl',
      description: 'Oats, fruit, and nuts for a slower morning.',
      price: 180,
      tags: ['Light'],
    },
  ],
  Lunch: [
    {
      id: 'lunch-dal-rice',
      name: 'Dal rice plate',
      description: 'Balanced meal for short recoveries and mid-day breaks.',
      price: 260,
      tags: ['Vegetarian'],
    },
    {
      id: 'lunch-sabzi-roti',
      name: 'Seasonal sabzi + roti',
      description: 'Simple local-style vegetables with fresh roti.',
      price: 240,
      tags: ['Vegetarian'],
    },
    {
      id: 'lunch-soup-bread',
      name: 'Soup + bread',
      description: 'Warm, light, and easy after travel.',
      price: 190,
      tags: ['Light'],
    },
    {
      id: 'lunch-rajma-rice',
      name: 'Rajma rice',
      description: 'Comfort food for mountain afternoons.',
      price: 280,
      tags: ['Vegetarian'],
    },
  ],
  Dinner: [
    {
      id: 'dinner-rice-curry',
      name: 'Rice + curry set',
      description: 'Warm service after sunset with fixed and custom options.',
      price: 320,
      tags: ['Comfort'],
    },
    {
      id: 'dinner-grilled-veg',
      name: 'Grilled seasonal vegetables',
      description: 'Simple grilled vegetables with local seasoning.',
      price: 260,
      tags: ['Vegetarian'],
    },
    {
      id: 'dinner-hot-soup',
      name: 'Hot soup',
      description: 'Warm bowl for cold evenings.',
      price: 160,
      tags: ['Warm'],
    },
    {
      id: 'dinner-simple-dessert',
      name: 'Simple dessert',
      description: "Ask for the day's sweet option.",
      price: 120,
      tags: ['Limited'],
    },
  ],
  Drinks: [
    {
      id: 'drinks-masala-tea',
      name: 'Masala tea',
      description: 'Classic hot tea for cold mountain air.',
      price: 70,
      tags: ['Warm'],
    },
    {
      id: 'drinks-coffee',
      name: 'Coffee',
      description: 'Fresh coffee for slow mornings and work sessions.',
      price: 120,
      tags: ['Cafe'],
    },
    {
      id: 'drinks-lemon-honey-ginger',
      name: 'Lemon honey ginger',
      description: 'Warm, soothing, and altitude-friendly.',
      price: 110,
      tags: ['Warm'],
    },
    {
      id: 'drinks-hot-chocolate',
      name: 'Hot chocolate',
      description: 'Rich and comforting for cold evenings.',
      price: 150,
      tags: ['Sweet'],
    },
  ],
  'Add-ons': [
    {
      id: 'addons-extra-roti',
      name: 'Extra roti',
      description: 'Add to lunch or dinner.',
      price: 30,
      tags: ['Add-on'],
    },
    {
      id: 'addons-boiled-eggs',
      name: 'Boiled eggs',
      description: 'Simple protein add-on.',
      price: 80,
      tags: ['Protein'],
    },
    {
      id: 'addons-packed-trail-snack',
      name: 'Packed trail snack',
      description: 'Carry something light for short walks.',
      price: 180,
      tags: ['Trail'],
    },
    {
      id: 'addons-bonfire-tea-setup',
      name: 'Bonfire tea setup',
      description: 'Tea service for slow evenings.',
      price: 350,
      tags: ['Group'],
    },
  ],
}

const categories = Object.keys(menuData) as MenuCategory[]

const allItems = Object.values(menuData).flat()
const itemMap = new Map(allItems.map((item) => [item.id, item]))

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

function createWhatsAppMessage(params: {
  selections: Record<string, number>
  roomNumber: string
  preferredTime: string
  notes: string
  total: number
}) {
  const { selections, roomNumber, preferredTime, notes, total } = params
  const selectedItems = Object.entries(selections)
    .map(([id, quantity]) => {
      const item = itemMap.get(id)
      if (!item) return null
      return `- ${quantity} x ${item.name} (${currency.format(item.price)})`
    })
    .filter(Boolean)
    .join('\n')

  const lines = [
    'Hi Off the Trail team, I would like to place a room order.',
    '',
    'Selected Items:',
    selectedItems || '- None selected',
    '',
    `Estimated total: ${currency.format(total)}`,
    `Room/Cabin: ${roomNumber || 'Not shared yet'}`,
    `Preferred time: ${preferredTime || 'As available'}`,
    `Notes: ${notes || 'None'}`,
  ]

  return encodeURIComponent(lines.join('\n'))
}

export default function CafeMenuBoard() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Breakfast')
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({})
  const [roomNumber, setRoomNumber] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [notes, setNotes] = useState('')

  const items = menuData[activeCategory]

  const total = useMemo(() => {
    return Object.entries(selectedItems).reduce((sum, [id, quantity]) => {
      const item = itemMap.get(id)
      if (!item) return sum
      return sum + item.price * quantity
    }, 0)
  }, [selectedItems])

  const selectedCount = useMemo(
    () => Object.values(selectedItems).reduce((count, quantity) => count + quantity, 0),
    [selectedItems],
  )

  const whatsappHref = useMemo(() => {
    const message = createWhatsAppMessage({
      selections: selectedItems,
      roomNumber,
      preferredTime,
      notes,
      total,
    })
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
  }, [selectedItems, roomNumber, preferredTime, notes, total])

  const adjustQuantity = (itemId: string, delta: number) => {
    setSelectedItems((prev) => {
      const next = { ...prev }
      const current = next[itemId] ?? 0
      const updated = current + delta
      if (updated <= 0) {
        delete next[itemId]
      } else {
        next[itemId] = updated
      }
      return next
    })
  }

  return (
    <section id="menu-board" className="bg-[#FFFCF6] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6D716B]">Choose your meal</p>
          <h2 className="mt-3 text-4xl font-serif text-[#17251F] md:text-5xl">Interactive Menu Board</h2>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'border-[#17251F] bg-[#17251F] text-[#FFFCF6]'
                    : 'border-[rgba(23,37,31,0.16)] bg-[#FFFCF6] text-[#17251F] hover:border-[#17251F]'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.65fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => {
              const quantity = selectedItems[item.id] ?? 0
              return (
                <article
                  key={item.id}
                  className="rounded-3xl border border-[rgba(23,37,31,0.10)] bg-[#FFFCF6] p-6 transition-shadow hover:shadow-[0_14px_30px_rgba(23,37,31,0.08)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-serif text-[#17251F]">{item.name}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6D716B]">{item.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[rgba(23,37,31,0.14)] px-2.5 py-1 text-xs font-medium text-[#17251F]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-[#17251F]">{currency.format(item.price)}</p>
                  </div>

                  <div className="mt-5">
                    {quantity > 0 ? (
                      <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(23,37,31,0.14)] bg-[#F4EFE4] px-3 py-2">
                        <button
                          type="button"
                          aria-label={`Decrease quantity for ${item.name}`}
                          onClick={() => adjustQuantity(item.id, -1)}
                          className="h-7 w-7 rounded-full border border-[rgba(23,37,31,0.25)] bg-[#FFFCF6] text-sm font-semibold text-[#17251F] transition hover:bg-[#17251F] hover:text-[#FFFCF6]"
                        >
                          -
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold text-[#17251F]">{quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity for ${item.name}`}
                          onClick={() => adjustQuantity(item.id, 1)}
                          className="h-7 w-7 rounded-full border border-[rgba(23,37,31,0.25)] bg-[#FFFCF6] text-sm font-semibold text-[#17251F] transition hover:bg-[#17251F] hover:text-[#FFFCF6]"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => adjustQuantity(item.id, 1)}
                        className="rounded-full bg-[#17251F] px-4 py-2 text-sm font-semibold text-[#FFFCF6] transition hover:bg-[#20372E]"
                      >
                        Add +
                      </button>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          <aside className="h-fit rounded-3xl border border-[rgba(23,37,31,0.12)] bg-[#F4EFE4] p-6 lg:sticky lg:top-24">
            <h3 className="text-2xl font-serif text-[#17251F]">Your room order</h3>
            <p className="mt-2 text-sm text-[#6D716B]">{selectedCount} item(s) selected</p>

            <div className="mt-5 space-y-3 border-y border-[rgba(23,37,31,0.14)] py-4">
              {Object.entries(selectedItems).length === 0 ? (
                <p className="text-sm text-[#6D716B]">Add items to start your order.</p>
              ) : (
                Object.entries(selectedItems).map(([itemId, quantity]) => {
                  const item = itemMap.get(itemId)
                  if (!item) return null
                  return (
                    <div key={itemId} className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#17251F]">{item.name}</p>
                        <p className="text-xs text-[#6D716B]">{quantity} x</p>
                      </div>
                      <p className="text-sm font-semibold text-[#17251F]">{currency.format(item.price * quantity)}</p>
                    </div>
                  )
                })
              )}
            </div>

            <p className="mt-4 text-lg font-semibold text-[#17251F]">Estimated total: {currency.format(total)}</p>

            <div className="mt-5 space-y-4">
              <label className="block text-sm font-medium text-[#17251F]">
                Cabin / room number
                <input
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm text-[#17251F] outline-none ring-0 placeholder:text-[#8A8D88] focus:border-[#17251F]"
                  placeholder="e.g. Cabin 3"
                />
              </label>

              <label className="block text-sm font-medium text-[#17251F]">
                Preferred time
                <input
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm text-[#17251F] outline-none ring-0 placeholder:text-[#8A8D88] focus:border-[#17251F]"
                  placeholder="e.g. 8:15 PM"
                />
              </label>

              <label className="block text-sm font-medium text-[#17251F]">
                Notes
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 min-h-[88px] w-full rounded-xl border border-[rgba(23,37,31,0.14)] bg-[#FFFCF6] px-3 py-2 text-sm text-[#17251F] outline-none ring-0 placeholder:text-[#8A8D88] focus:border-[#17251F]"
                  placeholder="Low spice, less oil, or anything else"
                />
              </label>
            </div>

            {selectedCount > 0 ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#17251F] px-4 py-3 text-sm font-semibold text-[#FFFCF6] transition hover:bg-[#20372E]"
              >
                Send order on WhatsApp →
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#17251F]/45 px-4 py-3 text-sm font-semibold text-[#FFFCF6]"
              >
                Add items to order
              </button>
            )}

            <p className="mt-3 text-xs text-[#6D716B]">We’ll confirm availability and timing before preparing.</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
