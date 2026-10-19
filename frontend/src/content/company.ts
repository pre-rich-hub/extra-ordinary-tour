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
export const whyUs: (BrandPromise & {
  icon: 'local' | 'tailored' | 'handled' | 'support' | 'safety' | 'responsible' | 'explore'
  label: string
  image: string
  place: string
  // Longer copy for the homepage section; other pages use `text`.
  body?: string
})[] = [
  {
    icon: 'local',
    label: 'Local',
    image: '/images/lalibela-pilgrims.jpg',
    place: 'Lalibela',
    title: 'Locally based, locally run',
    text: 'Founded by a licensed guide from Lalibela. Our team shows you the Ethiopia we grew up in: its people, history and hidden corners.',
    body:
      'We are a locally based tour operator from Lalibela, and Ethiopia is the country we know best. Our experienced team brings genuine local knowledge to every journey, connecting you with local communities, ancient traditions and the cultures that make Ethiopia extraordinary. For us, travel is more than sightseeing.',
  },
  {
    icon: 'tailored',
    label: 'Tailored',
    image: '/images/simien-trek.jpg',
    place: 'Simien Mountains',
    title: 'Private, group or solo',
    text: 'Private, small-group or solo. Every itinerary is built around your interests, pace and budget, and stays flexible during the trip.',
    body:
      'Every journey is custom-designed around your interests, travel style and budget, for couples, families, friends, groups of all sizes and solo travelers. Travelling alone? You’re especially welcome: personalised itineraries, comfortable accommodation, dependable transport and professional local support let you discover Ethiopia at your own pace.',
  },
  {
    icon: 'handled',
    label: 'Arranged',
    image: '/images/gondar-fasil.jpg',
    place: 'Gondar',
    title: 'Everything arranged',
    text: 'Domestic flights, airport transfers, hotels, meals and guides, all organised for you, with no hidden costs along the way.',
  },
  {
    icon: 'support',
    label: '24/7',
    image: '/images/coffee-ceremony.jpg',
    place: 'Coffee ceremony',
    title: 'With you 24/7',
    text: 'One team on WhatsApp from your first message to your last day. Delayed flights and changed plans are solved quickly.',
  },
  {
    icon: 'safety',
    label: 'Safety',
    image: '/images/danakil-dallol.jpg',
    place: 'Dallol, Danakil',
    title: 'Safe hands',
    text: 'Experienced drivers, well-maintained 4x4 vehicles and honest advice on local conditions, so you can simply enjoy the journey.',
  },
  {
    icon: 'responsible',
    label: 'Responsible',
    image: '/images/konso.jpg',
    place: 'Konso',
    title: 'Responsible travel',
    text: 'We work with local guides and communities, ask before we photograph, and help preserve the places we share with you.',
  },
  {
    icon: 'explore',
    label: 'Explore',
    image: '/images/danakil-dallol.jpg',
    place: 'Dallol, Danakil',
    title: 'All of Ethiopia',
    text: 'The Historic Route, the Danakil Depression, the Omo Valley, the Simien and Bale Mountains and Addis Ababa, combined into one journey.',
    body:
      'Follow the Historic Route through the UNESCO World Heritage Sites of Axum, Lalibela, Gondar and Tigray. Cross the volcanic landscapes of the Danakil Depression, meet the cultures of the Omo Valley, or trek the Simien and Bale Mountains. Add Addis Ababa’s museums, markets and cuisine, and combine it all into one journey.',
  },
]

// Brand promises shown on the tours and contact pages.
export const promises: BrandPromise[] = whyUs.slice(0, 4).map(({ title, text }) => ({ title, text }))
