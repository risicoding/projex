import { PrismaClient } from '@prisma/client'

// Declare global type to ensure compatibility
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a Prisma client instance with Accelerate extension
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Optional: Log queries for debugging
  })

// Ensure Prisma client instance is reused in non-production environments
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

