'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  // 后台页和城市详情页均有自己的导航，不显示全局 Navbar
  if (pathname.startsWith('/admin')) return null
  if (pathname.startsWith('/cities/')) return null
  return <Navbar />
}
