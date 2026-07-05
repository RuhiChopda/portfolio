'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'

const CATS = ['Programming Languages', 'Frontend', 'Backend', 'Databases', 'AI/ML', 'Tools']

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)

  const fetch_ = async () => { const r = await fetch('/api/skills'); setSkills(await r.json()) }
  useEffect(() => { fetch_() }, [])
  const del = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/skills/${id}`, { method: 'DELETE' }); setSkills(s => s.filter(x => x.id !== id)) }
  const grouped = skills.reduce((acc, s) => { if (!acc[s.category]) acc[s.category] = []; acc[s.category].push(s); return acc }, {} as Record<string, any[]>)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Skills</h1>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"><Plus className="w-4 h-4" />Add Skill</button>
      </div>
      <div className="space-y-5">
        {Object.entries(grouped).map(([cat, catSkills]) => (
          <div key={cat} className="glass p-5">
            <p className="text-xs font-mono text-primary uppercase tracking-wider mb-4">{cat}</p>
            <div className="space-y-3">
              {(catSkills as any[]).map((s: any) => (
                <div key={s.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1"><span className="text-sm font-medium">{s.name}</span><span className="text-xs font-mono text-muted-foreground">{s.level}%</span></div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${s.level}%` }} /></div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditing(s); setShowForm(true) }} className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"><Edit className="w-3 h-3" /></button>
                    <button onClick={() => del(s.id)} className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showForm && <SkillForm skill={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSave={() => { fetch_(); setShowForm(false); setEditing(null) }} />}
    </div>
  )
}

function SkillForm({ skill, onClose, onSave }: any) {
  const [form, setForm] = useState({ name: skill?.name || '', category: skill?.category || CATS[0], level: skill?.level || 75 })
  const [saving, setSaving] = useState(false)
  const inp = "w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    await fetch(skill ? `/api/skills/${skill.id}` : '/api/skills', { method: skill ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    onSave(); setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md glass p-6">
        <h2 className="text-lg font-semibold mb-5">{skill ? 'Edit' : 'Add'} Skill</h2>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="block text-xs text-muted-foreground mb-1.5">Name *</label><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inp} /></div>
          <div><label className="block text-xs text-muted-foreground mb-1.5">Category</label><select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={inp}>{CATS.map(c => <option key={c}>{c}</option>)}</select></div>
          <div><label className="block text-xs text-muted-foreground mb-1.5">Level: {form.level}%</label><input type="range" min={10} max={100} step={5} value={form.level} onChange={e => setForm(f => ({ ...f, level: +e.target.value }))} className="w-full accent-primary" /></div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-border text-sm hover:bg-muted transition-all">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
