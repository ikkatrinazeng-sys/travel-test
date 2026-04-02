import Link from 'next/link'
import Image from 'next/image'

const FEATURED = [
  {
    slug: 'rome',
    name: '罗马',
    country: '意大利',
    year: 2023,
    img: '/rome.jpg',
    summary: '永恒之城，每块石头都是历史',
    tag: 'Europe',
    size: 'large',
  },
  {
    slug: 'kyoto',
    name: '京都',
    country: '日本',
    year: 2023,
    img: '/kyoto.jpg',
    summary: '千年古都，最接近日本灵魂的地方',
    tag: 'East Asia',
    size: 'small',
  },
  {
    slug: 'penang',
    name: '槟城',
    country: '马来西亚',
    year: 2024,
    img: '/penang.jpg',
    summary: '壁画之城，美食天堂',
    tag: 'Southeast Asia',
    size: 'small',
  },
  {
    slug: 'amsterdam',
    name: '阿姆斯特丹',
    country: '荷兰',
    year: 2023,
    img: '/amsterdam.jpg',
    summary: '运河、自行车与郁金香',
    tag: 'Europe',
    size: 'medium',
  },
  {
    slug: 'phuket',
    name: '普吉岛',
    country: '泰国',
    year: 2023,
    img: '/phuket.jpg',
    summary: '泰国最美海岛，度假首选',
    tag: 'Southeast Asia',
    size: 'medium',
  },
  {
    slug: 'busan',
    name: '釜山',
    country: '韩国',
    year: 2024,
    img: '/busan.jpg',
    summary: '海边城市，电影感十足',
    tag: 'East Asia',
    size: 'small',
  },
  {
    slug: 'paris',
    name: '巴黎',
    country: '法国',
    year: 2024,
    img: '/paris.jpg',
    summary: '光线与咖啡馆的城市',
    tag: 'Europe',
    size: 'small',
  },
  {
    slug: 'capri',
    name: '卡普里',
    country: '意大利',
    year: 2023,
    img: '/capri.jpg',
    summary: '地中海上的蓝洞仙境',
    tag: 'Europe',
    size: 'small',
  },
  {
    slug: 'beaune',
    name: '博纳',
    country: '法国',
    year: 2024,
    img: '/beaune.jpg',
    summary: '勃艮第葡萄酒的心脏',
    tag: 'Europe',
    size: 'small',
  },
]

function PhotoCard({
  city,
  heightClass,
}: {
  city: (typeof FEATURED)[0]
  heightClass: string
}) {
  return (
    <Link
      href={`/cities/${city.slug}`}
      className={`group relative overflow-hidden rounded-sm block ${heightClass} bg-neutral-200`}
    >
      <Image
        src={city.img}
        alt={city.name}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* 顶部标签 */}
      <span className="absolute top-4 left-4 text-[10px] tracking-[0.15em] uppercase bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-white/20">
        {city.tag}
      </span>

      {/* 底部信息 */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-[11px] text-white/50 mb-1 tracking-wider">{city.country} · {city.year}</p>
        <h3 className="text-lg font-light text-white leading-tight mb-1.5">{city.name}</h3>
        <p className="text-xs text-white/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[28ch]">
          {city.summary}
        </p>
        <div className="mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] tracking-widest text-white/70 uppercase">探索</span>
          <span className="text-white/70 text-xs">→</span>
        </div>
      </div>
    </Link>
  )
}

export default function FeaturedCities() {
  const [hero, second, third, fourth, fifth, ...rest] = FEATURED

  return (
    <section className="max-w-6xl mx-auto px-8 md:px-16 pb-16">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="text-2xl font-light tracking-wider text-neutral-800">精选目的地</h2>
        <span className="text-xs tracking-[0.2em] text-neutral-400 uppercase">9 destinations</span>
      </div>

      {/* 第一行：1大 + 2小 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div className="md:col-span-2">
          <PhotoCard city={hero} heightClass="h-80 md:h-[420px]" />
        </div>
        <div className="flex flex-col gap-3">
          <PhotoCard city={second} heightClass="h-52 md:flex-1" />
          <PhotoCard city={third} heightClass="h-52 md:flex-1" />
        </div>
      </div>

      {/* 第二行：2中 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
        <PhotoCard city={fourth} heightClass="h-64" />
        <PhotoCard city={fifth} heightClass="h-64" />
      </div>

      {/* 第三行：4小 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {rest.map((city) => (
          <PhotoCard key={city.slug} city={city} heightClass="h-48" />
        ))}
      </div>
    </section>
  )
}
