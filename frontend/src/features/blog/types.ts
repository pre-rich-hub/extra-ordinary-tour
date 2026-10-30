/** A paragraph, or a heading or bullet list in longer practical articles. */
export type PostBlock = string | { heading: string } | { list: string[] }

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
  body: PostBlock[]
  featured?: boolean
}
