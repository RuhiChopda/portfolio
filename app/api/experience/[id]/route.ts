import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { auth } from '@/lib/auth/auth'

export async function PUT(req: NextRequest, context: any) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const exp = await prisma.experience.update({ where: { id: context.params.id }, data: body })
  return NextResponse.json(exp)
}

export async function DELETE(req: NextRequest, context: any) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await prisma.experience.delete({ where: { id: context.params.id } })
  return NextResponse.json({ success: true })
}