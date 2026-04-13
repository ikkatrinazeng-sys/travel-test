const S = ({ w = 'w-full', h = 'h-4', r = 'rounded-md' }: { w?: string; h?: string; r?: string }) => (
  <div className={`${w} ${h} ${r} animate-pulse`} style={{ background: 'rgba(255,255,255,0.06)' }} />
)

function SkeletonSection({ label, rows = 2 }: { label?: boolean; rows?: number }) {
  return (
    <section className="mb-12">
      {label && <div className="w-24 h-3 rounded animate-pulse mb-5" style={{ background: 'rgba(255,255,255,0.06)' }} />}
      <div className="rounded-2xl p-7 space-y-5" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="grid grid-cols-2 gap-5">
          {Array.from({ length: rows * 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <S w="w-16" h="h-3" />
              <S h="h-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function EditCityLoading() {
  return (
    <div className="w-full">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 mb-8">
        <S w="w-16" h="h-3" />
        <S w="w-4" h="h-3" />
        <S w="w-16" h="h-3" />
        <S w="w-4" h="h-3" />
        <S w="w-20" h="h-3" />
      </div>

      {/* 基础信息 */}
      <SkeletonSection label rows={2} />

      {/* 旅行攻略 */}
      <SkeletonSection label rows={1} />

      {/* 城市故事 */}
      <SkeletonSection label rows={1} />

      {/* 照片管理 */}
      <section className="mb-12">
        <div className="w-28 h-3 rounded animate-pulse mb-5" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="rounded-2xl p-7" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="grid grid-cols-3 gap-4">
            {[0, 1, 2].map(i => (
              <div key={i} className="rounded-xl animate-pulse" style={{ aspectRatio: '4/3', background: 'rgba(255,255,255,0.06)' }} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
