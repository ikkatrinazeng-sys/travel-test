import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  // For local dev: falls back to local SQLite
  // For production migration: set DATABASE_URL to Turso libsql:// URL
  // Note: prisma migrate deploy doesn't support libsql:// scheme directly;
  // use scripts/turso-migrate.mjs for Turso deployments instead.
  datasource: {
    url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
  },
})
