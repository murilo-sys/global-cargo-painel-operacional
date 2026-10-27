import { desc, ne } from "drizzle-orm";
import { db } from "../db/connection";
import { syncHistoryTable } from "../db/schema";

export interface LastSyncRecord {
  id?: number | undefined;
  status: string;
  created_at?: string | undefined;
}

export class SyncRepository {
  async getLastSuccessfulSync(): Promise<LastSyncRecord | null> {
    try {
      const records = await db
        .select({
          id: syncHistoryTable.id,
          status: syncHistoryTable.status,
          created_at: syncHistoryTable.created_at
        })
        .from(syncHistoryTable)
        .where(ne(syncHistoryTable.status, "error"))
        .orderBy(desc(syncHistoryTable.created_at))
        .limit(1);

      const r = records[0];
      if (!r) {
        return null;
      }

      return {
        id: r.id,
        status: r.status ?? "none",
        created_at: r.created_at ? r.created_at.toISOString() : undefined
      };
    } catch (error) {
      console.error("[SyncRepository.getLastSuccessfulSync] Erro ao buscar último sincronismo:", error);
      return null;
    }
  }
}
