'use client'

import { motion } from 'motion/react'

interface RouteRealityCardProps {
  fromLocation: string
  roadCondition: {
    type: string
    description: string
    drivingTime: string
  }
  parking: {
    availability: string
    capacity: string
    fee?: string
  }
  arrivalProcess: {
    steps: string[]
    totalTime: string
  }
  elevation?: string
}

export default function RouteRealityCard({
  fromLocation,
  roadCondition,
  parking,
  arrivalProcess,
  elevation,
}: RouteRealityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white rounded-2xl border border-stone-200 p-6"
    >
      <h4 className="font-serif text-xl text-pine-900 mb-6">How to Get There</h4>

      {/* Location */}
      <div className="mb-6 pb-6 border-b border-stone-200">
        <p className="font-sans text-xs text-stone-500 uppercase mb-1">From</p>
        <p className="font-sans font-600 text-lg text-pine-900">{fromLocation}</p>
      </div>

      {/* Road Condition */}
      <div className="mb-6 pb-6 border-b border-stone-200">
        <h5 className="font-sans text-sm font-600 text-stone-600 mb-3">Road Condition</h5>
        <div className="space-y-3">
          <div>
            <p className="font-sans font-600 text-sm text-pine-900">{roadCondition.type}</p>
            <p className="font-sans text-sm text-stone-600 mt-1">{roadCondition.description}</p>
          </div>
          <p className="font-sans text-sm text-amber-600 font-600">
            Driving time: {roadCondition.drivingTime}
          </p>
        </div>
      </div>

      {/* Parking */}
      <div className="mb-6 pb-6 border-b border-stone-200">
        <h5 className="font-sans text-sm font-600 text-stone-600 mb-3">Parking</h5>
        <div className="space-y-2">
          <p className="font-sans text-sm text-pine-900">{parking.availability}</p>
          <p className="font-sans text-sm text-stone-600">Capacity: {parking.capacity}</p>
          {parking.fee && <p className="font-sans text-sm text-stone-600">{parking.fee}</p>}
        </div>
      </div>

      {/* Arrival Process */}
      <div className="mb-6 pb-6 border-b border-stone-200">
        <h5 className="font-sans text-sm font-600 text-stone-600 mb-3">From Parking to Camp</h5>
        <div className="space-y-2">
          {arrivalProcess.steps.map((step, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-xs font-600 text-pine-900">
                {idx + 1}
              </span>
              <p className="font-sans text-sm text-stone-600">{step}</p>
            </div>
          ))}
          <p className="font-sans text-sm text-amber-600 font-600 mt-3">
            Total: {arrivalProcess.totalTime}
          </p>
        </div>
      </div>

      {/* Elevation Info */}
      {elevation && (
        <div>
          <p className="font-sans text-xs text-stone-500 mb-1">Peak Elevation</p>
          <p className="font-sans font-600 text-lg text-pine-900">{elevation}</p>
        </div>
      )}
    </motion.div>
  )
}
