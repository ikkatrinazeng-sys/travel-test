import Link from 'next/link'
import { cities, getCitiesByRegion } from '@/data/cities'
import { City } from '@/types'

const regionLabels: Record<City['region'], string> = {
  europe: '欧洲',
  'east-asia': '东亚',
  'southeast-asia': '东南亚',
}

const regionOrder: City['region'][] = ['europe', 'east-asia', 'southeast-asia']

function CityCard({ city }: { city: City }) {
  return (
    <Link href={`/cities/${city.slug}`} className="group block">
      <div
        className="w-full aspect-[4/3] rounded-sm mb-3 transition-opacity group-hover:opacity-85"
        style={{ backgroundColor: city.coverColor }}
      />
      <p className="text-base font-light text-neutral-800 group-hover:text-neutral-500 transition-colors">
        {city.name}
      </p>
      <p className="text-xs text-neutral-400 mt-0.5">{city.country}</p>
    </Link>
  )
}

export default function CityGrid() {
  return (
    <section className="max-w-6xl mx-auto px-8 md:px-16 py-8 pb-24">
      <h2 className="text-2xl font-light tracking-wider text-neutral-800 mb-12">所有城市</h2>

      {regionOrder.map((region) => {
        const regionCities = getCitiesByRegion(region)
        const cols = region === 'east-asia' ? 'md:grid-cols-3' : 'md:grid-cols-4'

        return (
          <div key={region} className="mb-16">
            <div className="flex items-baseline gap-3 mb-6">
              <h3 className="text-sm tracking-[0.3em] text-neutral-500 uppercase">
                {regionLabels[region]}
              </h3>
              <span className="text-xs text-neutral-300">{regionCities.length} 座</span>
            </div>
            <div className={`grid grid-cols-2 ${cols} gap-6`}>
              {regionCities.map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
