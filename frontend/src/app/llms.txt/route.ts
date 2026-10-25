import { site } from '@/lib/seo/entities'
import { absoluteUrl } from '@/lib/seo/urls'
import { tours } from '@/features/tours/data/tours'
import { destinations } from '@/features/destinations/data/destinations'
import { posts } from '@/features/blog/data/posts'

// Experimental index for AI tools (https://llmstxt.org); no engine has
// confirmed using it (geo.md, G4). Generated from the same catalogues as the
// sitemap, so it cannot list a page that does not exist.
export const dynamic = 'force-static'

const entry = (path: string, title: string, note: string) =>
  `- [${title}](${absoluteUrl(`/en${path === '/' ? '' : path}`)}): ${note}`

export function GET() {
  const { contact } = site
  const body = [
    `# ${site.name}`,
    '',
    '> A locally based Ethiopia tour operator in Lalibela, running private and small-group journeys across Ethiopia: the historic north, the Omo Valley, the Danakil Depression, the Simien and Bale Mountains, festivals, coffee and Addis Ababa layovers.',
    '',
    `Contact, 24 hours a day: ${contact.phone} (phone and WhatsApp), ${contact.ukPhone} (UK phone), ${contact.email}. Address: ${contact.address}. Every itinerary can be tailor-made; prices are quoted for the traveller's dates and group. Pages are published in English, Spanish (/es) and French (/fr); English URLs are listed here.`,
    '',
    '## Company',
    '',
    entry('/about', 'About us', 'who we are, our founder and how we work'),
    entry(
      '/contact',
      'Contact and planning questions',
      'how to enquire, reply times, booking, payment and visas',
    ),
    entry(
      '/layover',
      'Layover tours',
      'private 6, 12, 24 and 48-hour tours from Bole International Airport',
    ),
    '',
    '## Tours',
    '',
    ...tours.map((t) =>
      entry(`/tours/${t.slug}`, t.title, `${t.days}. ${t.teaser}`),
    ),
    '',
    '## Destinations',
    '',
    ...destinations.map((d) =>
      entry(`/destinations/${d.slug}`, d.name, `${d.region}. ${d.teaser}`),
    ),
    '',
    '## Journal',
    '',
    ...posts.map((p) => entry(`/blog/${p.slug}`, p.title, p.excerpt)),
    '',
    '## Optional',
    '',
    entry('/privacy-policy', 'Privacy policy', 'English only'),
    entry(
      '/terms-and-conditions',
      'Terms and conditions',
      'booking, payment and cancellation terms; English only',
    ),
    '',
  ].join('\n')
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // A file for tools, not a search result.
      'X-Robots-Tag': 'noindex',
    },
  })
}
