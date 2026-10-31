import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { hasValidAdminSession } from '@/features/auth/server/session'

// Public pages are cached for an hour. The admin calls this after a content
// write so the change shows on the next request rather than after that window.
// It lives on the frontend because only Next can purge its own cache.
export async function POST() {
  if (!(await hasValidAdminSession())) {
    return NextResponse.json({ success: false }, { status: 401 })
  }
  for (const tag of ['tours', 'destinations', 'blog', 'gallery', 'testimonials']) {
    revalidateTag(tag, { expire: 0 })
  }
  revalidatePath('/', 'layout')
  return NextResponse.json({ success: true })
}
