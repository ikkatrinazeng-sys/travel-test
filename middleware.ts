import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const pathname = req.nextUrl.pathname

  // 已登录访问登录页 → 跳转后台首页
  if (pathname === '/admin/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl.origin))
  }

  // 未登录访问 /admin（非登录页）→ 跳转登录页
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !isLoggedIn) {
    const loginUrl = new URL('/admin/login', req.nextUrl.origin)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  // 排除登录页本身，避免 next-auth 包装器对登录页做自动重定向
  matcher: ['/admin', '/admin/((?!login).*)'],
}
