'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

// ─── 查询 ────────────────────────────────────────────────

// 首页 AllCities 组件专用（只取必要字段）
export async function getCitiesForHome() {
  return prisma.city.findMany({
    select: { slug: true, name: true, country: true, region: true, coords: true, coverPhoto: true, coverThumb: true },
    orderBy: { id: 'asc' },
  })
}

export async function getCities() {
  return prisma.city.findMany({
    include: { photos: { orderBy: { order: 'asc' } }, videos: { orderBy: { order: 'asc' } }, guide: true, story: true },
    orderBy: { id: 'asc' },
  })
}

export async function getCityBySlug(slug: string) {
  return prisma.city.findUnique({
    where: { slug },
    include: { photos: { orderBy: { order: 'asc' } }, videos: { orderBy: { order: 'asc' } }, guide: true, story: true },
  })
}

// ─── 更新城市基础信息 ────────────────────────────────────
export async function updateCity(formData: FormData) {
  const id = Number(formData.get('id'))
  const slug = (formData.get('slug') as string).trim()
  const name = (formData.get('name') as string).trim()
  const country = (formData.get('country') as string).trim()
  const region = (formData.get('region') as string).trim()
  const year = Number(formData.get('year'))
  const coverColor = (formData.get('coverColor') as string).trim()
  const summary = (formData.get('summary') as string).trim()
  const heroQuote = (formData.get('heroQuote') as string | null)?.trim() || null
  const coords = (formData.get('coords') as string | null)?.trim() || ''
  const coverPhoto = (formData.get('coverPhoto') as string | null)?.trim() || ''
  const coverThumb = (formData.get('coverThumb') as string | null)?.trim() || ''

  // 更新城市
  await prisma.city.update({
    where: { id },
    data: { slug, name, country, region, year, coverColor, summary, heroQuote, coords, coverPhoto, coverThumb },
  })

  // 更新 Guide
  const stayRaw = formData.get('stay') as string
  const eatRaw = formData.get('eat') as string
  const transport = (formData.get('transport') as string).trim()
  const tipsRaw = formData.get('tips') as string

  const stay = JSON.stringify(stayRaw.split('\n').map(s => s.trim()).filter(Boolean))
  const eat = JSON.stringify(eatRaw.split('\n').map(s => s.trim()).filter(Boolean))
  const tips = JSON.stringify(tipsRaw.split('\n').map(s => s.trim()).filter(Boolean))

  await prisma.guide.upsert({
    where: { cityId: id },
    update: { stay, eat, transport, tips },
    create: { cityId: id, stay, eat, transport, tips },
  })

  // 更新 Story
  const storyTitle = (formData.get('storyTitle') as string).trim()
  const storyDate = (formData.get('storyDate') as string).trim()
  const storyContent = (formData.get('storyContent') as string).trim()
  const storyCoverImage = (formData.get('storyCoverImage') as string | null)?.trim() || ''

  await prisma.story.upsert({
    where: { cityId: id },
    update: { title: storyTitle, date: storyDate, content: storyContent, coverImage: storyCoverImage },
    create: { cityId: id, title: storyTitle, date: storyDate, content: storyContent, coverImage: storyCoverImage },
  })

  revalidatePath(`/admin/cities/${slug}/edit`)
  revalidatePath(`/cities/${slug}`)
  revalidatePath('/')
  redirect(`/admin/cities/${slug}/edit?saved=1`)
}

// ─── 更新照片列表（整体替换） ─────────────────────────────
export async function updatePhotos(cityId: number, slug: string, photos: { src: string; caption: string; order: number }[]) {
  await prisma.photo.deleteMany({ where: { cityId } })
  if (photos.length > 0) {
    await prisma.photo.createMany({ data: photos.map(p => ({ ...p, cityId })) })
  }
  revalidatePath(`/admin/cities/${slug}/edit`)
  revalidatePath(`/cities/${slug}`)
}

// ─── 更新视频列表（整体替换） ─────────────────────────────
export async function updateVideos(cityId: number, slug: string, videos: { title: string; embedUrl: string; thumbnail: string; order: number }[]) {
  await prisma.video.deleteMany({ where: { cityId } })
  if (videos.length > 0) {
    await prisma.video.createMany({ data: videos.map(v => ({ ...v, cityId })) })
  }
  revalidatePath(`/admin/cities/${slug}/edit`)
  revalidatePath(`/cities/${slug}`)
}

// ─── 删除城市 ────────────────────────────────────────────
export async function deleteCity(id: number) {
  const city = await prisma.city.findUnique({ where: { id } })
  if (!city) return
  await prisma.city.delete({ where: { id } })
  revalidatePath('/admin')
  revalidatePath('/')
  redirect('/admin')
}

// ─── 新增城市 ────────────────────────────────────────────
export async function createCity(formData: FormData) {
  const name = (formData.get('name') as string).trim()
  // 自动根据城市名生成 slug（拼音/英文转小写连字符格式，去除特殊字符）
  const slug = name
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '')
    .replace(/^-+|-+$/g, '') || `city-${Date.now()}`
  const country = (formData.get('country') as string).trim()
  const region = (formData.get('region') as string).trim()
  const year = Number(formData.get('year'))
  const coverColor = (formData.get('coverColor') as string | null)?.trim() || '#7c6f8e'
  const summary = (formData.get('summary') as string).trim()
  const heroQuote = (formData.get('heroQuote') as string | null)?.trim() || null

  // 检查 slug 是否重复
  const existing = await prisma.city.findUnique({ where: { slug } })
  if (existing) throw new Error(`Slug "${slug}" 已存在`)

  const city = await prisma.city.create({
    data: {
      slug, name, country, region, year, coverColor, summary, heroQuote,
      guide: {
        create: { stay: '[]', eat: '[]', transport: '', tips: '[]' }
      },
      story: {
        create: { title: '', date: '', content: '', coverImage: '' }
      },
    },
  })

  revalidatePath('/admin')
  revalidatePath('/')
  redirect(`/admin/cities/${city.slug}/edit`)
}
