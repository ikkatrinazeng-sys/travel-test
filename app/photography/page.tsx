import { getPhotographyCities } from '@/lib/actions/homepage'
import PhotographyClient from './client'

export const revalidate = 3600

export default async function PhotographyPage() {
  const cities = await getPhotographyCities()
  return <PhotographyClient cities={cities} />
}
