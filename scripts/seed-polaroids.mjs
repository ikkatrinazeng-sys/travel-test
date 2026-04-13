/**
 * 插入首页拍立得数据
 * 用法：node scripts/seed-polaroids.mjs
 */
import { createClient } from '@libsql/client'
import { readFileSync } from 'fs'
import { join } from 'path'
import { config } from 'dotenv'

// 加载 .env.local
config({ path: join(process.cwd(), '.env.local') })

const url = process.env.DATABASE_URL
const authToken = process.env.DATABASE_AUTH_TOKEN

if (!url) {
  console.error('❌ 缺少 DATABASE_URL 环境变量')
  process.exit(1)
}

const client = createClient({ url, authToken })

const polaroids = [
  { name: 'Korean', date: '2024', tag: '首尔', img: '/Korean.jpg', color: '#1a2035', x: 15, y: 45, rot: -8, spd: 0.018, float: 'A', delay: 0 },
  { name: '巴黎', date: '2024', tag: '巴黎', img: '/paris-pol.jpg', color: '#2a1f1a', x: 28, y: 30, rot: 5, spd: 0.022, float: 'B', delay: 0.3 },
  { name: '普吉岛', date: '2024', tag: '普吉岛', img: '/phuket-pol.jpg', color: '#0d2020', x: 42, y: 55, rot: -3, spd: 0.016, float: 'A', delay: 0.6 },
  { name: '釜山', date: '2024', tag: '釜山', img: '/busan-pol.jpg', color: '#1e1a2a', x: 55, y: 35, rot: 7, spd: 0.020, float: 'C', delay: 0.9 },
  { name: 'Capri', date: '2024', tag: '卡普里', img: '/capri-pol.jpg', color: '#0d1e2a', x: 68, y: 50, rot: -5, spd: 0.024, float: 'B', delay: 1.2 },
  { name: '槟城', date: '2024', tag: '槟城', img: '/penang-pol.jpg', color: '#1e2a1a', x: 78, y: 30, rot: 4, spd: 0.019, float: 'A', delay: 1.5 },
  { name: '博纳', date: '2024', tag: '博纳', img: '/beaune-pol.jpg', color: '#2a1e15', x: 20, y: 65, rot: -6, spd: 0.021, float: 'C', delay: 0.4 },
  { name: '罗马', date: '2024', tag: '罗马', img: '/rome-pol.jpg', color: '#251a10', x: 60, y: 70, rot: 9, spd: 0.017, float: 'B', delay: 0.7 },
  { name: '阿姆斯特丹', date: '2024', tag: '阿姆斯特丹', img: '/amsterdam-pol.jpg', color: '#10201a', x: 35, y: 75, rot: -4, spd: 0.023, float: 'A', delay: 1.0 },
  { name: '京都', date: '2024', tag: '京都', img: '/kyoto-pol.jpg', color: '#201520', x: 82, y: 60, rot: 6, spd: 0.018, float: 'C', delay: 1.3 },
]

// 先清空再插入
await client.execute('DELETE FROM HeroPolaroid')

for (let i = 0; i < polaroids.length; i++) {
  const p = polaroids[i]
  await client.execute({
    sql: `INSERT INTO HeroPolaroid (name, date, tag, img, color, x, y, rot, spd, float, delay, "order")
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [p.name, p.date, p.tag, p.img, p.color, p.x, p.y, p.rot, p.spd, p.float, p.delay, i],
  })
}

console.log(`✅ 已插入 ${polaroids.length} 张拍立得`)
