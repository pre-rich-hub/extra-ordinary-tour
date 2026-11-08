import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { hasValidAdminSession } from '@/features/auth/server/session'

const contentTags = ['tours', 'destinations', 'blog', 'gallery', 'testimonials']

// Public pages are cached for a week. The admin calls this after a content
// write so the change shows on the next request rather than after that window.
// It lives on the frontend because only Next can purge its own cache.
// Purge only the tags that changed: every regenerated page counts as Vercel
// ISR writes, so a site-wide purge on each save is expensive. A request with
// no recognised tags falls back to purging all content.
export async function POST(request: Request) {
  if (!(await hasValidAdminSession())) {
    return NextResponse.json({ success: false }, { status: 401 })
  }
  const body: unknown = await request.json().catch(() => null)
  const requested =
    typeof body === 'object' && body !== null && 'tags' in body && Array.isArray(body.tags)
      ? contentTags.filter((tag) => (body.tags as unknown[]).includes(tag))
      : []
  for (const tag of requested.length > 0 ? requested : contentTags) {
    revalidateTag(tag, { expire: 0 })
  }
  return NextResponse.json({ success: true })
}
