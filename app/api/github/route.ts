import { NextResponse } from 'next/server'
import { getProfile, getRepos } from '@/lib/github/github'

export const revalidate = 900

export async function GET() {
  try {
    const [profile, repos] = await Promise.all([getProfile(), getRepos()])
    return NextResponse.json({ profile, repos })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
