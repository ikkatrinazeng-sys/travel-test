import Hero from '@/components/home/Hero'
import RecentUpdates from '@/components/home/RecentUpdates'
import AllCities from '@/components/home/AllCities'
import { getHeroPolaroids, getRecentUpdates } from '@/lib/actions/homepage'
import { getCitiesForHome } from '@/lib/actions/city'

export const revalidate = 3600

export default async function HomePage() {
  const [polaroids, recentItems, cities] = await Promise.all([
    getHeroPolaroids(),
    getRecentUpdates(),
    getCitiesForHome(),
  ])

  return (
    <main>
      <Hero polaroids={polaroids} />
      <RecentUpdates items={recentItems} />
      <AllCities cities={cities} />
    </main>
  )
}
