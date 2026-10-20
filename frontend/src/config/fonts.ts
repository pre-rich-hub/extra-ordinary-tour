import { Cormorant_Garamond, Inter } from 'next/font/google'
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})
export const documentClass = `${inter.variable} ${cormorant.variable} bg-background`
export const viewport = {
  themeColor: '#2a1d16',
  colorScheme: 'light' as const,
  width: 'device-width',
  initialScale: 1,
}
