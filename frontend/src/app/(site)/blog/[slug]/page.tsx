import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost, posts } from '@/features/blog/data/posts'
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
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = getPost(slug)
  if (!p) return { title: 'Article not found' }
  return {
    title: p.title,
    description: p.excerpt,
    authors: [{ name: p.author }],
    openGraph: {
      title: p.title,
      description: p.excerpt,
      type: 'article',
      images: [p.image],
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
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
        title="Ready to see it for yourself?"
        text="Every essay here comes out of a journey we designed for someone. Tell us what you want yours to feel like."
        secondary={{ label: 'See Destinations', href: '/destinations' }}
        image={post.image}
      />
    </article>
  )
}
