import { PrismaClient, Prisma } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

export const PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
