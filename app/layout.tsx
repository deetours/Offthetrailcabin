import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { DestinationProvider } from '@/lib/DestinationContext'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FDFBF7',
}

export const metadata: Metadata = {
  title: 'Off the Trail | Stays in Jibhi & Dalhousie',
  description: 'Warm stays, local food, and route help in Jibhi and Dalhousie. Plan your mountain stay with Off the Trail.',
  keywords: ['mountain', 'basecamp', 'hiking', 'adventure', 'alpine', 'nature', 'jibhi', 'dalhousie', 'himachal'],
  metadataBase: new URL('https://offthetrail.com'),
  openGraph: {
    title: 'Off the Trail | Stays in Jibhi & Dalhousie',
    description: 'Warm stays, local food, and route help in Jibhi and Dalhousie. Plan your mountain stay with Off the Trail.',
    url: 'https://offthetrail.com',
    siteName: 'Off the Trail',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Off the Trail',
    description: 'Premium mountain basecamp experiences.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body className="bg-cream-50 text-pine-900 font-sans">
        <DestinationProvider>
          {children}
        </DestinationProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
