const CATEGORIES = [
  {
    icon: '📷',
    title: '旅行摄影',
    desc: '用镜头记录城市的光与影，每一帧都是故事',
    count: '120+ 张照片',
    bg: 'from-neutral-900 to-neutral-800',
    accent: '#c8a96e',
  },
  {
    icon: '🗺️',
    title: '城市攻略',
    desc: '落地即用的旅行指南，住宿、美食、交通一手整理',
    count: '19 座城市',
    bg: 'from-stone-900 to-stone-800',
    accent: '#9ecac8',
  },
  {
    icon: '🎬',
    title: '旅行 Vlog',
    desc: '视频里的路途风景，比文字更有温度',
    count: '8 支视频',
    bg: 'from-zinc-900 to-zinc-800',
    accent: '#c89e9e',
  },
  {
    icon: '✍️',
    title: '旅途故事',
    desc: '那些坐在街边发呆时想到的事，写给自己也写给你',
    count: '24 篇文章',
    bg: 'from-slate-900 to-slate-800',
    accent: '#a8c89e',
  },
  {
    icon: '🍜',
    title: '美食地图',
    desc: '从市场街边摊到隐藏小馆，用吃来认识一座城市',
    count: '60+ 家推荐',
    bg: 'from-neutral-800 to-stone-900',
    accent: '#c8b49e',
  },
  {
    icon: '🌏',
    title: '深度目的地',
    desc: '不只是打卡，探索城市背后的文化与生活方式',
    count: '6 个国家',
    bg: 'from-stone-800 to-zinc-900',
    accent: '#9eb4c8',
  },
]

export default function CategoryCards() {
  return (
    <section className="max-w-6xl mx-auto px-8 md:px-16 pb-20">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="text-2xl font-light tracking-wider text-neutral-800">旅行维度</h2>
        <span className="text-xs tracking-[0.2em] text-neutral-400 uppercase">6 categories</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className={`group relative bg-gradient-to-br ${cat.bg} rounded-sm p-6 cursor-pointer overflow-hidden transition-transform duration-300 hover:-translate-y-1`}
          >
            {/* 背景装饰圆 */}
            <div
              className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20"
              style={{ background: cat.accent }}
            />

            {/* 图标 */}
            <span className="text-3xl mb-4 block">{cat.icon}</span>

            {/* 标题 */}
            <h3 className="text-base font-light text-white mb-2 tracking-wide">{cat.title}</h3>

            {/* 描述 */}
            <p className="text-xs text-white/50 leading-relaxed mb-4">{cat.desc}</p>

            {/* 底部统计 + 箭头 */}
            <div className="flex items-center justify-between">
              <span
                className="text-[10px] tracking-widest uppercase font-medium"
                style={{ color: cat.accent }}
              >
                {cat.count}
              </span>
              <span
                className="text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
                style={{ color: cat.accent }}
              >
                →
              </span>
            </div>

            {/* 底部细线 */}
            <div
              className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-500 ease-out"
              style={{ background: `linear-gradient(to right, ${cat.accent}, transparent)` }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
