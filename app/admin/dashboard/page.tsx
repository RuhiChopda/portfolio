import { prisma } from '@/lib/db/prisma'
import Link from 'next/link'
import { FolderOpen, Code2, Mail, FileText } from 'lucide-react'

export default async function Dashboard() {
  const [projects, skills, messages, unread] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-8">Welcome back, Ruhi.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: FolderOpen, label: 'Projects', value: projects, href: '/admin/projects', color: 'text-blue-400 bg-blue-500/10' },
          { icon: Code2, label: 'Skills', value: skills, href: '/admin/skills', color: 'text-violet-400 bg-violet-500/10' },
          { icon: Mail, label: 'Messages', value: messages, href: '/admin/contact', color: 'text-green-400 bg-green-500/10', badge: unread > 0 ? `${unread} new` : undefined },
          { icon: FileText, label: 'Resume', value: 'Manage', href: '/admin/resume', color: 'text-amber-400 bg-amber-500/10' },
        ].map(({ icon: Icon, label, value, href, color, badge }) => (
          <Link key={label} href={href} className="glass p-5 hover:border-primary/30 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              {badge && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">{badge}</span>}
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground mt-1 group-hover:text-foreground transition-colors">{label}</p>
          </Link>
        ))}
      </div>
      <div className="glass p-6">
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { label: 'Add new project', href: '/admin/projects' },
            { label: 'Update skills', href: '/admin/skills' },
            { label: 'View messages', href: '/admin/contact' },
            { label: 'Upload resume', href: '/admin/resume' },
          ].map(({ label, href }) => (
            <Link key={href} href={href} className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors group text-sm">
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
