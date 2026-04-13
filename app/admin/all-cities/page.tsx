import { getCities } from '@/lib/actions/city'
import AllCitiesAdminClient from './client'

export default async function AllCitiesAdminPage() {
  const cities = await getCities()
  const cityItems = cities.map(c => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    country: c.country,
    region: c.region,
    coverPhoto: c.coverPhoto ?? '',
    coverThumb: c.coverThumb ?? '',
  }))

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-medium text-white">所有城市</h1>
        <p className="text-zinc-500 text-sm mt-1">
          管理首页城市网格的封面图和缩略图，共 {cityItems.length} 座城市
        </p>
      </div>
      <AllCitiesAdminClient cities={cityItems} />
    </div>
  )
}
