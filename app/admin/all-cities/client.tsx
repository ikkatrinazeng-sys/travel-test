'use client'

import { useTransition, useState } from 'react'
import { updateCityCover } from '@/lib/actions/city'

interface CityItem {
  id: number
  slug: string
  name: string
  country: string
  region: string
  coverPhoto: string
  coverThumb: string
}

function CoverRow({ city }: { city: CityItem }) {
  const [isPending, startTransition] = useTransition()
  const [coverPhoto, setCoverPhoto] = useState(city.coverPhoto)
  const [coverThumb, setCoverThumb] = useState(city.coverThumb)
  const [saved, setSaved] = useState(false)
  const [uploadingField, setUploadingField] = useState<string | null>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>, field: 'coverPhoto' | 'coverThumb') {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingField(field)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (json.url) {
        if (field === 'coverPhoto') setCoverPhoto(json.url)
        else setCoverThumb(json.url)
      }
    } finally {
      setUploadingField(null)
    }
  }

  function handleSave() {
    startTransition(async () => {
      await updateCityCover(city.id, city.slug, { coverPhoto, coverThumb })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    })
  }

  return (
    <div
      className="rounded-xl p-5"
      style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* 城市标题 */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1">
          <span className="text-white text-sm font-medium">{city.name}</span>
          <span className="text-zinc-500 text-sm ml-2">· {city.country}</span>
        </div>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs" style={{ color: '#c8b97a' }}>✓ 已保存</span>
          )}
          <button
            onClick={handleSave}
            disabled={isPending}
            className="text-xs px-4 py-1.5 rounded-lg transition-colors"
            style={{
              background: isPending ? 'rgba(200,185,122,0.06)' : 'rgba(200,185,122,0.14)',
              color: isPending ? 'rgba(200,185,122,0.4)' : '#c8b97a',
              cursor: isPending ? 'not-allowed' : 'pointer',
            }}
          >
            {isPending ? '保存中…' : '保存'}
          </button>
        </div>
      </div>

      {/* 封面图编辑 */}
      <div className="grid grid-cols-2 gap-5">
        {/* coverPhoto 大图 */}
        <div>
          <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>封面大图</p>
          <div
            className="relative rounded-lg overflow-hidden mb-2"
            style={{ height: 120, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {coverPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverPhoto} alt="cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                未设置
              </div>
            )}
            {uploadingField === 'coverPhoto' && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
                <span className="text-xs text-white">上传中…</span>
              </div>
            )}
          </div>
          <label className="flex items-center justify-center gap-1.5 text-xs rounded-md py-1.5 cursor-pointer transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            上传大图
            <input type="file" accept="image/*" className="hidden"
              onChange={e => handleUpload(e, 'coverPhoto')} disabled={!!uploadingField} />
          </label>
          {coverPhoto && (
            <input type="text" value={coverPhoto} onChange={e => setCoverPhoto(e.target.value)}
              className="mt-2 w-full text-xs rounded px-2 py-1.5 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
              placeholder="或直接粘贴图片 URL" />
          )}
        </div>

        {/* coverThumb 缩略图 */}
        <div>
          <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>封面缩略图</p>
          <div
            className="relative rounded-lg overflow-hidden mb-2"
            style={{ height: 120, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {coverThumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverThumb} alt="thumb" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
                未设置
              </div>
            )}
            {uploadingField === 'coverThumb' && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
                <span className="text-xs text-white">上传中…</span>
              </div>
            )}
          </div>
          <label className="flex items-center justify-center gap-1.5 text-xs rounded-md py-1.5 cursor-pointer transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            上传缩略图
            <input type="file" accept="image/*" className="hidden"
              onChange={e => handleUpload(e, 'coverThumb')} disabled={!!uploadingField} />
          </label>
          {coverThumb && (
            <input type="text" value={coverThumb} onChange={e => setCoverThumb(e.target.value)}
              className="mt-2 w-full text-xs rounded px-2 py-1.5 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}
              placeholder="或直接粘贴图片 URL" />
          )}
        </div>
      </div>
    </div>
  )
}

export default function AllCitiesAdminClient({ cities }: { cities: CityItem[] }) {
  const regionLabel: Record<string, string> = {
    europe: '欧洲',
    'east-asia': '东亚',
    'southeast-asia': '东南亚',
  }

  const grouped: Record<string, CityItem[]> = {
    europe: cities.filter(c => c.region === 'europe'),
    'east-asia': cities.filter(c => c.region === 'east-asia'),
    'southeast-asia': cities.filter(c => c.region === 'southeast-asia'),
  }

  return (
    <div className="space-y-10">
      {(Object.keys(grouped) as string[])
        .filter(r => grouped[r].length > 0)
        .map(region => (
          <section key={region}>
            <h2 className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.18em' }}>
              {regionLabel[region]}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {grouped[region].map(city => (
                <CoverRow key={city.slug} city={city} />
              ))}
            </div>
          </section>
        ))}
    </div>
  )
}
