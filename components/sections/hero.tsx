'use client'
import { useState, useEffect } from 'react'
import { ArrowRight, Download, Github, Linkedin, Sparkles } from 'lucide-react'

const ROLES = ['Software Developer', 'Full Stack Developer', 'AI/ML Enthusiast', 'Problem Solver']

export function Hero({ config }: { config: Record<string, string> }) {
  const [displayed, setDisplayed] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIdx]
    let t: NodeJS.Timeout
    if (!deleting && displayed.length < current.length) t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    else if (!deleting && displayed.length === current.length) t = setTimeout(() => setDeleting(true), 2000)
    else if (deleting && displayed.length > 0) t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    else { setDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIdx])

  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="relative section py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm text-xs text-muted-foreground mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Open to opportunities
            <Sparkles className="w-3 h-3 text-primary" />
          </div>

          <p className="font-mono text-sm text-muted-foreground mb-2"><span className="text-primary">$</span> whoami</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            Ruhi <span className="text-gradient">Chopda</span>
          </h1>

          <div className="flex items-center gap-2 h-10 mb-6">
            <span className="text-xl sm:text-2xl font-mono text-foreground/80">
              {displayed}<span className="animate-blink text-primary">|</span>
            </span>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            {config.tagline || 'Building intelligent software, one commit at a time.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-12">
            <button onClick={() => scroll('projects')} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all hover:-translate-y-0.5">
              View Projects <ArrowRight className="w-4 h-4" />
            </button>
            <a href="/api/resume/download" className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-all hover:-translate-y-0.5">
              <Download className="w-4 h-4" /> Resume
            </a>
            <button onClick={() => scroll('contact')} className="px-5 py-2.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
              Contact me
            </button>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href={config.github || 'https://github.com/RuhiChopda'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Github className="w-4 h-4" /> RuhiChopda
            </a>
            <span className="text-border">·</span>
            <a href={config.linkedin || 'https://www.linkedin.com/in/ruhi-b-chopda-b70a94308/'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <span className="text-border">·</span>
            <span>Mumbai, India 🇮🇳</span>
          </div>
        </div>
      </div>
    </section>
  )
}
