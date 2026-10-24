import { isPublished } from '@/i18n/publication'
import { routing, type AppLocale } from '@/i18n/routing'
import { site } from './entities'
import { absoluteUrl, localePath } from './urls'

// Stable JSON-LD identities. The business and website are shared by every
// locale; page entities are keyed by their localized canonical URL.
export const schemaIds = {
  organization: `${site.origin}/#organization`,
  website: `${site.origin}/#website`,
}
const ref = (id: string) => ({ '@id': id })
const ethiopia = { '@type': 'Country', name: 'Ethiopia' }
export const pageUrl = (path: string, locale: AppLocale) =>
  absoluteUrl(localePath(path, locale))

/** JSON for a script element: `<`, `>`, `&` and line separators are escaped. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(new RegExp('\\u2028', 'g'), '\\u2028')
    .replace(new RegExp('\\u2029', 'g'), '\\u2029')
}

export function siteGraph() {
  const telephone = site.contact.phone.replace(/\s/g, '')
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        '@id': schemaIds.organization,
        name: site.name,
        url: site.origin,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl(site.logo.path),
          width: site.logo.width,
          height: site.logo.height,
        },
        image: absoluteUrl('/images/og-default.jpg'),
        slogan: site.slogan,
        email: site.contact.email,
        telephone,
        address: { '@type': 'PostalAddress', ...site.address },
        founder: { '@type': 'Person', name: site.founder },
        areaServed: ethiopia,
        // Round-the-clock contact availability, not physical office hours.
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            telephone,
            email: site.contact.email,
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              opens: '00:00',
              closes: '23:59',
            },
          },
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            telephone: site.contact.ukPhone.replace(/\s/g, ''),
            areaServed: 'GB',
          },
        ],
        sameAs: site.profiles,
      },
      {
        '@type': 'WebSite',
        '@id': schemaIds.website,
        name: site.name,
        url: site.origin,
        inLanguage: routing.locales.filter(isPublished),
        publisher: ref(schemaIds.organization),
      },
    ],
  }
}

export type SchemaCrumb = { label: string; href?: string }

/** A page entity, its visible breadcrumbs and the thing the page is about. */
export function pageGraph({
  path,
  locale,
  type = 'WebPage',
  name,
  description,
  crumbs,
  about,
}: {
  path: string
  locale: AppLocale
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
  name: string
  description?: string
  crumbs?: SchemaCrumb[]
  about?: Record<string, unknown>
}) {
  const url = pageUrl(path, locale)
  const breadcrumb = crumbs?.length
    ? {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: crumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.label,
          // The final, unlinked crumb is the current page.
          item: crumb.href ? pageUrl(crumb.href, locale) : url,
        })),
      }
    : undefined
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        '@id': `${url}#webpage`,
        url,
        name,
        ...(description ? { description } : {}),
        inLanguage: locale,
        isPartOf: ref(schemaIds.website),
        ...(breadcrumb ? { breadcrumb: ref(breadcrumb['@id']) } : {}),
        ...(about ? { mainEntity: ref(about['@id'] as string) } : {}),
      },
      ...(breadcrumb ? [breadcrumb] : []),
      ...(about ? [about] : []),
    ],
  }
}

export function articleSchema(
  post: {
    title: string
    excerpt: string
    image: string
    author: string
    category: string
    datePublished: string
    dateModified?: string
  },
  path: string,
  locale: AppLocale,
) {
  const url = pageUrl(path, locale)
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: post.datePublished,
    ...(post.dateModified ? { dateModified: post.dateModified } : {}),
    author: { '@type': 'Person', name: post.author },
    publisher: ref(schemaIds.organization),
    mainEntityOfPage: ref(`${url}#webpage`),
    articleSection: post.category,
    inLanguage: locale,
  }
}

export function tripSchema(
  tour: {
    title: string
    summary: string
    image: string
    places: string[]
    priceAmount?: number | null
  },
  path: string,
  locale: AppLocale,
) {
  const url = pageUrl(path, locale)
  return {
    '@type': 'TouristTrip',
    '@id': `${url}#trip`,
    name: tour.title,
    description: tour.summary,
    image: tour.image,
    url,
    provider: ref(schemaIds.organization),
    itinerary: {
      '@type': 'ItemList',
      itemListElement: tour.places.map((name, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'Place', name },
      })),
    },
    // Only a real live adult price; "on request" tours carry no offer.
    ...(typeof tour.priceAmount === 'number' && tour.priceAmount > 0
      ? {
          offers: {
            '@type': 'Offer',
            url,
            price: tour.priceAmount,
            priceCurrency: 'USD',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: tour.priceAmount,
              priceCurrency: 'USD',
              unitText: 'per person',
            },
            offeredBy: ref(schemaIds.organization),
          },
        }
      : {}),
  }
}

export function destinationSchema(
  destination: { name: string; intro: string; image: string },
  path: string,
  locale: AppLocale,
) {
  const url = pageUrl(path, locale)
  return {
    '@type': 'TouristDestination',
    '@id': `${url}#destination`,
    name: destination.name,
    description: destination.intro,
    image: destination.image,
    url,
    containedInPlace: ethiopia,
  }
}
