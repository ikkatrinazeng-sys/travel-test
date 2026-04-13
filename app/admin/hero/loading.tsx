const S = ({ w = 'w-full', h = 'h-4', r = 'rounded-md' }: { w?: string; h?: string; r?: string }) => (
  <div className={`${w} ${h} ${r} animate-pulse`} style={{ background: 'rgba(255,255,255,0.06)' }} />
)

function SkeletonPolaroid() {
  return (
    <div className="rounded-xl p-4 space-y-3" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="rounded-lg animate-pulse" style={{ aspectRatio: '3/4', background: 'rgba(255,255,255,0.06)' }} />
      <S h="h-3" w="w-3/4" />
    </div>
  )
}

export default function HeroAdminLoading() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-2">
          <S w="w-32" h="h-6" />
          <S w="w-48" h="h-4" />
        </div>
        <S w="w-28" h="h-9" r="rounded-lg" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[0, 1, 2, 3].map(i => <SkeletonPolaroid key={i} />)}
      </div>
    </div>
  )
}
