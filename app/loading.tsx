// 首页骨架屏：Hero 大图区 + 最近更新 + 城市网格

const S = ({ w = 'w-full', h = 'h-4', r = 'rounded-md' }: { w?: string; h?: string; r?: string }) => (
  <div className={`${w} ${h} ${r} animate-pulse`} style={{ background: 'rgba(255,255,255,0.05)' }} />
)

export default function HomeLoading() {
  return (
    <main style={{ background: '#0e1c10', minHeight: '100vh' }}>
      {/* Hero 骨架 */}
      <section style={{ height: '100vh', background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <S w="w-64" h="h-8" r="rounded-full" />
          <S w="w-96" h="h-4" />
          <S w="w-72" h="h-4" />
        </div>
        {/* 拍立得占位 */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-5">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="rounded-lg animate-pulse" style={{ width: 120, height: 160, background: 'rgba(255,255,255,0.04)', transform: `rotate(${(i - 1.5) * 3}deg)` }} />
          ))}
        </div>
      </section>

      {/* 最近更新骨架 */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <S w="w-24" h="h-5" r="rounded" />
        <div className="mt-8 grid grid-cols-3 gap-6">
          {[0, 1, 2].map(i => (
            <div key={i} className="space-y-3">
              <div className="rounded-xl animate-pulse" style={{ aspectRatio: '16/9', background: 'rgba(255,255,255,0.05)' }} />
              <S w="w-3/4" />
              <S w="w-1/2" h="h-3" />
            </div>
          ))}
        </div>
      </section>

      {/* 城市网格骨架 */}
      <section className="px-8 pb-24 max-w-6xl mx-auto">
        <S w="w-20" h="h-5" r="rounded" />
        <div className="mt-8 grid grid-cols-3 gap-5">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} className="rounded-2xl animate-pulse" style={{ aspectRatio: '4/3', background: 'rgba(255,255,255,0.05)' }} />
          ))}
        </div>
      </section>
    </main>
  )
}
