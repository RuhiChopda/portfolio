import nodemailer from 'nodemailer'

export async function sendContactEmail(data: { name: string; email: string; subject: string; message: string }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('No email config — skipping email send')
    return
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: data.email,
    subject: `[Portfolio] ${data.subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9fafb;border-radius:12px">
        <h2 style="color:#4f46e5;margin-top:0">New message from your portfolio</h2>
        <p><strong>From:</strong> ${data.name} (${data.email})</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <div style="background:white;padding:16px;border-radius:8px;border:1px solid #e5e7eb;margin-top:16px">
          <p style="white-space:pre-wrap;margin:0">${data.message}</p>
        </div>
        <p style="color:#9ca3af;font-size:12px;margin-top:16px">Hit reply to respond directly to ${data.name}.</p>
      </div>
    `,
  })
}
