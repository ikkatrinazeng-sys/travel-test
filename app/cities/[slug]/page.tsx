import { notFound } from 'next/navigation'
import { getCityBySlug, getCities } from '@/lib/actions/city'
import { dbCityToCity } from '@/lib/cityAdapter'
import CityHero from '@/components/city/CityHero'
import CityDetail from '@/components/city/CityDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const cities = await getCities()
    return cities.map((c: { slug: string }) => ({ slug: c.slug }))
  } catch {
    // 构建时数据库不可用，返回空数组，页面改为按需 ISR 生成
    return []
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const dbCity = await getCityBySlug(slug)
  if (!dbCity) return {}
  return {
    title: `${dbCity.name} · Wanderlog`,
    description: dbCity.summary,
  }
}

export const revalidate = 60
// 构建时未预渲染的路径，按需生成后缓存
export const dynamicParams = true

export default async function CityPage({ params }: Props) {
  const { slug } = await params
  const dbCity = await getCityBySlug(slug)

  if (!dbCity) notFound()

  const city = dbCityToCity(dbCity)

  return (
    <main>
      <CityHero city={city} />
      <CityDetail city={city} />
    </main>
  )
}
