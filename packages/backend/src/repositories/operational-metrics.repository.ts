import { sql } from "drizzle-orm";
import { db } from "../db/connection";
import type { DashboardOperationalMetrics } from "../types/dashboardOperationalMetrics";

export default class OperationalMetricsRepository {
  async getDashboardMetrics(): Promise<DashboardOperationalMetrics> {
    const result = await db.execute<{ fn_get_operational_dashboard_metrics: DashboardOperationalMetrics }>(
      sql`SELECT fn_get_operational_dashboard_metrics()`
    );

    const metrics = result[0]?.fn_get_operational_dashboard_metrics;

    if (!metrics) {
      throw new Error("Não foi possível carregar as métricas, tente novamente...");
    }

    return metrics;
  }
}
