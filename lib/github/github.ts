const cache = new Map<string, { data: unknown; at: number }>()
const TTL = 15 * 60 * 1000

async function gh(path: string) {
  const cached = cache.get(path)
  if (cached && Date.now() - cached.at < TTL) return cached.data
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
    next: { revalidate: 900 },
  })
  if (!res.ok) throw new Error(`GitHub ${res.status}`)
  const data = await res.json()
  cache.set(path, { data, at: Date.now() })
  return data
}

export async function getProfile() { return gh(`/users/${process.env.GITHUB_USERNAME || 'RuhiChopda'}`) }
export async function getRepos() {
  const repos = await gh(`/users/${process.env.GITHUB_USERNAME || 'RuhiChopda'}/repos?per_page=100&sort=updated`) as any[]
  return repos.filter((r: any) => !r.fork).sort((a: any, b: any) => b.stargazers_count - a.stargazers_count).slice(0, 8)
}

export const LANG_COLORS: Record<string, string> = {
  JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3776AB',
  'C#': '#239120', Java: '#ED8B00', 'C++': '#00599C', HTML: '#E34F26',
}
