export type LayoverPackage = {
  slug: string
  hours: string
  title: string
  price: string
  // Starting price per person in USD; formatted per locale into `price`.
  priceAmount?: number
  image: string
  teaser: string
  itinerary: string[]
  includes: string[]
  best: string
}
