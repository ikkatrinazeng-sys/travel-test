const S = ({ w = 'w-full', h = 'h-4', r = 'rounded-md' }: { w?: string; h?: string; r?: string }) => (
  <div className={`${w} ${h} ${r} animate-pulse`} style={{ background: 'rgba(255,255,255,0.05)' }} />
)

export default function PhotographyLoading() {
  return (
    <main style={{ background: '#0e1c10', minHeight: '100vh' }}>
      {/* 城市 tab 栏骨架 */}
      <div className="sticky top-0 z-10 flex gap-6 px-10 py-5" style={{ background: 'rgba(14,28,16,0.85)' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <S key={i} w="w-16" h="h-4" r="rounded-full" />
        ))}
      </div>

      {/* 照片瀑布流骨架 */}
      <div className="px-10 py-10 columns-2 gap-4" style={{ columnCount: 2 }}>
        {[200, 280, 240, 320, 200, 260, 300, 220].map((h, i) => (
          <div
            key={i}
            className="rounded-xl mb-4 animate-pulse break-inside-avoid"
            style={{ height: h, background: 'rgba(255,255,255,0.05)' }}
          />
        ))}
      </div>
    </main>
  )
}
