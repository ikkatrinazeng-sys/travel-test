import { getHeroPolaroids } from '@/lib/actions/homepage'
import HeroAdminClient from './client'

export const dynamic = 'force-dynamic'

export default async function HeroAdminPage() {
  const polaroids = await getHeroPolaroids()
  return <HeroAdminClient initialPolaroids={polaroids} />
}
