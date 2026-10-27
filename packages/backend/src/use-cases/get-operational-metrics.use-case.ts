import { Hub } from "../domain/Hub.domain";
import OperationalMetricsRepository from "../repositories/operational-metrics.repository";
import type { DashboardOperationalMetrics } from "../types/dashboardOperationalMetrics";

export default class GetOperationalMetricsUseCase {
  constructor(private repository: OperationalMetricsRepository) {}

  async dashboardMetrics(hub: string): Promise<DashboardOperationalMetrics> {
    return await this.repository.getDashboardMetrics(new Hub(hub));
  }
}
