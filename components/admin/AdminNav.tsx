'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/admin/hero', label: '拍立得', exact: false },
  { href: '/admin/recent-updates', label: '最近更新', exact: false },
  { href: '/admin/photography', label: '摄影页', exact: false },
  { href: '/admin', label: '城市管理', exact: true },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <header className="border-b border-zinc-800" style={{ background: 'rgb(12, 13, 10)' }}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/admin" className="flex items-center gap-2 text-white hover:text-zinc-300 transition-colors shrink-0">
          <span className="text-lg">🌍</span>
          <span className="text-sm font-medium">旅行站后台</span>
        </Link>

        {/* 导航 */}
        <nav className="flex items-center gap-5 overflow-x-auto">
          {NAV_ITEMS.map(item => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== '/admin'
              ? true
              : pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm whitespace-nowrap transition-colors ${
                  isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link href="/" target="_blank" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors whitespace-nowrap">
            查看前台 ↗
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="text-sm text-zinc-500 hover:text-red-400 transition-colors whitespace-nowrap"
          >
            退出
          </button>
        </nav>
      </div>
    </header>
  )
}
