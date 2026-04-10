import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  // datasource.url is only needed for Prisma CLI migrate commands
  // Runtime connection is handled via lib/prisma.ts using env vars
  ...(process.env.DATABASE_URL
    ? { datasource: { url: process.env.DATABASE_URL } }
    : {}),
})
