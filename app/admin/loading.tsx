const S = ({ w = 'w-full', h = 'h-4', r = 'rounded-md' }: { w?: string; h?: string; r?: string }) => (
  <div className={`${w} ${h} ${r} animate-pulse`} style={{ background: 'rgba(255,255,255,0.06)' }} />
)

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between rounded-lg px-5 py-4" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="flex items-center gap-2">
          <S w="w-20" /><S w="w-14" /><S w="w-10" />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <S w="w-8" h="h-8" r="rounded-md" /><S w="w-8" h="h-8" r="rounded-md" /><S w="w-8" h="h-8" r="rounded-md" />
      </div>
    </div>
  )
}

export default function AdminLoading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <S w="w-36" h="h-6" />
          <S w="w-24" h="h-4" />
        </div>
        <S w="w-24" h="h-9" r="rounded-lg" />
      </div>
      <div className="space-y-8">
        {[0, 1, 2].map(g => (
          <section key={g}>
            <div className="w-10 h-3 rounded animate-pulse mb-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="space-y-1">
              {[0, 1, 2].map(i => <SkeletonRow key={i} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
