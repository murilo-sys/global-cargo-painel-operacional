import { and, asc, eq } from "drizzle-orm";
import { db } from "../db/connection";
import { hubsTable } from "../db/schema";

export interface HubRegionData {
  code: string;
  region: string;
}

export class HubRepository {
  async listAllHubs(): Promise<string[]> {
    try {
      const records = await db
        .select({ code: hubsTable.code })
        .from(hubsTable)
        .where(eq(hubsTable.is_active, true))
        .orderBy(asc(hubsTable.code));

      const hubs = records.map((h) => h.code);
      return hubs.length > 0 ? hubs : ["SAO"];
    } catch {
      return ["SAO"];
    }
  }

  async listRodoHubs(): Promise<HubRegionData[]> {
    try {
      const records = await db
        .select({ code: hubsTable.code, region: hubsTable.region })
        .from(hubsTable)
        .where(and(eq(hubsTable.is_active, true), eq(hubsTable.modal, "rodo")))
        .orderBy(asc(hubsTable.region), asc(hubsTable.code));

      return records;
    } catch (error) {
      console.error("[HubRepository.listRodoHubs] Erro ao listar hubs rodoviários:", error);
      return [];
    }
  }
}
