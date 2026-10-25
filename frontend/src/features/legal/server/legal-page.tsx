import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/i18n/metadata'
import { PageHero } from '@/components/layout/page-hero'
import { JsonLd } from '@/components/seo/json-ld'
import { pageGraph } from '@/lib/seo/schema'
import { site } from '@/lib/seo/entities'
import { LegalDocument } from '../components/legal-document'
import { getLegalDocument, type LegalDocumentKey } from '../data/localized'

type Params = { params: Promise<{ locale: string }> }

const heroImage =
  'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-landscape.jpg'

export async function legalMetadata(
  { params }: Params,
  path: string,
  label: string,
  description: string,
): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()
  return buildPageMetadata(
    { title: copy(label), description: copy(description) },
    path,
    locale,
  )
}

export async function LegalPage({
  params,
  path,
  label,
  document,
}: Params & { path: string; label: string; document: LegalDocumentKey }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()
  const crumbs = [{ label: copy('Home'), href: '/' }, { label: copy(label) }]
  const { document: legal, translated } = getLegalDocument(document, locale)

  return (
    <>
      <JsonLd data={pageGraph({ path, locale, name: legal.title, crumbs })} />
      <PageHero
        eyebrow={site.name}
        title={copy(label)}
        image={heroImage}
        imageAlt={copy('The highland landscape around Lalibela')}
        crumbs={crumbs}
      />
      <LegalDocument document={legal} translated={translated} />
    </>
  )
}
