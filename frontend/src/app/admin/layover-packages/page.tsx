import type { Metadata } from 'next'
import { AdminLayoverPackages } from './layover-packages-client'

export const metadata: Metadata = {
  title: 'Layover Packages',
  robots: { index: false, follow: false },
}

export default function AdminLayoverPackagesPage() {
  return <AdminLayoverPackages />
}