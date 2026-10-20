import { getCopy } from '@/i18n/copy-server'
import { setRequestLocale } from 'next-intl/server'
import { isLocale } from '@/i18n/routing'
import { buildPageMetadata } from '@/i18n/metadata'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { posts } from '@/features/blog/data/posts'
import { getPosts, getPost } from '@/features/blog/data/localized'
import { CtaBand } from '@/components/layout/cta-band'
import { ArticleHeader } from '@/features/blog/components/article-header'
import { ArticleImage } from '@/features/blog/components/article-image'
import { ArticleBody } from '@/features/blog/components/article-body'
import { RelatedPosts } from '@/features/blog/components/related-posts'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()
  const p = getPost(slug, locale)
  if (!p)
    return buildPageMetadata(
      { title: copy('Article not found') },
      `/blog/${slug}`,
      locale,
    )
  return buildPageMetadata(
    {
      title: p.title,
      description: p.excerpt,
      authors: [{ name: p.author }],
      openGraph: {
        title: p.title,
        description: p.excerpt,
        type: 'article',
        images: [p.image],
      },
    },
    `/blog/${slug}`,
    locale,
  )
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  setRequestLocale(locale)
  const copy = await getCopy()
  const posts = getPosts(locale)
  const post = getPost(slug, locale)
  if (!post) notFound()

  return (
    <article>
      {/* Header */}
      <ArticleHeader post={post} />

      {/* Lead image */}
      <ArticleImage post={post} />

      {/* Body */}
      <ArticleBody post={post} />

      {/* More reading */}
      <RelatedPosts post={post} />

      <CtaBand
        title={copy('Ready to see it for yourself?')}
        text={copy(
          'Every essay here comes out of a journey we designed for someone. Tell us what you want yours to feel like.',
        )}
        secondary={{ label: copy('See Destinations'), href: '/destinations' }}
        image={post.image}
      />
    </article>
  )
}
