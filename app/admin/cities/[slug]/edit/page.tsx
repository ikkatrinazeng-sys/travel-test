import { getCityBySlug } from '@/lib/actions/city'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { updateCity } from '@/lib/actions/city'
import { PhotosEditor, VideosEditor, DeleteButton, CoverUploader } from '@/components/admin/CityEditorWidgets'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ saved?: string }>
}

export default async function EditCityPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { saved } = await searchParams
  const city = await getCityBySlug(slug)
  if (!city) notFound()

  const stayArr: string[] = JSON.parse(city.guide?.stay || '[]')
  const eatArr: string[] = JSON.parse(city.guide?.eat || '[]')
  const tipsArr: string[] = JSON.parse(city.guide?.tips || '[]')

  return (
    <div className="w-full">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-sm mb-10" style={{ color: 'rgba(255,255,255,0.3)' }}>
        <Link href="/admin" className="hover:text-white transition-colors">城市管理</Link>
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>{city.name}</span>
        <span style={{ color: 'rgba(255,255,255,0.15)' }}>/</span>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>编辑</span>
      </div>

      {saved && (
        <div className="mb-8 rounded-xl px-5 py-3.5 text-sm" style={{ background: 'rgba(200,185,122,0.08)', border: '1px solid rgba(200,185,122,0.25)', color: '#c8b97a' }}>
          ✓ 保存成功
        </div>
      )}

      {/* 基础信息 */}
      <form action={updateCity}>
        <input type="hidden" name="id" value={city.id} />

        <Section label="基础信息">
          <div className="grid grid-cols-2 gap-5">
            <Field label="城市名称" name="name" defaultValue={city.name} required />
            <Field label="Slug（URL）" name="slug" defaultValue={city.slug} required />
            <Field label="国家" name="country" defaultValue={city.country} required />
            <div>
              <label className="block text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>地区</label>
              <select name="region" defaultValue={city.region} className="w-full text-white text-sm rounded-lg px-3 py-2 focus:outline-none transition-colors" style={{ background: 'rgb(29,29,30)', border: '1px solid rgb(43,43,45)', color: 'rgba(255,255,255,0.85)' }}>
                <option value="europe">欧洲</option>
                <option value="east-asia">东亚</option>
                <option value="southeast-asia">东南亚</option>
              </select>
            </div>
            <Field label="年份" name="year" type="number" defaultValue={String(city.year)} required />
            <Field label="主题色（如 #c8b97a）" name="coverColor" defaultValue={city.coverColor} required />
          </div>
          <div className="mt-5">
            <Field label="简介" name="summary" defaultValue={city.summary} required />
          </div>
          <div className="mt-5">
            <Field label="Hero 引言（可选）" name="heroQuote" defaultValue={city.heroQuote ?? ''} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-5">
            <CoverUploader name="coverPhoto" defaultValue={city.coverPhoto ?? ''} label="封面大图（coverPhoto）" />
            <CoverUploader name="coverThumb" defaultValue={city.coverThumb ?? ''} label="封面缩略图（coverThumb）" />
          </div>
        </Section>

        <Section label="旅行攻略">
          <div className="space-y-5">
            <Textarea label="住宿推荐（每行一条）" name="stay" defaultValue={stayArr.join('\n')} rows={3} />
            <Textarea label="餐饮推荐（每行一条）" name="eat" defaultValue={eatArr.join('\n')} rows={3} />
            <Field label="交通方式" name="transport" defaultValue={city.guide?.transport ?? ''} />
            <Textarea label="实用贴士（每行一条）" name="tips" defaultValue={tipsArr.join('\n')} rows={3} />
          </div>
        </Section>

        <Section label="城市故事">
          <div className="space-y-5">
            <Field label="标题" name="storyTitle" defaultValue={city.story?.title ?? ''} />
            <Field label="日期（如 2025-01）" name="storyDate" defaultValue={city.story?.date ?? ''} />
            <Textarea label="正文" name="storyContent" defaultValue={city.story?.content ?? ''} rows={12} />
          </div>
        </Section>

        <div className="flex items-center gap-5 mb-14">
          <button type="submit" className="text-sm font-medium px-7 py-2.5 rounded-lg transition-colors" style={{ background: 'rgba(200,185,122,0.14)', color: '#c8b97a' }}>
            保存更改
          </button>
          <Link href={`/cities/${city.slug}`} target="_blank" className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>
            预览页面 ↗
          </Link>
          <Link href="/admin" className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.3)' }}>
            ← 返回列表
          </Link>
        </div>
      </form>

      {/* 照片管理 */}
      <Section label={`照片管理（${city.photos.length} 张）`}>
        <PhotosEditor
          cityId={city.id}
          slug={city.slug}
          initialPhotos={city.photos.map((p: { id: number; src: string; caption: string | null; order: number }) => ({ id: p.id, src: p.src, caption: p.caption ?? '', order: p.order }))}
        />
      </Section>

      {/* 视频管理 */}
      <Section label={`视频管理（${city.videos.length} 个）`}>
        <VideosEditor
          cityId={city.id}
          slug={city.slug}
          initialVideos={city.videos.map((v: { id: number; title: string; embedUrl: string; thumbnail: string; order: number }) => ({ id: v.id, title: v.title, embedUrl: v.embedUrl, thumbnail: v.thumbnail, order: v.order }))}
        />
      </Section>

      {/* 危险操作 */}
      <div className="mt-6 pt-10" style={{ borderTop: '1px solid rgba(200,185,122,0.1)' }}>
        <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(200,185,122,0.35)', letterSpacing: '0.2em' }}>危险操作</p>
        <DeleteButton cityId={city.id} cityName={city.name} />
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <p className="text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.18em' }}>{label}</p>
      <div className="rounded-2xl p-7" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
        {children}
      </div>
    </section>
  )
}

function Field({ label, name, defaultValue, required, type = 'text' }: {
  label: string; name: string; defaultValue: string; required?: boolean; type?: string
}) {
  return (
    <div>
      <label className="block text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {label}{required && <span className="ml-0.5" style={{ color: '#f87171' }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none transition-colors"
        style={{ background: 'rgb(29,29,30)', border: '1px solid rgb(43,43,45)', color: 'rgba(255,255,255,0.85)' }}
      />
    </div>
  )
}

function Textarea({ label, name, defaultValue, rows = 4 }: {
  label: string; name: string; defaultValue: string; rows?: number
}) {
  return (
    <div>
      <label className="block text-xs mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="w-full text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none transition-colors resize-y"
        style={{ background: 'rgb(29,29,30)', border: '1px solid rgb(43,43,45)', color: 'rgba(255,255,255,0.85)' }}
      />
    </div>
  )
}
