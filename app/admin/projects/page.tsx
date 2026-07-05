'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Star, Github, Loader2 } from 'lucide-react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)

  const fetch_ = async () => { const r = await fetch('/api/projects'); setProjects(await r.json()); setLoading(false) }
  useEffect(() => { fetch_() }, [])

  const del = async (id: string) => {
    if (!confirm('Delete?')) return
    await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    setProjects(ps => ps.filter(p => p.id !== id))
  }

  const toggleFeatured = async (p: any) => {
    const r = await fetch(`/api/projects/${p.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ featured: !p.featured }) })
    const updated = await r.json()
    setProjects(ps => ps.map(x => x.id === updated.id ? updated : x))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold">Projects</h1><p className="text-muted-foreground text-sm">{projects.length} total</p></div>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>
      {loading ? <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div> : (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p.id} className="glass p-5 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold truncate">{p.title}</h3>
                  {p.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />}
                </div>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.techStack?.slice(0, 4).map((t: string) => <span key={t} className="font-mono text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{t}</span>)}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"><Github className="w-3.5 h-3.5" /></a>}
                <button onClick={() => toggleFeatured(p)} className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${p.featured ? 'text-amber-400' : 'text-muted-foreground hover:text-amber-400'} hover:bg-muted`}><Star className="w-3.5 h-3.5" /></button>
                <button onClick={() => { setEditing(p); setShowForm(true) }} className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"><Edit className="w-3.5 h-3.5" /></button>
                <button onClick={() => del(p.id)} className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && <ProjectForm project={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSave={() => { fetch_(); setShowForm(false); setEditing(null) }} />}
    </div>
  )
}

function ProjectForm({ project, onClose, onSave }: any) {
  const [form, setForm] = useState({ title: project?.title || '', description: project?.description || '', techStack: project?.techStack?.join(', ') || '', githubUrl: project?.githubUrl || '', liveUrl: project?.liveUrl || '', category: project?.category || 'Full Stack', tags: project?.tags?.join(', ') || '', featured: project?.featured || false })
  const [saving, setSaving] = useState(false)
  const inp = "w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    const payload = { ...form, techStack: form.techStack.split(',').map((s: string) => s.trim()).filter(Boolean), tags: form.tags.split(',').map((s: string) => s.trim()).filter(Boolean) }
    await fetch(project ? `/api/projects/${project.id}` : '/api/projects', { method: project ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    onSave(); setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg glass p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-5">{project ? 'Edit' : 'Add'} Project</h2>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="block text-xs text-muted-foreground mb-1.5">Title *</label><input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inp} /></div>
          <div><label className="block text-xs text-muted-foreground mb-1.5">Description *</label><textarea required rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={`${inp} resize-none`} /></div>
          <div><label className="block text-xs text-muted-foreground mb-1.5">Tech Stack (comma separated)</label><input value={form.techStack} onChange={e => setForm(f => ({ ...f, techStack: e.target.value }))} placeholder="React, Node.js, PostgreSQL" className={inp} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs text-muted-foreground mb-1.5">GitHub URL</label><input type="url" value={form.githubUrl} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))} className={inp} /></div>
            <div><label className="block text-xs text-muted-foreground mb-1.5">Live URL</label><input type="url" value={form.liveUrl} onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))} className={inp} /></div>
          </div>
          <div><label className="block text-xs text-muted-foreground mb-1.5">Category</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inp}>
              {['Full Stack', 'AI/ML', 'Frontend', 'Backend', 'Mobile', 'Other'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />Featured project</label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-border text-sm hover:bg-muted transition-all">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
