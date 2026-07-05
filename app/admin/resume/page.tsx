'use client'
import { useState, useEffect, useRef } from 'react'
import { Upload, FileText, Trash2, Download, Loader2, CheckCircle } from 'lucide-react'

export default function ResumePage() {
  const [resumes, setResumes] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const fetch_ = async () => { const r = await fetch('/api/resume'); if (r.ok) setResumes(await r.json()) }
  useEffect(() => { fetch_() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    // Store file info (in production, upload to cloud storage first)
    await fetch('/api/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: file.name, fileUrl: `/resumes/${file.name}`, isActive: true }),
    })
    setUploading(false); setSuccess(true); setTimeout(() => setSuccess(false), 3000); fetch_()
    if (fileRef.current) fileRef.current.value = ''
  }

  const del = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/resume/${id}`, { method: 'DELETE' }); fetch_() }

  return (
    <div>
      <div className="mb-8"><h1 className="text-2xl font-bold">Resume</h1><p className="text-muted-foreground text-sm mt-1">Manage your resume PDF.</p></div>
      <div className="glass p-8 mb-6 text-center border-2 border-dashed hover:border-primary/50 transition-colors cursor-pointer" onClick={() => fileRef.current?.click()}>
        <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={handleUpload} />
        {uploading ? <><Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-3" /><p className="text-muted-foreground">Uploading...</p></>
          : success ? <><CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" /><p className="text-green-500 font-medium">Uploaded!</p></>
          : <><Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" /><p className="font-medium mb-1">Click to upload PDF</p><p className="text-sm text-muted-foreground">PDF only</p></>}
      </div>
      <div className="space-y-3">
        {resumes.map((r: any) => (
          <div key={r.id} className="glass p-4 flex items-center gap-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><FileText className="w-4 h-4 text-primary" /></div>
            <div className="flex-1 min-w-0"><p className="font-medium text-sm truncate">{r.fileName}</p><p className="text-xs text-muted-foreground">{new Date(r.uploadedAt).toLocaleDateString()}</p></div>
            {r.isActive && <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">Active</span>}
            <div className="flex gap-1">
              <a href={r.fileUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"><Download className="w-3.5 h-3.5" /></a>
              <button onClick={() => del(r.id)} className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
