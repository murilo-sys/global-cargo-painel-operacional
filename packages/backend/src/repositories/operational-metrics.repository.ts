import { sql } from "drizzle-orm";
import { db } from "../db/connection";

export default class OperationalMetricsRepository {
  async getMetrics() {
    return await db.execute(sql`SELECT fn_get_operational_dashboard_metrics()`);
  }
}
