'use client'
import { useState } from 'react'
import { Send, Mail, Github, Linkedin, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', subject: '', message: '' })
    } catch { setStatus('error') }
  }

  const inp = "w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"

  return (
    <section id="contact" className="section">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-sm text-primary">06.</span>
        <h2 className="text-3xl font-bold">Get In Touch</h2>
        <div className="flex-1 h-px bg-border/60" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mt-8">
        <div>
          <p className="text-muted-foreground leading-relaxed mb-8">
            I'm actively looking for internship and entry-level software engineering opportunities. Whether you have a role, a project idea, or just want to say hi — I'd love to hear from you.
          </p>
          <div className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'chopdaruhi9@gmail.com', href: 'mailto:chopdaruhi9@gmail.com' },
              { icon: Github, label: 'GitHub', value: 'github.com/RuhiChopda', href: 'https://github.com/RuhiChopda' },
              { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/ruhi-b-chopda', href: 'https://www.linkedin.com/in/ruhi-b-chopda-b70a94308/' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 glass hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Name *</label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className={inp} />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" className={inp} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Subject *</label>
            <input required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Internship opportunity / Collab / Just saying hi" className={inp} />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Message *</label>
            <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell me more..." className={`${inp} resize-none`} />
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-2 text-sm text-green-500 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
              <CheckCircle className="w-4 h-4 flex-shrink-0" /> Message sent! I'll get back to you soon.
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> Something went wrong. Email me directly at chopdaruhi9@gmail.com
            </div>
          )}

          <button type="submit" disabled={status === 'loading' || status === 'success'} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition-all">
            {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : <><Send className="w-4 h-4" />Send Message</>}
          </button>
        </form>
      </div>
    </section>
  )
}
