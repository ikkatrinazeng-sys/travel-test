'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// ─── Hero Polaroids ───────────────────────────────────────────
export async function getHeroPolaroids() {
  return prisma.heroPolaroid.findMany({ orderBy: { order: 'asc' } })
}

export async function saveHeroPolaroids(items: {
  id?: number; name: string; date: string; tag: string; img: string; color: string;
  x: number; y: number; rot: number; spd: number; float: string; delay: number; order: number
}[]) {
  // 删除全部再重建（保持顺序最简单）
  await prisma.heroPolaroid.deleteMany()
  await prisma.heroPolaroid.createMany({ data: items })
  revalidatePath('/')
}

// ─── Recent Updates ───────────────────────────────────────────
export async function getRecentUpdates() {
  return prisma.recentUpdate.findMany({ orderBy: { order: 'asc' } })
}

export async function saveRecentUpdates(items: {
  id?: number; type: string; title: string; excerpt: string; city: string; citySlug: string; bg: string; order: number
}[]) {
  await prisma.recentUpdate.deleteMany()
  await prisma.recentUpdate.createMany({ data: items })
  revalidatePath('/')
}

// ─── Photography ──────────────────────────────────────────────
export async function getPhotographyCities() {
  return prisma.photographyCity.findMany({
    orderBy: { order: 'asc' },
    include: { photos: { orderBy: { order: 'asc' } } },
  })
}

export async function savePhotographyCity(
  id: number | null,
  data: { city: string; country: string; slug: string; order: number },
  photos: { src: string; caption: string; order: number }[]
) {
  if (id) {
    await prisma.photographyCity.update({ where: { id }, data })
    await prisma.photographyPhoto.deleteMany({ where: { cityId: id } })
    await prisma.photographyPhoto.createMany({ data: photos.map(p => ({ ...p, cityId: id })) })
  } else {
    const created = await prisma.photographyCity.create({ data })
    await prisma.photographyPhoto.createMany({ data: photos.map(p => ({ ...p, cityId: created.id })) })
  }
  revalidatePath('/photography')
}

export async function deletePhotographyCity(id: number) {
  await prisma.photographyCity.delete({ where: { id } })
  revalidatePath('/photography')
}

export async function reorderPhotographyCities(ids: number[]) {
  await Promise.all(ids.map((id, i) =>
    prisma.photographyCity.update({ where: { id }, data: { order: i } })
  ))
  revalidatePath('/photography')
}
