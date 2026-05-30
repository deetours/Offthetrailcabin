'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { LinkButton } from '@/components/ui/button'
import Image from 'next/image'

type MenuCategory = 'Breakfast' | 'Lunch' | 'Dinner' | 'Drinks' | 'Add-ons'

type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  tags: string[]
  image?: string
}

type MenuData = Record<MenuCategory, MenuItem[]>

const WHATSAPP_NUMBER = '919999999999'

const menuData: MenuData = {
  Breakfast: [
    { id: 'b1', name: 'Paratha + curd', description: 'Mountain breakfast served with fresh home-set curd and seasonal pickle.', price: 180, tags: ['Vegetarian'], image: '/images/offtrail/cafe-food.jpg' },
    { id: 'b2', name: 'Egg toast', description: 'Simple high-energy pan-fried egg toast for early trail days.', price: 160, tags: ['Protein'], image: '/images/food.png' },
    { id: 'b3', name: 'Tea + local honey', description: 'Warm tea service brewed with forest wildflower honey.', price: 80, tags: ['Warm'], image: '/images/bonfire.png' },
    { id: 'b4', name: 'Porridge bowl', description: 'Toasted oats, dried mountain fruit, and seeds for a slow morning.', price: 180, tags: ['Light'], image: '/images/offtrail/cafe-food.jpg' },
  ],
  Lunch: [
    { id: 'l1', name: 'Dal rice plate', description: 'A balanced local-style lentil and rice plate for mid-day recovery.', price: 260, tags: ['Vegetarian'] },
    { id: 'l2', name: 'Seasonal sabzi + roti', description: 'Simple seasonal garden vegetables served with fresh clay-oven roti.', price: 240, tags: ['Vegetarian'] },
    { id: 'l3', name: 'Soup + bread', description: 'Light clear vegetable soup served with fresh fire-baked bread.', price: 190, tags: ['Light'] },
    { id: 'l4', name: 'Rajma rice', description: 'Hearty high-country red kidney bean curry served over steamed rice.', price: 280, tags: ['Comfort'] },
  ],
  Dinner: [
    { id: 'd1', name: 'Rice + curry set', description: 'Warm evening comfort meal featuring our rotating daily chef curry.', price: 320, tags: ['Comfort'] },
    { id: 'd2', name: 'Grilled seasonal vegetables', description: 'Charred garden-fresh greens and tubers with local spices.', price: 260, tags: ['Vegetarian'] },
    { id: 'd3', name: 'Hot soup', description: 'A steaming bowl of spiced mountain herb soup for cold valley nights.', price: 160, tags: ['Warm'] },
  ],
  Drinks: [
    { id: 'dr1', name: 'Masala tea', description: 'Spiced ginger and cardamom milk tea, the classic mountain companion.', price: 70, tags: ['Warm'] },
    { id: 'dr2', name: 'Coffee', description: 'Freshly ground and slow-dripped coffee for calm valley views.', price: 120, tags: ['Cafe'] },
    { id: 'dr3', name: 'Hot chocolate', description: 'Rich dark cocoa cooked slow, perfect for starlit cabin porch nights.', price: 150, tags: ['Sweet'] },
  ],
  'Add-ons': [
    { id: 'a1', name: 'Extra roti', description: 'Fresh stone-ground wheat flatbread.', price: 30, tags: ['Add-on'] },
    { id: 'a2', name: 'Boiled eggs', description: 'Two organic boiled eggs, seasoned with rock salt.', price: 80, tags: ['Protein'] },
    { id: 'a3', name: 'Packed trail snack', description: 'A light pocket-sized nut and seed mix for local walks.', price: 180, tags: ['Trail'] },
  ],
}

