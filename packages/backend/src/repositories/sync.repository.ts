import { desc, eq, ne } from "drizzle-orm";
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

  async createPendingSync(): Promise<number> {
    try {
      const [inserted] = await db
        .insert(syncHistoryTable)
        .values({ status: "pending" })
        .returning({ id: syncHistoryTable.id });

      if (!inserted) {
        throw new Error("Não foi possível gerar ID para a sincronização");
      }

      return inserted.id;
    } catch (error) {
      console.error("[SyncRepository.createPendingSync] Erro ao criar registro de sincronismo:", error);
      throw error;
    }
  }

  async updateSyncStatus(id: number, status: string): Promise<void> {
    try {
      await db
        .update(syncHistoryTable)
        .set({ status })
        .where(eq(syncHistoryTable.id, id));
    } catch (error) {
      console.error("[SyncRepository.updateSyncStatus] Erro ao atualizar status do sincronismo:", error);
      throw error;
    }
  }
}
