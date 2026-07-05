import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/lib/auth/auth'

export async function GET() {
  const projects = await prisma.project.findMany({ where: { status: 'ACTIVE' }, orderBy: [{ featured: 'desc' }, { order: 'asc' }] })
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const project = await prisma.project.create({ data: { ...body, status: 'ACTIVE' } })
  return NextResponse.json(project, { status: 201 })
}
