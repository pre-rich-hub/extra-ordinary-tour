'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { Loader2, Mail, MessageSquare, Reply, Trash2, X } from 'lucide-react'
import {
  AdminFeedback,
  AdminLoading,
  AdminPageHeader,
  adminInputClass,
  adminLabelClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
} from '../../components/admin-primitives'
import { adminRequest, formatAdminDate } from '../../lib/api'

type Contact = { id: number; name: string; email: string; message: string; createdAt: string | null }

export function AdminContacts() {
  const [items, setItems] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [replyingTo, setReplyingTo] = useState<Contact | null>(null)
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [success, setSuccess] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await adminRequest<Contact[]>('/api/v1/admin/contacts'))
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Messages could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  async function sendReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!replyingTo) return
    setSending(true)
    setFeedback('')
    setSuccess('')
    const data = new FormData(event.currentTarget)
    try {
      await adminRequest<null>(`/api/v1/admin/contacts/${replyingTo.id}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: String(data.get('subject')), message: String(data.get('message')) }),
      })
      setSuccess(`Reply sent to ${replyingTo.email}.`)
      setReplyingTo(null)
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Reply could not be sent.')
    } finally {
      setSending(false)
    }
  }

  async function remove(contact: Contact) {
    if (!window.confirm(`Delete the message from ${contact.name}?`)) return
    try {
      await adminRequest<null>(`/api/v1/admin/contacts/${contact.id}`, { method: 'DELETE' })
      setItems((current) => current.filter((entry) => entry.id !== contact.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Message could not be deleted.')
    }
  }

  return (
    <div className="p-8">
      <AdminPageHeader title="Contacts" description="Read traveler inquiries and reply from the admin workspace." />
      <AdminFeedback message={feedback} />
      <AdminFeedback message={success} tone="success" />

      {replyingTo && (
        <form onSubmit={sendReply} className="mb-8 rounded-xl border border-accent/30 bg-card p-6 shadow-sm" data-testid="contact-reply-form">
          <div className="mb-5 flex items-center justify-between"><div><h2 className="font-serif text-xl text-foreground">Reply to {replyingTo.name}</h2><p className="mt-1 text-xs text-muted-foreground">{replyingTo.email}</p></div><button type="button" onClick={() => setReplyingTo(null)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Close reply"><X className="size-4" /></button></div>
          <div className="grid gap-5"><label><span className={adminLabelClass}>Subject</span><input name="subject" defaultValue="Your Extraordinary Ethiopia Tours inquiry" className={adminInputClass} required /></label><label><span className={adminLabelClass}>Message</span><textarea name="message" className={`${adminInputClass} min-h-36 resize-y`} required /></label></div>
          <div className="mt-5 flex justify-end gap-3"><button type="button" onClick={() => setReplyingTo(null)} className={adminSecondaryButtonClass}>Cancel</button><button type="submit" disabled={sending} className={adminPrimaryButtonClass} data-testid="send-contact-reply">{sending ? <Loader2 className="size-4 animate-spin" /> : <Mail className="size-4" />} Send reply</button></div>
        </form>
      )}

      {loading ? <AdminLoading /> : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground"><MessageSquare className="mx-auto mb-3 size-9 opacity-30" />No contact messages yet.</div>
      ) : (
        <div className="space-y-4">
          {items.map((contact) => (
            <article key={contact.id} className="rounded-xl border border-border bg-card p-6 shadow-sm" data-testid={`contact-${contact.id}`}>
              <div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-serif text-xl text-foreground">{contact.name}</h2><a href={`mailto:${contact.email}`} className="mt-1 block text-sm text-accent hover:underline">{contact.email}</a></div><div className="text-right"><p className="text-xs text-muted-foreground">{formatAdminDate(contact.createdAt)}</p><div className="mt-2 flex gap-1"><button type="button" onClick={() => { setReplyingTo(contact); setSuccess('') }} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-primary hover:bg-primary/5" data-testid={`reply-contact-${contact.id}`}><Reply className="size-4" /> Reply</button><button type="button" onClick={() => void remove(contact)} className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label={`Delete message from ${contact.name}`}><Trash2 className="size-4" /></button></div></div></div>
              <p className="mt-5 whitespace-pre-wrap border-t border-border/60 pt-5 text-sm leading-7 text-foreground/75">{contact.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
