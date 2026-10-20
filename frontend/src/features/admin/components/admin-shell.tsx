import { AdminSidebar } from './sidebar'

export function AdminShell({ children }: { children: React.ReactNode }) {
  // Fixed overlay: the admin lives inside the marketing root layout, so we
  // paint over the public nav/footer instead of touching them.
  return (
    <div className="fixed inset-0 z-[60] flex bg-background">
      <AdminSidebar />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
