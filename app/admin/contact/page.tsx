import { prisma } from '@/lib/db/prisma'

export default async function ContactPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Messages</h1>
      <p className="text-muted-foreground text-sm mb-8">{messages.filter(m => !m.read).length} unread · {messages.length} total</p>
      <div className="space-y-4">
        {messages.length === 0 && <div className="glass p-12 text-center text-muted-foreground">No messages yet.</div>}
        {messages.map(m => (
          <div key={m.id} className={`glass p-5 ${!m.read ? 'border-primary/30' : ''}`}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{m.name}</h3>
                  {!m.read && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary">New</span>}
                </div>
                <a href={`mailto:${m.email}`} className="text-xs text-muted-foreground hover:text-primary transition-colors">{m.email}</a>
                <p className="text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
              <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`} className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">Reply</a>
            </div>
            <p className="text-sm font-medium mb-2">{m.subject}</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
