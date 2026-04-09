'use client'

import { City } from '@/types'
import Link from 'next/link'
import { useRef, useState } from 'react'

// 单个视频卡片：自动检测横/竖屏并调整比例和宽度
function VideoCard({ video }: { video: { embedUrl: string; title: string } }) {
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null)

  const isLocal = video.embedUrl.startsWith('/')

  // 竖屏：320px 宽，9:16 比例；横屏：全宽，16:9 比例
  const cardWidth = isPortrait === true ? '320px' : '100%'
  const aspectRatio = isPortrait === true ? '9/16' : '16/9'

  return (
    <div style={{ width: cardWidth, flexShrink: 0 }}>
      <div style={{
        width: '100%',
        aspectRatio,
        background: '#000',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {isLocal ? (
          <video
            src={video.embedUrl}
            controls
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onLoadedMetadata={(e) => {
              const v = e.currentTarget
              setIsPortrait(v.videoHeight > v.videoWidth)
            }}
          />
        ) : (
          <iframe
            src={video.embedUrl}
            title={video.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            allowFullScreen
          />
        )}
      </div>
      {video.title && (
        <p style={{ marginTop: '0.75rem', fontSize: '13px', color: '#666', fontWeight: 300 }}>
          {video.title}
        </p>
      )}
    </div>
  )
}

// Unsplash gallery images per city (3 extra images)
const GALLERY_PHOTOS: Record<string, string[]> = {
  paris:         ['https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&q=80','https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80','https://images.unsplash.com/photo-1471623432079-b009d30b6729?w=900&q=80'],
  beaune:        ['https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80','https://images.unsplash.com/photo-1510925758641-869d353cecc7?w=900&q=80','/1.jpg'],
  dijon:         ['https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80','https://images.unsplash.com/photo-1562516710-96b6e86d13da?w=900&q=80','https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=900&q=80'],
  amsterdam:     ['https://images.unsplash.com/photo-1580086319619-3ed498161c77?w=900&q=80','https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=900&q=80','https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=900&q=80'],
  rome:          ['https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=900&q=80','https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80','https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=900&q=80'],
  capri:         ['https://images.unsplash.com/photo-1533606688076-b6683a5f59f1?w=900&q=80','https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=900&q=80','https://images.unsplash.com/photo-1512813498716-3e640fed3f73?w=900&q=80'],
  naples:        ['https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&q=80','https://images.unsplash.com/photo-1533165483-e40626fc3c2d?w=900&q=80','https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=900&q=80'],
  seoul:         ['https://images.unsplash.com/photo-1538485399081-7191377e8241?w=900&q=80','https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?w=900&q=80','https://images.unsplash.com/photo-1506515104073-78f07af8cedb?w=900&q=80'],
  busan:         ['https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=900&q=80','https://images.unsplash.com/photo-1590559899731-a382839e5549?w=900&q=80','https://images.unsplash.com/photo-1611521399003-d6c7c2c3f89f?w=900&q=80'],
  osaka:         ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80','https://images.unsplash.com/photo-1590559899731-a382839e5549?w=900&q=80','https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=900&q=80'],
  kyoto:         ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80','https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=80','https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=900&q=80'],
  kobe:          ['https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=900&q=80','https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=900&q=80','https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=900&q=80'],
  penang:        ['https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=900&q=80','https://images.unsplash.com/photo-1599119573876-4caae8171e42?w=900&q=80','https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80'],
  langkawi:      ['https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=900&q=80','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'],
  'kuala-lumpur':['https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=900&q=80','https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80'],
  phuket:        ['https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=900&q=80','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80','https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=900&q=80'],
  bangkok:       ['https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=900&q=80','https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=900&q=80','https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=900&q=80'],
  'chiang-mai':  ['https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&q=80','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80','https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=900&q=80'],
  'hua-hin':     ['https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=900&q=80','https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80','https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=900&q=80'],
}

export default function CityDetail({ city }: { city: City }) {
  const photos = GALLERY_PHOTOS[city.slug] ?? []
  const videoRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  const scrollToVideos = () => {
    videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToPhotos = () => {
    photoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .cd-wrap { background: #fff; font-family: 'DM Sans', sans-serif; }

        /* ── Section Label ── */
        .cd-section-label { font-size: 10px; letter-spacing: .2em; text-transform: uppercase; color: rgba(0,0,0,.3); font-family: 'DM Sans', sans-serif; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px; }
        .cd-section-label::after { content: ''; flex: 1; height: 0.5px; background: rgba(0,0,0,.1); }

        /* ── Summary block ── */
        .cd-summary { max-width: 1152px; margin: 0 auto; padding: 5rem 3rem 4rem; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        @media(max-width:768px){ .cd-summary { grid-template-columns:1fr; gap:2.5rem; padding:3rem 1.5rem; } }
        .cd-summary-left {}
        .cd-summary-eyebrow { font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: #9e7b5a; margin-bottom: 1rem; font-family: 'DM Sans', sans-serif; }
        .cd-summary-title { font-family: 'Playfair Display', serif; font-size: clamp(36px, 5vw, 56px); font-weight: 400; line-height: 1.1; color: #111; letter-spacing: -.02em; margin-bottom: 1.5rem; }
        .cd-summary-quote { font-family: 'Playfair Display', serif; font-style: italic; font-size: 20px; line-height: 1.6; color: #555; border-left: 2px solid #c8a96e; padding-left: 1.5rem; }
        .cd-summary-right {}
        .cd-summary-text { font-size: 15px; line-height: 1.9; color: #555; font-weight: 300; margin-bottom: 2rem; }
        .cd-summary-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .cd-stat { padding: 1.25rem; border: 0.5px solid rgba(0,0,0,.08); }
        .cd-stat-label { font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: rgba(0,0,0,.35); margin-bottom: 6px; }
        .cd-stat-value { font-family: 'Playfair Display', serif; font-size: 22px; color: #111; }

        /* ── Photo Grid ── */
        .cd-photos { max-width: 1152px; margin: 0 auto; padding: 0 3rem 5rem; }
        @media(max-width:768px){ .cd-photos { padding: 0 1.5rem 3rem; } }
        .cd-photo-grid { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 420px 320px; gap: 8px; }
        @media(max-width:768px){ .cd-photo-grid { grid-template-columns:1fr; grid-template-rows:auto; } }
        .cd-photo-main { grid-column: 1; grid-row: 1 / 3; overflow: hidden; position: relative; }
        .cd-photo-sm { overflow: hidden; position: relative; }
        .cd-photo-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .7s cubic-bezier(.25,.46,.45,.94); }
        .cd-photo-main:hover .cd-photo-img,
        .cd-photo-sm:hover .cd-photo-img { transform: scale(1.04); }
        .cd-photo-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem 1.25rem; background: linear-gradient(to top, rgba(0,0,0,.55), transparent); font-size: 11px; letter-spacing: .06em; color: rgba(255,255,255,.75); font-family: 'DM Sans', sans-serif; }

        /* ── Story ── */
        .cd-story { background: #0b1710; padding: 6rem 3rem; }
        @media(max-width:768px){ .cd-story { padding: 4rem 1.5rem; } }
        .cd-story-inner { max-width: 1152px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1.6fr; gap: 5rem; align-items: start; }
        @media(max-width:768px){ .cd-story-inner { grid-template-columns:1fr; gap:2.5rem; } }
        .cd-story-left .cd-section-label { color: rgba(255,255,255,.3); }
        .cd-story-left .cd-section-label::after { background: rgba(255,255,255,.1); }
        .cd-story-date { font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: #c8b97a; margin-bottom: 1rem; font-family: 'DM Sans', sans-serif; }
        .cd-story-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 42px); font-weight: 400; line-height: 1.2; color: #fff; letter-spacing: -.01em; }
        .cd-story-text { font-size: 15px; line-height: 1.95; color: rgba(255,255,255,.55); font-weight: 300; }
        .cd-story-text p + p { margin-top: 1.5rem; }

        /* ── Guide ── */
        .cd-guide { max-width: 1152px; margin: 0 auto; padding: 5rem 3rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
        @media(max-width:768px){ .cd-guide { grid-template-columns:1fr; padding:3rem 1.5rem; } }
        .cd-guide-card { padding: 2rem; border: 0.5px solid rgba(0,0,0,.08); transition: border-color .2s, box-shadow .2s; }
        .cd-guide-card:hover { border-color: rgba(200,169,110,.4); box-shadow: 0 4px 20px rgba(0,0,0,.06); }
        .cd-guide-card-icon { font-size: 22px; margin-bottom: 1rem; }
        .cd-guide-card-title { font-size: 11px; letter-spacing: .15em; text-transform: uppercase; color: rgba(0,0,0,.4); margin-bottom: 1rem; font-family: 'DM Sans', sans-serif; }
        .cd-guide-card-body { font-size: 14px; line-height: 1.75; color: #444; font-weight: 300; }
        .cd-guide-list { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .cd-guide-list li { display: flex; align-items: flex-start; gap: 8px; font-size: 14px; line-height: 1.6; color: #444; font-weight: 300; }
        .cd-guide-list li::before { content: '—'; color: #c8a96e; flex-shrink: 0; font-size: 12px; margin-top: 2px; }
        .cd-guide-tips { font-size: 13px; line-height: 1.7; color: #666; font-weight: 300; padding: 1rem 1.25rem; background: rgba(200,169,110,.06); border-left: 2px solid rgba(200,169,110,.4); }
        .cd-guide-tips + .cd-guide-tips { margin-top: 8px; }

        /* ── Guide full-width transport ── */
        .cd-guide-transport { grid-column: 1 / -1; padding: 2rem; border: 0.5px solid rgba(0,0,0,.08); display: flex; gap: 1.5rem; align-items: flex-start; }
        @media(max-width:768px){ .cd-guide-transport { grid-column: 1; } }

        /* ── Bottom nav ── */
        .cd-bottom-nav { border-top: 0.5px solid rgba(0,0,0,.08); padding: 2.5rem 3rem; max-width: 1152px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        @media(max-width:768px){ .cd-bottom-nav { padding: 2rem 1.5rem; flex-direction:column; gap:1rem; } }
        .cd-bottom-back { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: rgba(0,0,0,.4); text-decoration: none; transition: color .2s; font-family: 'DM Sans', sans-serif; }
        .cd-bottom-back:hover { color: #111; }
        .cd-bottom-city-name { font-family: 'Playfair Display', serif; font-size: 13px; color: rgba(0,0,0,.3); }
      `}</style>

      <div className="cd-wrap">

        {/* ── Summary ── */}
        <div className="cd-summary">
          <div className="cd-summary-left">
            <p className="cd-summary-eyebrow">{city.country} · {city.year}</p>
            <h2 className="cd-summary-title">{city.name}</h2>
            {city.heroQuote && (
              <blockquote className="cd-summary-quote">{city.heroQuote}</blockquote>
            )}
          </div>
          <div className="cd-summary-right">
            <p className="cd-summary-text">{city.summary}</p>
            <div className="cd-summary-stats">
              <div className="cd-stat">
                <div className="cd-stat-label">Year Visited</div>
                <div className="cd-stat-value">{city.year}</div>
              </div>
              <div className="cd-stat">
                <div className="cd-stat-label">Region</div>
                <div className="cd-stat-value" style={{ fontSize: '16px' }}>
                  {{ 'europe': 'Europe', 'east-asia': 'East Asia', 'southeast-asia': 'SE Asia' }[city.region] ?? city.region}
                </div>
              </div>
              <div className="cd-stat" style={{ cursor: (photos.length + city.photos.length) > 0 ? 'pointer' : 'default' }} onClick={(photos.length + city.photos.length) > 0 ? scrollToPhotos : undefined}>
                <div className="cd-stat-label">Photos</div>
                <div className="cd-stat-value">{(photos.length + city.photos.length).toString().padStart(2, '0')}</div>
              </div>
              <div className="cd-stat" style={{ cursor: city.videos.length > 0 ? 'pointer' : 'default' }} onClick={city.videos.length > 0 ? scrollToVideos : undefined}>
                <div className="cd-stat-label">Videos</div>
                <div className="cd-stat-value">{String(city.videos.length).padStart(2, '0')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Photo Grid ── */}
        {photos.length >= 3 && (
          <div className="cd-photos" ref={photoRef}>
            <div className="cd-section-label">Photography</div>
            <div className="cd-photo-grid">
              <div className="cd-photo-main">
                <img className="cd-photo-img" src={photos[0]} alt={city.name} />
                <div className="cd-photo-caption">{city.name}</div>
              </div>
              <div className="cd-photo-sm">
                <img className="cd-photo-img" src={photos[1]} alt={city.name} style={{ height: '100%' }} />
              </div>
              <div className="cd-photo-sm">
                <img className="cd-photo-img" src={photos[2]} alt={city.name} style={{ height: '100%' }} />
              </div>
            </div>
          </div>
        )}

        {/* ── Story ── */}
        <div className="cd-story">
          <div className="cd-story-inner">
            <div className="cd-story-left">
              <div className="cd-section-label" style={{ color: 'rgba(255,255,255,.3)' }}>Story</div>
              <div className="cd-story-date">{city.story.date}</div>
              <h3 className="cd-story-title">{city.story.title}</h3>
            </div>
            <div className="cd-story-right">
              <div className="cd-story-text">
                {city.story.content.split('\n').map((para, i) =>
                  para.trim() ? <p key={i}>{para}</p> : null
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Guide ── */}
        <div className="cd-guide">
          <div style={{ gridColumn: '1 / -1' }}>
            <div className="cd-section-label">Travel Guide</div>
          </div>

          {/* Stay */}
          <div className="cd-guide-card">
            <div className="cd-guide-card-icon">🏨</div>
            <div className="cd-guide-card-title">Where to Stay</div>
            <ul className="cd-guide-list">
              {city.guide.stay.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          {/* Eat */}
          <div className="cd-guide-card">
            <div className="cd-guide-card-icon">🍽</div>
            <div className="cd-guide-card-title">Where to Eat</div>
            <ul className="cd-guide-list">
              {city.guide.eat.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>

          {/* Transport */}
          <div className="cd-guide-card cd-guide-transport">
            <div>
              <div className="cd-guide-card-icon">🚇</div>
            </div>
            <div>
              <div className="cd-guide-card-title">Getting Around</div>
              <p className="cd-guide-card-body">{city.guide.transport}</p>
            </div>
          </div>

          {/* Tips */}
          <div className="cd-guide-card" style={{ gridColumn: '1 / -1' }}>
            <div className="cd-guide-card-icon">💡</div>
            <div className="cd-guide-card-title">Insider Tips</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.5rem' }}>
              {city.guide.tips.map((tip, i) => (
                <div key={i} className="cd-guide-tips">{tip}</div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Videos ── */}
        {city.videos.length > 0 && (
          <div ref={videoRef} style={{ maxWidth: '1152px', margin: '0 auto', padding: '5rem 3rem' }}>
            <div className="cd-section-label">Videos</div>
            {/* 使用 flex-wrap：竖屏视频宽320px，横屏视频全宽，不强制同行 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
              {city.videos.map((video, i) => (
                <VideoCard key={i} video={video} />
              ))}
            </div>
          </div>
        )}

        {/* ── Bottom nav ── */}
        <div className="cd-bottom-nav">
          <Link href="/" className="cd-bottom-back">← Back to all cities</Link>
          <span className="cd-bottom-city-name">{city.name} · {city.country}</span>
        </div>

      </div>
    </>
  )
}
