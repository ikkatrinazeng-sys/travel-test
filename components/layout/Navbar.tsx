'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      <Link href="/" className="text-white text-xl font-light tracking-widest">
        WANDERLOG
      </Link>
      <div className="hidden md:flex items-center gap-8">
        {['城市', '摄影', '文章', '关于'].map((item) => (
          <Link
            key={item}
            href="/"
            className="text-white/80 hover:text-white text-sm tracking-wider transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>
      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="菜单"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-sm py-6 flex flex-col items-center gap-4">
          {['城市', '摄影', '文章', '关于'].map((item) => (
            <Link
              key={item}
              href="/"
              className="text-white/80 hover:text-white text-sm tracking-wider"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
