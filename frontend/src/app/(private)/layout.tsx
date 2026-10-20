import { Analytics } from '@vercel/analytics/next'
import { documentClass, viewport } from '@/config/fonts'
import '../globals.css'
export { viewport }
export const metadata = { robots: { index: false, follow: false } }
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={documentClass}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
