// 骨架屏基础块
export function SkeletonBlock({ w = 'w-full', h = 'h-4', rounded = 'rounded-md' }: { w?: string; h?: string; rounded?: string }) {
  return (
    <div
      className={`${w} ${h} ${rounded} animate-pulse`}
      style={{ background: 'rgba(255,255,255,0.06)' }}
    />
  )
}

// 行列表项骨架（城市列表用）
export function SkeletonRow() {
  return (
    <div className="flex items-center justify-between rounded-lg px-5 py-4" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="flex items-center gap-2">
          <SkeletonBlock w="w-20" h="h-4" />
          <SkeletonBlock w="w-14" h="h-4" />
          <SkeletonBlock w="w-10" h="h-4" />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <SkeletonBlock w="w-8" h="h-8" rounded="rounded-md" />
        <SkeletonBlock w="w-8" h="h-8" rounded="rounded-md" />
        <SkeletonBlock w="w-8" h="h-8" rounded="rounded-md" />
      </div>
    </div>
  )
}

// 卡片骨架（摄影页、拍立得等用）
export function SkeletonCard({ rows = 3 }: { rows?: number }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <SkeletonBlock w="w-24" h="h-4" />
          <SkeletonBlock w="w-16" h="h-4" />
        </div>
        <SkeletonBlock w="w-4" h="h-4" />
      </div>
      {rows > 0 && (
        <div className="px-6 pb-6 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {Array.from({ length: rows }).map((_, i) => (
            <SkeletonBlock key={i} h="h-10" />
          ))}
        </div>
      )}
    </div>
  )
}

// 页面标题区骨架
export function SkeletonPageHeader({ hasButton = true }: { hasButton?: boolean }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="space-y-2">
        <SkeletonBlock w="w-36" h="h-6" />
        <SkeletonBlock w="w-24" h="h-4" />
      </div>
      {hasButton && <SkeletonBlock w="w-24" h="h-9" rounded="rounded-lg" />}
    </div>
  )
}
