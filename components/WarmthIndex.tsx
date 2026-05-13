'use client'

import { motion } from 'motion/react'

interface Amenity {
  name: string
  description: string
  rating: 'Essential' | 'Comfort' | 'Luxury'
}

interface WarmthIndexProps {
  basecampName: string
  amenities: Amenity[]
  temperature?: string
  description?: string
}

export default function WarmthIndex({
  basecampName,
  amenities,
  temperature,
  description,
}: WarmthIndexProps) {
  const ratingStyles = {
    Essential: 'bg-pine-100 text-pine-900',
    Comfort: 'bg-amber-100 text-amber-900',
    Luxury: 'bg-cream-200 text-pine-900 font-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="bg-white rounded-2xl border border-stone-200 p-8"
    >
      <div className="mb-8">
        <h3 className="font-serif text-3xl text-pine-900 mb-2">{basecampName}</h3>
        <p className="font-sans text-stone-600">{description || 'Experience mountain hospitality'}</p>
      </div>

      {/* Temperature/Comfort Info */}
      {temperature && (
        <div className="mb-8 pb-8 border-b border-stone-200">
          <p className="font-sans text-sm text-stone-500 mb-2">Year-Round Climate</p>
          <p className="font-sans font-600 text-amber-600">{temperature}</p>
        </div>
      )}

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {amenities.map((amenity, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="bg-cream-50 rounded-xl p-4"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h5 className="font-sans font-600 text-sm text-pine-900">{amenity.name}</h5>
              <span className={`text-xs px-2 py-1 rounded-md ${ratingStyles[amenity.rating]}`}>
                {amenity.rating}
              </span>
            </div>
            <p className="font-sans text-sm text-stone-600">{amenity.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 pt-8 border-t border-stone-200">
        <p className="font-sans text-sm text-stone-600 leading-relaxed">
          Our warmth index reflects a commitment to comfort without compromise. Every amenity is thoughtfully chosen to enhance your mountain experience while respecting the wilderness around us.
        </p>
      </div>
    </motion.div>
  )
}
