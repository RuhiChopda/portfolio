import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  const resume = await prisma.resume.findFirst({ where: { isActive: true }, orderBy: { uploadedAt: 'desc' } })
  if (!resume) return NextResponse.json({ error: 'No resume uploaded' }, { status: 404 })
  return NextResponse.redirect(resume.fileUrl)
}
