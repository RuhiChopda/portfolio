'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, FolderOpen, Code2, Briefcase, Mail, FileText, Zap, LogOut, Terminal, ExternalLink } from 'lucide-react'

const nav = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/projects', icon: FolderOpen, label: 'Projects' },
  { href: '/admin/skills', icon: Code2, label: 'Skills' },
  { href: '/admin/experience', icon: Briefcase, label: 'Experience' },
  { href: '/admin/contact', icon: Mail, label: 'Messages' },
  { href: '/admin/resume', icon: FileText, label: 'Resume' },
  { href: '/admin/learning', icon: Zap, label: 'Learning' },
]

export function AdminSidebar() {
  const path = usePathname()
  return (
    <aside className="hidden lg:flex flex-col w-60 border-r border-border/50 bg-card/30 min-h-screen sticky top-0">
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Terminal className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-mono text-sm font-semibold">Admin Panel</span>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = path === href || path.startsWith(href + '/')
          return (
            <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
              <Icon className="w-4 h-4 flex-shrink-0" />{label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t border-border/50 space-y-0.5">
        <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
          <ExternalLink className="w-4 h-4" /> View Site
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/admin/login' })} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  )
}
