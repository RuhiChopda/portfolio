import { auth } from '@/lib/auth/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isAdmin = req.nextUrl.pathname.startsWith('/admin')
  const isLogin = req.nextUrl.pathname === '/admin/login'
  const loggedIn = !!req.auth
  if (isAdmin && !isLogin && !loggedIn) return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
  if (isLogin && loggedIn) return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl))
})

export const config = {
  matcher: ['/admin/:path*'],
  runtime: 'nodejs',
}