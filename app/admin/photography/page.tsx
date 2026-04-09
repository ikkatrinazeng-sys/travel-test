import { getPhotographyCities } from '@/lib/actions/homepage'
import PhotographyAdminClient from './client'

export const dynamic = 'force-dynamic'

export default async function PhotographyAdminPage() {
  const cities = await getPhotographyCities()
  return <PhotographyAdminClient initialCities={cities} />
}
