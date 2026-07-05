import { Zap } from 'lucide-react'

type Item = { id: string; title: string; description?: string | null; progress: number }

export function Learning({ items }: { items: Item[] }) {
  return (
    <section id="learning" className="section">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-sm text-primary">05.</span>
        <h2 className="text-3xl font-bold">Currently Exploring</h2>
        <div className="flex-1 h-px bg-border/60" />
      </div>
      <p className="text-muted-foreground mb-10">What I'm actively learning and building skills in right now.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="glass p-5">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
            {item.description && <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{item.description}</p>}
            <div className="mt-auto">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-mono text-primary">{item.progress}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
