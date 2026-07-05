'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Zap } from 'lucide-react'

export default function LearningPage() {
  const [items, setItems] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)

  const fetch_ = async () => { const r = await fetch('/api/learning'); setItems(await r.json()) }
  useEffect(() => { fetch_() }, [])
  const del = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/learning/${id}`, { method: 'DELETE' }); setItems(s => s.filter(x => x.id !== id)) }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Currently Learning</h1>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"><Plus className="w-4 h-4" />Add Item</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.length === 0 && <div className="sm:col-span-2 glass p-12 text-center text-muted-foreground">No items yet.</div>}
        {items.map(item => (
          <div key={item.id} className="glass p-5">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Zap className="w-4 h-4 text-primary" /></div><h3 className="font-semibold text-sm">{item.title}</h3></div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => { setEditing(item); setShowForm(true) }} className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"><Edit className="w-3 h-3" /></button>
                <button onClick={() => del(item.id)} className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"><Trash2 className="w-3 h-3" /></button>
              </div>
            </div>
            {item.description && <p className="text-xs text-muted-foreground mb-3">{item.description}</p>}
            <div><div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Progress</span><span className="font-mono text-primary">{item.progress}%</span></div><div className="h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${item.progress}%` }} /></div></div>
          </div>
        ))}
      </div>
      {showForm && <LearningForm item={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSave={() => { fetch_(); setShowForm(false); setEditing(null) }} />}
    </div>
  )
}

function LearningForm({ item, onClose, onSave }: any) {
  const [form, setForm] = useState({ title: item?.title || '', description: item?.description || '', progress: item?.progress || 50 })
  const [saving, setSaving] = useState(false)
  const inp = "w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    await fetch(item ? `/api/learning/${item.id}` : '/api/learning', { method: item ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    onSave(); setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md glass p-6">
        <h2 className="text-lg font-semibold mb-5">{item ? 'Edit' : 'Add'} Item</h2>
        <form onSubmit={submit} className="space-y-4">
          <div><label className="block text-xs text-muted-foreground mb-1.5">Title *</label><input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inp} /></div>
          <div><label className="block text-xs text-muted-foreground mb-1.5">Description</label><textarea rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={`${inp} resize-none`} /></div>
          <div><label className="block text-xs text-muted-foreground mb-1.5">Progress: {form.progress}%</label><input type="range" min={0} max={100} step={5} value={form.progress} onChange={e => setForm(f => ({ ...f, progress: +e.target.value }))} className="w-full accent-primary" /></div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-border text-sm hover:bg-muted">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
