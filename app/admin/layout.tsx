import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/auth'
import { AdminSidebar } from '@/components/admin/sidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/admin/login')
  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
