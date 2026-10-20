import Link from 'next/link'
import { documentClass } from '@/config/fonts'
import './globals.css'
export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}
export default function GlobalNotFound() {
  return (
    <html lang="en" className={documentClass}>
      <body>
        <main className="shell flex min-h-screen flex-col items-center justify-center gap-6 text-center">
          <p>Error 404</p>
          <h1 className="font-serif text-4xl">
            This road does not appear on our map
          </h1>
          <Link href="/en">Back to the beginning</Link>
        </main>
      </body>
    </html>
  )
}
