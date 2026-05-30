'use client'

import React from 'react'
import { useDestination } from '@/lib/DestinationContext'
import { destinations } from '@/lib/destinations'
import { Compass, Mail, Phone, Heart } from 'lucide-react'

export default function V2Footer() {
  const { selectedDestination } = useDestination()
  const activeDest = destinations.find(d => d.id === selectedDestination)

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-primary text-surface/90 py-16 border-t border-border/10 paper-grain relative">
      <div className="mx-auto max-w-[1320px] px-[clamp(24px,5vw,72px)]">
        
        {/* Destination-Aware Route Alert Banner */}
        <div className="bg-surface/5 border border-surface/10 rounded-lg p-6 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] text-accent uppercase font-bold tracking-[0.2em] block mb-1">
              Active Route Advisory · {activeDest?.name}
            </span>
            <p className="text-xs text-surface/85 leading-relaxed font-sans">
              {selectedDestination === 'jibhi' 
                ? "Jibhi Route Advisory: Road is currently fully clear. Aut tunnel exits are functioning. Please monitor Jalori Pass weather if arriving via the Shimla-Rampur highway."
                : "Dalhousie Route Advisory: Pathankot-Banikhet highway is in excellent shape. The final 1.5km ridge road is narrow; we recommend calling our local coordinator for escort service if arriving after sunset."
              }
            </p>
          </div>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 text-xs font-bold text-accent hover:text-accent/80 border-b border-accent pb-0.5 uppercase tracking-wider whitespace-nowrap"
          >
            Ask Weather Status
          </a>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col">
            <span 
              onClick={handleScrollToTop}
              className="font-serif text-2xl tracking-tight text-surface cursor-pointer leading-none mb-2 hover:text-accent transition-colors"
            >
              Off the Trail
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold mb-4">
              Basecamps & Slow Lodges
            </span>
            <p className="text-xs text-surface/70 leading-relaxed font-sans max-w-sm mb-6">
              A curated network of wooden cabins, ridge rooms, and homestyle cafes located in Himachal's quietest valleys. Fully staffed and locally owned.
            </p>
            
            <div className="flex flex-col gap-2 text-xs font-sans text-surface/80">
              <a href="tel:+919999999999" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={12} />
                <span>+91 99999 99999</span>
              </a>
              <a href="mailto:hello@offthetrail.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={12} />
                <span>hello@offthetrail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-surface mb-2">
              Explore Destinations
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-surface/75 font-sans">
              <li>
                <a href="#stays" className="hover:text-accent transition-colors">Stays in Jibhi</a>
              </li>
              <li>
                <a href="#stays" className="hover:text-accent transition-colors">Stays in Dalhousie</a>
              </li>
              <li>
                <a href="#plans" className="hover:text-accent transition-colors">Travel Packages</a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-accent transition-colors">How it Works</a>
              </li>
            </ul>
          </div>

          {/* Safe Travel Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-surface mb-2">
              Mountain Safeguards
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-surface/75 font-sans">
              <li>
                <a href="#route" className="hover:text-accent transition-colors">Field Weather Guides</a>
              </li>
              <li>
                <a href="#route" className="hover:text-accent transition-colors">Offline Maps & Spots</a>
              </li>
              <li>
                <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Live Road Coordinator</a>
              </li>
              <li>
                <a href="#enquiry" className="hover:text-accent transition-colors">Booking Support</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-surface/50 font-sans gap-4">
          <p>© {new Date().getFullYear()} Off the Trail. Crafted for slow mountain living.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart size={10} className="text-accent fill-accent animate-pulse" />
            <span>in Jibhi & Dalhousie.</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
