import { defineConfig, env } from 'prisma/config'

// Prisma 7 does not read .env by itself; load it if present (production can set real env vars instead).
try {
  process.loadEnvFile(new URL('../.env', import.meta.url).pathname)
} catch {}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations', seed: 'node --env-file=.env server/seed/seed.js' },
  datasource: { url: env('DATABASE_URL') },
})
