'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { Edit3, FileText, Loader2, Plus, Tags, Trash2, X } from 'lucide-react'
import {
  AdminFeedback,
  AdminLoading,
  AdminPageHeader,
  adminInputClass,
  adminLabelClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
} from '@/features/admin/components/admin-primitives'
import { adminRequest, formatAdminDate } from '@/features/admin/lib/api'

type BlogCategory = { id: number; name: string; slug: string; postCount: number }
type BlogPost = {
  id: number
  title: string
  description: string | null
  imageUrl: string | null
  category: { id: number; name: string } | null
  createdAt: string | null
}

export function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [feedback, setFeedback] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [postList, categoryList] = await Promise.all([
        adminRequest<BlogPost[]>('/api/v1/admin/blog'),
        adminRequest<BlogCategory[]>('/api/v1/admin/blog-categories'),
      ])
      setPosts(postList)
      setCategories(categoryList)
      setFeedback('')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Blog content could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => void load(), 0)
    return () => window.clearTimeout(id)
  }, [load])

  function showForm(post: BlogPost | null) {
    setEditing(post)
    setFormOpen(true)
    setFeedback('')
  }

  async function submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setFeedback('')
    try {
      await adminRequest<BlogPost>(editing ? `/api/v1/admin/blog/${editing.id}` : '/api/v1/admin/blog', {
        method: editing ? 'PUT' : 'POST',
        body: new FormData(event.currentTarget),
      })
      setFormOpen(false)
      setEditing(null)
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Blog post could not be saved.')
    } finally {
      setSaving(false)
    }
  }

  async function addCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const name = String(new FormData(form).get('name') ?? '').trim()
    if (!name) return
    try {
      await adminRequest<BlogCategory>('/api/v1/admin/blog-categories', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }),
      })
      form.reset()
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Category could not be created.')
    }
  }

  async function renameCategory(category: BlogCategory) {
    const name = window.prompt('Category name', category.name)?.trim()
    if (!name || name === category.name) return
    try {
      await adminRequest<BlogCategory>(`/api/v1/admin/blog-categories/${category.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }),
      })
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Category could not be renamed.')
    }
  }

  async function deleteCategory(category: BlogCategory) {
    if (!window.confirm(`Delete category “${category.name}”?`)) return
    try {
      await adminRequest<null>(`/api/v1/admin/blog-categories/${category.id}`, { method: 'DELETE' })
      await load()
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Category could not be deleted.')
    }
  }

  async function deletePost(post: BlogPost) {
    if (!window.confirm(`Delete “${post.title}”?`)) return
    try {
      await adminRequest<null>(`/api/v1/admin/blog/${post.id}`, { method: 'DELETE' })
      setPosts((current) => current.filter((entry) => entry.id !== post.id))
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Blog post could not be deleted.')
    }
  }

  return (
    <div className="p-8">
      <AdminPageHeader title="Blog" description="Publish stories and organize them into editorial categories." action={<button type="button" onClick={() => showForm(null)} className={adminPrimaryButtonClass} data-testid="add-blog-post"><Plus className="size-4" /> Add post</button>} />
      <AdminFeedback message={feedback} />

      <section className="mb-8 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="mr-auto flex items-center gap-2"><Tags className="size-4 text-accent" /><h2 className="font-serif text-lg text-foreground">Categories</h2></div>
          <form onSubmit={addCategory} className="flex gap-2" data-testid="blog-category-form"><input name="name" className={`${adminInputClass} w-48`} placeholder="New category" required /><button className={adminSecondaryButtonClass} type="submit"><Plus className="size-4" /> Add</button></form>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.length === 0 ? <p className="text-sm text-muted-foreground">No categories yet.</p> : categories.map((category) => (
            <span key={category.id} className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-foreground" data-testid={`blog-category-${category.id}`}>
              {category.name} <span className="text-muted-foreground">{category.postCount}</span>
              <button type="button" onClick={() => void renameCategory(category)} aria-label={`Rename ${category.name}`} className="text-muted-foreground hover:text-accent"><Edit3 className="size-3" /></button>
              <button type="button" onClick={() => void deleteCategory(category)} aria-label={`Delete ${category.name}`} className="text-muted-foreground hover:text-red-600"><X className="size-3" /></button>
            </span>
          ))}
        </div>
      </section>

      {formOpen && (
        <form onSubmit={submitPost} className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm" data-testid="blog-form">
          <div className="mb-5 flex items-center justify-between"><h2 className="font-serif text-xl text-foreground">{editing ? 'Edit post' : 'New blog post'}</h2><button type="button" onClick={() => setFormOpen(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Close form"><X className="size-4" /></button></div>
          <div className="grid gap-5 md:grid-cols-2">
            <label><span className={adminLabelClass}>Title</span><input name="blogTitle" defaultValue={editing?.title ?? ''} className={adminInputClass} required /></label>
            <label><span className={adminLabelClass}>Category</span><select name="categoryId" defaultValue={editing?.category?.id ?? ''} className={adminInputClass}><option value="">Uncategorized</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
            <label className="md:col-span-2"><span className={adminLabelClass}>Featured image {editing ? '(optional replacement)' : '(optional)'}</span><input name="blogImage" type="file" accept="image/*" className={adminInputClass} /></label>
            <label className="md:col-span-2"><span className={adminLabelClass}>Article content</span><textarea name="blogDescription" defaultValue={editing?.description ?? ''} className={`${adminInputClass} min-h-48 resize-y`} required /></label>
          </div>
          <div className="mt-5 flex justify-end gap-3"><button type="button" onClick={() => setFormOpen(false)} className={adminSecondaryButtonClass}>Cancel</button><button type="submit" disabled={saving} className={adminPrimaryButtonClass} data-testid="save-blog-post">{saving && <Loader2 className="size-4 animate-spin" />} {editing ? 'Save changes' : 'Publish post'}</button></div>
        </form>
      )}

      {loading ? <AdminLoading /> : posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground"><FileText className="mx-auto mb-3 size-9 opacity-30" />No blog posts yet.</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm"><thead className="border-b border-border bg-muted/30"><tr><th className="px-5 py-3 text-left font-medium text-muted-foreground">Post</th><th className="px-5 py-3 text-left font-medium text-muted-foreground">Category</th><th className="px-5 py-3 text-left font-medium text-muted-foreground">Created</th><th className="px-5 py-3 text-right font-medium text-muted-foreground">Actions</th></tr></thead>
            <tbody>{posts.map((post) => <tr key={post.id} className="border-b border-border/50 last:border-0" data-testid={`blog-post-${post.id}`}><td className="px-5 py-4"><p className="font-medium text-foreground">{post.title}</p><p className="mt-1 max-w-xl truncate text-xs text-muted-foreground">{post.description}</p></td><td className="px-5 py-4 text-muted-foreground">{post.category?.name || 'Uncategorized'}</td><td className="px-5 py-4 text-muted-foreground">{formatAdminDate(post.createdAt)}</td><td className="px-5 py-4"><div className="flex justify-end gap-1"><button type="button" onClick={() => showForm(post)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label={`Edit ${post.title}`}><Edit3 className="size-4" /></button><button type="button" onClick={() => void deletePost(post)} className="rounded-lg p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${post.title}`}><Trash2 className="size-4" /></button></div></td></tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  )
}