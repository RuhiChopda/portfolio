import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { sendContactEmail } from '@/lib/email/mailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    if (!name || !email || !subject || !message) return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    await prisma.contactMessage.create({ data: { name, email, subject, message } })
    sendContactEmail({ name, email, subject, message }).catch(console.error)
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
