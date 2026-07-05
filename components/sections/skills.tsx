'use client'
import { useState } from 'react'

type Skill = { id: string; name: string; category: string; level: number }

export function Skills({ skills }: { skills: Skill[] }) {
  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))]
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? skills : skills.filter(s => s.category === active)
  const grouped = filtered.reduce((acc, s) => { if (!acc[s.category]) acc[s.category] = []; acc[s.category].push(s); return acc }, {} as Record<string, Skill[]>)

  return (
    <section id="skills" className="section">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-sm text-primary">02.</span>
        <h2 className="text-3xl font-bold">Skills</h2>
        <div className="flex-1 h-px bg-border/60" />
      </div>
      <p className="text-muted-foreground mb-8">Technologies I work with and the proficiency I've built through real-world projects.</p>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(c => (
          <button key={c} onClick={() => setActive(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${active === c ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(grouped).map(([cat, catSkills]) => (
          <div key={cat} className="glass p-5 space-y-3">
            <p className="text-xs font-mono text-primary uppercase tracking-wider border-b border-border/50 pb-3">{cat}</p>
            {catSkills.map(s => (
              <div key={s.id}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="text-xs font-mono text-muted-foreground">{s.level}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
