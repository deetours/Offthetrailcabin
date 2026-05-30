export interface EnquiryRequest {
  dates: string
  guests: string
  interest: string
  name: string
  phone: string
  notes: string
  source: string
}

export interface EnquiryResponse {
  enquiryId: string
  estimatedResponseTime: string
  nextSteps: string[]
}

export const DEFAULT_WHATSAPP_NUMBER = '919999999999' // TODO: Replace with real Off the Trail WhatsApp number.

export function createWhatsAppLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function buildEnquiryWhatsAppMessage(
  payload: Pick<EnquiryRequest, 'source' | 'dates' | 'guests' | 'interest' | 'name' | 'phone' | 'notes'> & { destination?: string; stay?: string; package?: string },
): string {
  return [
    `Hi Off the Trail, I want to plan a stay.`,
    ``,
    `Destination: ${payload.destination || ''}`,
    `Stay/Property: ${payload.stay || ''}`,
    `Dates: ${payload.dates || ''}`,
    `Guests: ${payload.guests || ''}`,
    `Interest: ${payload.interest || ''}`,
    `Package: ${payload.package || ''}`,
    `Name: ${payload.name || ''}`,
    `Phone: ${payload.phone || ''}`,
    `Notes: ${payload.notes || ''}`,
    ``,
    `Please confirm availability, price, route details, and payment steps.`
  ].join('\n')
}

export function buildGlobalWhatsAppMessage(destination?: string): string {
  const dest = destination ? destination.charAt(0).toUpperCase() + destination.slice(1) : ''
  return [
    `Hi Off the Trail, I want to plan a stay.`,
    ``,
    `Destination: ${dest}`,
    `Stay/Property: `,
    `Dates: `,
    `Guests: `,
    `Interest: `,
    `Package: `,
    `Name: `,
    `Phone: `,
    `Notes: `,
    ``,
    `Please confirm availability, price, route details, and payment steps.`
  ].join('\n')
}
