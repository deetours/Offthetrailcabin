import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Off the Trail | Mountain Stays (V2)',
  description: 'Curated wooden cabins, slow-cooked local food, and weather-verified booking coordinates in Himachal.',
}

export default function V2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-base font-sans antialiased">
      {children}
    </div>
  )
}
