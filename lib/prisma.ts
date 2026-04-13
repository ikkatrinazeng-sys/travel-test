import { PrismaLibSql } from '@prisma/adapter-libsql'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createPrismaClient(): any {
  const url = process.env.DATABASE_URL ?? 'file:./prisma/dev.db'
  const authToken = process.env.DATABASE_AUTH_TOKEN

  // LibSQL adapter 同时支持本地 file: 路径和远程 libsql:// URL
  const adapter = new PrismaLibSql({ url, authToken })
  return new PrismaClient({ adapter })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = globalThis as unknown as { prisma: any }

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
