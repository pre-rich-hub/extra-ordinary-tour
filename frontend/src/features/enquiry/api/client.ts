import { request } from '@/lib/api/client'

export type ContactPayload = {
  name: string
  email: string
  message: string
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  await request<null>('/api/v1/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
