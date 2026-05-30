'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { LinkButton } from '@/components/ui/button'
import CafeMenuBoard from '@/components/cafe/CafeMenuBoard'

type MealPoint = {
  slot: string
  title: string
  time: string
  line: string
}

type Favorite = {
  title: string
  image: string
  note: string
}

type Dietary = {
  label: string
  detail: string
  icon?: string
}

type DietaryBoardItem = {
  code: string
  label: string
  detail: string
  note: string
}

const mealRhythm: MealPoint[] = [
  { slot: 'Morning', title: 'Breakfast Service', time: '07:00 – 09:30', line: 'Warm, high-energy local staple trays prepared fresh before you climb forest routes.' },
  { slot: 'Midday', title: 'Lunch Service', time: '12:30 – 14:30', line: 'Balanced, restorative lentil bowls and fresh roti designed for easy road recovery.' },
  { slot: 'Evening', title: 'Dinner Service', time: '19:00 – 21:00', line: 'Comfort-forward mountain curries and hot herb soups cooked slow under starlit skies.' },
]

const favorites: Favorite[] = [
  {
    title: 'Mountain breakfast tray',
    image: '/images/offtrail/cafe-food.jpg',
    note: 'A composed morning plate featuring seasonal grain staples, curd, and warm sips.',
  },
  {
    title: 'Firelit dinner plates',
    image: '/images/bonfire.png',
    note: 'Rich evening curries and flatbreads served fresh by the lodge hearth.',
  },
  {
    title: 'Tea by the bay window',
    image: '/images/window.png',
    note: 'Slow evening brews accompanied by setting mountain light and valley views.',
  },
  {
    title: 'Packed trail snack kit',
    image: '/images/food.png',
    note: 'Composed portable snack packs tailored for high route walks and off-trail hikes.',
  },
]

const dietary: Dietary[] = [
  { label: 'Vegetarian forward', detail: 'Our kitchen processes focus heavily on fresh, regional vegetarian produce.', icon: '🌿' },
  { label: 'Low spice adjustments', detail: 'Every curry and soup can be prepared with gentle seasoning upon advance request.', icon: '🌶️' },
  { label: 'Simple comfort dishes', detail: 'Bland high-energy meals prepared thoughtfully for children and weary travelers.', icon: '🍲' },
  { label: 'Packed trail packages', detail: 'Easy-to-carry energy mixes and dry fruits wrapped for departure days.', icon: '🎒' },
  { label: 'Private cabin dining', detail: 'Shared family-style pots arranged directly for cabin patios or larger groups.', icon: '🪵' },
]

const dietaryBoard: DietaryBoardItem[] = [
  {
    code: '01',
    label: 'Vegetarian-first kitchen',
    detail: 'Regional vegetables, lentils, grains, and flatbreads shape the default rhythm of the menu.',
    note: 'Kitchen baseline',
  },
  {
    code: '02',
    label: 'Low-spice adjustments',
    detail: 'Curries, soups, and breakfast plates can be softened for children, recovery days, or gentler palates.',
    note: 'Advance request',
  },
  {
    code: '03',
    label: 'Simple comfort dishes',
    detail: 'Plain rice, light broths, toast, curd, and easy staples are available when guests want something calm and familiar.',
    note: 'Recovery meals',
  },
  {
    code: '04',
    label: 'Trail-ready provisions',
    detail: 'Portable fruit, nuts, tea flasks, and snack kits can be wrapped for departure mornings or long walking days.',
    note: 'Packed for route days',
  },
  {
    code: '05',
    label: 'Private cabin service',
    detail: 'Larger trays, family-style portions, and timing coordination can be arranged directly with your cabin host.',
    note: 'Host coordinated',
  },
]

// 2% noise texture for tactility
const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: "url('/images/noise.png')" }} />
)

