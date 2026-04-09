import { getRecentUpdates } from '@/lib/actions/homepage'
import RecentUpdatesAdminClient from './client'

export const dynamic = 'force-dynamic'

export default async function RecentUpdatesAdminPage() {
  const items = await getRecentUpdates()
  return <RecentUpdatesAdminClient initialItems={items} />
}
