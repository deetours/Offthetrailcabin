'use client'

import { ReactNode } from 'react'
import { motion } from 'motion/react'

interface BasecampCardProps {
  name: string
  elevation: string
  distance: string
  image?: ReactNode
  stay?: {
    beds: string
    amenities: string[]
  }
  meal?: {
    description: string
    price: string
  }
  adventure?: {
    title: string
    duration: string
  }
  onExplore?: () => void
}

export default function BasecampCard({
  name,
  elevation,
  distance,
  image,
  stay,
  meal,
  adventure,
  onExplore,
}: BasecampCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image Section */}
      {image && (
        <div className="relative h-48 bg-stone-300 overflow-hidden">
          {image}
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="font-serif text-2xl text-pine-900 mb-2">{name}</h3>
          <div className="flex gap-4 text-sm text-stone-600">
            <span>{elevation}</span>
            <span>{distance}</span>
          </div>
        </div>

        {/* Stay Info */}
        {stay && (
          <div className="mb-5 pb-5 border-b border-stone-200">
            <h5 className="font-sans font-600 text-sm text-pine-900 mb-2">Accommodation</h5>
            <p className="text-sm text-stone-600 mb-2">{stay.beds}</p>
            <div className="flex flex-wrap gap-2">
              {stay.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="inline-block text-xs px-3 py-1 bg-cream-100 text-pine-900 rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Meal Info */}
        {meal && (
          <div className="mb-5 pb-5 border-b border-stone-200">
            <h5 className="font-sans font-600 text-sm text-pine-900 mb-1">Meals</h5>
            <p className="text-sm text-stone-600 mb-1">{meal.description}</p>
            <p className="font-sans font-600 text-amber-500">{meal.price}</p>
          </div>
        )}

        {/* Adventure Info */}
        {adventure && (
          <div className="mb-5">
            <h5 className="font-sans font-600 text-sm text-pine-900 mb-1">{adventure.title}</h5>
            <p className="text-sm text-stone-600">{adventure.duration}</p>
          </div>
        )}

        {/* CTA */}
        {onExplore && (
          <button
            onClick={onExplore}
            className="w-full mt-4 px-6 py-3 bg-pine-900 text-cream-50 rounded-md font-sans font-600 text-sm hover:bg-pine-800 transition-colors duration-300"
          >
            Learn More
          </button>
        )}
      </div>
    </motion.div>
  )
}
