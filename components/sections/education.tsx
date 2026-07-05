import { GraduationCap, Calendar, MapPin } from 'lucide-react'

export function Education() {
  return (
    <section id="education" className="section">
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-sm text-primary">05.</span>
        <h2 className="text-3xl font-bold">Education</h2>
        <div className="flex-1 h-px bg-border/60" />
      </div>
      <div className="max-w-2xl">
        <div className="glass p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">B.Tech Computer Engineering (Software Engineering)</h3>
              <p className="text-muted-foreground">Jain University</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Sep 2022 – May 2026</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />Bangalore, Karnataka</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}