const categories = Object.keys(menuData) as MenuCategory[]
const allItems = Object.values(menuData).flat()
const itemMap = new Map(allItems.map((item) => [item.id, item]))

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export default function CafeMenuBoard() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Breakfast')
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({})
  const [roomNumber, setRoomNumber] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [notes, setNotes] = useState('')

  // Cursor Image tracking
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY])

  const items = menuData[activeCategory]

  const total = useMemo(() => {
    return Object.entries(selectedItems).reduce((sum, [id, quantity]) => {
      const item = itemMap.get(id)
      return sum + (item ? item.price * quantity : 0)
    }, 0)
  }, [selectedItems])

  const selectedCount = useMemo(() => Object.values(selectedItems).reduce((c, q) => c + q, 0), [selectedItems])

  const whatsappHref = useMemo(() => {
    const lines = Object.entries(selectedItems)
      .map(([id, qty]) => {
        const i = itemMap.get(id)
        return i ? `- ${qty}x ${i.name}` : ''
      })
      .filter(Boolean)
      .join('%0A')

    return `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Off%20the%20Trail!%0A%0AOrder:%0A${lines}%0A%0ATotal:%20${currency.format(total)}%0ACabin:%20${roomNumber}%0ATime:%20${preferredTime}%0ANotes:%20${notes}`
  }, [selectedItems, roomNumber, preferredTime, notes, total])

  const adjustQuantity = (itemId: string, delta: number) => {
    setSelectedItems((prev) => {
      const next = { ...prev }
      const current = next[itemId] ?? 0
      const updated = current + delta
      if (updated <= 0) delete next[itemId]
      else next[itemId] = updated
      return next
    })
  }

  return (
    <section id="mountain-menu" className="relative bg-white py-32 md:py-48">

      {/* Floating Image attached to cursor */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed left-0 top-0 z-50 h-[280px] w-[220px] overflow-hidden rounded-[24px] shadow-2xl"
            style={{ x: springX, y: springY, translateX: '20px', translateY: '-50%' }}
          >
            <Image src={hoveredImage} alt="Menu preview" fill className="object-cover" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)]">

        {/* Header */}
        <div className="mb-20 grid lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8C7A6B]">The Menu Board</p>
            <h2 className="mt-4 text-[clamp(44px,6vw,72px)] font-serif leading-[1.05] tracking-tight text-primary">
              Today's Provisions
            </h2>
          </div>
          <p className="mt-6 max-w-[500px] text-[17px] leading-relaxed text-primary/70 lg:justify-self-end">
            Crafted daily inside our mountain kitchen. Order in-room refreshments or coordinate warm dining timings directly with your cabin hosts.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] xl:gap-24">

          {/* Menu Area */}
          <div>
            {/* Minimal Categories */}
            <div className="mb-12 flex flex-wrap gap-x-8 gap-y-4 border-b border-primary/10 pb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative text-[13px] font-bold uppercase tracking-[0.15em] transition-colors ${
                    activeCategory === category ? 'text-primary' : 'text-primary/40 hover:text-primary/70'
                  }`}
                >
                  {category}
                  {activeCategory === category && (
                    <motion.div
                      layoutId="menu-active"
                      className="absolute -bottom-[26px] left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Menu Items List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col"
              >
                {items.map((item) => {
                  const qty = selectedItems[item.id] ?? 0
                  return (
                    <article
                      key={item.id}
                      className="flex flex-col gap-6 border-b border-primary/10 py-8 transition-opacity hover:!opacity-100 group-hover:opacity-40 md:flex-row md:items-start md:justify-between"
                      onMouseEnter={() => item.image ? setHoveredImage(item.image) : null}
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      <div className="max-w-[480px]">
                        <div className="flex flex-wrap items-baseline gap-4">
                          <h3 className="font-serif text-[26px] font-medium text-primary">{item.name}</h3>
                          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8C7A6B]">
                            {item.tags.join(' / ')}
                          </span>
                        </div>
                        <p className="mt-3 text-[15px] leading-relaxed text-primary/70">{item.description}</p>
                      </div>

                      <div className="flex items-center justify-between gap-8 md:justify-end">
                        <span className="font-serif text-[22px] text-primary/90">{currency.format(item.price)}</span>

                        <div className="flex items-center gap-3">
                          {qty > 0 ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center rounded-full border border-primary/20 bg-white"
                            >
                              <button onClick={() => adjustQuantity(item.id, -1)} className="flex h-9 w-9 items-center justify-center hover:bg-primary/5 rounded-l-full">-</button>
                              <span className="w-6 text-center font-serif text-[15px]">{qty}</span>
                              <button onClick={() => adjustQuantity(item.id, 1)} className="flex h-9 w-9 items-center justify-center hover:bg-primary/5 rounded-r-full">+</button>
                            </motion.div>
                          ) : (
                            <button
                              onClick={() => adjustQuantity(item.id, 1)}
                              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-xl transition-all active:scale-90 hover:bg-primary hover:text-white"
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sticky Booking/Order Card */}
          <aside className="lg:sticky lg:top-32 h-fit overflow-hidden rounded-[32px] bg-[#1F2421] text-white shadow-[0_32px_64px_rgba(31,36,33,0.2)]">
            {/* Glassmorphism top effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

            <div className="relative p-8 md:p-10">
              <div className="flex items-baseline justify-between border-b border-white/10 pb-6">
                <h3 className="font-serif text-[32px] leading-none text-white">Your Order</h3>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5D5B5]">
                  {selectedCount} Selected
                </span>
              </div>

              <div className="mt-8 space-y-5">
                {Object.keys(selectedItems).length === 0 ? (
                  <p className="text-[15px] text-white/50 italic py-4">Select your provisions from the menu.</p>
                ) : (
                  Object.entries(selectedItems).map(([id, qty]) => {
                    const i = itemMap.get(id)
                    if (!i) return null
                    return (
                      <div key={id} className="flex justify-between text-[15px]">
                        <div>
                          <p className="text-white/90">{i.name}</p>
                          <p className="text-[13px] text-white/50">{qty} x {currency.format(i.price)}</p>
                        </div>
                        <p className="font-serif text-white">{currency.format(i.price * qty)}</p>
                      </div>
                    )
                  })
                )}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6 flex justify-between items-baseline">
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-white/50">Total</span>
                <span className="font-serif text-[28px] text-[#E5D5B5]">{currency.format(total)}</span>
              </div>

              {/* Form Fields */}
              <div className="mt-10 space-y-6">
                <input
                  type="text"
                  placeholder="Cabin / Room Number"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full border-b border-white/20 bg-transparent py-3 text-[15px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#E5D5B5]"
                />
                <input
                  type="text"
                  placeholder="Preferred Time (e.g., 8:00 AM)"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full border-b border-white/20 bg-transparent py-3 text-[15px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#E5D5B5]"
                />
                <textarea
                  placeholder="Any kitchen notes or allergies?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-[15px] text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#E5D5B5]"
                />
              </div>

              <div className="mt-10">
                {selectedCount > 0 ? (
                  <LinkButton href={whatsappHref} target="_blank" variant="conversion" className="w-full justify-center bg-white text-[#1F2421] hover:bg-[#E5D5B5]" showArrow>
                    Send cabin order
                  </LinkButton>
                ) : (
                  <button disabled className="w-full rounded-full border border-white/20 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white/30 cursor-not-allowed transition-colors">
                    Select items first
                  </button>
                )}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  )
}
