'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { City } from '@/types'

// Unsplash photo mapping by slug
const CITY_PHOTOS: Record<string, string> = {
  paris:        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=85',
  beaune:       '/beaune-winery.jpg',
  dijon:        'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1600&q=85',
  amsterdam:    'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&q=85',
  rome:         'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&q=85',
  capri:        'https://images.unsplash.com/photo-1533606688076-b6683a5f59f1?w=1600&q=85',
  naples:       'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&q=85',
  seoul:        'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1600&q=85',
  busan:        'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1600&q=85',
  osaka:        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&q=85',
  kyoto:        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&q=85',
  kobe:         'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=1600&q=85',
  penang:       'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=1600&q=85',
  langkawi:     'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600&q=85',
  'kuala-lumpur':'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=1600&q=85',
  phuket:       'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1600&q=85',
  bangkok:      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1600&q=85',
  'chiang-mai': 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1600&q=85',
  'hua-hin':    'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=1600&q=85',
}

export default function CityHero({ city }: { city: City }) {
  const heroRef = useRef<HTMLElement>(null)
  const photo = CITY_PHOTOS[city.slug]

  // Parallax on scroll
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const onScroll = () => {
      const bg = hero.querySelector('.ch-bg') as HTMLElement
      if (bg) bg.style.transform = `translateY(${window.scrollY * 0.3}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .ch-wrap { position: relative; width: 100%; height: 100vh; min-height: 600px; overflow: hidden; }
        .ch-bg { position: absolute; inset: -10%; background-size: cover; background-position: center; will-change: transform; }
        .ch-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.1) 100%),
            linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 60%);
          z-index: 1;
        }

        /* Top nav bar */
        .ch-topnav { position: absolute; top: 0; left: 0; right: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 3rem; background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%); }
        .ch-topnav-logo { font-family: 'DM Sans', sans-serif; font-size: 13px; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.9); text-decoration: none; font-weight: 500; transition: color .2s; }
        .ch-topnav-logo:hover { color: #fff; }
        .ch-back { display: flex; align-items: center; gap: 8px; font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.45); text-decoration: none; transition: color .2s; }
        .ch-back:hover { color: rgba(255,255,255,.85); }
        .ch-back-arrow { font-size: 14px; }

        /* Content */
        .ch-content { position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; padding: 0 3rem 4rem; max-width: 1152px; margin: 0 auto; }
        .ch-region { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: .2em; text-transform: uppercase; color: rgba(200,185,122,.85); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; }
        .ch-region::before { content: ''; display: inline-block; width: 24px; height: 0.5px; background: rgba(200,185,122,.6); }
        .ch-name { font-family: 'Playfair Display', serif; font-size: clamp(64px, 10vw, 120px); font-weight: 400; line-height: .95; color: #fff; letter-spacing: -.03em; margin-bottom: 1.5rem; }
        .ch-name em { font-style: italic; color: rgba(255,255,255,.5); font-size: .55em; display: block; font-weight: 400; letter-spacing: -.01em; margin-top: .5rem; line-height: 1.3; }
        .ch-meta { display: flex; align-items: center; gap: 1.5rem; }
        .ch-meta-item { font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.35); }
        .ch-meta-divider { width: 1px; height: 14px; background: rgba(255,255,255,.2); }

        /* Scroll indicator */
        .ch-scroll { position: absolute; bottom: 2rem; right: 3rem; z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .ch-scroll-text { font-family: 'DM Sans', sans-serif; font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.2); }
        .ch-scroll-line { width: 0.5px; height: 32px; background: linear-gradient(to bottom, transparent, rgba(200,185,122,.5)); }
      `}</style>

      <section className="ch-wrap" ref={heroRef}>
        {/* Background */}
        <div
          className="ch-bg"
          style={photo
            ? { backgroundImage: `url(${photo})` }
            : { backgroundColor: city.coverColor }
          }
        />
        <div className="ch-overlay" />

        {/* Top Nav */}
        <nav className="ch-topnav">
          <Link href="/" className="ch-back">
            <span className="ch-back-arrow">←</span>
            All Cities
          </Link>
          <Link href="/" className="ch-topnav-logo">Vibe Syntax</Link>
        </nav>

        {/* Content */}
        <div className="ch-content">
          <div className="ch-region">{city.country}</div>
          <h1 className="ch-name">
            {city.name}
            {city.heroQuote && <em>{city.heroQuote}</em>}
          </h1>
          <div className="ch-meta">
            <span className="ch-meta-item">{city.country}</span>
            <div className="ch-meta-divider" />
            <span className="ch-meta-item">{city.year}</span>
            <div className="ch-meta-divider" />
            <span className="ch-meta-item">{city.summary}</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="ch-scroll">
          <span className="ch-scroll-text">Scroll</span>
          <div className="ch-scroll-line" />
        </div>
      </section>
    </>
  )
}
