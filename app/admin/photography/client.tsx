'use client'

import { useState, useTransition, useRef } from 'react'
import { savePhotographyCity, deletePhotographyCity } from '@/lib/actions/homepage'
import DeleteBtn from '@/components/admin/DeleteBtn'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

interface Photo { id?: number; src: string; caption: string; order: number }
interface City { id?: number; city: string; country: string; slug: string; order: number; photos: Photo[] }

const inputStyle = { background: 'rgb(29,29,30)', border: '1px solid rgb(43,43,45)', color: 'rgba(255,255,255,0.85)' }

function PhotoCard({
  photo,
  onSrcChange,
  onCaptionChange,
  onRemove,
}: {
  photo: Photo
  onSrcChange: (src: string) => void
  onCaptionChange: (caption: string) => void
  onRemove: () => void
}) {
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.path) onSrcChange(data.path); else alert(data.error || '上传失败')
    setUploading(false)
  }

  return (
    <div className="rounded-xl p-4 space-y-3" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* 图片预览 / 点击上传 */}
      <div
        onClick={() => !uploading && fileRef.current?.click()}
        className="relative rounded-lg overflow-hidden cursor-pointer group"
        style={{
          aspectRatio: '4/3',
          background: photo.src ? 'transparent' : 'rgba(255,255,255,0.03)',
          border: photo.src ? 'none' : '1.5px dashed rgba(255,255,255,0.12)',
        }}
      >
        {photo.src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
        )}
        {/* hover 遮罩 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-opacity"
          style={{
            background: photo.src ? 'rgba(0,0,0,0.45)' : 'transparent',
            opacity: uploading ? 1 : photo.src ? 0 : 1,
          }}
          onMouseEnter={e => { if (photo.src && !uploading) (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
          onMouseLeave={e => { if (photo.src && !uploading) (e.currentTarget as HTMLDivElement).style.opacity = '0' }}
        >
          {uploading ? (
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>上传中…</span>
          ) : (
            <>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round"/>
              </svg>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 6 }}>
                {photo.src ? '点击更换图片' : '点击上传图片'}
              </span>
            </>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }} />
      </div>

      {/* caption + 删除 */}
      <div className="flex gap-2 items-center">
        <input
          value={photo.caption}
          onChange={e => onCaptionChange(e.target.value)}
          placeholder="图片说明（可选）"
          className="flex-1 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none transition-colors"
          style={inputStyle}
        />
        <DeleteBtn onClick={onRemove} size="sm" />
      </div>
    </div>
  )
}

function CityEditor({ city, onSaved, onDeleted }: {
  city: City
  onSaved: (updated: City) => void
  onDeleted: () => void
}) {
  const [data, setData] = useState(city)
  const [saved, setSaved] = useState(false)
  const [pending, startTransition] = useTransition()
  const [open, setOpen] = useState(!city.id)

  const updCity = (k: keyof City, v: string) => setData(d => ({ ...d, [k]: v }))
  const addPhoto = () => setData(d => ({ ...d, photos: [...d.photos, { src: '', caption: '', order: d.photos.length }] }))
  const removePhoto = (i: number) => setData(d => ({ ...d, photos: d.photos.filter((_, idx) => idx !== i) }))
  const updPhoto = (i: number, k: keyof Photo, v: string) =>
    setData(d => ({ ...d, photos: d.photos.map((p, idx) => idx === i ? { ...p, [k]: v } : p) }))

  const save = () => {
    startTransition(async () => {
      await savePhotographyCity(
        data.id ?? null,
        { city: data.city, country: data.country, slug: data.slug, order: data.order },
        data.photos.map((p, i) => ({ src: p.src, caption: p.caption, order: i }))
      )
      setSaved(true); setTimeout(() => setSaved(false), 2000)
      onSaved(data)
    })
  }

  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleDelete = () => {
    if (!data.id) { onDeleted(); return }
    setConfirmOpen(true)
  }

  const handleConfirmDelete = () => {
    setConfirmOpen(false)
    startTransition(async () => {
      await deletePhotographyCity(data.id!)
      onDeleted()
    })
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* 头部折叠 */}
      <div
        className="flex items-center justify-between px-6 py-4 cursor-pointer select-none"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-4">
          <span className="text-white text-sm font-medium">{data.city || '（新城市组）'}</span>
          {data.country && <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{data.country}</span>}
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}>
            {data.photos.length} 张
          </span>
        </div>
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div className="px-6 pb-6 space-y-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {/* 城市基础信息 */}
          <div className="pt-5 grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>城市名</label>
              <input value={data.city} onChange={e => updCity('city', e.target.value)} placeholder="如 Paris"
                className="w-full text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none transition-colors"
                style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>国家</label>
              <input value={data.country} onChange={e => updCity('country', e.target.value)} placeholder="如 France"
                className="w-full text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none transition-colors"
                style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Slug</label>
              <input value={data.slug} onChange={e => updCity('slug', e.target.value)} placeholder="如 paris"
                className="w-full text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none transition-colors"
                style={inputStyle} />
            </div>
          </div>

          {/* 照片列表 */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.18em' }}>照片列表</p>
            <div className="grid grid-cols-3 gap-4">
              {data.photos.map((p, pi) => (
                <PhotoCard
                  key={pi}
                  photo={p}
                  onSrcChange={src => updPhoto(pi, 'src', src)}
                  onCaptionChange={caption => updPhoto(pi, 'caption', caption)}
                  onRemove={() => removePhoto(pi)}
                />
              ))}
            </div>
            <button onClick={addPhoto}
              className="mt-4 text-xs px-4 py-2 rounded-lg transition-colors"
              style={{ color: 'rgba(200,185,122,0.55)', background: 'rgba(200,185,122,0.06)' }}>
              + 添加照片
            </button>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button onClick={save} disabled={pending}
              className="text-sm font-medium px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              style={{ background: 'rgba(200,185,122,0.14)', color: '#c8b97a' }}>
              {pending ? '保存中...' : saved ? '✓ 已保存' : '保存'}
            </button>
            <DeleteBtn onClick={handleDelete} disabled={pending} label="删除城市组" />
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        message={`确定删除「${data.city}」摄影组？`}
        confirmText="删除"
        cancelText="取消"
        danger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  )
}

export default function PhotographyAdminClient({ initialCities }: { initialCities: City[] }) {
  const [cities, setCities] = useState<City[]>(initialCities)

  const addCity = () => setCities(c => [...c, { city: '', country: '', slug: '', order: c.length, photos: [] }])
  const removeCity = (i: number) => setCities(c => c.filter((_, idx) => idx !== i))
  const updateCity = (i: number, updated: City) => setCities(c => c.map((it, idx) => idx === i ? updated : it))

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-xl font-medium text-white">摄影页管理</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>管理摄影页的城市组和照片（{cities.length} 个城市）</p>
        </div>
        <button onClick={addCity}
          className="text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          style={{ background: 'rgba(200,185,122,0.14)', color: '#c8b97a' }}>
          + 新增城市组
        </button>
      </div>

      <div className="space-y-4">
        {cities.map((city, i) => (
          <CityEditor
            key={city.id ?? `new-${i}`}
            city={city}
            onSaved={updated => updateCity(i, updated)}
            onDeleted={() => removeCity(i)}
          />
        ))}
      </div>

      {cities.length === 0 && (
        <div className="text-center py-20 text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
          暂无摄影城市组，点击上方按钮新增
        </div>
      )}
    </div>
  )
}
