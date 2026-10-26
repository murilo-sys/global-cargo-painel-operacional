import "server-only";
import OperationalMetricsRepository from "./repositories/operational-metrics.repository";
import GetOperationalMetricsUseCase from "./use-cases/get-operational-metrics.use-case";
import { HubRepository } from "./repositories/hub.repository";
import { UserUseCase } from "./use-cases/user.use-case";

const getOperationalMetricsUseCase = new GetOperationalMetricsUseCase(new OperationalMetricsRepository());

const userUseCase = new UserUseCase(new HubRepository());

export { getOperationalMetricsUseCase, userUseCase };
export type * from "./types/dashboardOperationalMetrics";
