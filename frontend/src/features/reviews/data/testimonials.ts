import type { ReviewSummary, Testimonial } from '../types'

const TRIPADVISOR_URL =
  'https://www.tripadvisor.com/Attraction_Review-g480193-d19444662-Reviews-Extraordinary_Ethiopia_Tours-Lalibela_Amhara_Region.html'
const SAFARIBOOKINGS_URL = 'https://www.safaribookings.com/reviews/p6779'
// The client's Google Business Profile and its write-a-review link.
const GOOGLE_URL = 'https://maps.app.goo.gl/bKjP81qy6eYaJgFQ6'
const GOOGLE_WRITE_URL = 'https://g.page/r/CWV9UrweVSJ0EBM/review'

// Verified guest reviews published on Tripadvisor, SafariBookings and Google
// (October 2026). Long reviews are shortened with an ellipsis.
export const testimonials: Testimonial[] = [
  {
    quote:
      'My 10-day journey through Ethiopia was nothing short of extraordinary, and I owe so much of that experience to my tour planner, Maereg. The itinerary was thoughtful, seamless and incredibly rich: a perfect balance of history, culture and unforgettable encounters. Celebrating Christmas Eve and Christmas Day in Lalibela was a once-in-a-lifetime experience, and the Omo Valley was where the trip became truly immersive. I wholeheartedly recommend Maereg and his team to anyone considering a tour of Ethiopia.',
    id: 'karen-e',
    name: 'Karen E',
    detail: 'Solo traveller · January 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/genna.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    date: 'January 2026',
  },
  {
    quote:
      'My tour operator was very communicative even before the trip began and very responsive on WhatsApp. He booked all my domestic flights and arranged all my airport pick-ups and drop-offs. He had professional guides in all the regions I visited, the itinerary was clear, and he was flexible with any changes. There were no extra costs. He is reliable, communicative and well experienced. I will be back with the same company.',
    id: 'sarah',
    name: 'Sarah',
    detail: 'Kenya · August 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-medhane-alem.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title:
      'Great service, great communication, seamless transfers and qualified guides',
    date: 'August 2026',
  },
  {
    quote:
      'We had an outstanding experience with our tour guide Maereg in Northern Ethiopia. When unexpected local conflicts disrupted our travel plans, he was incredibly understanding and flexible, and offered a compensation tour at no extra cost. His professionalism, patience and genuine care for his clients really stood out. You won’t just get a guide; you’ll have someone who truly cares about making your trip safe, enjoyable and memorable.',
    id: 'yiyu-s',
    name: 'Yiyu S',
    detail: 'Travelled with family · June 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/gondar-fasil.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    title: 'Best experience in Northern Ethiopia',
    date: 'June 2026',
  },
  {
    quote:
      'We express our gratitude to Extraordinary Ethiopia Tours for the superbly organised tour to the Danakil Depression, Erta Ale volcano, Dallol and the salt lake! It was one of the most memorable and unusual trips of our lives. I would especially like to commend the excellent organisation of the route, the professionalism of the guides and the attentiveness of the team. Everything was smooth, comfortable and safe.',
    id: 'dmitry',
    name: 'Dmitry',
    detail: 'Russia · May 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/danakil-dallol.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Highly recommended',
    date: 'May 2026',
  },
  {
    quote:
      'I recently returned from an 11-day solo trip to Ethiopia with Maereg. He took my interests in mind and came up with a great trip which included everything: sites, flights, accommodation and meals. He personally made sure I was comfortable and took care of everything. He and his company made my trip one of the best I have ever experienced.',
    id: 'marilyn',
    name: 'Marilyn',
    detail: 'Solo traveller · September 2025',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/simien-landscape.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    date: 'September 2025',
  },
  {
    quote:
      'Extraordinary Ethiopia Tours was a wonderful tour operator during my time in Lalibela. The guide, Ermiyas, was extremely knowledgeable and friendly. His love and passion for the town and especially the churches shines through. When some activities did not work out as planned, they went out of their way to find alternative options for me. Great experience for a solo traveller!',
    id: 'tamryn',
    name: 'Tamryn',
    detail: 'South Africa · March 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-giyorgis.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Go the extra mile!',
    date: 'March 2026',
  },
  {
    quote:
      'Our experience was amazing. My aunt and I loved the tour. We were supposed to spend two days in Lalibela but our flight had a long delay; our tour guide came through and accommodated us, and was very helpful, friendly and flexible. Very knowledgeable and very well organised. Took the best pictures of us as well!',
    id: 'stamatia-nefeli-g',
    name: 'Stamatia Nefeli G',
    detail: 'New York City · April 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-pilgrims.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    title: 'Absolutely stunning',
    date: 'April 2026',
  },
  {
    quote:
      'After a 16-day itinerary in Ethiopia I am more than grateful to Maereg and his team, a truly once-in-a-lifetime tour. I had a solo safari to the Bale Mountains, the Omo Valley tribes, Gondar and Lalibela. All the arrangements were better than expected, and I felt that I was in safe hands all the time. To be honest: I fell in love with Ethiopia. His team is professional, energetic and ambitious, and they show their country to you with love!',
    id: 'eeva',
    name: 'Eeva',
    detail: 'Finland · January 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/bale-sanetti.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Professional, ambitious and energetic',
    date: 'January 2026',
  },
  {
    quote:
      'Incredible visit led by Maereg. Excellent guide, knowledgeable and with impeccable manners. The churches are worth visiting: a 10!',
    id: 'ceci-c',
    name: 'Ceci C',
    detail: 'Buenos Aires, Argentina · July 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793006889/lalibela-bete-giyorgis-pilgrims-small.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    title: 'Unmissable visit to Lalibela',
    date: 'July 2026',
  },
  {
    quote:
      'There really isn’t enough I can say to describe the kindness, care and intelligence Maereg and his company gift to visitors in Ethiopia. I have been with them three times now, and every day blows my mind, in all the best ways. Not only do the staff and drivers know everything about their country, they are devoted to their communities and business. I recommend them without reservation…',
    id: 'tlhalefo',
    name: 'TLhalefo',
    detail: 'France · March 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/axum-zion.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Beyond Extraordinary!!',
    date: 'March 2026',
  },
  {
    quote:
      'My tour was very educational and the tour guide was very knowledgeable and helpful throughout our tour. I highly recommend!',
    id: 'nicole-williams',
    name: 'Nicole Williams',
    detail: 'United States · March 2024',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/addis-trinity.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Very kind and professional!',
    date: 'March 2024',
  },
  {
    quote:
      'Very professional from the beginning to the end. Personalised package. Great experience!',
    id: 'miguel',
    name: 'Miguel',
    detail: 'Portugal · April 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/simien-gelada.jpg',
    platform: 'SafariBookings',
    rating: 5,
    title: 'Great!',
    date: 'April 2026',
  },
  {
    quote:
      'My family spent an amazing time exploring Lalibela with Ermias. He is as passionate as he is knowledgeable, and he made us feel at home as we learned about the history, beauty and culture of this extraordinary city. The trip was well planned and executed, and we saw a great deal of Lalibela in a short time without ever feeling rushed. We are forever grateful to Maereg and his team for a truly unforgettable experience!',
    id: 'kyrakoel',
    name: 'kyrakoel',
    detail: 'Brooklyn, New York · February 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-landscape.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    title: 'Magical Lalibela',
    date: 'February 2026',
  },
  {
    quote:
      'Impossible to describe this place: a huge maze, often a small path cut into the rock, sometimes a tunnel, connecting the churches. An essential guide to explore this magical site. In these many churches, still active, pilgrims and tourists are welcomed by the priest, who gladly offers to bless you with the magnificent cross he holds.',
    id: 'bordelaisvoyageur',
    name: 'bordelaisvoyageur',
    detail: 'Talence, France · May 2025',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-medhane-alem.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    title: 'Extraordinary',
    date: 'May 2025',
  },
  {
    quote:
      'Ermiyas from Extraordinary Ethiopia Tours was a fantastic guide. His love and passion for the Lalibela churches and the town itself is evident in how he speaks. He helped make the experience an amazing one!',
    id: 'tamryn-j',
    name: 'Tamryn J',
    detail: 'Solo traveller · March 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/yemrehanna-kristos.jpg',
    platform: 'Tripadvisor',
    rating: 5,
    title: 'Brilliant!',
    date: 'March 2026',
  },
  {
    quote:
      'I enjoyed touring the churches of Lalibela and the guide was polite and knowledgeable. The tour is a lot of work due to the thin air from the high altitude and the uneven walkways.',
    id: 'david-l',
    name: 'David L',
    detail: 'Solo traveller · February 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/asheton-maryam.jpg',
    platform: 'Tripadvisor',
    rating: 4,
    title: 'Black history lesson',
    date: 'February 2026',
  },
  {
    quote:
      'I had a wonderful time exploring Ethiopia with Maereg from Extraordinary Ethiopia Tours. From start to finish, everything was well organized, and the experience exceeded my expectations. Maereg went above and beyond to ensure I had an authentic and memorable journey. His knowledge, professionalism, and genuine hospitality made the trip truly special. I highly recommend Extraordinary Ethiopia Tours to anyone looking to discover the beauty, culture, and history of Ethiopia.',
    id: 'etalem-ayalew',
    name: 'Etalem Ayalew',
    detail: 'Google review · June 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-giyorgis.jpg',
    platform: 'Google',
    rating: 5,
    date: 'June 2026',
  },
  {
    quote:
      'I cannot say enough about the fabulous trip I took with Extraordinary Ethiopia Tours. Traveling alone, Maereg designed a trip for me that included culture, history, extraordinary sites, animals and people. Maereg went beyond my expectations to ensure that I was safe and comfortable. Most importantly, he assisted in enabling me to interact with the lovely people we encountered while seeing this most interesting country. I have traveled to over 150 countries, and this trip ranks as one of the best.',
    id: 'marilyn-google',
    name: 'Marilyn',
    detail: 'Solo traveller · July 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/banna.jpg',
    platform: 'Google',
    rating: 5,
    date: 'July 2026',
  },
  {
    quote:
      'Just perfect experience with Extraordinary Ethiopia Tours: fell in love with Ethiopia, thanks to Maereg and his great team. Had a 16 days’ solo safari to Bale Mountains, Omo Valley tribes, Gondar and Lalibela. Everything worked as planned, all the arrangements were even better than expected: Driver BK was just brilliant, Toyota Land Cruiser wonderful, accommodation exceeding all the expectations, meals great and Maereg’s ongoing follow-up made you feel that you were in safe hands all the time. Ethiopia is an amazing country. Ethiopians are incredibly kind and nice. I wish I could have stayed longer, but decided already to return. Can only warmly recommend Maereg and his mates to any type of traveller. His team is energetic and ambitious and does not leave even the slightest detail unchecked. They do want to show their country to you, and they do it with love!',
    id: 'eeva-palojarvi',
    name: 'Eeva Palojarvi',
    detail: '16-day solo safari · July 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/bale-wolf.jpg',
    platform: 'Google',
    rating: 5,
    date: 'July 2026',
  },
  {
    quote:
      'We recently completed a 2-day tour of the Lalibela churches, and we couldn’t be more grateful for our incredible guide, Maereg! From the very beginning, Maereg gave us a warm and friendly welcome during the airport pick-up. The vehicle provided throughout the tour was clean, highly comfortable, and driven with the utmost safety, making our transit smooth and worry-free. During our visits to the rock-hewn churches, Maereg’s guiding skills truly shone. His explanations of the historical and cultural sites were incredibly detailed and comprehensive. He navigated the tour routes perfectly and pointed out the absolute best viewpoints for taking stunning photos. On top of that, the dining arrangements he organized were absolutely delicious. A huge thank you to Maereg for making our trip so unforgettable. We highly recommend his guiding services to anyone visiting Lalibela!',
    id: 'leon-chen',
    name: 'Leon Chen',
    detail: '2-day Lalibela tour · July 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-medhane-alem.jpg',
    platform: 'Google',
    rating: 5,
    date: 'July 2026',
  },
  {
    quote:
      'Excellent services provided by Maereg and his team. The local guides and the drivers – Geta (my fave) – were all great. They were patient, professional, knowledgeable and took great care of us. Everything was seamlessly coordinated and they were always on time for pickups and made sure we were briefed in advance of the itinerary and any changes. One of my top travel destinations in Africa, with some of the kindest and warmest people. Maereg went above and beyond! First-class service, always with a smile!',
    id: 'd-thomas',
    name: 'D Thomas',
    detail: 'Google review · May 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793010802/omo-tsemay-pottery-market.jpg',
    platform: 'Google',
    rating: 5,
    date: 'May 2026',
  },
  {
    quote:
      'I spent two days in Lalibela. Maereg is a very professional and knowledgeable tour guide with strong historical, political, and cultural knowledge, which in my opinion is essential to truly understand Lalibela. He also has excellent English communication skills and explains everything clearly about Lalibela and Ethiopia. Thank you — I can highly recommend him.',
    id: 'habtu-engdaw',
    name: 'Habtu Engdaw',
    detail: '2 days in Lalibela · May 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-landscape.jpg',
    platform: 'Google',
    rating: 5,
    date: 'May 2026',
  },
  {
    quote:
      'I had a wonderful experience! Maereg was very kind, professional, and always helpful throughout the trip. Everything was well organized, and it was an amazing way to discover Lalibela. I truly enjoyed the experience and would definitely recommend Extraordinary Ethiopia Tours to anyone visiting Ethiopia!',
    id: 'sumire-hayakawa-ivanovic',
    name: 'Sumire Hayakawa-Ivanović',
    detail: 'Lalibela · May 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/lalibela-pilgrims.jpg',
    platform: 'Google',
    rating: 5,
    date: 'May 2026',
  },
  {
    quote:
      'Ermiyas from Extraordinary Ethiopia Tours was a fantastic guide. His love and passion for the Lalibela churches and the town itself is evident in how he speaks. He helped make the experience an amazing one!',
    id: 'g-tesfaw',
    name: 'G. Tesfaw',
    detail: 'Lalibela · May 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/3-Day_Lalibela_Rock-Hewn_Churches.jpg',
    platform: 'Google',
    rating: 5,
    date: 'May 2026',
  },
  {
    quote:
      'It was an amazing experience with a very knowledgeable guide, who answered our questions, provided a lot of information and even assisted us with some issues at our hotel! Highly recommend!',
    id: 'lalibela-boys',
    name: 'Lalibela Boys',
    detail: 'Lalibela · May 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/asheton-maryam.jpg',
    platform: 'Google',
    rating: 5,
    date: 'May 2026',
  },
  {
    quote:
      'I was traveling with Extraordinary Ethiopia Tours and my experience was really excellent. I do recommend it!',
    id: 'pablo-bedrossian',
    name: 'Pablo Bedrossian',
    detail: 'Google Local Guide · May 2026',
    image: 'https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/gheralta-mountains.jpg',
    platform: 'Google',
    rating: 5,
    date: 'May 2026',
  },
]

// Live totals from each platform (checked October 2026).
export const reviewSummaries: ReviewSummary[] = [
  { platform: 'Tripadvisor', url: TRIPADVISOR_URL, count: 134, rating: 5.0 },
  {
    platform: 'SafariBookings',
    url: SAFARIBOOKINGS_URL,
    count: 38,
    rating: 4.9,
  },
  // Rating to be confirmed from the Google profile; until then only the
  // review count is shown.
  {
    platform: 'Google',
    url: GOOGLE_URL,
    count: 17,
    rating: null,
    writeUrl: GOOGLE_WRITE_URL,
  },
]

// Kept for existing consumers that expect a single summary.
export const reviewSummary: ReviewSummary = reviewSummaries[0]
