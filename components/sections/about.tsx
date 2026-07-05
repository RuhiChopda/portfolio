'use client'
import { MapPin, GraduationCap } from 'lucide-react'

export function About({ config }: { config: Record<string, string> }) {
  return (
    <section id="about" className="section">
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-sm text-primary">01.</span>
        <h2 className="text-3xl font-bold">About Me</h2>
        <div className="flex-1 h-px bg-border/60" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-5">
          <p className="text-muted-foreground leading-relaxed">{config.about || "I'm a B.Tech Computer Engineering (Software Engineering) graduate from Jain University, Bangalore, passionate about building software that solves real problems. I specialize in full-stack development and AI/ML, and have hands-on experience as a Unity Developer Intern working on VR applications."}</p>
          <p className="text-muted-foreground leading-relaxed">{config.goals || 'Currently seeking full-time software engineering roles where I can contribute, build impactful products, and grow alongside great engineers.'}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/60 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" /> Bangalore, India
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/60 text-sm text-muted-foreground">
              <GraduationCap className="w-3.5 h-3.5 text-primary" /> B.Tech Software Engineering · Jain University
            </div>
          </div>
          <div className="pt-2">
            <p className="text-sm font-medium mb-3">Technical Interests</p>
            <div className="flex flex-wrap gap-2">
              {['Full Stack Dev', 'Machine Learning', 'VR/XR Development', 'System Design', 'Open Source', 'API Design', 'Generative AI', 'Cloud'].map(i => (
                <span key={i} className="font-mono text-xs px-2 py-1 rounded bg-muted text-muted-foreground border border-border/40">{i}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { title: 'Clean Code', desc: 'Readable, maintainable code is as important as working code.' },
            { title: 'Always Learning', desc: 'The tech landscape moves fast — I stay curious and keep levelling up.' },
            { title: 'Impact-Driven', desc: 'I build things that solve real problems, not just resume fillers.' },
            { title: 'Collaborative', desc: 'Great software is built by great teams. I value people as much as code.' },
          ].map(v => (
            <div key={v.title} className="glass p-5">
              <h3 className="font-semibold mb-2 text-sm">{v.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
