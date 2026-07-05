import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/lib/auth/auth'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await prisma.resume.findMany({ orderBy: { uploadedAt: 'desc' } }))
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  await prisma.resume.updateMany({ data: { isActive: false } })
  const resume = await prisma.resume.create({ data: { ...body, isActive: true } })
  return NextResponse.json(resume, { status: 201 })
}
