const S = ({ w = 'w-full', h = 'h-4', r = 'rounded-md' }: { w?: string; h?: string; r?: string }) => (
  <div className={`${w} ${h} ${r} animate-pulse`} style={{ background: 'rgba(255,255,255,0.06)' }} />
)

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <S w="w-24" /><S w="w-16" />
        </div>
        <S w="w-4" h="h-4" />
      </div>
    </div>
  )
}

export default function PhotographyAdminLoading() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-2">
          <S w="w-32" h="h-6" />
          <S w="w-40" h="h-4" />
        </div>
        <S w="w-28" h="h-9" r="rounded-lg" />
      </div>
      <div className="space-y-4">
        {[0, 1, 2, 3].map(i => <SkeletonCard key={i} />)}
      </div>
    </div>
  )
}
