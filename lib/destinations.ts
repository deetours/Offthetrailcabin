export interface Stay {
  id: string
  name: string
  type: string
  bestFor: string
  sleeps: number
  fromPrice: number
  image: string
  amenities: string[]
  cta: string
}

export interface WarmthIndex {
  metric: string
  value: string
  label: string
}

export interface Destination {
  id: string
  name: string
  label: string
  headline: string
  mood: string
  image: string
  stayImage: string
  stayTypes: string[]
  routeNotes: string[]
  idealFor: string
  cta: string
  whatsappMessageTemplate: string
  stays?: Stay[]
  warmthIndex?: WarmthIndex[]
  footerRouteNote?: string
}

export const destinations: Destination[] = [
  {
    id: 'dalhousie',
    name: 'Dalhousie',
    label: 'Pine ridge stay',
    headline: 'Stay near pine views, old roads, and cooler mountain days.',
    mood: 'pine ridges, colonial roads, valley views, quiet family stays',
    image: '/images/hero.png',
    stayImage: '/images/window.png',
    stayTypes: ['Rooms', 'Cafe access', 'Local drives'],
    routeNotes: [
      'Best arrival: before 5 PM',
      'Road mood: hill roads, pine bends, weather can slow final approach',
      'Parking: confirm exact parking/reception point before arrival',
      'Network: mostly available near town, can vary around stays',
      'Weather: fog and cold can change quickly'
    ],
    idealFor: 'Families, slower hill breaks, colonial charm',
    cta: 'Plan Dalhousie Stay',
    whatsappMessageTemplate: 'Hi Off the Trail, I want to plan a stay.\n\nDestination: Dalhousie\nStay/Property:\nDates:\nGuests:\nInterest:\nPackage:\nName:\nPhone:\nNotes:\n\nPlease confirm availability, price, route details, and payment steps.',
    stays: [
      {
        id: 'pine-room',
        name: 'The Pine Room',
        type: 'room',
        bestFor: 'Families & couples',
        sleeps: 4,
        fromPrice: 5500,
        image: '/images/window.png',
        amenities: ['Valley view', 'Covered parking', 'Cafe access', 'Warm heater'],
        cta: 'Enquire for this stay'
      }
    ],
    warmthIndex: [
      { metric: 'Evenings', value: 'Cooler', label: 'Warm bedding required' },
      { metric: 'Heating', value: 'Varies', label: 'Room heating support depends on property' },
      { metric: 'Service', value: 'Plan Ahead', label: 'Hot water timing should be confirmed; food timing should be planned before late arrival' }
    ],
    footerRouteNote: 'Dalhousie Route Tip: Navigate via Pathankot-Banikhet. Ensure your vehicle has good ground clearance for the last 1.5km gravel ridge ascent.'
  },
  {
    id: 'jibhi',
    name: 'Jibhi',
    label: 'Forest basecamp',
    headline: 'Stay close to forests, rivers, and slow mornings.',
    mood: 'cedar forest, river walks, wooden cabins, quiet cafe mornings',
    image: '/images/cabins.png',
    stayImage: '/images/workation.png',
    stayTypes: ['Cabins', 'Cafe stay', 'Workation'],
    routeNotes: [
      'Best arrival: before sunset',
      'Road mood: valley roads, forest stretches, narrow local turns',
      'Parking: may differ by stay, confirm before arrival',
      'Network: patchy around forest/river pockets',
      'Weather: rain can change road comfort'
    ],
    idealFor: 'Slow stays, forest walks, deep rest',
    cta: 'Plan Jibhi Stay',
    whatsappMessageTemplate: 'Hi Off the Trail, I want to plan a stay.\n\nDestination: Jibhi\nStay/Property:\nDates:\nGuests:\nInterest:\nPackage:\nName:\nPhone:\nNotes:\n\nPlease confirm availability, price, route details, and payment steps.',
    stays: [
      {
        id: 'forest-cabin',
        name: 'The Forest Cabin',
        type: 'cabin',
        bestFor: 'Couples & workation',
        sleeps: 2,
        fromPrice: 4500,
        image: '/images/cabins.png',
        amenities: ['Private deck', 'Bonfire pit', 'River view', 'Cafe access'],
        cta: 'Enquire for this stay'
      },
      {
        id: 'cedar-room',
        name: 'The Cedar Room',
        type: 'room',
        bestFor: 'Solo & friends',
        sleeps: 3,
        fromPrice: 3200,
        image: '/images/workation.png',
        amenities: ['Mountain view', 'Warm heater', 'Cafe nearby'],
        cta: 'Enquire for this stay'
      }
    ],
    warmthIndex: [
      { metric: 'Evenings', value: 'Cold', label: 'Layered clothing recommended for forest evenings' },
      { metric: 'Heating', value: 'Cabin/Wood', label: 'Wood/cabin warmth varies by stay; hot water timing should be confirmed' },
      { metric: 'Food', value: 'Supported', label: 'Food can be planned with stay/cafe support' }
    ],
    footerRouteNote: 'Jibhi Route Tip: Take the Aut tunnel exit on the Chandigarh-Manali NH. Avoid night driving past the tunnel unless accompanied by our local coordinator.'
  }
]
