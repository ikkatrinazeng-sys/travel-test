'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

/* ── Data ──────────────────────────────────────────────────── */
const CITIES: Record<string, { country: string; coords: string; photo: string; thumb: string; slug: string }> = {
  'Paris':        { country:'France',      coords:"48°52'N  2°21'E",   slug:'paris',        photo:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&q=75' },
  'Beaune':       { country:'France',      coords:"47°01'N  4°50'E",   slug:'beaune',       photo:'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=300&q=75' },
  'Dijon':        { country:'France',      coords:"47°19'N  5°02'E",   slug:'dijon',        photo:'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&q=75' },
  'Amsterdam':    { country:'Netherlands', coords:"52°22'N  4°54'E",   slug:'amsterdam',    photo:'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=300&q=75' },
  'Rome':         { country:'Italy',       coords:"41°54'N  12°30'E",  slug:'rome',         photo:'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&q=75' },
  'Capri':        { country:'Italy',       coords:"40°33'N  14°14'E",  slug:'capri',        photo:'https://images.unsplash.com/photo-1533606688076-b6683a5f59f1?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1533606688076-b6683a5f59f1?w=300&q=75' },
  'Naples':       { country:'Italy',       coords:"40°51'N  14°15'E",  slug:'naples',       photo:'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=300&q=75' },
  'Seoul':        { country:'Korea',       coords:"37°33'N  126°58'E", slug:'seoul',        photo:'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=300&q=75' },
  'Busan':        { country:'Korea',       coords:"35°06'N  129°02'E", slug:'busan',        photo:'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=300&q=75' },
  'Osaka':        { country:'Japan',       coords:"34°41'N  135°30'E", slug:'osaka',        photo:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&q=75' },
  'Kyoto':        { country:'Japan',       coords:"35°00'N  135°46'E", slug:'kyoto',        photo:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&q=75' },
  'Kobe':         { country:'Japan',       coords:"34°41'N  135°11'E", slug:'kobe',         photo:'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=300&q=75' },
  'Penang':       { country:'Malaysia',    coords:"5°24'N   100°20'E", slug:'penang',       photo:'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=300&q=75' },
  'Langkawi':     { country:'Malaysia',    coords:"6°21'N   99°48'E",  slug:'langkawi',     photo:'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=300&q=75' },
  'Kuala Lumpur': { country:'Malaysia',    coords:"3°08'N   101°41'E", slug:'kuala-lumpur', photo:'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=300&q=75' },
  'Phuket':       { country:'Thailand',    coords:"7°53'N   98°24'E",  slug:'phuket',       photo:'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=300&q=75' },
  'Bangkok':      { country:'Thailand',    coords:"13°45'N  100°30'E", slug:'bangkok',      photo:'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=300&q=75' },
  'Chiang Mai':   { country:'Thailand',    coords:"18°47'N  98°59'E",  slug:'chiang-mai',   photo:'https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1528181304800-259b08848526?w=300&q=75' },
  'Hua Hin':      { country:'Thailand',    coords:"12°34'N  99°57'E",  slug:'hua-hin',      photo:'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=1200&q=80', thumb:'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=300&q=75' },
}

type Region = 'europe' | 'east-asia' | 'southeast-asia'

const REGIONS: Record<Region, { watermark: string; label: string; rows: string[][] }> = {
  'europe':         { watermark:'EUROPE',    label:'Europe',         rows:[['Paris','Beaune','Dijon'],['Amsterdam','Rome','Capri','Naples']] },
  'east-asia':      { watermark:'EAST ASIA', label:'East Asia',      rows:[['Seoul','Busan'],['Osaka','Kyoto','Kobe']] },
  'southeast-asia': { watermark:'SE ASIA',   label:'Southeast Asia', rows:[['Penang','Langkawi','Kuala Lumpur'],['Phuket','Bangkok','Chiang Mai','Hua Hin']] },
}

/* ── Component ─────────────────────────────────────────────── */
export default function AllCities() {
  const [region, setRegion] = useState<Region>('europe')
  const [activeCity, setActiveCity] = useState<string | null>(null)
  const [featuredCity, setFeaturedCity] = useState<string | null>(null)
  const [openRows, setOpenRows] = useState([true, true])
  const [ftIn, setFtIn] = useState(false)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const thumbStripRef = useRef<HTMLDivElement>(null)

  const allCities = REGIONS[region].rows.flat()

  const handleEnter = useCallback((name: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setActiveCity(name)
    setFtIn(false)
    setTimeout(() => {
      setFeaturedCity(name)
      setFtIn(true)
    }, 30)
    // Scroll thumb into view
    setTimeout(() => {
      const el = thumbStripRef.current?.querySelector(`[data-city="${name}"]`) as HTMLElement
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }, 50)
  }, [])

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => {
      setActiveCity(null)
      setFtIn(false)
      setTimeout(() => setFeaturedCity(null), 400)
    }, 150)
  }, [])

  const switchRegion = (r: Region) => {
    if (r === region) return
    setOpenRows([false, false])
    setActiveCity(null)
    setFtIn(false)
    setTimeout(() => setFeaturedCity(null), 400)
    setTimeout(() => {
      setRegion(r)
      setOpenRows([true, true])
    }, 300)
  }

  const city = featuredCity ? CITIES[featuredCity] : null
  const mosaicCities = REGIONS[region].rows.flat().slice(0, 8)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .ac2-wrap { background: #0b1710; color: rgba(255,255,255,0.9); font-family: 'DM Sans', sans-serif; overflow: hidden; }

        /* Header */
        .ac2-header { display: flex; align-items: center; justify-content: space-between; padding: 2rem 3rem 1.5rem; position: relative; z-index: 10; }
        .ac2-label { font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.35); font-family: 'DM Sans', sans-serif; font-weight: 400; }
        .ac2-line { flex: 1; height: 0.5px; background: rgba(255,255,255,.08); margin: 0 2rem; }
        .ac2-count { font-size: 11px; letter-spacing: .12em; color: rgba(255,255,255,.35); font-family: 'DM Sans', sans-serif; }

        /* Stage */
        .ac2-stage { position: relative; height: 520px; overflow: hidden; cursor: crosshair; }

        .ac2-bg-layer { position: absolute; inset: 0; transition: opacity 0.7s cubic-bezier(.4,0,.2,1); background-size: cover; background-position: center; }
        .ac2-bg-layer.hidden { opacity: 0; }
        .ac2-bg-layer.visible { opacity: 1; }

        .ac2-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(11,23,16,1) 0%, rgba(11,23,16,0.55) 40%, rgba(11,23,16,0.15) 100%),
                      linear-gradient(to right, rgba(11,23,16,0.6) 0%, transparent 40%);
          z-index: 2; pointer-events: none;
        }

        @keyframes ac2-kenburns { 0%{transform:scale(1) translate(0,0)} 100%{transform:scale(1.06) translate(-1%,-.5%)} }
        .ac2-bg-layer.visible.photo { animation: ac2-kenburns 8s ease-in-out forwards; }

        .ac2-watermark { position:absolute; bottom:-15px; right:2.5rem; font-family:'Playfair Display',serif; font-size:130px; font-weight:700; color:rgba(255,255,255,0.04); line-height:1; pointer-events:none; letter-spacing:-.03em; z-index:3; user-select:none; }

        /* Tabs */
        .ac2-tabs { position:absolute; top:1.75rem; left:3rem; display:flex; gap:2rem; z-index:5; }
        .ac2-tab { font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:rgba(255,255,255,.35); cursor:pointer; padding-bottom:5px; border:none; background:none; position:relative; transition:color .22s; }
        .ac2-tab::after { content:''; position:absolute; bottom:-1px; left:0; width:0; height:1px; background:#c8b97a; transition:width .45s cubic-bezier(.4,0,.2,1); }
        .ac2-tab.on { color:#c8b97a; }
        .ac2-tab.on::after { width:100%; }
        .ac2-tab:hover:not(.on) { color:rgba(255,255,255,0.6); }

        /* Preview */
        .ac2-preview { position:absolute; top:1.75rem; right:3rem; z-index:5; text-align:right; pointer-events:none; }
        .ac2-preview-info { opacity:0; transform:translateY(8px); transition:opacity .22s,transform .22s; }
        .ac2-preview-info.show { opacity:1; transform:translateY(0); }
        .ac2-preview-name { font-family:'Playfair Display',serif; font-size:28px; font-weight:600; line-height:1.1; color:#fff; letter-spacing:-.01em; }
        .ac2-preview-country { font-family:'DM Sans',sans-serif; font-size:11px; color:#c8b97a; letter-spacing:.12em; text-transform:uppercase; margin-top:4px; }
        .ac2-preview-coords { font-family:'DM Sans',sans-serif; font-size:10px; color:rgba(255,255,255,.35); letter-spacing:.06em; margin-top:6px; }

        /* City list */
        .ac2-city-list { position:absolute; bottom:0; left:0; right:0; z-index:4; padding:0 3rem 1.5rem; }
        .ac2-city-row { display:flex; align-items:baseline; flex-wrap:wrap; border-top:0.5px solid rgba(255,255,255,.08); overflow:hidden; max-height:0; transition:max-height .6s cubic-bezier(.4,0,.2,1),border-color .22s; }
        .ac2-city-row.open { max-height:120px; }
        .ac2-city-row:hover { border-top-color:rgba(200,185,122,0.25); }

        .ac2-city-btn { font-family:'Playfair Display',serif; font-size:36px; font-weight:400; color:rgba(255,255,255,.22); cursor:pointer; padding:10px 0; transition:color .22s,font-size .22s,letter-spacing .22s; white-space:nowrap; flex-shrink:0; background:none; border:none; line-height:1.15; position:relative; }
        .ac2-city-btn:not(:last-child) { margin-right:6px; }
        .ac2-city-btn:not(:last-child)::after { content:'·'; margin-left:6px; color:rgba(255,255,255,.1); font-size:22px; transition:color .22s; }
        .ac2-city-btn:hover,.ac2-city-btn.active { color:#fff; letter-spacing:.01em; }
        .ac2-city-btn.active { font-size:46px; color:#fff; font-style:italic; }
        .ac2-city-btn.active::before { content:''; position:absolute; bottom:8px; left:0; width:100%; height:1px; background:rgba(200,185,122,0.6); }

        @keyframes ac2-fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .ac2-city-btn { animation:ac2-fadeUp .4s ease both; }

        /* Thumb strip */
        .ac2-thumb-wrap { border-top:0.5px solid rgba(255,255,255,.08); position:relative; }
        .ac2-thumb-wrap::before,.ac2-thumb-wrap::after { content:''; position:absolute; top:0; bottom:0; width:60px; z-index:2; pointer-events:none; }
        .ac2-thumb-wrap::before { left:0; background:linear-gradient(to right,#0b1710,transparent); }
        .ac2-thumb-wrap::after { right:0; background:linear-gradient(to left,#0b1710,transparent); }
        .ac2-thumb-strip { display:flex; gap:12px; padding:1.25rem 3rem; overflow-x:auto; scrollbar-width:none; scroll-behavior:smooth; }
        .ac2-thumb-strip::-webkit-scrollbar { display:none; }
        .ac2-thumb-item { flex-shrink:0; cursor:pointer; display:flex; flex-direction:column; align-items:center; }
        .ac2-thumb-img { width:96px; height:64px; border-radius:6px; object-fit:cover; border:0.5px solid rgba(255,255,255,.08); transition:border-color .22s,transform .22s,box-shadow .22s; display:block; }
        .ac2-thumb-item:hover .ac2-thumb-img { border-color:rgba(200,185,122,0.5); transform:scale(1.05) translateY(-2px); box-shadow:0 8px 20px rgba(0,0,0,.5); }
        .ac2-thumb-item.active .ac2-thumb-img { border-color:#c8b97a; transform:scale(1.05) translateY(-2px); box-shadow:0 8px 24px rgba(200,185,122,.2); }
        .ac2-thumb-label { font-family:'DM Sans',sans-serif; font-size:11px; color:rgba(255,255,255,.35); margin-top:6px; text-align:center; transition:color .22s; }
        .ac2-thumb-item:hover .ac2-thumb-label,.ac2-thumb-item.active .ac2-thumb-label { color:#c8b97a; }
        .ac2-thumb-dot { width:4px; height:4px; border-radius:50%; background:#c8b97a; margin-top:5px; opacity:0; transform:scale(0); transition:opacity .22s,transform .22s; }
        .ac2-thumb-item.active .ac2-thumb-dot { opacity:1; transform:scale(1); }

        /* Featured panel */
        .ac2-featured { position:relative; height:480px; overflow:hidden; border-top:0.5px solid rgba(255,255,255,.08); }
        .ac2-featured-mosaic { position:absolute; inset:0; display:grid; grid-template-columns:repeat(4,1fr); transition:opacity 0.7s cubic-bezier(.4,0,.2,1); z-index:1; }
        .ac2-featured-mosaic.hidden { opacity:0; }
        .ac2-featured-mosaic-cell { background-size:cover; background-position:center; filter:brightness(.35) saturate(.6); }
        .ac2-featured-img { position:absolute; inset:0; background-size:cover; background-position:center; transition:opacity 0.7s cubic-bezier(.4,0,.2,1),transform 1.2s cubic-bezier(.4,0,.2,1); transform:scale(1.04); opacity:0; }
        .ac2-featured-img.active { transform:scale(1); opacity:1; }
        .ac2-featured-foverlay {
          position:absolute; inset:0; z-index:2;
          background: linear-gradient(to right,rgba(11,23,16,.92) 0%,rgba(11,23,16,.4) 45%,rgba(11,23,16,.15) 100%),
                      linear-gradient(to top,rgba(11,23,16,.5) 0%,transparent 50%);
        }
        .ac2-featured-empty { position:absolute; inset:0; z-index:3; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; transition:opacity .45s; }
        .ac2-featured-empty.hidden { opacity:0; pointer-events:none; }
        .ac2-featured-empty-hint { font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.18); }
        .ac2-featured-empty-line { width:1px; height:32px; background:rgba(255,255,255,.12); }
        .ac2-featured-content { position:absolute; top:50%; left:3rem; transform:translateY(-50%); z-index:3; max-width:420px; }
        .ac2-ft-tag { font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:.22em; text-transform:uppercase; color:#c8b97a; margin-bottom:1rem; opacity:0; transform:translateY(10px); transition:opacity .45s,transform .45s; }
        .ac2-ft-tag.in { opacity:1; transform:translateY(0); }
        .ac2-ft-name { font-family:'Playfair Display',serif; font-size:clamp(48px,6vw,80px); font-weight:600; line-height:1; color:#fff; letter-spacing:-.02em; margin-bottom:.75rem; opacity:0; transform:translateY(16px); transition:opacity .45s .07s,transform .45s .07s; }
        .ac2-ft-name.in { opacity:1; transform:translateY(0); }
        .ac2-ft-name em { font-style:italic; color:rgba(255,255,255,.55); font-weight:400; font-size:.65em; display:block; letter-spacing:0; margin-top:.25rem; }
        .ac2-ft-divider { width:40px; height:1px; background:rgba(200,185,122,.6); margin:1.25rem 0; opacity:0; transition:opacity .45s .14s; }
        .ac2-ft-divider.in { opacity:1; }
        .ac2-ft-meta { display:flex; flex-direction:column; gap:6px; opacity:0; transform:translateY(8px); transition:opacity .45s .2s,transform .45s .2s; }
        .ac2-ft-meta.in { opacity:1; transform:translateY(0); }
        .ac2-ft-meta-row { display:flex; align-items:center; gap:10px; }
        .ac2-ft-meta-label { font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:.15em; text-transform:uppercase; color:rgba(255,255,255,.35); min-width:44px; }
        .ac2-ft-meta-value { font-family:'DM Sans',sans-serif; font-size:13px; color:rgba(255,255,255,.7); }
        .ac2-ft-cta { margin-top:2rem; display:inline-flex; align-items:center; gap:8px; font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:#c8b97a; cursor:pointer; opacity:0; transform:translateY(8px); transition:opacity .45s .28s,transform .45s .28s,gap .22s; text-decoration:none; }
        .ac2-ft-cta.in { opacity:1; transform:translateY(0); }
        .ac2-ft-cta:hover { gap:14px; }
        .ac2-ft-arrow { width:24px; height:1px; background:#c8b97a; position:relative; transition:width .22s; }
        .ac2-ft-cta:hover .ac2-ft-arrow { width:32px; }
        .ac2-ft-arrow::after { content:''; position:absolute; right:0; top:-3px; width:6px; height:6px; border-right:1px solid #c8b97a; border-top:1px solid #c8b97a; transform:rotate(45deg); }
      `}</style>

      <div className="ac2-wrap">
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>

          {/* Header */}
          <div className="ac2-header">
            <p className="ac2-label">All Cities</p>
            <div className="ac2-line" />
            <p className="ac2-count">{allCities.length} destinations</p>
          </div>

          {/* Stage */}
          <div className="ac2-stage">
            {/* Region base backgrounds */}
            {(['europe','east-asia','southeast-asia'] as Region[]).map(r => (
              <div key={r} className={`ac2-bg-layer ${region === r && !activeCity ? 'visible' : 'hidden'}`}
                style={{ background: r === 'europe'
                  ? 'linear-gradient(155deg,#1a1425 0%,#0e1c10 60%,#0a1a0e 100%)'
                  : r === 'east-asia'
                  ? 'linear-gradient(155deg,#201418 0%,#0e1c10 60%,#0b1510 100%)'
                  : 'linear-gradient(155deg,#0e2018 0%,#0e1c10 60%,#0a1a10 100%)'
                }}
              />
            ))}

            {/* City photo backgrounds */}
            {Object.entries(CITIES).map(([name, data]) => (
              <div key={name}
                className={`ac2-bg-layer photo ${activeCity === name ? 'visible' : 'hidden'}`}
                style={{ backgroundImage: `url(${data.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
            ))}

            <div className="ac2-overlay" />
            <div className="ac2-watermark">{REGIONS[region].watermark}</div>

            {/* Tabs */}
            <div className="ac2-tabs">
              {(['europe','east-asia','southeast-asia'] as Region[]).map(r => (
                <button key={r} className={`ac2-tab${region === r ? ' on' : ''}`} onClick={() => switchRegion(r)}>
                  {REGIONS[r].label}
                </button>
              ))}
            </div>

            {/* Preview info */}
            <div className="ac2-preview">
              <div className={`ac2-preview-info${activeCity ? ' show' : ''}`}>
                <div className="ac2-preview-name">{activeCity}</div>
                <div className="ac2-preview-country">{activeCity && CITIES[activeCity]?.country}</div>
                <div className="ac2-preview-coords">{activeCity && CITIES[activeCity]?.coords}</div>
              </div>
            </div>

            {/* City name list */}
            <div className="ac2-city-list">
              {REGIONS[region].rows.map((row, ri) => (
                <div key={ri} className={`ac2-city-row${openRows[ri] ? ' open' : ''}`}>
                  {row.map((name, ci) => (
                    <button
                      key={ci}
                      className={`ac2-city-btn${activeCity === name ? ' active' : ''}`}
                      style={{ animationDelay: `${(ri * row.length + ci) * 55}ms` }}
                      onMouseEnter={() => handleEnter(name)}
                      onMouseLeave={handleLeave}
                      onClick={() => window.location.href = `/cities/${CITIES[name].slug}`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="ac2-thumb-wrap">
            <div className="ac2-thumb-strip" ref={thumbStripRef}>
              {allCities.map(name => (
                <Link key={name} href={`/cities/${CITIES[name].slug}`} style={{ textDecoration: 'none' }}>
                  <div
                    className={`ac2-thumb-item${activeCity === name ? ' active' : ''}`}
                    data-city={name}
                    onMouseEnter={() => handleEnter(name)}
                    onMouseLeave={handleLeave}
                  >
                    <img className="ac2-thumb-img" src={CITIES[name].thumb} alt={name} loading="lazy" />
                    <div className="ac2-thumb-label">{name}</div>
                    <div className="ac2-thumb-dot" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured panel */}
          <div className="ac2-featured">
            {/* Mosaic (default state) */}
            <div className={`ac2-featured-mosaic${featuredCity ? ' hidden' : ''}`}>
              {mosaicCities.map(name => (
                <div key={name} className="ac2-featured-mosaic-cell"
                  style={{ backgroundImage: `url(${CITIES[name].photo})` }} />
              ))}
            </div>

            {/* City photo */}
            <div className={`ac2-featured-img${featuredCity ? ' active' : ''}`}
              style={{ backgroundImage: featuredCity ? `url(${CITIES[featuredCity]?.photo})` : 'none' }} />

            <div className="ac2-featured-foverlay" />

            {/* Empty hint */}
            <div className={`ac2-featured-empty${featuredCity ? ' hidden' : ''}`}>
              <div className="ac2-featured-empty-line" />
              <div className="ac2-featured-empty-hint">Hover a city to explore</div>
              <div className="ac2-featured-empty-line" />
            </div>

            {/* Content */}
            <div className="ac2-featured-content">
              <div className={`ac2-ft-tag${ftIn ? ' in' : ''}`}>Destination</div>
              <div className={`ac2-ft-name${ftIn ? ' in' : ''}`}>
                <span>{featuredCity}</span>
                <em>{city?.country}</em>
              </div>
              <div className={`ac2-ft-divider${ftIn ? ' in' : ''}`} />
              <div className={`ac2-ft-meta${ftIn ? ' in' : ''}`}>
                <div className="ac2-ft-meta-row">
                  <span className="ac2-ft-meta-label">Country</span>
                  <span className="ac2-ft-meta-value">{city?.country}</span>
                </div>
                <div className="ac2-ft-meta-row">
                  <span className="ac2-ft-meta-label">Coords</span>
                  <span className="ac2-ft-meta-value">{city?.coords}</span>
                </div>
              </div>
              {featuredCity && (
                <Link href={`/cities/${city?.slug}`} className={`ac2-ft-cta${ftIn ? ' in' : ''}`}>
                  Explore destination
                  <span className="ac2-ft-arrow" />
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
