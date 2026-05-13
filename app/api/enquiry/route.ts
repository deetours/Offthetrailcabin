import { randomUUID } from 'crypto'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import type { EnquiryRequest, EnquiryResponse } from '@/lib/enquiry'

const dataDir = path.join(process.cwd(), 'data')
const dataFile = path.join(dataDir, 'enquiries.json')

async function readEnquiries(): Promise<Array<EnquiryRequest & { enquiryId: string; createdAt: string }>> {
  try {
    const raw = await readFile(dataFile, 'utf8')
    return JSON.parse(raw) as Array<EnquiryRequest & { enquiryId: string; createdAt: string }>
  } catch {
    return []
  }
}

export async function POST(req: Request) {
  const payload = (await req.json()) as Partial<EnquiryRequest>
  const required: Array<keyof EnquiryRequest> = ['dates', 'guests', 'interest', 'name', 'phone', 'notes', 'source']
  const missing = required.filter((key) => !payload[key]?.trim())

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 },
    )
  }

  const enquiryId = randomUUID()
  const entry = {
    enquiryId,
    createdAt: new Date().toISOString(),
    dates: payload.dates!.trim(),
    guests: payload.guests!.trim(),
    interest: payload.interest!.trim(),
    name: payload.name!.trim(),
    phone: payload.phone!.trim(),
    notes: payload.notes!.trim(),
    source: payload.source!.trim(),
  }

  await mkdir(dataDir, { recursive: true })
  const all = await readEnquiries()
  all.push(entry)
  await writeFile(dataFile, JSON.stringify(all, null, 2), 'utf8')

  const response: EnquiryResponse = {
    enquiryId,
    estimatedResponseTime: 'Within 2 hours',
    nextSteps: [
      'We confirm stay availability for your dates.',
      'We suggest the best meal and trail plan.',
      'We share route and arrival notes on WhatsApp.',
    ],
  }

  return NextResponse.json(response, { status: 201 })
}
