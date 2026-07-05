'use client'
import { useState } from 'react'
import { Github, ExternalLink, Star } from 'lucide-react'

type Project = { id: string; title: string; description: string; techStack: string[]; githubUrl: string | null; liveUrl: string | null; category: string; tags: string[]; featured: boolean }

export function Projects({ projects }: { projects: Project[] }) {
  const cats = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <section id="projects" className="section">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-sm text-primary">03.</span>
        <h2 className="text-3xl font-bold">Projects</h2>
        <div className="flex-1 h-px bg-border/60" />
      </div>
      <p className="text-muted-foreground mb-8">A selection of things I've built — from full-stack apps to ML pipelines.</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {cats.map(c => (
          <button key={c} onClick={() => setActive(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${active === c ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(p => (
          <div key={p.id} className="glass p-5 flex flex-col group hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-mono text-muted-foreground">{p.category}</span>
              {p.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{p.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.techStack.slice(0, 5).map(t => (
                <span key={t} className="font-mono text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/40">{t}</span>
              ))}
              {p.techStack.length > 5 && <span className="text-xs text-muted-foreground">+{p.techStack.length - 5}</span>}
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-border/50">
              {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"><Github className="w-4 h-4" />Code</a>}
              {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto">Live<ExternalLink className="w-3.5 h-3.5" /></a>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="https://github.com/RuhiChopda" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Github className="w-4 h-4" /> More on GitHub
        </a>
      </div>
    </section>
  )
}
