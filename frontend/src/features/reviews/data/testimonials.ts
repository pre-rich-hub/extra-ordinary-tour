import type { ReviewSummary, Testimonial } from '../types'

const TRIPADVISOR_URL =
  'https://www.tripadvisor.com/Attraction_Review-g480193-d19444662-Reviews-Extraordinary_Ethiopia_Tours-Lalibela_Amhara_Region.html'
const SAFARIBOOKINGS_URL = 'https://www.safaribookings.com/reviews/p6779'

// Verified guest reviews published on Tripadvisor and SafariBookings
// (October 2026). Long reviews are shortened with an ellipsis.
export const testimonials: Testimonial[] = [
  {
    quote:
      'My 10-day journey through Ethiopia was nothing short of extraordinary, and I owe so much of that experience to my tour planner, Maereg. The itinerary was thoughtful, seamless and incredibly rich: a perfect balance of history, culture and unforgettable encounters. Celebrating Christmas Eve and Christmas Day in Lalibela was a once-in-a-lifetime experience, and the Omo Valley was where the trip became truly immersive. I wholeheartedly recommend Maereg and his team to anyone considering a tour of Ethiopia.',
    name: 'Karen E',
    detail: 'Solo traveller · January 2026',
    image: '/images/genna.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    date: 'January 2026',
  },
  {
    quote:
      'My tour operator was very communicative even before the trip began and very responsive on WhatsApp. He booked all my domestic flights and arranged all my airport pick-ups and drop-offs. He had professional guides in all the regions I visited, the itinerary was clear, and he was flexible with any changes. There were no extra costs. He is reliable, communicative and well experienced. I will be back with the same company.',
    name: 'Sarah',
    detail: 'Kenya · August 2026',
    image: '/images/lalibela-medhane-alem.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Great service, great communication, seamless transfers and qualified guides',
    date: 'August 2026',
  },
  {
    quote:
      'We had an outstanding experience with our tour guide Maereg in Northern Ethiopia. When unexpected local conflicts disrupted our travel plans, he was incredibly understanding and flexible, and offered a compensation tour at no extra cost. His professionalism, patience and genuine care for his clients really stood out. You won’t just get a guide; you’ll have someone who truly cares about making your trip safe, enjoyable and memorable.',
    name: 'Yiyu S',
    detail: 'Travelled with family · June 2026',
    image: '/images/gondar-fasil.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    title: 'Best experience in Northern Ethiopia',
    date: 'June 2026',
  },
  {
    quote:
      'We express our gratitude to Extraordinary Ethiopia Tours for the superbly organised tour to the Danakil Depression, Erta Ale volcano, Dallol and the salt lake! It was one of the most memorable and unusual trips of our lives. I would especially like to commend the excellent organisation of the route, the professionalism of the guides and the attentiveness of the team. Everything was smooth, comfortable and safe.',
    name: 'Dmitry',
    detail: 'Russia · May 2026',
    image: '/images/danakil-dallol.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Highly recommended',
    date: 'May 2026',
  },
  {
    quote:
      'I recently returned from an 11-day solo trip to Ethiopia with Maereg. He took my interests in mind and came up with a great trip which included everything: sites, flights, accommodation and meals. He personally made sure I was comfortable and took care of everything. He and his company made my trip one of the best I have ever experienced.',
    name: 'Marilyn',
    detail: 'Solo traveller · September 2025',
    image: '/images/simien-landscape.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    date: 'September 2025',
  },
  {
    quote:
      'Extraordinary Ethiopia Tours was a wonderful tour operator during my time in Lalibela. The guide, Ermiyas, was extremely knowledgeable and friendly. His love and passion for the town and especially the churches shines through. When some activities did not work out as planned, they went out of their way to find alternative options for me. Great experience for a solo traveller!',
    name: 'Tamryn',
    detail: 'South Africa · March 2026',
    image: '/images/lalibela-giyorgis.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Go the extra mile!',
    date: 'March 2026',
  },
  {
    quote:
      'Our experience was amazing. My aunt and I loved the tour. We were supposed to spend two days in Lalibela but our flight had a long delay; our tour guide came through and accommodated us, and was very helpful, friendly and flexible. Very knowledgeable and very well organised. Took the best pictures of us as well!',
    name: 'Stamatia Nefeli G',
    detail: 'New York City · April 2026',
    image: '/images/lalibela-pilgrims.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    title: 'Absolutely stunning',
    date: 'April 2026',
  },
  {
    quote:
      'After a 16-day itinerary in Ethiopia I am more than grateful to Maereg and his team, a truly once-in-a-lifetime tour. I had a solo safari to the Bale Mountains, the Omo Valley tribes, Gondar and Lalibela. All the arrangements were better than expected, and I felt that I was in safe hands all the time. To be honest: I fell in love with Ethiopia. His team is professional, energetic and ambitious, and they show their country to you with love!',
    name: 'Eeva',
    detail: 'Finland · January 2026',
    image: '/images/bale-sanetti.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Professional, ambitious and energetic',
    date: 'January 2026',
  },
  {
    quote:
      'Incredible visit led by Maereg. Excellent guide, knowledgeable and with impeccable manners. The churches are worth visiting: a 10!',
    name: 'Ceci C',
    detail: 'Buenos Aires, Argentina · July 2026',
    image: '/images/lalibela-landscape.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    title: 'Unmissable visit to Lalibela',
    date: 'July 2026',
  },
  {
    quote:
      'There really isn’t enough I can say to describe the kindness, care and intelligence Maereg and his company gift to visitors in Ethiopia. I have been with them three times now, and every day blows my mind, in all the best ways. Not only do the staff and drivers know everything about their country, they are devoted to their communities and business. I recommend them without reservation…',
    name: 'TLhalefo',
    detail: 'France · March 2026',
    image: '/images/axum-zion.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Beyond Extraordinary!!',
    date: 'March 2026',
  },
  {
    quote:
      'My tour was very educational and the tour guide was very knowledgeable and helpful throughout our tour. I highly recommend!',
    name: 'Nicole Williams',
    detail: 'United States · March 2024',
    image: '/images/addis-trinity.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Very kind and professional!',
    date: 'March 2024',
  },
  {
    quote:
      'Very professional from the beginning to the end. Personalised package. Great experience!',
    name: 'Miguel',
    detail: 'Portugal · April 2026',
    image: '/images/simien-gelada.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Great!',
    date: 'April 2026',
  },
  {
    quote:
      'My family spent an amazing time exploring Lalibela with Ermias. He is as passionate as he is knowledgeable, and he made us feel at home as we learned about the history, beauty and culture of this extraordinary city. The trip was well planned and executed, and we saw a great deal of Lalibela in a short time without ever feeling rushed. We are forever grateful to Maereg and his team for a truly unforgettable experience!',
    name: 'kyrakoel',
    detail: 'Brooklyn, New York · February 2026',
    image: '/images/lalibela-landscape.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    title: 'Magical Lalibela',
    date: 'February 2026',
  },
  {
    quote:
      'Impossible to describe this place: a huge maze, often a small path cut into the rock, sometimes a tunnel, connecting the churches. An essential guide to explore this magical site. In these many churches, still active, pilgrims and tourists are welcomed by the priest, who gladly offers to bless you with the magnificent cross he holds.',
    name: 'bordelaisvoyageur',
    detail: 'Talence, France · May 2025',
    image: '/images/lalibela-medhane-alem.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    title: 'Extraordinary',
    date: 'May 2025',
  },
  {
    quote:
      'Ermiyas from Extraordinary Ethiopia Tours was a fantastic guide. His love and passion for the Lalibela churches and the town itself is evident in how he speaks. He helped make the experience an amazing one!',
    name: 'Tamryn J',
    detail: 'Solo traveller · March 2026',
    image: '/images/yemrehanna-kristos.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    title: 'Brilliant!',
    date: 'March 2026',
  },
  {
    quote:
      'I enjoyed touring the churches of Lalibela and the guide was polite and knowledgeable. The tour is a lot of work due to the thin air from the high altitude and the uneven walkways.',
    name: 'David L',
    detail: 'Solo traveller · February 2026',
    image: '/images/asheton-maryam.jpg',
    platform: 'Tripadvisor',
    rating: 4,
    title: 'Black history lesson',
    date: 'February 2026',
  },
]

// Live totals from each platform (checked October 2026).
export const reviewSummaries: ReviewSummary[] = [
  { platform: 'Tripadvisor', url: TRIPADVISOR_URL, count: 134, rating: 5.0 },
  { platform: 'SafariBookings', url: SAFARIBOOKINGS_URL, count: 38, rating: 4.9 },
]

// Kept for existing consumers that expect a single summary.
export const reviewSummary: ReviewSummary = reviewSummaries[0]
