import type { PrismaClient } from "@prisma/client";

export const createHealthRepository = (prisma: PrismaClient) => ({
  async pingDatabase(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  },
});

export type HealthRepository = ReturnType<typeof createHealthRepository>;
