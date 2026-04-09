'use client'

import { useState, useTransition, useRef } from 'react'
import { updatePhotos, updateVideos, deleteCity } from '@/lib/actions/city'
import DeleteBtn from '@/components/admin/DeleteBtn'

interface Photo { id?: number; src: string; caption: string; order: number }
interface Video { id?: number; title: string; embedUrl: string; thumbnail: string; order: number }

function UploadButton({
  onUploaded,
  accept = 'image/*',
  label = '📁 本地上传',
}: {
  onUploaded: (path: string) => void
  accept?: string
  label?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.path) {
        onUploaded(data.path)
      } else {
        alert(data.error || '上传失败')
      }
    } catch {
      alert('上传出错')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="shrink-0 text-xs rounded px-2 py-1 transition-colors disabled:opacity-50 whitespace-nowrap"
        style={{ background: 'rgba(200,185,122,0.08)', color: 'rgba(200,185,122,0.65)' }}
      >
        {uploading ? '上传中…' : label}
      </button>
    </>
  )
}

function PhotoCard({ photo, onSrcChange, onCaptionChange, onRemove }: {
  photo: Photo
  onSrcChange: (src: string) => void
  onCaptionChange: (caption: string) => void
  onRemove: () => void
}) {
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.path) onSrcChange(data.path); else alert(data.error || '上传失败')
    } catch { alert('上传出错') }
    finally { setUploading(false) }
  }

  return (
    <div className="rounded-xl overflow-hidden p-3 space-y-2" style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* 缩略图点击上传 */}
      <div
        onClick={() => !uploading && fileRef.current?.click()}
        className="relative rounded-lg overflow-hidden cursor-pointer"
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
        <div
          className="absolute inset-0 flex flex-col items-center justify-center transition-opacity"
          style={{
            background: photo.src ? 'rgba(0,0,0,0.55)' : 'transparent',
            opacity: uploading ? 1 : photo.src ? 0 : 1,
          }}
          onMouseEnter={e => { if (photo.src && !uploading) (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
          onMouseLeave={e => { if (photo.src && !uploading) (e.currentTarget as HTMLDivElement).style.opacity = '0' }}
        >
          {uploading ? (
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>上传中…</span>
          ) : (
            <>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round"/>
              </svg>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 6 }}>
                {photo.src ? '点击更换' : '点击上传'}
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
          placeholder="图片说明"
          className="flex-1 text-white text-sm rounded px-3 py-2 focus:outline-none transition-colors"
          style={{ background: 'rgb(29,29,30)', border: '1px solid rgb(43,43,45)' }}
        />
        <DeleteBtn onClick={onRemove} size="sm" />
      </div>
    </div>
  )
}

export function PhotosEditor({ cityId, slug, initialPhotos }: { cityId: number; slug: string; initialPhotos: Photo[] }) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos)
  const [saved, setSaved] = useState(false)
  const [pending, startTransition] = useTransition()

  const add = () => setPhotos(p => [...p, { src: '', caption: '', order: p.length }])
  const remove = (i: number) => setPhotos(p => p.filter((_, idx) => idx !== i))
  const update = (i: number, key: keyof Photo, val: string) =>
    setPhotos(p => p.map((ph, idx) => idx === i ? { ...ph, [key]: val } : ph))

  const save = () => {
    startTransition(async () => {
      await updatePhotos(cityId, slug, photos.map((p, i) => ({ src: p.src, caption: p.caption, order: i })))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    })
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {photos.map((p, i) => (
          <PhotoCard
            key={i}
            photo={p}
            onSrcChange={src => update(i, 'src', src)}
            onCaptionChange={caption => update(i, 'caption', caption)}
            onRemove={() => remove(i)}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={add} className="text-sm rounded-lg px-4 py-2 transition-colors"
          style={{ color: 'rgba(200,185,122,0.55)', background: 'rgba(200,185,122,0.06)' }}>
          + 添加照片
        </button>
        <button onClick={save} disabled={pending} className="text-sm rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
          style={{ background: 'rgba(200,185,122,0.14)', color: '#c8b97a' }}>
          {pending ? '保存中...' : saved ? '✓ 已保存' : '保存照片'}
        </button>
      </div>
    </div>
  )
}

export function VideosEditor({ cityId, slug, initialVideos }: { cityId: number; slug: string; initialVideos: Video[] }) {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [saved, setSaved] = useState(false)
  const [pending, startTransition] = useTransition()

  const add = () => setVideos(v => [...v, { title: '', embedUrl: '', thumbnail: '', order: v.length }])
  const remove = (i: number) => setVideos(v => v.filter((_, idx) => idx !== i))
  const update = (i: number, key: keyof Video, val: string) =>
    setVideos(v => v.map((vd, idx) => idx === i ? { ...vd, [key]: val } : vd))

  const save = () => {
    startTransition(async () => {
      await updateVideos(cityId, slug, videos.map((v, i) => ({ title: v.title, embedUrl: v.embedUrl, thumbnail: v.thumbnail, order: i })))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    })
  }

  return (
    <div className="space-y-3">
      {videos.map((v, i) => (
        <div key={i} className="rounded-lg p-3 space-y-2" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
          {/* 标题 */}
          <input value={v.title} onChange={e => update(i, 'title', e.target.value)} placeholder="视频标题"
            className="w-full text-white text-sm rounded px-3 py-2 focus:outline-none transition-colors"
            style={{ background: 'rgb(29,29,30)', border: '1px solid rgb(43,43,45)' }} />

          {/* 视频地址行：本地上传 或 填写 Embed URL */}
          <div className="flex gap-2 items-center">
            <input value={v.embedUrl} onChange={e => update(i, 'embedUrl', e.target.value)}
              placeholder="Embed URL 或本地视频路径（/uploads/xxx.mp4）"
              className="flex-1 text-white text-sm rounded px-3 py-2 focus:outline-none transition-colors"
              style={{ background: 'rgb(29,29,30)', border: '1px solid rgb(43,43,45)' }} />
            <UploadButton accept="video/*" label="📹 上传视频" onUploaded={path => update(i, 'embedUrl', path)} />
            <DeleteBtn onClick={() => remove(i)} size="sm" />
          </div>

          {/* 本地视频预览（以 / 开头则为本地文件） */}
          {v.embedUrl && v.embedUrl.startsWith('/') && (
            <video
              src={v.embedUrl}
              controls
              style={{ maxHeight: '180px', width: 'auto', display: 'block' }}
              className="rounded bg-black"
            />
          )}

          {/* 缩略图行 */}
          <div className="flex gap-2 items-center">
            <input value={v.thumbnail} onChange={e => update(i, 'thumbnail', e.target.value)} placeholder="缩略图路径（可选）"
              className="flex-1 text-white text-sm rounded px-3 py-2 focus:outline-none transition-colors"
              style={{ background: 'rgb(29,29,30)', border: '1px solid rgb(43,43,45)' }} />
            <UploadButton accept="image/*" label="🖼 上传缩略图" onUploaded={path => update(i, 'thumbnail', path)} />
          </div>

          {/* 缩略图预览 */}
          {v.thumbnail && (
            <div className="rounded overflow-hidden bg-zinc-800 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.thumbnail}
                alt="缩略图预览"
                style={{ maxHeight: '120px', width: 'auto', display: 'block' }}
              />
            </div>
          )}
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="text-sm rounded-lg px-4 py-2 transition-colors"
          style={{ color: 'rgba(200,185,122,0.55)', background: 'rgba(200,185,122,0.06)' }}>
          + 添加视频
        </button>
        <button onClick={save} disabled={pending} className="text-sm rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
          style={{ background: 'rgba(200,185,122,0.14)', color: '#c8b97a' }}>
          {pending ? '保存中...' : saved ? '✓ 已保存' : '保存视频'}
        </button>
      </div>
    </div>
  )
}

export function DeleteButton({ cityId, cityName }: { cityId: number; cityName: string }) {
  const [pending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm(`确定要删除「${cityName}」吗？此操作不可撤销。`)) return
    startTransition(async () => {
      await deleteCity(cityId)
    })
  }

  return (
    <DeleteBtn onClick={handleDelete} disabled={pending} label={pending ? '删除中...' : '删除此城市'} />
  )
}

// 封面图上传组件（用于编辑页 form hidden input）
export function CoverUploader({ name, defaultValue, label }: { name: string; defaultValue: string; label: string }) {
  const [path, setPath] = useState(defaultValue)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setUploading(true)
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.path) setPath(data.path); else alert(data.error || '上传失败')
    setUploading(false)
  }

  return (
    <div>
      <label className="block text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</label>
      <input type="hidden" name={name} value={path} />
      <div className="flex gap-2 items-center">
        <input
          value={path}
          onChange={e => setPath(e.target.value)}
          placeholder="/uploads/xxx.jpg 或手填路径"
          className="flex-1 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none transition-colors"
          style={{ background: 'rgb(29,29,30)', border: '1px solid rgb(43,43,45)', color: 'rgba(255,255,255,0.85)' }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="shrink-0 text-xs rounded-lg px-3 py-2.5 transition-colors disabled:opacity-50 whitespace-nowrap"
          style={{ background: 'rgba(200,185,122,0.08)', color: 'rgba(200,185,122,0.65)' }}
        >
          {uploading ? '上传中…' : '📁 上传'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = '' }} />
      </div>
      {path && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={path} alt="封面预览" className="mt-2 rounded-lg object-cover" style={{ height: 80, width: 'auto' }} />
      )}
    </div>
  )
}
