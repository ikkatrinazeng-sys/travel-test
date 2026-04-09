'use client'

import { useState } from 'react'
import Link from 'next/link'

interface RecentItem {
  id: number
  type: string
  title: string
  excerpt: string
  city: string
  citySlug: string
  bg: string
  order: number
}

export default function RecentUpdates({ items }: { items: RecentItem[] }) {
  const [idx, setIdx] = useState(0)
  const total = items.length

  const go = (i: number) => setIdx((i + total) % total)

  if (total === 0) return null

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

        .ru-wrap { background: #0e1c10; color: #fff; font-family: 'Playfair Display', Georgia, serif; overflow: hidden; }

        .ru-label { font-family: system-ui, sans-serif; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.4); padding: 3rem 0 1.5rem; border-top: 0.5px solid rgba(255,255,255,.1); }

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

        .ru-nav { display: flex; align-items: center; gap: 16px; padding: 1.25rem 0; border-top: 0.5px solid rgba(255,255,255,.08); }
        .ru-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,.25); cursor: pointer; transition: all .3s; flex-shrink: 0; border: none; padding: 0; }
        .ru-dot.on { background: #c8b97a; width: 18px; border-radius: 3px; }
        .ru-nav-btn { font-family: system-ui, sans-serif; font-size: 12px; color: rgba(255,255,255,.4); cursor: pointer; letter-spacing: .05em; transition: color .2s; background: none; border: none; }
        .ru-nav-btn:hover { color: #fff; }
        .ru-counter { font-family: system-ui, sans-serif; font-size: 12px; color: rgba(255,255,255,.3); margin-left: auto; }
      `}</style>

      <div className="ru-wrap">
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
          <p className="ru-label">最近更新</p>

          <div className="ru-track-wrap">
            <div className="ru-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
              {items.map((item, i) => (
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
                      <Link href={`/cities/${item.citySlug}`} className="ru-arrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="#fff" fill="none" strokeWidth="1.5">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="ru-nav">
            <button className="ru-nav-btn" onClick={() => go(idx - 1)}>← 上一篇</button>
            {items.map((_, i) => (
              <button
                key={i}
                className={`ru-dot${i === idx ? ' on' : ''}`}
                onClick={() => go(i)}
              />
            ))}
            <button className="ru-nav-btn" onClick={() => go(idx + 1)}>下一篇 →</button>
            <span className="ru-counter">{idx + 1} / {total}</span>
          </div>
        </div>
      </div>
    </>
  )
}
