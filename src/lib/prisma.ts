import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL não definida!')
}

const pool = new Pool({
  connectionString: `${connectionString}?sslmode=no-verify`,
  ssl: { rejectUnauthorized: false },
  max: 5,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
})

const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({
  adapter,
  log: ['query', 'info', 'warn', 'error'],
})
