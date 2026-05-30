'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Stay } from '@/lib/destinations'
import { ArrowRight, Users, MapPin } from 'lucide-react'

interface PropertyCardProps {
  stay: Stay
  destinationName: string
  onSelect: (stay: Stay) => void
}

export default function PropertyCard({ stay, destinationName, onSelect }: PropertyCardProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group relative bg-surface border border-border/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={stay.image}
          alt={stay.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm border border-border/50">
          {stay.type}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] text-accent uppercase font-bold tracking-widest block mb-1">
              {destinationName}
            </span>
            <h3 className="font-serif text-2xl text-primary font-normal">{stay.name}</h3>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-text-muted uppercase tracking-wider block">Starts at</span>
            <span className="text-lg font-bold text-accent font-sans">₹{stay.fromPrice}</span>
          </div>
        </div>

        <div className="flex gap-4 mb-6 text-xs text-text-muted font-sans border-t border-b border-border/40 py-3">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-accent-slate" />
            <span>Sleeps {stay.sleeps}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-accent-slate" />
            <span>{stay.bestFor}</span>
          </div>
        </div>

        <ul className="flex flex-col gap-2 mb-6 flex-1">
          {stay.amenities.map((amenity, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-text font-sans">
              <div className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              <span>{amenity}</span>
            </li>
          ))}
        </ul>

        <button 
          onClick={() => onSelect(stay)}
          className="w-full flex items-center justify-between rounded bg-base border border-border/80 py-3 px-5 text-xs font-semibold text-primary tracking-wider uppercase group-hover:bg-primary group-hover:text-surface group-hover:border-primary transition-all duration-300"
        >
          <span>View Details</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  )
}
