'use client'

import { useState, useTransition, useRef } from 'react'
import { saveHeroPolaroids } from '@/lib/actions/homepage'
import DeleteBtn from '@/components/admin/DeleteBtn'

interface Polaroid {
  id?: number; name: string; date: string; tag: string; img: string; color: string;
  x: number; y: number; rot: number; spd: number; float: string; delay: number; order: number
}

const iStyle = { background: '#1D1D1E', border: '1px solid #2B2B2D', color: 'rgba(255,255,255,0.85)' }

// 预设动画参数池（12 组），新增时循环取用，前台效果自然随机
// x: 10~75（百分比，避免超出屏幕），y: 15~75
const ANIM_PRESETS = [
  { x: 15, y: 48, rot:  8,  spd: 0.022, delay: 0.6, float: 'B' },
  { x: 28, y: 32, rot: -5,  spd: 0.019, delay: 0.2, float: 'A' },
  { x: 42, y: 55, rot: 11,  spd: 0.025, delay: 1.0, float: 'C' },
  { x: 60, y: 22, rot: -9,  spd: 0.018, delay: 0.4, float: 'A' },
  { x: 72, y: 62, rot:  4,  spd: 0.021, delay: 0.8, float: 'B' },
  { x: 20, y: 44, rot: -12, spd: 0.024, delay: 0.1, float: 'C' },
  { x: 50, y: 38, rot:  7,  spd: 0.020, delay: 1.2, float: 'A' },
  { x: 35, y: 68, rot: -3,  spd: 0.023, delay: 0.5, float: 'B' },
  { x: 65, y: 28, rot: 10,  spd: 0.017, delay: 0.9, float: 'C' },
  { x: 10, y: 58, rot: -7,  spd: 0.026, delay: 0.3, float: 'A' },
  { x: 55, y: 42, rot:  2,  spd: 0.022, delay: 1.4, float: 'B' },
  { x: 40, y: 25, rot: -10, spd: 0.020, delay: 0.7, float: 'C' },
]

function PolaroidRow({ it, i, onUpd, onRemove }: {
  it: Polaroid; i: number
  onUpd: (k: keyof Polaroid, v: string | number) => void
  onRemove: () => void
}) {
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.path) onUpd('img', data.path); else alert(data.error || '上传失败')
    setUploading(false)
  }

  return (
    <div className="rounded-xl overflow-hidden p-4" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

        {/* 左：图片上传区（1:1 比例） */}
        <div
          onClick={() => !uploading && fileRef.current?.click()}
          className="relative rounded-lg overflow-hidden cursor-pointer"
          style={{
            aspectRatio: '1/1',
            background: it.img ? 'transparent' : 'rgba(255,255,255,0.03)',
            border: it.img ? 'none' : '1.5px dashed rgba(255,255,255,0.12)',
          }}
        >
          {it.img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={it.img} alt={it.name} className="w-full h-full object-cover" />
          )}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center transition-opacity"
            style={{
              background: it.img ? 'rgba(0,0,0,0.65)' : 'transparent',
              opacity: uploading ? 1 : it.img ? 0 : 1,
            }}
            onMouseEnter={e => { if (it.img && !uploading) (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
            onMouseLeave={e => { if (it.img && !uploading) (e.currentTarget as HTMLDivElement).style.opacity = '0' }}
          >
            {uploading ? (
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>上传中…</span>
            ) : (
              <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round"/>
                </svg>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 6 }}>
                  {it.img ? '点击更换' : '点击上传'}
                </span>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }} />
        </div>

        {/* 右：字段竖排 + 序号/删除 */}
        <div className="flex flex-col justify-between">
          {/* 序号 + 删除 */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>#{i + 1}</span>
            <DeleteBtn onClick={onRemove} label="删除" size="xs" />
          </div>

          {/* 城市名 / 日期 / 国家 竖排 */}
          <div className="flex flex-col gap-3 flex-1">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>城市名</label>
              <input value={it.name} onChange={e => onUpd('name', e.target.value)} placeholder="如 Rome"
                className="w-full text-white text-sm rounded-lg px-3 py-2 focus:outline-none transition-colors" style={iStyle} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>日期</label>
              <input value={it.date} onChange={e => onUpd('date', e.target.value)} placeholder="2024.06"
                className="w-full text-white text-sm rounded-lg px-3 py-2 focus:outline-none transition-colors" style={iStyle} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>国家/标签</label>
              <input value={it.tag} onChange={e => onUpd('tag', e.target.value)} placeholder="Italy"
                className="w-full text-white text-sm rounded-lg px-3 py-2 focus:outline-none transition-colors" style={iStyle} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function HeroAdminClient({ initialPolaroids }: { initialPolaroids: Polaroid[] }) {
  const [items, setItems] = useState<Polaroid[]>(initialPolaroids)
  const [saved, setSaved] = useState(false)
  const [pending, startTransition] = useTransition()

  const add = () => setItems(p => {
    const preset = ANIM_PRESETS[p.length % ANIM_PRESETS.length]
    return [...p, { name: '', date: '', tag: '', img: '', color: '#1e1e2e', ...preset, order: p.length }]
  })
  const remove = (i: number) => setItems(p => p.filter((_, idx) => idx !== i))
  const upd = (i: number, k: keyof Polaroid, v: string | number) => setItems(p => p.map((it, idx) => idx === i ? { ...it, [k]: v } : it))

  const save = () => {
    startTransition(async () => {
      await saveHeroPolaroids(items.map((it, i) => ({ ...it, order: i })))
      setSaved(true); setTimeout(() => setSaved(false), 2000)
    })
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-medium text-white">拍立得</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>管理首页拍立得展示的照片（{items.length} 张）</p>
        </div>
        <button onClick={save} disabled={pending}
          className="text-sm font-medium px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          style={{ background: 'rgba(200,185,122,0.14)', color: '#c8b97a' }}>
          {pending ? '保存中...' : saved ? '✓ 已保存' : '保存全部'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((it, i) => (
          <PolaroidRow key={i} it={it} i={i}
            onUpd={(k, v) => upd(i, k, v)}
            onRemove={() => remove(i)}
          />
        ))}
      </div>

      <button onClick={add}
        className="mt-5 text-sm px-5 py-2.5 rounded-xl transition-colors"
        style={{ color: 'rgba(200,185,122,0.6)', background: 'rgba(200,185,122,0.06)' }}>
        + 添加拍立得
      </button>
    </div>
  )
}
