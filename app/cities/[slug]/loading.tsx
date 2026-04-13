const S = ({ w = 'w-full', h = 'h-4', r = 'rounded-md' }: { w?: string; h?: string; r?: string }) => (
  <div className={`${w} ${h} ${r} animate-pulse`} style={{ background: 'rgba(255,255,255,0.05)' }} />
)

export default function CityLoading() {
  return (
    <main style={{ background: '#0e1c10', minHeight: '100vh' }}>
      {/* Hero 区域骨架 */}
      <section className="relative" style={{ height: '100vh' }}>
        <div className="absolute inset-0 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)' }} />
        {/* 返回按钮 */}
        <div className="absolute top-8 left-8">
          <S w="w-20" h="h-4" r="rounded-full" />
        </div>
        {/* 城市标题 */}
        <div className="absolute bottom-16 left-12 space-y-4">
          <S w="w-12" h="h-3" />
          <S w="w-48" h="h-12" r="rounded-lg" />
          <S w="w-32" h="h-4" />
        </div>
      </section>

      {/* Tab 导航骨架 */}
      <div className="sticky top-0 z-10 flex gap-8 px-12 py-4" style={{ background: 'rgba(14,28,16,0.9)' }}>
        {[0, 1, 2, 3].map(i => (
          <S key={i} w="w-16" h="h-4" r="rounded" />
        ))}
      </div>

      {/* 内容区骨架 */}
      <div className="max-w-4xl mx-auto px-8 py-16 space-y-12">
        {/* 简介 */}
        <div className="space-y-3">
          <S w="w-full" h="h-4" />
          <S w="w-5/6" h="h-4" />
          <S w="w-4/6" h="h-4" />
        </div>

        {/* 照片网格 */}
        <div className="grid grid-cols-2 gap-4">
          {[280, 220, 240, 260].map((h, i) => (
            <div key={i} className="rounded-xl animate-pulse" style={{ height: h, background: 'rgba(255,255,255,0.05)' }} />
          ))}
        </div>

        {/* 攻略区 */}
        <div className="space-y-4">
          <S w="w-24" h="h-5" />
          {[0, 1, 2].map(i => (
            <div key={i} className="space-y-2">
              <S w="w-40" h="h-4" />
              <S w="w-full" h="h-3" />
              <S w="w-5/6" h="h-3" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
