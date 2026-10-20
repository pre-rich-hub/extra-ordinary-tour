import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { SiteNav } from '@/components/layout/site-nav'
import { SiteFooter } from '@/components/layout/site-footer'
import { FloatingSupport } from '@/components/layout/floating-support'
import { slogan } from '@/config/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `Extraordinary Ethiopia Tours | ${slogan}`,
    template: '%s · Extraordinary Ethiopia Tours',
  },
  description:
    `${slogan} A locally based Ethiopia tour operator from Lalibela offering private and group tours: the Historic Route, Lalibela, the Simien and Bale Mountains, the Omo Valley, the Danakil Depression, festivals, coffee, birding and Addis Ababa day trips.`,
  keywords: [
    'Ethiopia tours',
    'Private Ethiopia tours',
    'Ethiopia tour operator',
    'Lalibela tours',
    'Historic Route Ethiopia',
    'Simien Mountains trekking',
    'Danakil Depression tour',
    'Omo Valley tour',
    'Timkat festival tour',
    'Ethiopia coffee tour',
    'Addis Ababa city tour',
  ],
  openGraph: {
    title: `Extraordinary Ethiopia Tours | ${slogan}`,
    description:
      'Private and small-group journeys across Ethiopia with a local team based in Lalibela.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#2a1d16',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} bg-background`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
        <FloatingSupport />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
