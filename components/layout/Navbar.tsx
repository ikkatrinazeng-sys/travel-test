'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCities = (e: React.MouseEvent) => {
    e.preventDefault()
    if (pathname === '/') {
      document.getElementById('all-cities')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/#all-cities')
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(11, 23, 16, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <Link href="/" className="text-white text-xl font-light tracking-widest">
        WANDERLOG
      </Link>
      <div className="flex items-center gap-8">
        <a
          href="/#all-cities"
          onClick={handleCities}
          className="text-white/80 hover:text-white text-sm tracking-wider transition-colors cursor-pointer"
        >
          城市
        </a>
        <Link
          href="/photography"
          className="text-white/80 hover:text-white text-sm tracking-wider transition-colors"
        >
          摄影
        </Link>
      </div>
    </nav>
  )
}
