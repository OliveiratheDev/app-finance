import type { HealthResponse } from "./health.schemas";

type HealthDeps = {
  pingDatabase: () => Promise<boolean>;
};

export const createHealthService = ({ pingDatabase }: HealthDeps) => ({
  async check(): Promise<HealthResponse> {
    const dbUp = await pingDatabase();
    return {
      status: dbUp ? "ok" : "degraded",
      database: dbUp ? "up" : "down",
    };
  },
});

export type HealthService = ReturnType<typeof createHealthService>;
