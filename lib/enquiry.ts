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

export const DEFAULT_WHATSAPP_NUMBER = '919876543210'

export function createWhatsAppLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function buildEnquiryWhatsAppMessage(
  payload: Pick<EnquiryRequest, 'source' | 'dates' | 'guests' | 'interest' | 'name' | 'phone'>,
): string {
  return [
    `Hi Off the Trail team,`,
    `I want to plan my basecamp trip.`,
    `Source: ${payload.source}`,
    `Dates: ${payload.dates || 'Not shared yet'}`,
    `Guests: ${payload.guests || 'Not shared yet'}`,
    `Interest: ${payload.interest || 'Not shared yet'}`,
    `Name: ${payload.name || 'Not shared yet'}`,
    `Phone: ${payload.phone || 'Not shared yet'}`,
  ].join('\n')
}
