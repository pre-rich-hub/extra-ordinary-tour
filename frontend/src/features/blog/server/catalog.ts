import 'server-only'
import type { Post } from '../types'
import { getPosts as getLocalizedPosts } from '../data/localized'
import { getPosts, type ApiPost } from '../api/client'
import { parseArticle } from '../lib/article-text'
import type { AppLocale } from '@/i18n/routing'
import { usableImage } from '@/lib/media/usable-image'
import { firstSentence } from '@/lib/utils'

function fromDatabase(
  live: ApiPost,
  slug: string,
  locale: AppLocale,
  fallback?: Post,
): Post {
  // Rows written before the excerpt and article split hold both in description.
  const article = (live.content || live.description || '').trim()
  const published = live.createdAt ? new Date(live.createdAt) : new Date()
  const words = article.split(/\s+/).length
  const category = live.category?.name ?? fallback?.category ?? 'Travel Journal'
  return {
    slug,
    title: live.title,
    category,
    categoryKey: category,
    date: new Intl.DateTimeFormat(locale, {
      dateStyle: 'long',
      timeZone: 'UTC',
    }).format(published),
    datePublished: published.toISOString().slice(0, 10),
    ...(live.updatedOn
      ? { dateModified: live.updatedOn.slice(0, 10) }
      : {}),
    readTime:
      live.readTime ?? `${Math.max(1, Math.round(words / 200))} min read`,
    image: usableImage(live.imageUrl, fallback?.image ?? '/placeholder.svg'),
    author: live.author ?? fallback?.author ?? 'Extraordinary Ethiopia Tours',
    authorRole: live.authorRole ?? fallback?.authorRole ?? 'Travel Writer',
    ...(live.authorImage ? { authorImage: live.authorImage } : {}),
    excerpt:
      (live.content ? live.description : fallback?.excerpt) ??
      firstSentence(article),
    body: live.content || !fallback ? parseArticle(article) : fallback.body,
    featured: live.isFeatured,
  }
}

// The database is the source of truth once it holds rows; see the note in
// the destinations catalogue for how the bundled records are used.
export async function getPostsData(locale: AppLocale = 'en'): Promise<Post[]> {
  const staticPosts: Post[] = getLocalizedPosts(locale)
  let livePosts: ApiPost[] = []
  try {
    livePosts = await getPosts({ next: { revalidate: 3600, tags: ['blog'] } })
  } catch {
    livePosts = []
  }
  if (livePosts.length === 0) return staticPosts

  const bySlug = new Map(staticPosts.map((p) => [p.slug, p]))
  return livePosts.flatMap((live) => {
    if (!live.slug) return []
    const translated = bySlug.get(live.slug)
    if (translated && locale !== 'en') {
      return [
        { ...translated, image: usableImage(live.imageUrl, translated.image) },
      ]
    }
    return [fromDatabase(live, live.slug, locale, translated)]
  })
}

export async function getPostData(
  slug: string,
  locale: AppLocale = 'en',
): Promise<Post | undefined> {
  const posts = await getPostsData(locale)
  return posts.find((p) => p.slug === slug)
}
