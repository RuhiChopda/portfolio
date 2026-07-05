'use client'
import { Briefcase, Calendar, MapPin } from 'lucide-react'

type Exp = { id: string; type: string; title: string; organization: string; location?: string | null; startDate: Date; endDate?: Date | null; current: boolean; description: string; highlights: string[] }

function fmt(d: Date) { return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) }

export function Experience({ experiences }: { experiences: Exp[] }) {
  const internships = experiences.filter(e => e.type === 'INTERNSHIP' || e.type === 'WORK')

  return (
    <section id="experience" className="section">
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-sm text-primary">04.</span>
        <h2 className="text-3xl font-bold">Experience</h2>
        <div className="flex-1 h-px bg-border/60" />
      </div>
      <div className="max-w-2xl">
        {internships.length === 0 && <p className="text-muted-foreground">No experience entries yet.</p>}
        {internships.map((exp, i) => (
          <div key={exp.id} className="relative pl-10 pb-8 last:pb-0">
            {i < internships.length - 1 && <div className="absolute left-3.5 top-8 bottom-0 w-px bg-border/50" />}
            <div className="absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-background text-blue-400 bg-blue-500/10">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            <div className="glass p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-blue-400 mb-0.5">Internship</p>
              <h3 className="font-semibold">{exp.title}</h3>
              <p className="text-sm text-muted-foreground">{exp.organization}</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground my-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />{fmt(exp.startDate)} – {exp.current ? 'Present' : exp.endDate ? fmt(exp.endDate) : ''}
                </span>
                {exp.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>}
                {exp.current && <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Current</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
              {exp.highlights.length > 0 && (
                <ul className="space-y-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1 flex-shrink-0">▸</span>{h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}