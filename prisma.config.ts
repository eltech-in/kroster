import 'dotenv/config'
import { defineConfig } from 'prisma/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
})
