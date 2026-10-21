export type Post = {
  categoryKey?: string
  slug: string
  title: string
  category: string
  date: string
  datePublished: string
  dateModified?: string
  readTime: string
  image: string
  author: string
  authorRole: string
  excerpt: string
  body: string[]
  featured?: boolean
}
