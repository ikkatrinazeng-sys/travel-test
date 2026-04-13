'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { href: '/admin/hero', label: '拍立得', exact: false },
  { href: '/admin/recent-updates', label: '最近更新', exact: false },
  { href: '/admin/all-cities', label: '所有城市', exact: false },
  { href: '/admin/photography', label: '摄影页', exact: false },
  { href: '/admin', label: '城市详情', exact: true },
]

export default function AdminNav() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // 路由变化时关闭抽屉
  useEffect(() => { setDrawerOpen(false) }, [pathname])
  // 打开时锁定滚动
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const isActive = (item: typeof NAV_ITEMS[number]) =>
    item.exact
      ? pathname === item.href
      : (item.href !== '/admin' ? pathname.startsWith(item.href) : pathname === item.href)

  const currentLabel = NAV_ITEMS.find(isActive)?.label ?? '菜单'

  return (
    <>
      <header style={{ background: 'rgb(12, 13, 10)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between" style={{ height: 56 }}>
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2 text-white hover:text-zinc-300 transition-colors shrink-0">
            <span className="text-lg">🌍</span>
            <span className="text-sm font-medium">Sampling Lab</span>
          </Link>

          {/* PC 导航（768px+ 显示） */}
          <nav className="hidden md:flex items-center gap-5 h-full">
            {NAV_ITEMS.map(item => {
              const active = isActive(item)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex items-center text-sm whitespace-nowrap transition-colors"
                  style={{ height: 56, color: active ? 'rgb(200,185,122)' : undefined }}
                >
                  <span className={active ? '' : 'text-zinc-500 hover:text-zinc-300 transition-colors'}>
                    {item.label}
                  </span>
                  {active && (
                    <span className="absolute top-0 left-0 right-0"
                      style={{ height: '2px', background: 'rgba(200,185,122,0.8)', borderRadius: '0 0 2px 2px' }} />
                  )}
                </Link>
              )
            })}
            <Link href="/" target="_blank" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors whitespace-nowrap">
              查看前台 ↗
            </Link>
            <button onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="text-sm text-zinc-500 hover:text-red-400 transition-colors whitespace-nowrap">
              退出
            </button>
          </nav>

          {/* 手机汉堡按钮（768px 以下显示） */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
            onClick={() => setDrawerOpen(o => !o)}
            aria-label="菜单"
          >
            <span style={{
              display: 'block', width: 20, height: 1.5,
              background: 'rgba(255,255,255,0.8)',
              borderRadius: 2,
              transform: drawerOpen ? 'translateY(5px) rotate(45deg)' : 'none',
              transition: 'transform 0.22s ease',
            }} />
            <span style={{
              display: 'block', width: 20, height: 1.5,
              background: 'rgba(255,255,255,0.8)',
              borderRadius: 2,
              opacity: drawerOpen ? 0 : 1,
              transition: 'opacity 0.15s ease',
            }} />
            <span style={{
              display: 'block', width: 20, height: 1.5,
              background: 'rgba(255,255,255,0.8)',
              borderRadius: 2,
              transform: drawerOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
              transition: 'transform 0.22s ease',
            }} />
          </button>
        </div>
      </header>

      {/* 手机端抽屉遮罩 */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* 手机端抽屉面板（从右滑入） */}
      <div
        className="md:hidden fixed top-0 right-0 bottom-0 z-50 flex flex-col"
        style={{
          width: 240,
          background: 'rgb(14, 15, 11)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(.4,0,.2,1)',
          paddingTop: 56,
        }}
      >
        {/* 关闭按钮 */}
        <button
          onClick={() => setDrawerOpen(false)}
          style={{
            position: 'absolute', top: 14, right: 16,
            width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 18, background: 'none', border: 'none', cursor: 'pointer',
          }}
        >✕</button>

        {/* 当前页面标签 */}
        <div style={{ padding: '1rem 1.5rem 0.5rem', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
          当前：{currentLabel}
        </div>

        {/* 导航项 */}
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0.5rem 0' }}>
          {NAV_ITEMS.map(item => {
            const active = isActive(item)
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '0.9rem 1.5rem',
                  fontSize: 14,
                  color: active ? 'rgb(200,185,122)' : 'rgba(255,255,255,0.6)',
                  borderLeft: active ? '2px solid rgba(200,185,122,0.8)' : '2px solid transparent',
                  transition: 'all 0.18s',
                  textDecoration: 'none',
                  background: active ? 'rgba(200,185,122,0.06)' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* 底部操作 */}
        <div style={{ padding: '1rem 1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Link href="/" target="_blank"
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            查看前台 ↗
          </Link>
          <button onClick={() => signOut({ callbackUrl: '/admin/login' })}
            style={{ fontSize: 13, color: 'rgba(255,80,80,0.6)', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}>
            退出登录
          </button>
        </div>
      </div>
    </>
  )
}
