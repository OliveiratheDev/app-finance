import type { FastifyInstance } from "fastify";
import type { HealthService } from "./health.service";

export const registerHealthRoutes = (app: FastifyInstance, service: HealthService) => {
  app.get("/health", async (_request, reply) => {
    const result = await service.check();
    return reply.code(result.status === "ok" ? 200 : 503).send(result);
  });
};
