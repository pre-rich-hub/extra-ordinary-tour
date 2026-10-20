// Destination display contract shared by catalogue data and UI.

export type Destination = {
  canonicalName?: string
  regionKey?: string
  slug: string
  name: string
  region: string
  tag: string
  image: string
  teaser: string
  intro: string
  bestTime: string
  duration: string
  altitude: string
  highlights: string[]
  paragraphs: string[]
}
