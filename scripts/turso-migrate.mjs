/**
 * 将 prisma/migrations 下所有 migration.sql 依次推送到 Turso 远程数据库
 * 用法：node scripts/turso-migrate.mjs
 */
import { createClient } from '@libsql/client'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const url = process.env.DATABASE_URL
const authToken = process.env.DATABASE_AUTH_TOKEN

if (!url) {
  console.error('❌ 缺少 DATABASE_URL 环境变量')
  process.exit(1)
}

const client = createClient({ url, authToken })

const migrationsDir = join(process.cwd(), 'prisma', 'migrations')
const folders = readdirSync(migrationsDir)
  .filter(f => f !== 'migration_lock.toml')
  .sort()

console.log(`📦 共找到 ${folders.length} 个 migration 目录`)

for (const folder of folders) {
  const sqlFile = join(migrationsDir, folder, 'migration.sql')
  let sql
  try {
    sql = readFileSync(sqlFile, 'utf-8')
  } catch {
    console.warn(`⚠️  跳过 ${folder}（找不到 migration.sql）`)
    continue
  }

  // 拆分语句（按分号分割，过滤空行）
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0)

  console.log(`▶ 执行 ${folder}（${statements.length} 条语句）...`)

  for (const stmt of statements) {
    try {
      await client.execute(stmt)
    } catch (err) {
      // 忽略"表已存在"类错误，继续
      const msg = err?.message ?? ''
      if (msg.includes('already exists') || msg.includes('duplicate column')) {
        console.warn(`  ⚠️  已存在，跳过：${msg.slice(0, 80)}`)
      } else {
        console.error(`  ❌ 执行失败：${stmt.slice(0, 80)}`)
        console.error(`     原因：${msg}`)
        process.exit(1)
      }
    }
  }

  console.log(`  ✅ ${folder} 完成`)
}

console.log('\n🎉 所有 migration 已推送到 Turso！')
