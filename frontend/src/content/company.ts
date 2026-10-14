import type { BrandPromise } from '@/types'

// Official company slogan — used across the site.
export const slogan = 'Discover Ethiopia. Experience the Extraordinary!'

export const contact = {
  phone: '+251 912 039405',
  whatsapp: '+251 912 039405',
  email: 'info@extraordinaryethiopiatours.com',
  address: 'Workdingay Street, Meskel Kibra Kebele, Lalibela, Ethiopia',
  hours: 'Open 24 hours a day, 7 days a week',
}

// Reasons to travel with us — the homepage "Extraordinary Difference"
// section. Drawn from what guests praise most in their reviews.
export const whyUs: (BrandPromise & { icon: 'local' | 'tailored' | 'handled' | 'support' | 'safety' | 'responsible' })[] = [
  {
    icon: 'local',
    title: 'Born in Lalibela',
    text: 'Founded by a licensed guide from Lalibela. Our team shows you the Ethiopia we grew up in — its people, history and hidden corners.',
  },
  {
    icon: 'tailored',
    title: 'Truly tailor-made',
    text: 'Private, small-group or solo — every itinerary is built around your interests, pace and budget, and stays flexible during the trip.',
  },
  {
    icon: 'handled',
    title: 'Everything arranged',
    text: 'Domestic flights, airport transfers, hotels, meals and guides — all organised for you, with no hidden costs along the way.',
  },
  {
    icon: 'support',
    title: 'With you 24/7',
    text: 'One team on WhatsApp from your first message to your last day. Delayed flights and changed plans are solved quickly.',
  },
  {
    icon: 'safety',
    title: 'Safe hands',
    text: 'Experienced drivers, well-maintained 4x4 vehicles and honest advice on local conditions, so you can simply enjoy the journey.',
  },
  {
    icon: 'responsible',
    title: 'Responsible travel',
    text: 'We work with local guides and communities, ask before we photograph, and help preserve the places we share with you.',
  },
]

// Brand promises shown on the tours and contact pages.
export const promises: BrandPromise[] = whyUs.slice(0, 4).map(({ title, text }) => ({ title, text }))
