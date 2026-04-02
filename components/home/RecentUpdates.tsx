'use client'

import { useState } from 'react'
import Link from 'next/link'

const ITEMS = [
  {
    type: 'Travel Story · France',
    title: 'A Lazy Afternoon in a Beaune Wine Cellar',
    excerpt: 'Autumn in Burgundy is quieter than expected. Forty minutes from Dijon, vineyards stretch on both sides of the road — each small town along the way feels like time forgot to move on.',
    city: 'Beaune, France · 2024',
    citySlug: 'beaune',
    bg: 'linear-gradient(135deg,#1a2535,#2c3a28)',
  },
  {
    type: 'Photography · Japan',
    title: 'Arashiyama at Dawn — When the Light Was Just Right',
    excerpt: 'Six-thirty in the morning, before the crowds arrived. Light filtered through the bamboo in broken shards, and each footstep echoed louder than expected — as if stepping into another world.',
    city: 'Kyoto, Japan · 2024',
    citySlug: 'kyoto',
    bg: 'linear-gradient(135deg,#1e2a1e,#2a3822)',
  },
  {
    type: 'Guide · Thailand',
    title: 'The Complete Café Map of Chiang Mai Old City',
    excerpt: 'Two weeks in, I walked every corner of the old city looking for cafés. A few were hidden beside ancient temples — easy to miss if you weren\'t paying attention.',
    city: 'Chiang Mai, Thailand · 2023',
    citySlug: 'chiang-mai',
    bg: 'linear-gradient(135deg,#251828,#1a1e35)',
  },
]

export default function RecentUpdates() {
  const [idx, setIdx] = useState(0)
  const total = ITEMS.length

  const go = (i: number) => setIdx((i + total) % total)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

        .ru-wrap { background: #0e1c10; color: #fff; font-family: 'Playfair Display', Georgia, serif; overflow: hidden; }

        .ru-label { font-family: system-ui, sans-serif; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.4); padding: 3rem 3rem 1.5rem; border-top: 0.5px solid rgba(255,255,255,.1); }

        .ru-track-wrap { overflow: hidden; }
        .ru-track { display: flex; transition: transform .6s cubic-bezier(.77,0,.175,1); }
        .ru-item { min-width: 100%; display: grid; grid-template-columns: 55% 45%; height: 480px; }

        .ru-img { overflow: hidden; position: relative; }
        .ru-img-inner { width: 115%; height: 115%; position: absolute; top: -7.5%; left: -7.5%; transition: transform .6s cubic-bezier(.25,.46,.45,.94); }
        .ru-item:hover .ru-img-inner { transform: translate(2%, 1%); }
        .ru-img-color { width: 100%; height: 100%; }

        .ru-body { padding: 2.5rem; display: flex; flex-direction: column; justify-content: space-between; border-left: 0.5px solid rgba(255,255,255,.12); }
        .ru-type { font-family: system-ui, sans-serif; font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.4); }
        .ru-title { font-size: 28px; line-height: 1.25; font-weight: 400; color: #fff; margin: 1rem 0; }
        .ru-excerpt { font-family: system-ui, sans-serif; font-size: 13px; line-height: 1.7; color: rgba(255,255,255,.5); }
        .ru-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem; }
        .ru-city { font-family: system-ui, sans-serif; font-size: 12px; color: rgba(255,255,255,.4); }

        .ru-arrow { width: 36px; height: 36px; border: 0.5px solid rgba(255,255,255,.25); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background .2s; flex-shrink: 0; background: none; }
        .ru-arrow:hover { background: rgba(255,255,255,.1); }
        .ru-arrow svg { width: 14px; height: 14px; stroke: #fff; fill: none; stroke-width: 1.5; }

        .ru-nav { display: flex; align-items: center; gap: 16px; padding: 1.25rem 3rem; border-top: 0.5px solid rgba(255,255,255,.08); }
        .ru-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,.25); cursor: pointer; transition: all .3s; flex-shrink: 0; border: none; padding: 0; }
        .ru-dot.on { background: #c8b97a; width: 18px; border-radius: 3px; }
        .ru-nav-btn { font-family: system-ui, sans-serif; font-size: 12px; color: rgba(255,255,255,.4); cursor: pointer; letter-spacing: .05em; transition: color .2s; background: none; border: none; }
        .ru-nav-btn:hover { color: #fff; }
        .ru-counter { font-family: system-ui, sans-serif; font-size: 12px; color: rgba(255,255,255,.3); margin-left: auto; }
      `}</style>

      <div className="ru-wrap">
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          <p className="ru-label">Recent Updates</p>

          <div className="ru-track-wrap">
            <div className="ru-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
              {ITEMS.map((item, i) => (
                <div className="ru-item" key={i}>
                  {/* 左：图片 */}
                  <div className="ru-img">
                    <div className="ru-img-inner">
                      <div className="ru-img-color" style={{ background: item.bg }} />
                    </div>
                  </div>

                  {/* 右：内容 */}
                  <div className="ru-body">
                    <div>
                      <p className="ru-type">{item.type}</p>
                      <h2 className="ru-title">{item.title}</h2>
                      <p className="ru-excerpt">{item.excerpt}</p>
                    </div>
                    <div className="ru-footer">
                      <span className="ru-city">{item.city}</span>
                      <Link href={`/cities/${item.citySlug}`}>
                        <button className="ru-arrow" onClick={() => go(idx + 1)}>
                          <svg viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="ru-nav">
            <button className="ru-nav-btn" onClick={() => go(idx - 1)}>← Prev</button>
            {ITEMS.map((_, i) => (
              <button
                key={i}
                className={`ru-dot${i === idx ? ' on' : ''}`}
                onClick={() => go(i)}
              />
            ))}
            <button className="ru-nav-btn" onClick={() => go(idx + 1)}>Next →</button>
            <span className="ru-counter">{idx + 1} / {total}</span>
          </div>
        </div>
      </div>
    </>
  )
}
