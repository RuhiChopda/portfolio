import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/layout/providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: { default: 'Ruhi Chopda — Software Developer', template: '%s | Ruhi Chopda' },
  description: 'Computer Engineering graduate from Mumbai specialising in full-stack development and AI/ML.',
  openGraph: {
    title: 'Ruhi Chopda — Software Developer',
    description: 'Computer Engineering graduate from Mumbai specialising in full-stack development and AI/ML.',
    url: 'https://ruhichopda.dev',
    siteName: 'Ruhi Chopda',
    locale: 'en_US',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
