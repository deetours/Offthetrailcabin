'use client'

import React, { createContext, useContext, useState } from 'react'

type DestinationId = 'jibhi' | 'dalhousie'

interface DestinationContextType {
  selectedDestination: DestinationId
  setSelectedDestination: (id: DestinationId) => void
  selectedStay: string | null
  setSelectedStay: (stay: string | null) => void
  selectedPackage: string | null
  setSelectedPackage: (pkg: string | null) => void
}

const DestinationContext = createContext<DestinationContextType | undefined>(undefined)

export function DestinationProvider({ children }: { children: React.ReactNode }) {
  const [selectedDestination, setSelectedDestination] = useState<DestinationId>('jibhi')
  const [selectedStay, setSelectedStay] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  return (
    <DestinationContext.Provider 
      value={{ 
        selectedDestination, 
        setSelectedDestination,
        selectedStay,
        setSelectedStay,
        selectedPackage,
        setSelectedPackage
      }}
    >
      {children}
    </DestinationContext.Provider>
  )
}

export function useDestination() {
  const context = useContext(DestinationContext)
  if (context === undefined) {
    // Return a default mock context if used outside provider (e.g. static pages, tests) to avoid crash
    return {
      selectedDestination: 'jibhi' as DestinationId,
      setSelectedDestination: () => {},
      selectedStay: null as string | null,
      setSelectedStay: () => {},
      selectedPackage: null as string | null,
      setSelectedPackage: () => {},
    }
  }
  return context
}
