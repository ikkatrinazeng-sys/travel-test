import { City } from '@/types'
import { getCityBySlug as getDbCity } from '@/lib/actions/city'

type DbCity = Awaited<ReturnType<typeof getDbCity>>

/** 将 Prisma DB 结果转换为前台 City 类型 */
export function dbCityToCity(c: NonNullable<DbCity>): City {
  const stayArr: string[] = JSON.parse(c.guide?.stay || '[]')
  const eatArr: string[] = JSON.parse(c.guide?.eat || '[]')
  const tipsArr: string[] = JSON.parse(c.guide?.tips || '[]')

  return {
    slug: c.slug,
    name: c.name,
    country: c.country,
    region: c.region as City['region'],
    year: c.year,
    coverColor: c.coverColor,
    summary: c.summary,
    heroQuote: c.heroQuote ?? undefined,
    photos: c.photos.map((p: { src: string; caption: string | null }) => ({ src: p.src, caption: p.caption ?? undefined })),
    videos: c.videos.map((v: { title: string; embedUrl: string; thumbnail: string }) => ({ title: v.title, embedUrl: v.embedUrl, thumbnail: v.thumbnail })),
    guide: {
      stay: stayArr,
      eat: eatArr,
      transport: c.guide?.transport ?? '',
      tips: tipsArr,
    },
    story: {
      title: c.story?.title ?? '',
      date: c.story?.date ?? '',
      content: c.story?.content ?? '',
      coverImage: c.story?.coverImage ?? '',
    },
  }
}
