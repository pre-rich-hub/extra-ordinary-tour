import 'server-only'
import type { Post } from '../types'
import { getPosts as getLocalizedPosts } from '../data/localized'
import { getPosts, type ApiPost } from '../api/client'
import type { AppLocale } from '@/i18n/routing'
import { usableImage } from '@/lib/media/usable-image'
import { firstSentence } from '@/lib/utils'

// The admin stores the whole article in the description field.
function fromAdmin(live: ApiPost, slug: string, locale: AppLocale): Post {
  const article = live.description?.trim() ?? ''
  const published = live.createdAt ? new Date(live.createdAt) : new Date()
  const words = article.split(/\s+/).length
  return {
    slug,
    title: live.title,
    category: live.category?.name ?? 'Travel Journal',
    date: new Intl.DateTimeFormat(locale, {
      dateStyle: 'long',
      timeZone: 'UTC',
    }).format(published),
    datePublished: published.toISOString().slice(0, 10),
    readTime: `${Math.max(1, Math.round(words / 200))} min read`,
    image: usableImage(live.imageUrl, '/placeholder.svg'),
    author: 'Extraordinary Ethiopia Tours',
    authorRole: 'Travel Writer',
    excerpt: firstSentence(article),
    body: article.split(/\n\s*\n/).filter((p) => p.trim()),
  }
}

export async function getPostsData(locale: AppLocale = 'en'): Promise<Post[]> {
  const staticPosts: Post[] = getLocalizedPosts(locale)
  let livePosts: ApiPost[] = []
  try {
    livePosts = await getPosts({ next: { revalidate: 3600, tags: ['blog'] } })
  } catch {
    livePosts = []
  }

  const bySlug = new Map(livePosts.map((p) => [p.slug, p]))
  const known = new Set(staticPosts.map((p) => p.slug))
  const added = livePosts.flatMap((p) =>
    p.slug && !known.has(p.slug) ? [fromAdmin(p, p.slug, locale)] : [],
  )

  return [
    ...added,
    ...staticPosts.map((p) => ({
      ...p,
      image: usableImage(bySlug.get(p.slug)?.imageUrl, p.image),
    })),
  ]
}

export async function getPostData(
  slug: string,
  locale: AppLocale = 'en',
): Promise<Post | undefined> {
  const posts = await getPostsData(locale)
  return posts.find((p) => p.slug === slug)
}
