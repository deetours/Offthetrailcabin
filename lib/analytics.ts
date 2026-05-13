export type ConversionEvent =
  | 'cta_click'
  | 'enquiry_form_start'
  | 'enquiry_submit'
  | 'enquiry_success'
  | 'enquiry_error'
  | 'whatsapp_click'
  | 'confirmation_view'

export function trackConversion(event: ConversionEvent, meta?: Record<string, string>) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('offthetrail:conversion', { detail: { event, meta } }))
  if (process.env.NODE_ENV !== 'production') {
    // Keep debug visibility during local development.
    console.info('[conversion]', event, meta ?? {})
  }
}
