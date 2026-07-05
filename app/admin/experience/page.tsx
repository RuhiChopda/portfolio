'use client'
import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Briefcase, GraduationCap } from 'lucide-react'

const TYPES = ['INTERNSHIP', 'EDUCATION', 'WORK']

export default function ExperiencePage() {
  const [items, setItems] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)

  const fetch_ = async () => { const r = await fetch('/api/experience'); setItems(await r.json()) }
  useEffect(() => { fetch_() }, [])
  const del = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/experience/${id}`, { method: 'DELETE' }); setItems(s => s.filter(x => x.id !== id)) }

  const icons: any = { INTERNSHIP: Briefcase, EDUCATION: GraduationCap, WORK: Briefcase }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Experience</h1>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"><Plus className="w-4 h-4" />Add Entry</button>
      </div>
      <div className="space-y-3">
        {items.length === 0 && <div className="glass p-12 text-center text-muted-foreground">No entries yet.</div>}
        {items.map(item => {
          const Icon = icons[item.type] || Briefcase
          return (
            <div key={item.id} className="glass p-5 flex items-start gap-4">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Icon className="w-4 h-4 text-primary" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{item.type}</span>
                  {item.current && <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Current</span>}
                </div>
                <p className="text-sm text-muted-foreground">{item.organization}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => { setEditing(item); setShowForm(true) }} className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"><Edit className="w-3.5 h-3.5" /></button>
                <button onClick={() => del(item.id)} className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          )
        })}
      </div>
      {showForm && <ExpForm item={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSave={() => { fetch_(); setShowForm(false); setEditing(null) }} />}
    </div>
  )
}

function ExpForm({ item, onClose, onSave }: any) {
  const toDate = (d: any) => d ? new Date(d).toISOString().slice(0, 10) : ''
  const [form, setForm] = useState({ type: item?.type || 'INTERNSHIP', title: item?.title || '', organization: item?.organization || '', location: item?.location || '', startDate: toDate(item?.startDate), endDate: toDate(item?.endDate), current: item?.current || false, description: item?.description || '', highlights: item?.highlights?.join('\n') || '' })
  const [saving, setSaving] = useState(false)
  const inp = "w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    const payload = { ...form, highlights: form.highlights.split('\n').map((s: string) => s.trim()).filter(Boolean), endDate: form.current ? null : form.endDate || null }
    await fetch(item ? `/api/experience/${item.id}` : '/api/experience', { method: item ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    onSave(); setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg glass p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-5">{item ? 'Edit' : 'Add'} Entry</h2>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs text-muted-foreground mb-1.5">Type</label><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className={inp}>{TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
            <div><label className="block text-xs text-muted-foreground mb-1.5">Location</label><input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className={inp} /></div>
          </div>
          <div><label className="block text-xs text-muted-foreground mb-1.5">Title *</label><input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inp} /></div>
          <div><label className="block text-xs text-muted-foreground mb-1.5">Organization *</label><input required value={form.organization} onChange={e => setForm(f => ({ ...f, organization: e.target.value }))} className={inp} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs text-muted-foreground mb-1.5">Start Date *</label><input required type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} className={inp} /></div>
            <div><label className="block text-xs text-muted-foreground mb-1.5">End Date</label><input type="date" disabled={form.current} value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} className={`${inp} disabled:opacity-40`} /></div>
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.current} onChange={e => setForm(f => ({ ...f, current: e.target.checked }))} />Currently here</label>
          <div><label className="block text-xs text-muted-foreground mb-1.5">Description *</label><textarea required rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={`${inp} resize-none`} /></div>
          <div><label className="block text-xs text-muted-foreground mb-1.5">Highlights (one per line)</label><textarea rows={4} value={form.highlights} onChange={e => setForm(f => ({ ...f, highlights: e.target.value }))} className={`${inp} resize-none`} /></div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-border text-sm hover:bg-muted">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