// SVG Steam Effect for Hero
const SteamOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden mix-blend-screen opacity-40">
    <motion.div
      animate={{ y: [-20, -100], x: [-10, 20], opacity: [0, 0.6, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      className="absolute bottom-[-10%] left-[20%] h-[150%] w-[100%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.15)_0%,_transparent_70%)] blur-[40px] filter"
    />
    <motion.div
      animate={{ y: [-10, -120], x: [10, -30], opacity: [0, 0.4, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: 4 }}
      className="absolute bottom-[-10%] right-[10%] h-[150%] w-[120%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.12)_0%,_transparent_60%)] blur-[60px] filter"
    />
  </div>
)

const HeroCoordinateGrid = () => {
  const gridRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const layer = gridRef.current
    if (!layer) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    let frame = 0
    let currentX = 50
    let currentY = 50
    let targetX = 50
    let targetY = 50

    const setGridPosition = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      layer.style.setProperty('--grid-x', `${currentX}%`)
      layer.style.setProperty('--grid-y', `${currentY}%`)
      frame = window.requestAnimationFrame(setGridPosition)
    }

    const onPointerMove = (event: PointerEvent) => {
      const hero = layer.closest('section')
      if (!hero) return

      const rect = hero.getBoundingClientRect()
      targetX = ((event.clientX - rect.left) / rect.width) * 100
      targetY = ((event.clientY - rect.top) / rect.height) * 100
    }

    frame = window.requestAnimationFrame(setGridPosition)
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  const gridStyle = {
    '--grid-x': '50%',
    '--grid-y': '52%',
    backgroundImage: [
      'linear-gradient(rgba(229,213,181,0.14) 1px, transparent 1px)',
      'linear-gradient(90deg, rgba(229,213,181,0.12) 1px, transparent 1px)',
      'radial-gradient(circle at var(--grid-x) var(--grid-y), rgba(229,213,181,0.24), rgba(229,213,181,0.08) 18%, transparent 36%)',
      'linear-gradient(90deg, rgba(0,0,0,0.58), transparent 42%)',
    ].join(', '),
    backgroundSize: '92px 92px, 92px 92px, 100% 100%, 100% 100%',
    maskImage:
      'linear-gradient(90deg, transparent 0%, black 20%, black 82%, transparent 100%), radial-gradient(circle at var(--grid-x) var(--grid-y), black 0%, black 28%, transparent 52%)',
    WebkitMaskImage:
      'linear-gradient(90deg, transparent 0%, black 20%, black 82%, transparent 100%), radial-gradient(circle at var(--grid-x) var(--grid-y), black 0%, black 28%, transparent 52%)',
    maskComposite: 'intersect',
    WebkitMaskComposite: 'source-in',
  } as CSSProperties

  return (
    <div className="pointer-events-none absolute inset-0 z-[12] opacity-70 mix-blend-screen" aria-hidden="true">
      <div ref={gridRef} className="absolute inset-0 transition-opacity duration-700 ease-out" style={gridStyle} />
      <div className="absolute inset-y-0 left-0 w-[62%] bg-[radial-gradient(ellipse_at_20%_48%,rgba(0,0,0,0.54),transparent_56%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  )
}

type HeroOrderPreviewCardProps = {
  active: boolean
}

const HeroOrderPreviewCard = ({ active }: HeroOrderPreviewCardProps) => (
  <motion.aside
    variants={{ hidden: { opacity: 0, x: 18 }, visible: { opacity: 1, x: 0 } }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="relative mt-12 w-full max-w-[400px] overflow-hidden rounded-[20px] border border-[#F4F0EA]/20 bg-[#17251F]/75 p-5 text-[#F4F0EA] shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-colors duration-300 lg:ml-auto lg:mt-12 lg:p-6"
  >
    <motion.div
      aria-hidden="true"
      animate={{ opacity: active ? 0.75 : 0.22, scaleX: active ? 1 : 0.58 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-6 right-6 top-0 h-px origin-left bg-gradient-to-r from-[#E5D5B5] via-[#E5D5B5]/70 to-transparent"
    />
    <motion.div
      aria-hidden="true"
      animate={{ opacity: active ? 0.34 : 0.12 }}
      transition={{ duration: 0.28 }}
      className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#E5D5B5] blur-[70px]"
    />

    <motion.div
      animate={{ y: active ? -3 : 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#E5D5B5]">
          Tonight&apos;s order window
        </p>
        <span className="shrink-0 border border-[#F4F0EA]/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F4F0EA]/80">
          Host confirmed
        </span>
      </div>

      <div className="mt-8 grid gap-6 border-y border-[#F4F0EA]/10 py-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <h2 className="font-serif text-[34px] leading-none tracking-[-0.02em] text-white">
            Dinner Service
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#F4F0EA]/70">
            Hot curries, flatbreads, soups
          </p>
        </div>
        <p className="font-serif text-[28px] leading-none text-[#E5D5B5]">
          19:00-21:00
        </p>
      </div>

      <div className="divide-y divide-[#F4F0EA]/10">
        {['Paratha + curd', 'Hot soup', 'Cabin tray'].map((item) => (
          <div key={item} className="flex items-center justify-between gap-4 py-3 text-sm">
            <span className="text-[#F4F0EA]/82">{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#E5D5B5]" />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-[#F4F0EA]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[220px] text-[13px] leading-relaxed text-[#F4F0EA]/68">
          Send cabin number. We confirm timing.
        </p>
        <a
          href="#mountain-menu"
          className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E5D5B5] transition-colors duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#E5D5B5]/50 focus:ring-offset-4 focus:ring-offset-[#17251F]"
        >
          Preview menu
        </a>
      </div>
    </motion.div>
  </motion.aside>
)

export default function CafeClient() {
  const heroRef = useRef<HTMLElement | null>(null)
  const rhythmRef = useRef<HTMLElement | null>(null)
  const [isOrderCueActive, setIsOrderCueActive] = useState(false)

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const { scrollYProgress: rhythmScroll } = useScroll({ target: rhythmRef, offset: ['start center', 'end center'] })

  // Hero parallax
  const heroImageY = useTransform(heroScroll, [0, 1], [0, 200])
  const heroImageScale = useTransform(heroScroll, [0, 1], [1, 1.1])
  const heroTextY = useTransform(heroScroll, [0, 1], [0, 60])
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0])

  // Rhythm Timeline
  const rhythmLineHeight = useTransform(rhythmScroll, [0, 1], ['0%', '100%'])
  const rhythmBgColor = useTransform(
    rhythmScroll,
    [0, 0.5, 1],
    ['#FDFBF7', '#F4F1EA', '#1F2421'] // Dawn to Dusk
  )
  const rhythmTextColor = useTransform(
    rhythmScroll,
    [0, 0.6, 1],
    ['#1F2421', '#1F2421', '#FDFBF7']
  )

  return (
    <main className="relative overflow-hidden bg-[#FDFBF7] text-primary">
      <NoiseOverlay />
      
      {/* Scene 1: Cinematic Full-bleed Hero */}
      <section ref={heroRef} className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-36 md:pt-44">
        <motion.div style={{ y: heroImageY, scale: heroImageScale }} className="absolute inset-0">
          <Image
            src="/images/offtrail/cafe-food.jpg"
            alt="Food service at the mountain table"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        
        {/* Rich gradient scrim for accessibility and mood */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent mix-blend-multiply" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
        <HeroCoordinateGrid />
        <SteamOverlay />

        <motion.div
          style={{ opacity: heroOpacity, y: heroTextY }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
          }}
          className="relative z-20 mx-auto w-full max-w-[1440px] px-[clamp(24px,5vw,72px)]"
        >
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E5D5B5]"
              >
                THE LODGE KITCHEN
              </motion.p>
              
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="mt-6 font-serif text-[clamp(64px,9vw,130px)] leading-[0.85] tracking-[-0.03em] text-[#F4F0EA]"
              >
                Dine by the<br />fire.
              </motion.h1>
              
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="mt-10 max-w-[620px] text-[18px] leading-relaxed text-[#F4F0EA]/90 md:text-[22px]"
              >
                Rich evening curries and warm flatbreads, prepared fresh and served in the comfort of your cabin.
              </motion.p>
              
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="mt-12 flex flex-wrap gap-5"
              >
                <LinkButton
                  href="#mountain-menu"
                  variant="conversion"
                  className="bg-[#E5D5B5] text-primary hover:bg-white"
                  showArrow
                  onMouseEnter={() => setIsOrderCueActive(true)}
                  onMouseLeave={() => setIsOrderCueActive(false)}
                  onFocus={() => setIsOrderCueActive(true)}
                  onBlur={() => setIsOrderCueActive(false)}
                >
                  Order for the Cabin
                </LinkButton>
                <LinkButton
                  href="#meal-rhythm"
                  variant="secondary"
                  className="border-white/30 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white"
                >
                  View dining hours
                </LinkButton>
              </motion.div>
            </div>
            <HeroOrderPreviewCard active={isOrderCueActive} />
          </div>
        </motion.div>
      </section>

      {/* Scene 2: The Meal Rhythm (Scroll-linked Time of Day) */}
      <motion.section 
        ref={rhythmRef} 
        id="meal-rhythm" 
        style={{ backgroundColor: rhythmBgColor, color: rhythmTextColor }}
        className="relative py-32 md:py-48 transition-colors duration-200"
      >
        <div className="mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)]">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] opacity-60">Lodge Cadence</p>
            <h2 className="mt-4 text-[clamp(44px,6vw,72px)] font-serif leading-[1.05] tracking-tight">
              The Rhythm<br />of the Day.
            </h2>
          </motion.div>

          <div className="relative mt-24">
            {/* Scroll-driven Progress Line */}
            <div className="absolute left-[15px] top-0 bottom-0 w-[1px] bg-current opacity-15 md:left-[23px]" />
            <motion.div 
              style={{ height: rhythmLineHeight }} 
              className="absolute left-[14px] top-0 w-[3px] bg-current md:left-[22px]" 
            />

            <div className="space-y-20 md:space-y-32">
              {mealRhythm.map((point, index) => (
                <motion.div
                  key={point.slot}
                  initial={{ opacity: 0.3, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: "-30% 0px -30% 0px" }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-12 md:pl-20"
                >
                  <div className="absolute left-[11px] top-[10px] h-[9px] w-[9px] rounded-full bg-current md:left-[19px]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-70">
                    0{index + 1} / {point.slot}
                  </span>
                  <p className="mt-4 font-serif text-[clamp(48px,5vw,72px)] font-medium leading-none tracking-tight opacity-100">
                    {point.time}
                  </p>
                  <div className="mt-8 grid gap-4 md:grid-cols-2 md:items-end">
                    <h3 className="font-serif text-[28px] font-semibold">{point.title}</h3>
                    <p className="text-[17px] leading-relaxed opacity-90 md:max-w-[400px]">
                      {point.line}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Scene 3: The Interactive Menu Board */}
      <CafeMenuBoard />

      {/* Scene 4: Guest Favorites (Asymmetric Bento Box) */}
      <section className="bg-[#FDFBF7] py-32 md:py-48">
        <div className="mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)]">
          <div className="flex flex-col items-center text-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#8C7A6B]">Guest Staples</p>
            <h2 className="mt-4 text-[clamp(44px,6vw,72px)] font-serif leading-[1.05] tracking-tight text-primary">
              Returning Favorites
            </h2>
          </div>

          <div className="mt-20 grid gap-4 md:grid-cols-3 md:grid-rows-[400px_400px] lg:gap-6">
            {favorites.map((item, index) => {
              const bentoSpan = 
                index === 0 ? 'md:col-span-2 md:row-span-2' :
                index === 1 ? 'md:col-span-1 md:row-span-1' :
                index === 2 ? 'md:col-span-1 md:row-span-1' : 
                'md:col-span-3 md:row-span-1 min-h-[300px]'

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-[24px] bg-primary ${bentoSpan}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-80 transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-105 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 text-[#F4F0EA] transition-transform duration-700 ease-out">
                    <h3 className="font-serif text-[28px] md:text-[34px] font-medium leading-[1.1] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[340px] text-[16px] leading-relaxed text-[#F4F0EA]/80">
                      {item.note}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Scene 5: Dietary Accommodations (Editorial Service Board) */}
      <section className="relative overflow-hidden bg-[#18211D] py-32 text-[#FDFBF7] md:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,213,181,0.12),transparent_30%),radial-gradient(circle_at_82%_28%,rgba(229,213,181,0.08),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(229,213,181,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(229,213,181,0.18) 1px, transparent 1px)', backgroundSize: '88px 88px' }} />

        <div className="relative mx-auto max-w-[1440px] px-[clamp(24px,5vw,72px)]">
          <div className="grid gap-12 xl:grid-cols-[0.9fr_1.35fr] xl:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="xl:sticky xl:top-28"
            >
              <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-[#E5D5B5]">Dietary Care</p>
              <h2 className="mt-5 font-serif text-[clamp(44px,5vw,66px)] leading-[1.02] tracking-[-0.03em] text-[#FDFBF7]">
                The kitchen listens<br />before it plates.
              </h2>
              <p className="mt-8 max-w-[420px] text-[17px] leading-relaxed text-[#FDFBF7]/74">
                Share allergies, spice comfort, and dining rhythm with your host. We shape the meal around the guest, not the other way around.
              </p>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#E5D5B5]/85">Host note</p>
                <p className="mt-4 max-w-[380px] text-[15px] leading-relaxed text-[#FDFBF7]/62">
                  Requests are confirmed directly before service so portion size, timing, and cabin delivery stay calm and clear.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(255,252,246,0.04)] shadow-[0_28px_90px_rgba(0,0,0,0.24)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E5D5B5]/50 to-transparent" />
              <div className="grid md:grid-cols-2">
                {dietaryBoard.map((item, index) => {
                  const showRightBorder = index % 2 === 0
                  const showBottomBorder = index < dietaryBoard.length - (dietaryBoard.length % 2 === 0 ? 2 : 1)

                  return (
                    <motion.article
                      key={item.code}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-8%' }}
                      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      className={[
                        'group relative px-7 py-8 md:px-8 md:py-9',
                        showRightBorder ? 'md:border-r md:border-white/10' : '',
                        showBottomBorder ? 'border-b border-white/10' : '',
                      ].join(' ')}
                    >
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,213,181,0.09),transparent_42%)]" />
                      </div>

                      <div className="relative">
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-serif text-[34px] leading-none text-[#E5D5B5]/88">
                            {item.code}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F4F0EA]/42">
                            {item.note}
                          </span>
                        </div>

                        <h3 className="mt-8 max-w-[280px] font-serif text-[28px] leading-[1.05] tracking-[-0.02em] text-white">
                          {item.label}
                        </h3>
                        <p className="mt-4 max-w-[360px] text-[15px] leading-relaxed text-[#F4F0EA]/66">
                          {item.detail}
                        </p>
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scene 6: Immersive Final CTA */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-32 text-white">
        <Image 
          src="/images/escape.png" 
          alt="Cabin view" 
          fill 
          className="object-cover object-bottom" 
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto w-full max-w-[800px] rounded-[32px] border border-white/20 bg-black/30 p-10 backdrop-blur-xl text-center md:p-16 shadow-2xl mx-[clamp(24px,5vw,72px)]"
        >
          <h2 className="font-serif text-[clamp(44px,6vw,76px)] leading-[1.02] tracking-[-0.02em] text-[#F4F0EA]">
            Ready for your table?
          </h2>
          <p className="mx-auto mt-6 max-w-[500px] text-[18px] leading-relaxed text-[#F4F0EA]/90">
            Confirm your cabin details and let our kitchen handle the rest.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <LinkButton href="#mountain-menu" variant="conversion" className="bg-[#F4F0EA] text-primary hover:bg-[#E5D5B5]" showArrow>
              Submit Order
            </LinkButton>
            <LinkButton href="/packages" variant="secondary" className="border-white/40 text-white hover:bg-white/10">
              View Room Packages
            </LinkButton>
          </div>
        </motion.div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  )
}
