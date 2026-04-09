'use client'

import { useState, useTransition, useRef } from 'react'
import { saveRecentUpdates } from '@/lib/actions/homepage'
import DeleteBtn from '@/components/admin/DeleteBtn'

interface Item {
  id?: number; type: string; title: string; excerpt: string; city: string; citySlug: string; bg: string; order: number
}

const inputStyle = { background: 'rgb(29,29,30)', border: '1px solid rgb(43,43,45)', color: 'rgba(255,255,255,0.85)' }

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</label>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none transition-colors"
        style={inputStyle}
      />
    </div>
  )
}

function ImageUploader({ bg, onChange }: { bg: string; onChange: (bg: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const imgPath = bg ? bg.replace(/^url\((.+?)\).*$/, '$1') : ''

  async function handleFile(file: File) {
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.path) {
        onChange(`url(${data.path}) center/cover no-repeat`)
      } else {
        setError(data.error || '上传失败')
      }
    } catch {
      setError('上传失败')
    } finally {
      setUploading(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) handleFile(file)
  }

  return (
    <div style={{ padding: '10px' }}>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>背景图片</label>
        {imgPath && (
          <DeleteBtn onClick={() => onChange('')} label="删除图片" size="xs" />
        )}
      </div>

      {/* 预览区 / 上传区 — 4:3 比例匹配前台 */}
      <div
        onClick={() => !uploading && fileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        className="relative rounded-xl overflow-hidden cursor-pointer group"
        style={{
          aspectRatio: '4/3',
          background: bg || 'rgba(255,255,255,0.03)',
          border: bg ? 'none' : '1.5px dashed rgba(255,255,255,0.12)',
        }}
      >
        {/* 遮罩 hover 提示 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-opacity"
          style={{
            background: bg ? 'rgba(0,0,0,0.45)' : 'transparent',
            opacity: uploading ? 1 : bg ? 0 : 1,
          }}
          onMouseEnter={e => { if (bg && !uploading) (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
          onMouseLeave={e => { if (bg && !uploading) (e.currentTarget as HTMLDivElement).style.opacity = '0' }}
        >
          {uploading ? (
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>上传中…</div>
          ) : (
            <>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round"/>
              </svg>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 8 }}>
                {bg ? '点击更换图片' : '点击上传或拖入图片'}
              </span>
            </>
          )}
        </div>
      </div>

      {error && <p className="mt-1.5 text-xs" style={{ color: 'rgba(239,100,100,0.8)' }}>{error}</p>}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }}
      />
    </div>
  )
}

export default function RecentUpdatesAdminClient({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState<Item[]>(initialItems)
  const [saved, setSaved] = useState(false)
  const [pending, startTransition] = useTransition()

  const add = () => setItems(p => [...p, { type: '', title: '', excerpt: '', city: '', citySlug: '', bg: '', order: p.length }])
  const remove = (i: number) => setItems(p => p.filter((_, idx) => idx !== i))
  const upd = (i: number, k: keyof Item, v: string) => setItems(p => p.map((it, idx) => idx === i ? { ...it, [k]: v } : it))

  const save = () => {
    startTransition(async () => {
      await saveRecentUpdates(items.map((it, i) => ({ ...it, order: i })))
      setSaved(true); setTimeout(() => setSaved(false), 2000)
    })
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-xl font-medium text-white">最近更新</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>管理首页滑动卡片内容（{items.length} 条）</p>
        </div>
        <button onClick={save} disabled={pending}
          className="text-sm font-medium px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
          style={{ background: 'rgba(200,185,122,0.14)', color: '#c8b97a' }}>
          {pending ? '保存中...' : saved ? '✓ 已保存' : '保存全部'}
        </button>
      </div>

      <div className="space-y-5">
        {items.map((it, i) => (
          <div key={i} className="rounded-2xl p-6" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex justify-between items-center mb-5">
              <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.18em' }}>
                卡片 {i + 1}
              </span>
              <DeleteBtn onClick={() => remove(i)} label="删除卡片" size="xs" />
            </div>

            {/* 左右两栏 — 比例与前台一致：左55% 图片，右45% 字段 */}
            <div style={{ display: 'grid', gridTemplateColumns: '55% 1fr', gap: '1.25rem' }}>
              {/* 左：图片上传 */}
              <ImageUploader bg={it.bg} onChange={v => upd(i, 'bg', v)} />

              {/* 右：文字字段 */}
              <div className="flex flex-col gap-3">
                <Field label="类型标签" value={it.type} onChange={v => upd(i, 'type', v)} placeholder="旅行故事 · 法国" />
                <Field label="城市显示名" value={it.city} onChange={v => upd(i, 'city', v)} placeholder="法国 博讷 · 2025" />
                <Field label="城市 Slug（链接）" value={it.citySlug} onChange={v => upd(i, 'citySlug', v)} placeholder="beaune" />
                <Field label="标题" value={it.title} onChange={v => upd(i, 'title', v)} placeholder="文章标题" />
                <div className="flex-1 flex flex-col">
                  <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>摘要</label>
                  <textarea
                    value={it.excerpt}
                    onChange={e => upd(i, 'excerpt', e.target.value)}
                    placeholder="文章摘要..."
                    className="flex-1 w-full text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none resize-none transition-colors"
                    style={{ ...inputStyle, minHeight: 80 }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={add}
        className="mt-6 text-sm px-5 py-2.5 rounded-xl transition-colors"
        style={{ color: 'rgba(200,185,122,0.6)', background: 'rgba(200,185,122,0.06)' }}>
        + 添加卡片
      </button>
    </div>
  )
}
