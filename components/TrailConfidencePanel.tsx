'use client'

import { motion } from 'motion/react'

interface DifficultyLevel {
  level: 'Gentle' | 'Moderate' | 'Challenging' | 'Expert'
  description: string
  icon: string
}

interface TrailConfidencePanelProps {
  trailName: string
  difficulty: DifficultyLevel
  guide: {
    available: boolean
    name?: string
    experience?: string
  }
  weather: {
    condition: string
    bestSeason: string
  }
  distance: string
  elevation: string
  estimatedTime: string
}

export default function TrailConfidencePanel({
  trailName,
  difficulty,
  guide,
  weather,
  distance,
  elevation,
  estimatedTime,
}: TrailConfidencePanelProps) {
  const difficultyColors = {
    Gentle: 'bg-amber-100 text-amber-900',
    Moderate: 'bg-amber-100 text-amber-900',
    Challenging: 'bg-stone-300 text-pine-900',
    Expert: 'bg-pine-900 text-cream-50',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-2xl border border-stone-200 p-6"
    >
      <h4 className="font-serif text-xl text-pine-900 mb-6">{trailName}</h4>

      {/* Difficulty */}
      <div className="mb-6 pb-6 border-b border-stone-200">
        <h5 className="font-sans text-sm font-600 text-stone-600 mb-3">Difficulty Level</h5>
        <div className={`inline-block px-4 py-2 rounded-lg ${difficultyColors[difficulty.level]}`}>
          <p className="font-sans font-600 text-sm">{difficulty.level}</p>
          <p className="font-sans text-xs mt-1">{difficulty.description}</p>
        </div>
      </div>

      {/* Guide */}
      <div className="mb-6 pb-6 border-b border-stone-200">
        <h5 className="font-sans text-sm font-600 text-stone-600 mb-3">Professional Guide</h5>
        {guide.available ? (
          <div className="space-y-2">
            <p className="font-sans font-600 text-sm text-pine-900">Available</p>
            {guide.name && <p className="font-sans text-sm text-stone-600">{guide.name}</p>}
            {guide.experience && <p className="font-sans text-xs text-stone-500">{guide.experience}</p>}
          </div>
        ) : (
          <p className="font-sans text-sm text-stone-600">Self-guided recommended</p>
        )}
      </div>

      {/* Weather */}
      <div className="mb-6 pb-6 border-b border-stone-200">
        <h5 className="font-sans text-sm font-600 text-stone-600 mb-2">Weather & Season</h5>
        <p className="font-sans text-sm text-stone-600 mb-1">{weather.condition}</p>
        <p className="font-sans text-sm text-amber-600 font-600">Best: {weather.bestSeason}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-2">
        <div>
          <p className="font-sans text-xs text-stone-500 mb-1">Distance</p>
          <p className="font-sans font-600 text-sm text-pine-900">{distance}</p>
        </div>
        <div>
          <p className="font-sans text-xs text-stone-500 mb-1">Elevation Gain</p>
          <p className="font-sans font-600 text-sm text-pine-900">{elevation}</p>
        </div>
        <div>
          <p className="font-sans text-xs text-stone-500 mb-1">Duration</p>
          <p className="font-sans font-600 text-sm text-pine-900">{estimatedTime}</p>
        </div>
      </div>
    </motion.div>
  )
}
