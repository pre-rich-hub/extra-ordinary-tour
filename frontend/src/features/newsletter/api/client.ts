import { request } from '@/lib/api/client'

export async function subscribe(email: string): Promise<void> {
  await request<null>('/api/v1/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  })
}
