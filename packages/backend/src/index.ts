import "server-only";
import OperationalMetricsRepository from "./repositories/operational-metrics.repository";
import GetOperationalMetricsUseCase from "./use-cases/get-operational-metrics.use-case";
import { HubRepository } from "./repositories/hub.repository";

const getOperationalMetricsUseCase = new GetOperationalMetricsUseCase(new OperationalMetricsRepository());

export { getOperationalMetricsUseCase, userUseCase };
export type * from "./types/dashboardOperationalMetrics";
