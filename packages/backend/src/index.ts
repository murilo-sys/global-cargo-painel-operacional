import "server-only";
import OperationalMetricsRepository from "./repositories/operational-metrics.repository";
import GetOperationalMetricsUseCase from "./use-cases/get-operational-metrics.use-case";

const getOperationalMetricsUseCase = new GetOperationalMetricsUseCase(new OperationalMetricsRepository());

export { getOperationalMetricsUseCase };
export type * from "./types/dashboardOperationalMetrics";
