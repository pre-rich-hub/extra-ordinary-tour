import type { BrandPromise } from '../types'

// Reasons to travel with us — the homepage "Extraordinary Difference"
// section. Drawn from what guests praise most in their reviews.
export const whyUs: (BrandPromise & {
  icon: 'local' | 'tailored' | 'handled' | 'support' | 'safety' | 'responsible' | 'explore'
  label: string
  image: string
  // CSS object-position for photos whose subject is off-centre.
  position?: string
  place: string
  // Longer copy for the homepage section; other pages use `text`.
  body?: string
})[] = [
  {
    icon: 'local',
    label: 'Local',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792849727/Axum.png',
    place: 'Axum',
    title: 'Locally based, locally run',
    text:
      "Born from a deep connection to Lalibela and a passion for sharing Ethiopia, our locally run team brings first-hand knowledge of the country's history, cultures and hidden gems. We create meaningful travel experiences that connect you with the people, places and traditions that make Ethiopia extraordinary.",
  },
  {
    icon: 'tailored',
    label: 'Tailored',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792853426/sammy-wong-NVz_cZM2MDQ-unsplash_1.jpg',
    // Portrait: keep the face in frame when the panel crops it.
    position: 'center 25%',
    place: 'Hamar, Omo Valley',
    title: 'Private, group or solo',
    text:
      'Whether you prefer a private tour, a small-group experience or a solo adventure, we tailor each itinerary to your interests, pace and budget, with flexibility to accommodate changes along the way.',
  },
  {
    icon: 'handled',
    label: 'Arranged',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/gondar-fasil.jpg',
    place: 'Gondar',
    title: 'Your journey, carefully arranged',
    text:
      'From domestic flights and airport transfers to accommodation, meals and local guides, we coordinate the details of your trip so you can travel with confidence. All inclusions and exclusions are clearly explained before you book.',
  },
  {
    icon: 'support',
    label: 'Support',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/coffee-ceremony.jpg',
    place: 'Coffee ceremony',
    title: 'Personal support, throughout your trip',
    text:
      'Our team stays in touch from your first enquiry to the end of your journey. If flights are delayed or plans change, we help coordinate the necessary adjustments and keep you informed.',
  },
  {
    icon: 'safety',
    label: 'Safety',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792849753/danakil.png',
    place: 'Dallol, Danakil',
    title: 'Safe hands',
    text: 'Experienced drivers, well-maintained 4x4 vehicles and honest advice on local conditions, so you can simply enjoy the journey.',
  },
  {
    icon: 'responsible',
    label: 'Responsible',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792849768/konso.png',
    place: 'Konso',
    title: 'Responsible travel',
    text: 'We work with local guides and communities, ask before we photograph, and help preserve the places we share with you.',
  },
  {
    icon: 'explore',
    label: 'Explore',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792853432/yohannes-minas-MLagkKCpmlw-unsplash_1.jpg',
    place: 'Ethiopian highlands',
    title: 'All of Ethiopia',
    text: 'The Historic Route, the Danakil Depression, the Omo Valley, the Simien and Bale Mountains and Addis Ababa, combined into one journey.',
    body:
      'Follow the Historic Route through Axum, Lalibela, Gondar and Tigray, or cross the volcanic Danakil Depression. Meet the cultures of the Omo Valley, trek the Simien and Bale Mountains, and combine it all into one journey.',
  },
]

// Brand promises shown on the tours and contact pages.
export const promises: BrandPromise[] = whyUs.slice(0, 4).map(({ title, text }) => ({ title, text }))
