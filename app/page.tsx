import Hero from '@/components/home/Hero'
import RecentUpdates from '@/components/home/RecentUpdates'
import AllCities from '@/components/home/AllCities'
import { getHeroPolaroids, getRecentUpdates } from '@/lib/actions/homepage'
import { getCitiesForHome } from '@/lib/actions/city'

export const revalidate = 3600

// 带超时的 Promise 包装，避免数据库慢查询阻塞 SSR
function withTimeout<T>(promise: Promise<T>, ms = 5000, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>(resolve => setTimeout(() => resolve(fallback), ms)),
  ])
}

export default async function HomePage() {
  const [polaroids, recentItems, cities] = await Promise.all([
    withTimeout(getHeroPolaroids(), 5000, []),
    withTimeout(getRecentUpdates(), 5000, []),
    withTimeout(getCitiesForHome(), 5000, []),
  ])

  return (
    <main>
      <Hero polaroids={polaroids} />
      <RecentUpdates items={recentItems} />
      <AllCities cities={cities} />
    </main>
  )
}
