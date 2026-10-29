'use client'

import { useEffect, useState } from 'react'
import { useCopy } from '@/i18n/copy'
import { EnquiryForm } from '@/features/enquiry/components/enquiry-form'
import type { LayoverPackage } from '../types'

// Package cards link to #book-<slug>. Pick that package in the form, scroll
// to it, then reset the hash to #book so the same button works again.
export function LayoverBookingForm({
  packages,
}: {
  packages: Pick<LayoverPackage, 'slug' | 'title' | 'hours'>[]
}) {
  const copy = useCopy()
  const [selected, setSelected] = useState('')

  useEffect(() => {
    const slugs = new Set(packages.map((p) => p.slug))

    const handle = () => {
      const { hash } = window.location
      if (!hash.startsWith('#book-')) return
      const slug = decodeURIComponent(hash.slice('#book-'.length))
      if (!slugs.has(slug)) return

      setSelected(slug)
      history.replaceState(null, '', '#book')
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      document
        .getElementById('book')
        ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
    }

    handle()
    window.addEventListener('hashchange', handle)
    return () => window.removeEventListener('hashchange', handle)
  }, [packages])

  return (
    <EnquiryForm
      subject={copy('Addis Ababa layover tour')}
      canonicalSubject="Addis Ababa layover tour"
      defaultStyles={['Layover']}
      packages={packages.map((p) => ({
        value: p.slug,
        label: `${copy(p.title)} (${copy(p.hours)})`,
      }))}
      selectedPackage={selected}
      onPackageChange={setSelected}
    />
  )
}
