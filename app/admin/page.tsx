import Link from 'next/link'
import { getCities } from '@/lib/actions/city'
import { DeleteCityButton } from '@/components/admin/DeleteCityButton'

const regionLabel: Record<string, string> = {
  europe: '欧洲',
  'east-asia': '东亚',
  'southeast-asia': '东南亚',
}

type CityRow = Awaited<ReturnType<typeof getCities>>[number]

export default async function AdminPage() {
  const cities = await getCities()

  const grouped: Record<string, CityRow[]> = {
    europe: cities.filter((c: CityRow) => c.region === 'europe'),
    'east-asia': cities.filter((c: CityRow) => c.region === 'east-asia'),
    'southeast-asia': cities.filter((c: CityRow) => c.region === 'southeast-asia'),
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-medium text-white">城市详情</h1>
          <p className="text-zinc-500 text-sm mt-1">共 {cities.length} 座城市</p>
        </div>
        <Link
          href="/admin/cities/new"
          className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          style={{ background: 'rgba(200,185,122,0.14)', color: '#c8b97a' }}
        >
          + 新增城市
        </Link>
      </div>

      {cities.length === 0 ? (
        <div className="text-center py-24 text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
          暂无城市，点击右上角「+ 新增城市」开始添加
        </div>
      ) : (
      <div className="space-y-8">
        {(Object.keys(grouped) as string[]).filter(region => grouped[region].length > 0).map(region => (
          <section key={region}>
            <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">
              {regionLabel[region]}
            </h2>
            <div className="space-y-1">
              {grouped[region].map((city: CityRow) => (
                <div
                  key={city.slug}
                  className="flex items-center justify-between rounded-lg px-5 py-4 transition-colors"
                  style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: city.coverColor }} />
                    <div>
                      <span className="text-white text-sm font-medium">{city.name}</span>
                      <span className="text-zinc-500 text-sm ml-2">·</span>
                      <span className="text-zinc-500 text-sm ml-2">{city.country}</span>
                      <span className="text-zinc-600 text-sm ml-2">· {city.year}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/cities/${city.slug}/edit`} title="编辑"
                      className="w-8 h-8 flex items-center justify-center rounded-md transition-colors hover:bg-white/5"
                      style={{ color: 'rgba(200,185,122,0.7)' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </Link>
                    <DeleteCityButton cityId={city.id} cityName={city.name} />
                    <Link href={`/cities/${city.slug}`} target="_blank" title="预览"
                      className="w-8 h-8 flex items-center justify-center rounded-md transition-colors text-zinc-600 hover:text-zinc-300 hover:bg-white/5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      )}
    </div>
  )
}
