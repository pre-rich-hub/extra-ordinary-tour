import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { env } from "../src/config/env.js";

// Starter rows for the four packages the public layover page is built around.
// The frontend keys its localized copy by these slugs, so the slugs must not
// change. Existing rows are left untouched so re-running the seed does not
// overwrite price or image edits made in the admin panel.
const prisma = new PrismaClient({
  ...(env.DIRECT_URL ? { datasourceUrl: env.DIRECT_URL } : {}),
});

const packages = [
  {
    slug: "6-hour",
    hours: "6 Hours",
    title: "Addis Ababa Highlights Tour",
    price: "$60 per person",
    imageUrl:
      "https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1792849746/addis-abebe.jpg",
    teaser:
      "A short loop of the capital for tight connections: Entoto views, a cathedral and a coffee ceremony.",
    itinerary: [
      "Meet-and-assist at arrivals with a name board",
      "Drive up Mount Entoto for the panorama over Addis Ababa",
      "Holy Trinity Cathedral and the tomb of Emperor Haile Selassie",
      "A traditional coffee ceremony and a light Ethiopian lunch",
      "Return to Bole in good time for your onward flight",
    ],
    includes: [
      "Private air-conditioned vehicle and licensed guide",
      "All entrance fees",
      "Lunch and the coffee ceremony",
      "Airport meet-and-greet both ways",
    ],
    bestFor: "Connections of 8 hours or more",
    sortOrder: 0,
  },
  {
    slug: "12-hour",
    hours: "12 Hours",
    title: "Addis Ababa Full-Day City Tour",
    price: "$100 per person",
    imageUrl:
      "https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/addis-trinity.jpg",
    teaser:
      "Our full Addis Ababa day: Entoto, Lucy at the National Museum, Holy Trinity, Merkato and a coffee ceremony.",
    itinerary: [
      "Meet at arrivals and begin with the views from Mount Entoto",
      "The National Museum of Ethiopia: meet Lucy",
      "Holy Trinity Cathedral and the Ethnological Museum",
      "Traditional Ethiopian lunch",
      "Merkato, one of Africa's largest open-air markets",
      "Coffee ceremony, then return to Bole for check-in",
    ],
    includes: [
      "Private vehicle or minibus with licensed guide",
      "All entrance fees",
      "Lunch and coffee ceremony",
      "Airport transfers and check-in assistance",
    ],
    bestFor: "Connections of 14 hours or more",
    sortOrder: 1,
  },
  {
    slug: "24-hour",
    hours: "24 Hours",
    title: "Overnight Stay and Day Trip",
    price: "$350 per person",
    imageUrl:
      "https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/blue-nile-gorge.jpg",
    teaser:
      "A night in Addis Ababa, a cultural dinner, and a day trip to Debre Libanos or Wenchi Crater Lake.",
    itinerary: [
      "Arrivals meet and transfer to your hotel",
      "Dinner at a traditional restaurant with music and dance",
      "Morning drive to Debre Libanos and the Portuguese Bridge",
      "Gelada on the cliffs and the rim of the Blue Nile Gorge",
      "Or choose Wenchi Crater Lake, or Tiya and Adadi Mariam",
      "Return to Addis Ababa and transfer to the airport",
    ],
    includes: [
      "One night in a 3 to 4 star hotel with breakfast",
      "Private vehicle and licensed guide throughout",
      "Cultural dinner, lunch and all entrance fees",
      "Airport transfers both ways",
    ],
    bestFor: "Overnight connections and stopovers",
    sortOrder: 2,
  },
  {
    slug: "48-hour",
    hours: "48 Hours",
    title: "Lalibela Stopover Tour",
    price: "$600 per person",
    imageUrl:
      "https://res.cloudinary.com/oyw9kdvp/image/upload/f_auto,q_auto,c_limit,w_1200/v1793006889/lalibela-bete-giyorgis-pilgrims-small.jpg",
    teaser:
      "Two days is enough for Lalibela: fly north, explore the rock-hewn churches, and fly back for your onward leg.",
    itinerary: [
      "Arrivals meet and morning flight to Lalibela",
      "The northern and eastern church clusters with a local guide",
      "Bete Giyorgis in the afternoon light",
      "Evening coffee ceremony and a night in a Lalibela lodge",
      "Morning visit, then the flight back to Addis Ababa",
      "Transfer to Bole for your onward flight",
    ],
    includes: [
      "Domestic flights Addis Ababa to Lalibela to Addis Ababa",
      "One night's lodge accommodation with full board",
      "Licensed local guide and all church entrance fees",
      "All airport and hotel transfers",
    ],
    bestFor: "Stopovers of two days or more",
    sortOrder: 3,
  },
];

async function main() {
  for (const pkg of packages) {
    const existing = await prisma.layoverPackage.findUnique({
      where: { slug: pkg.slug },
      select: { id: true },
    });

    if (existing) {
      console.log(`Layover package already exists: ${pkg.slug}`);
      continue;
    }

    await prisma.layoverPackage.create({
      data: {
        ...pkg,
        itinerary: JSON.stringify(pkg.itinerary),
        includes: JSON.stringify(pkg.includes),
      },
    });
    console.log(`Layover package created: ${pkg.slug}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
