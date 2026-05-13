import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FDFBF7',
}

export const metadata: Metadata = {
  title: 'Off the Trail | Mountain Basecamp',
  description: 'Premium mountain basecamp experiences beyond the ordinary. Discover authentic alpine adventures.',
  keywords: ['mountain', 'basecamp', 'hiking', 'adventure', 'alpine', 'nature'],
  metadataBase: new URL('https://offthetrail.com'),
  openGraph: {
    title: 'Off the Trail | Mountain Basecamp',
    description: 'Premium mountain basecamp experiences beyond the ordinary.',
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
