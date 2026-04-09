'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Photo { id: number; src: string; caption: string; order: number }
interface City { id: number; city: string; country: string; slug: string; order: number; photos: Photo[] }
type LightboxPhoto = { src: string; caption: string; city: string } | null

export default function PhotographyClient({ cities }: { cities: City[] }) {
  const [activeCity, setActiveCity] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<LightboxPhoto>(null)

  const displayed = activeCity
    ? cities.filter(c => c.city === activeCity)
    : cities

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

        .pg-wrap { min-height: 100vh; background: #0b1710; color: #fff; font-family: 'Playfair Display', Georgia, serif; }

        .pg-header { padding-top: 0; padding-bottom: 2rem; border-bottom: 0.5px solid rgba(255,255,255,.1); }
        .pg-header-inner { max-width: 1400px; margin: 0 auto; padding: 0 3rem; }
        .pg-topnav { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 3rem; background: rgba(11,23,16,0.95); border-bottom: 0.5px solid rgba(255,255,255,.06); max-width: 100%; }
        .pg-topnav-inner { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1400px; margin: 0 auto; }
        .pg-back { font-family: system-ui, sans-serif; font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
          color: rgba(255,255,255,.4); text-decoration: none; display: inline-flex; align-items: center; gap: 6px;
          transition: color .2s; }
        .pg-back:hover { color: rgba(255,255,255,.8); }
        .pg-topnav-logo { font-family: system-ui, sans-serif; font-size: 13px; font-weight: 500; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.9); text-decoration: none; transition: color .2s; }
        .pg-topnav-logo:hover { color: #fff; }
        .pg-header-content { padding: 3rem 3rem 0; }
        .pg-title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 400; letter-spacing: .02em; margin-bottom: .5rem; }
        .pg-subtitle { font-family: system-ui, sans-serif; font-size: 13px; color: rgba(255,255,255,.4); letter-spacing: .05em; }

        .pg-filter { border-bottom: 0.5px solid rgba(255,255,255,.06); }
        .pg-filter-inner { max-width: 1400px; margin: 0 auto; padding: 1.5rem 3rem; display: flex; gap: 1rem; flex-wrap: wrap; }
        .pg-filter-btn { font-family: system-ui, sans-serif; font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
          padding: .4rem 1rem; border: 0.5px solid rgba(255,255,255,.2); border-radius: 2px; background: none; color: rgba(255,255,255,.5);
          cursor: pointer; transition: all .2s; }
        .pg-filter-btn:hover { color: #fff; border-color: rgba(255,255,255,.5); }
        .pg-filter-btn.active { background: rgba(200,185,122,.15); border-color: #c8b97a; color: #c8b97a; }

        .pg-body { padding: 3rem; max-width: 1400px; margin: 0 auto; }

        .pg-city-block { margin-bottom: 5rem; }
        .pg-city-label { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.5rem; }
        .pg-city-name { font-size: 1.75rem; font-weight: 400; }
        .pg-city-country { font-family: system-ui, sans-serif; font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
          color: rgba(255,255,255,.35); }
        .pg-city-link { font-family: system-ui, sans-serif; font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
          color: #c8b97a; text-decoration: none; margin-left: auto; opacity: .7; transition: opacity .2s; }
        .pg-city-link:hover { opacity: 1; }
        .pg-city-divider { width: 40px; height: 0.5px; background: rgba(255,255,255,.2); margin-bottom: 1.5rem; }

        .pg-grid { display: grid; gap: 6px; }
        .pg-grid.cols-2 { grid-template-columns: 1fr 1fr; }
        .pg-grid.cols-3 { grid-template-columns: 1fr 1fr 1fr; }
        .pg-grid.cols-4 { grid-template-columns: 1fr 1fr 1fr 1fr; }
        .pg-grid.mixed { grid-template-columns: 2fr 1fr 1fr; grid-template-rows: auto auto; }
        .pg-grid.mixed .pg-photo:first-child { grid-row: 1 / 3; }

        .pg-photo { position: relative; overflow: hidden; aspect-ratio: 3/2; cursor: zoom-in; }
        .pg-photo.tall { aspect-ratio: 2/3; }
        .pg-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.25,.46,.45,.94); display: block; }
        .pg-photo:hover img { transform: scale(1.04); }
        .pg-photo-cap { position: absolute; bottom: 0; left: 0; right: 0; padding: .75rem 1rem;
          background: linear-gradient(transparent, rgba(0,0,0,.6));
          font-family: system-ui, sans-serif; font-size: 11px; color: rgba(255,255,255,.6);
          letter-spacing: .05em; opacity: 0; transition: opacity .3s; }
        .pg-photo:hover .pg-photo-cap { opacity: 1; }

        .pg-lightbox { position: fixed; inset: 0; background: rgba(0,0,0,.92); z-index: 9999;
          display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .pg-lightbox-inner { position: relative; width: 100%; max-width: 900px; background: #0f1e14; display: flex; flex-direction: column; }
        .pg-lightbox-img-wrap { width: 100%; overflow: hidden; flex-shrink: 0; aspect-ratio: 3/2; }
        .pg-lightbox-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pg-lightbox-info { padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; }
        .pg-lightbox-info-left { display: flex; flex-direction: column; gap: .25rem; }
        .pg-lightbox-cap { font-family: system-ui, sans-serif; font-size: 14px; color: rgba(255,255,255,.75); letter-spacing: .05em; }
        .pg-lightbox-city { font-family: system-ui, sans-serif; font-size: 11px; color: rgba(255,255,255,.35); letter-spacing: .12em; text-transform: uppercase; }
        .pg-lightbox-close { font-size: 1.25rem; color: rgba(255,255,255,.4); cursor: pointer; background: none; border: none;
          transition: color .2s; line-height: 1; padding: .25rem; }
        .pg-lightbox-close:hover { color: #fff; }
        .pg-lightbox-overlay { position: absolute; inset: 0; }
      `}</style>

      <div className="pg-wrap">
        {/* Top Nav */}
        <div className="pg-topnav">
          <div className="pg-topnav-inner">
            <Link href="/" className="pg-back">← 返回首页</Link>
            <Link href="/" className="pg-topnav-logo">Vibe Syntax</Link>
          </div>
        </div>

        {/* Header */}
        <div className="pg-header">
          <div className="pg-header-content">
            <h1 className="pg-title">摄影</h1>
            <p className="pg-subtitle">Photography · {cities.reduce((s, c) => s + c.photos.length, 0)} photos across {cities.length} cities</p>
          </div>
        </div>

        {/* City filter */}
        <div className="pg-filter">
          <div className="pg-filter-inner">
            <button
              className={`pg-filter-btn${!activeCity ? ' active' : ''}`}
              onClick={() => setActiveCity(null)}
            >全部</button>
            {cities.map(c => (
              <button
                key={c.city}
                className={`pg-filter-btn${activeCity === c.city ? ' active' : ''}`}
                onClick={() => setActiveCity(activeCity === c.city ? null : c.city)}
              >{c.city}</button>
            ))}
          </div>
        </div>

        {/* Photo grid by city */}
        <div className="pg-body">
          {displayed.map((cityData, ci) => {
            const count = cityData.photos.length
            const gridClass = count >= 5 ? 'mixed' : count === 4 ? 'cols-4' : count === 3 ? 'cols-3' : 'cols-2'
            return (
              <div className="pg-city-block" key={cityData.id}>
                <div className="pg-city-label">
                  <span className="pg-city-name">{cityData.city}</span>
                  <span className="pg-city-country">{cityData.country}</span>
                  <Link href={`/cities/${cityData.slug}`} className="pg-city-link">查看城市详情 →</Link>
                </div>
                <div className="pg-city-divider" />
                <div className={`pg-grid ${gridClass}`}>
                  {cityData.photos.map((photo, pi) => (
                    <div
                      className={`pg-photo${ci % 2 === 0 && pi === 0 && count >= 5 ? ' tall' : ''}`}
                      key={photo.id}
                      onClick={() => setLightbox({ src: photo.src, caption: photo.caption, city: cityData.city })}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.src} alt={photo.caption} loading="lazy" />
                      <div className="pg-photo-cap">{photo.caption}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="pg-lightbox" onClick={() => setLightbox(null)}>
          <div className="pg-lightbox-inner" onClick={e => e.stopPropagation()}>
            <div className="pg-lightbox-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightbox.src} alt={lightbox.caption} />
            </div>
            <div className="pg-lightbox-info">
              <div className="pg-lightbox-info-left">
                <span className="pg-lightbox-cap">{lightbox.caption}</span>
                <span className="pg-lightbox-city">{lightbox.city}</span>
              </div>
              <button className="pg-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
