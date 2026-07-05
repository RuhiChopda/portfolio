'use client'
import { Github, Linkedin, Mail, ArrowUp, Terminal } from 'lucide-react'

export function Footer({ config }: { config: Record<string, string> }) {
  return (
    <footer className="border-t border-border/50 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-mono text-sm font-semibold">Ruhi Chopda</p>
            <p className="text-xs text-muted-foreground">Bangalore, India</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {config.github && <a href={config.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="w-5 h-5" /></a>}
          {config.linkedin && <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="w-5 h-5" /></a>}
          {config.email && <a href={`mailto:${config.email}`} className="text-muted-foreground hover:text-foreground transition-colors"><Mail className="w-5 h-5" /></a>}
          <div className="w-px h-5 bg-border mx-1" />
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Ruhi Chopda. All rights reserved.</p>
        <p className="font-mono">Built with <span className="text-primary">Next.js</span> · <span className="text-primary">TypeScript</span> · <span className="text-primary">Tailwind</span></p>
      </div>
    </footer>
  )
}
