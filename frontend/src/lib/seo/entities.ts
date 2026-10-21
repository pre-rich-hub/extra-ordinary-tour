import { contact, slogan } from '@/config/site'

// Confirmed client facts; contact.ts consumers and SEO share the same values.
// Evidence and omissions are recorded in docs/seo/business-facts.md.
export const site = {
  name: 'Extraordinary Ethiopia Tours',
  origin: 'https://extraordinaryethiopiatours.com',
  slogan,
  contact,
  // The structured form of contact.address; no postal code or coordinates exist.
  address: {
    streetAddress: 'Workdingay Street, Meskel Kibra Kebele',
    addressLocality: 'Lalibela',
    addressCountry: 'ET',
  },
  founder: 'Maereg Tefere',
  logo: { path: '/images/logo.png', width: 512, height: 512 },
  // Only profiles verified to show this business; see business-facts.md.
  profiles: [
    'https://www.safaribookings.com/p6779',
    'https://www.safarigo.com/operator/extraordinary-ethiopia-tours-3022',
  ],
} as const
