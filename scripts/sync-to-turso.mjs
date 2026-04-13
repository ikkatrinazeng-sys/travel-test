/**
 * 将本地 SQLite 数据同步到 Turso（按外键依赖顺序逐表处理）
 * 用法：node scripts/sync-to-turso.mjs
 */
import { createClient } from '@libsql/client'
import { execSync } from 'child_process'
import { join } from 'path'
import { config } from 'dotenv'
import { existsSync } from 'fs'

config({ path: join(process.cwd(), '.env.local') })

const url = process.env.DATABASE_URL
const authToken = process.env.DATABASE_AUTH_TOKEN

if (!url || url.startsWith('file:')) {
  console.error('❌ DATABASE_URL 未设置或仍是本地文件路径，请先设置 Turso URL')
  process.exit(1)
}

const dbPath = join(process.cwd(), 'prisma/dev.db')
if (!existsSync(dbPath)) {
  console.error(`❌ 本地数据库不存在：${dbPath}`)
  process.exit(1)
}

const turso = createClient({ url, authToken })

// 按外键依赖顺序排列（父表在前，子表在后）
const TABLE_ORDER = [
  'HeroPolaroid',      // 无依赖
  'RecentUpdate',      // 无依赖
  'City',              // 无依赖
  'PhotographyCity',   // 无依赖
  'Photo',             // → City
  'Video',             // → City
  'Guide',             // → City
  'Story',             // → City
  'PhotographyPhoto',  // → PhotographyCity
]

/**
 * 用 sqlite3 CLI 导出单张表的 INSERT 语句
 */
function dumpTable(table) {
  try {
    const raw = execSync(
      `sqlite3 "${dbPath}" ".mode insert ${table}" "SELECT * FROM \\"${table}\\";"`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    )
    return raw
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.toUpperCase().startsWith('INSERT INTO'))
  } catch (e) {
    console.warn(`  ⚠️  无法 dump 表 ${table}：${e.message?.slice(0, 80)}`)
    return []
  }
}

// ── 1. 先清空所有表（倒序，避免外键冲突） ──────────────────────────
console.log('\n🗑  清空 Turso 表（倒序）...')
for (const t of [...TABLE_ORDER].reverse()) {
  try {
    await turso.execute(`DELETE FROM "${t}"`)
    console.log(`   ✓ 清空 ${t}`)
  } catch (e) {
    console.warn(`   ⚠️  清空 ${t} 失败：${e.message?.slice(0, 60)}`)
  }
}

// ── 2. 按顺序逐表插入 ──────────────────────────────────────────────
console.log('\n📤 开始同步...')
let totalOk = 0, totalSkip = 0

for (const table of TABLE_ORDER) {
  const rows = dumpTable(table)
  if (rows.length === 0) {
    console.log(`   — ${table}：无数据，跳过`)
    continue
  }

  let ok = 0, skip = 0
  for (const stmt of rows) {
    try {
      await turso.execute(stmt)
      ok++
    } catch (e) {
      console.warn(`   ⚠️  ${table} 插入失败：${stmt.slice(0, 70)} — ${e.message?.slice(0, 50)}`)
      skip++
    }
  }

  console.log(`   ✅ ${table}：${ok} 条成功${skip > 0 ? `，${skip} 条跳过` : ''}`)
  totalOk += ok
  totalSkip += skip
}

console.log(`\n🎉 同步完成：共 ${totalOk} 条成功，${totalSkip} 条跳过`)
