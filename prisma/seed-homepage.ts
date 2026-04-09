import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({ url: 'file:./prisma/dev.db' })
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  // ─── Hero Polaroids ───────────────────────────────────────────
  const polaroids = [
    { name: 'Rome',      date: '2024.04', tag: 'Italy',    img: '/rome.jpg',      color: '#221a18', x: 5,  y: 48, rot: 8,   spd: 0.022, float: 'B', delay: 0.6, order: 0 },
    { name: 'Amsterdam', date: '2024.05', tag: 'Holland',  img: '/amsterdam.jpg', color: '#181e24', x: 82, y: 60, rot: -8,  spd: 0.017, float: 'B', delay: 0.9, order: 1 },
    { name: 'Penang',    date: '2024.02', tag: 'Malaysia', img: '/penang.jpg',    color: '#1a2018', x: 30, y: 38, rot: -5,  spd: 0.013, float: 'C', delay: 0.8, order: 2 },
    { name: 'Busan',     date: '2023.11', tag: 'Korea',    img: '/busan.jpg',     color: '#1e2030', x: 14, y: 28, rot: -11, spd: 0.025, float: 'C', delay: 0.4, order: 3 },
    { name: 'Capri',     date: '2023.08', tag: 'Italy',    img: '/capri.jpg',     color: '#162428', x: 44, y: 22, rot: 4,   spd: 0.018, float: 'A', delay: 0.7, order: 4 },
    { name: 'Beaune',    date: '2024.03', tag: 'France',   img: '/beaune.jpg',    color: '#1e1a2e', x: 62, y: 32, rot: -7,  spd: 0.020, float: 'A', delay: 0.3, order: 5 },
    { name: 'Paris',     date: '2024.06', tag: 'France',   img: '/paris.jpg',     color: '#1e1a2e', x: 78, y: 45, rot: 6,   spd: 0.015, float: 'B', delay: 0.5, order: 6 },
    { name: 'Phuket',    date: '2023.08', tag: 'Thailand', img: '/phuket.jpg',    color: '#1e2618', x: 58, y: 55, rot: 10,  spd: 0.028, float: 'A', delay: 0.5, order: 7 },
    { name: 'Kyoto',     date: '2024.02', tag: 'Japan',    img: '/kyoto.jpg',     color: '#1c2a1e', x: 24, y: 62, rot: 3,   spd: 0.021, float: 'C', delay: 1.0, order: 8 },
    { name: 'Seoul',     date: '2024.01', tag: 'Korea',    img: '/Korean.jpg',    color: '#1e1e2e', x: 68, y: 68, rot: -4,  spd: 0.019, float: 'B', delay: 1.1, order: 9 },
    { name: 'Bangkok',   date: '2023.12', tag: 'Thailand', img: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=400&q=80', color: '#281e14', x: 90, y: 22, rot: 9,   spd: 0.016, float: 'A', delay: 1.2, order: 10 },
    { name: 'Osaka',     date: '2024.07', tag: 'Japan',    img: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=400&q=80', color: '#1e2020', x: 4,  y: 72, rot: -9,  spd: 0.023, float: 'C', delay: 1.3, order: 11 },
    { name: 'Napoli',    date: '2024.09', tag: 'Italy',    img: '/napoli.jpg',    color: '#241c18', x: 48, y: 70, rot: 7,   spd: 0.014, float: 'A', delay: 1.4, order: 12 },
  ]

  await prisma.heroPolaroid.deleteMany()
  await prisma.heroPolaroid.createMany({ data: polaroids })
  console.log(`✅ Seeded ${polaroids.length} hero polaroids`)

  // ─── Recent Updates ───────────────────────────────────────────
  const recentUpdates = [
    {
      type: '旅行故事 · 法国',
      title: '特级名庄之路：40公里的感官漫游',
      excerpt: '跨越一万公里的高度，在14个小时的封闭机舱里，时间是凝固且模糊的。当起落架触碰地面的那一刻，感官还没有完全降落',
      city: '法国 博讷 · 2025',
      citySlug: 'beaune',
      bg: 'url(/beaune-winery.jpg) center/cover no-repeat',
      order: 0,
    },
    {
      type: '摄影纪录 · 日本',
      title: '岚山破晓——那道光刚好落对了地方',
      excerpt: '清晨六点半，游客还未涌来。光线穿透竹林，碎成一片片光晕，每一步踩下去的回响都比预想的更响——像是踏入了另一个世界。',
      city: '日本 京都 · 2024',
      citySlug: 'kyoto',
      bg: 'linear-gradient(135deg,#1e2a1e,#2a3822)',
      order: 1,
    },
    {
      type: '旅行指南 · 泰国',
      title: '清迈古城咖啡馆完全地图',
      excerpt: '在这里待了两周，走遍古城每一条街巷寻访咖啡馆。有几家藏在古寺旁边，不留心根本发现不了。',
      city: '泰国 清迈 · 2023',
      citySlug: 'chiang-mai',
      bg: 'linear-gradient(135deg,#251828,#1a1e35)',
      order: 2,
    },
  ]

  await prisma.recentUpdate.deleteMany()
  await prisma.recentUpdate.createMany({ data: recentUpdates })
  console.log(`✅ Seeded ${recentUpdates.length} recent updates`)

  // ─── Photography Cities ───────────────────────────────────────
  const photographyData = [
    {
      city: 'Paris', country: 'France', slug: 'paris', order: 0,
      photos: [
        { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80', caption: 'Eiffel Tower at dusk' },
        { src: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80', caption: 'Seine River reflections' },
        { src: 'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=1200&q=80', caption: 'Montmartre streets' },
        { src: 'https://images.unsplash.com/photo-1551634979-2b11f8c946fe?w=1200&q=80', caption: 'Café morning light' },
        { src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=80', caption: 'Louvre courtyard' },
        { src: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&q=80', caption: 'Notre-Dame evening' },
      ],
    },
    {
      city: 'Kyoto', country: 'Japan', slug: 'kyoto', order: 1,
      photos: [
        { src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80', caption: 'Fushimi Inari torii gates' },
        { src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80', caption: 'Arashiyama bamboo grove' },
        { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80', caption: 'Temple at dawn' },
        { src: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200&q=80', caption: 'Cherry blossom path' },
        { src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=80', caption: 'Gion district lanterns' },
      ],
    },
    {
      city: 'Amsterdam', country: 'Netherlands', slug: 'amsterdam', order: 2,
      photos: [
        { src: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&q=80', caption: 'Canal houses at golden hour' },
        { src: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1200&q=80', caption: 'Bikes along the canal' },
        { src: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&q=80', caption: 'Rijksmuseum garden' },
        { src: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=1200&q=80', caption: 'Tulip market stalls' },
      ],
    },
    {
      city: 'Rome', country: 'Italy', slug: 'rome', order: 3,
      photos: [
        { src: 'https://images.unsplash.com/photo-1529154036614-a60975f5c760?w=1200&q=80', caption: 'Colosseum at sunrise' },
        { src: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80', caption: 'Trevi Fountain crowd' },
        { src: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=80', caption: 'Vatican domes' },
        { src: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=1200&q=80', caption: 'Trastevere alley' },
        { src: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=1200&q=80', caption: 'Piazza Navona evening' },
      ],
    },
    {
      city: 'Seoul', country: 'South Korea', slug: 'seoul', order: 4,
      photos: [
        { src: 'https://images.unsplash.com/photo-1538485399081-7c8272aa4bef?w=1200&q=80', caption: 'Gyeongbokgung Palace' },
        { src: 'https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?w=1200&q=80', caption: 'Han River at night' },
        { src: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&q=80', caption: 'Bukchon rooftops' },
        { src: 'https://images.unsplash.com/photo-1583865483498-5f52c7cf08e6?w=1200&q=80', caption: 'Myeongdong street food' },
      ],
    },
    {
      city: 'Bali', country: 'Indonesia', slug: 'bali', order: 5,
      photos: [
        { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80', caption: 'Tanah Lot temple sunset' },
        { src: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&q=80', caption: 'Rice terraces Ubud' },
        { src: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200&q=80', caption: 'Sacred Monkey Forest' },
        { src: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80', caption: 'Seminyak beach dusk' },
        { src: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80', caption: 'Water temple reflection' },
        { src: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=1200&q=80', caption: 'Kuta surf at dawn' },
      ],
    },
  ]

  await prisma.photographyPhoto.deleteMany()
  await prisma.photographyCity.deleteMany()

  for (const c of photographyData) {
    const { photos, ...cityData } = c
    const created = await prisma.photographyCity.create({ data: cityData })
    await prisma.photographyPhoto.createMany({
      data: photos.map((p, i) => ({ ...p, order: i, cityId: created.id }))
    })
  }
  console.log(`✅ Seeded ${photographyData.length} photography cities`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
