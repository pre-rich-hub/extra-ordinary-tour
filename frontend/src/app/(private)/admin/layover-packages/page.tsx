import type { Metadata } from 'next'
import { AdminLayoverPackages } from '@/features/admin/layover-packages/components/layover-packages'

export const metadata: Metadata = {
  title: 'Layover Packages',
  robots: { index: false, follow: false },
}

export default function AdminLayoverPackagesPage() {
  return <AdminLayoverPackages />
}
