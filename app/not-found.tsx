import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <p className="font-mono text-primary text-sm mb-4">404 — not found</p>
        <h1 className="text-6xl font-bold mb-4">Oops.</h1>
        <p className="text-muted-foreground mb-8">This page doesn't exist.</p>
        <Link href="/" className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">Back to portfolio</Link>
      </div>
    </div>
  )
}
