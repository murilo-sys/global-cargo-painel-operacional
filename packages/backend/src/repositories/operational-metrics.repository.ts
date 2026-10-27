import { sql } from "drizzle-orm";
import { db } from "../db/connection";
import type { DashboardOperationalMetrics } from "../types/dashboardOperationalMetrics";
import type { Hub } from "../domain/Hub.domain";

export default class OperationalMetricsRepository {
  async getDashboardMetrics(hub: Hub): Promise<DashboardOperationalMetrics> {
    const result = await db.execute<{ fn_get_operational_dashboard_metrics: DashboardOperationalMetrics }>(
      sql`SELECT fn_get_operational_dashboard_metrics(
      p_current_filial := ${hub.filial},
              p_current_location := ${hub.location},
              p_current_hub := ${hub.code}
      )`
    );

    const metrics = result[0]?.fn_get_operational_dashboard_metrics;

    if (!metrics) {
      throw new Error("Não foi possível carregar as métricas, tente novamente...");
    }

    return metrics;
  }
}
