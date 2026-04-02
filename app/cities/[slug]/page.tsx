import { notFound } from 'next/navigation'
import { getCityBySlug, cities } from '@/data/cities'
import CityHero from '@/components/city/CityHero'
import CityDetail from '@/components/city/CityDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const city = getCityBySlug(slug)
  if (!city) return {}
  return {
    title: `${city.name} · Wanderlog`,
    description: city.summary,
  }
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params
  const city = getCityBySlug(slug)

  if (!city) notFound()

  return (
    <main>
      <CityHero city={city} />
      <CityDetail city={city} />
    </main>
  )
}
