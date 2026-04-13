const S = ({ w = 'w-full', h = 'h-4', r = 'rounded-md' }: { w?: string; h?: string; r?: string }) => (
  <div className={`${w} ${h} ${r} animate-pulse`} style={{ background: 'rgba(255,255,255,0.06)' }} />
)

function SkeletonUpdateItem() {
  return (
    <div className="rounded-xl p-4 space-y-3" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex gap-3">
        <div className="rounded-lg animate-pulse flex-shrink-0" style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.06)' }} />
        <div className="flex-1 space-y-2">
          <S h="h-4" w="w-3/4" />
          <S h="h-3" w="w-1/2" />
        </div>
      </div>
    </div>
  )
}

export default function RecentUpdatesAdminLoading() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-2">
          <S w="w-28" h="h-6" />
          <S w="w-44" h="h-4" />
        </div>
        <S w="w-28" h="h-9" r="rounded-lg" />
      </div>
      <div className="space-y-3">
        {[0, 1, 2, 3, 4].map(i => <SkeletonUpdateItem key={i} />)}
      </div>
    </div>
  )
}
