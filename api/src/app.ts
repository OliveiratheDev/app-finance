import Fastify from "fastify";
import { prisma } from "./lib/prisma";
import { createHealthRepository } from "./modules/health/health.repository";
import { registerHealthRoutes } from "./modules/health/health.routes";
import { createHealthService } from "./modules/health/health.service";

export const buildApp = () => {
  const app = Fastify({ logger: true });

  const healthRepository = createHealthRepository(prisma);
  const healthService = createHealthService({
    pingDatabase: healthRepository.pingDatabase,
  });
  registerHealthRoutes(app, healthService);

  app.addHook("onClose", async () => {
    await prisma.$disconnect();
  });

  return app;
};
