import { sql } from "drizzle-orm";
import { db } from "../db/connection";
import { freightsTable } from "../db/schema";
import { Freight } from "../domain/Freight.domain";

export interface FreightInsertDto {
  id: number;
  destination_hub: string | null;
  origin_hub: string | null;
  status: string;
  modal: string;
  emission_type: string;
  freight_type: string;
  current_location: string | null;
  cte_number: number | null;
  minute_number: number | null;
  weight_kg: number;
  freight_weight: number;
  volume_m3: number;
  invoice_value: number;
  updated_at: string | null;
  last_synced_at: Date;
  is_disabled?: boolean;
}

export interface ListMocarFreightsParams {
  page: number;
  pageSize: number;
  hub?: string;
  modal?: string;
  daysAgo?: number;
}

export interface ListIssuancesFreightsParams {
  page: number;
  pageSize?: number;
  status: "Pendente" | "Emitido" | "Manifestado";
  daysAgo?: number;
}

export class FreightRepository {
  async listMocarFreights(params: ListMocarFreightsParams): Promise<Freight[]> {
    const page = Math.max(1, params.page || 1);
    const pageSize = Math.max(1, params.pageSize || 10);
    const offset = (page - 1) * pageSize;
    const daysAgo = params.daysAgo ?? 5;

    const conditions = [
      sql`freight_type IN ('CT-e', 'Minuta')`,
      sql`status IN ('Pendente', 'Standby', 'Manifestado')`,
      sql`current_location = 'GLOBAL AIR CARGO LTDA - SAO'`,
      sql`updated_at >= (CURRENT_DATE - ${daysAgo} * INTERVAL '1 day')`
    ];

    if (params.hub) {
      conditions.push(sql`destination_hub = ${params.hub}`);
    }

    if (params.modal) {
      conditions.push(sql`modal = ${params.modal}`);
    }

    const whereClause = sql.join(conditions, sql` AND `);

    try {
      const records = await db.execute<{
        id: number;
        destination_hub: string | null;
        modal: string | null;
        volume_m3: number;
        weight_kg: number;
        invoice_value: number;
        minute_number: number | null;
        status: string | null;
        cte_number: number | null;
        freight_weight: number;
        is_disabled: boolean;
      }>(
        sql`SELECT id, destination_hub, modal, volume_m3, weight_kg, invoice_value,
                   minute_number, status, cte_number, freight_weight, COALESCE(is_disabled, false) as is_disabled
            FROM freights
            WHERE ${whereClause}
            ORDER BY weight_kg DESC
            LIMIT ${pageSize} OFFSET ${offset}`
      );

      return (records as any[]).map(
        (r) =>
          new Freight({
            id: Number(r.id),
            destinationHub: r.destination_hub,
            modal: r.modal,
            volumeM3: Number(r.volume_m3),
            weightKg: Number(r.weight_kg),
            invoiceValue: Number(r.invoice_value),
            minuteNumber: r.minute_number ? Number(r.minute_number) : null,
            status: r.status,
            cteNumber: r.cte_number ? Number(r.cte_number) : null,
            freightWeight: Number(r.freight_weight),
            isDisabled: Boolean(r.is_disabled)
          })
      );
    } catch (error) {
      console.error("[FreightRepository.listMocarFreights] Erro ao buscar fretes mocar:", error);
      return [];
    }
  }

  async listIssuancesFreights(params: ListIssuancesFreightsParams): Promise<Freight[]> {
    const page = Math.max(1, params.page || 1);
    const pageSize = Math.max(1, params.pageSize || 10);
    const offset = (page - 1) * pageSize;
    const daysAgo = params.daysAgo ?? 5;

    const conditions = [
      sql`freight_type IN ('CT-e', 'Minuta')`,
      sql`current_location = 'GLOBAL AIR CARGO LTDA - SAO'`,
      sql`updated_at >= (CURRENT_DATE - ${daysAgo} * INTERVAL '1 day')`,
      sql`destination_hub != 'SAO'`,
      sql`issuance_status = ${params.status}`
    ];

    const whereClause = sql.join(conditions, sql` AND `);

    try {
      const records = await db.execute<{
        id: number;
        destination_hub: string | null;
        modal: string | null;
        volume_m3: number;
        weight_kg: number;
        invoice_value: number;
        minute_number: number | null;
        status: string | null;
        cte_number: number | null;
        freight_weight: number;
        is_disabled: boolean;
      }>(
        sql`SELECT id, destination_hub, modal, volume_m3, weight_kg, invoice_value,
                   minute_number, status, cte_number, freight_weight, COALESCE(is_disabled, false) as is_disabled
            FROM freights
            WHERE ${whereClause}
            ORDER BY weight_kg DESC
            LIMIT ${pageSize} OFFSET ${offset}`
      );

      return (records as any[]).map(
        (r) =>
          new Freight({
            id: Number(r.id),
            destinationHub: r.destination_hub,
            modal: r.modal,
            volumeM3: Number(r.volume_m3),
            weightKg: Number(r.weight_kg),
            invoiceValue: Number(r.invoice_value),
            minuteNumber: r.minute_number ? Number(r.minute_number) : null,
            status: r.status,
            cteNumber: r.cte_number ? Number(r.cte_number) : null,
            freightWeight: Number(r.freight_weight),
            isDisabled: Boolean(r.is_disabled)
          })
      );
    } catch (error) {
      console.error("[FreightRepository.listIssuancesFreights] Erro ao buscar fretes de emissão:", error);
      return [];
    }
  }

  async updateDisabledStatus(id: number, isDisabled: boolean): Promise<void> {
    try {
      await db.execute(
        sql`UPDATE freights SET is_disabled = ${isDisabled} WHERE id = ${id}`
      );
    } catch (error) {
      console.error("[FreightRepository.updateDisabledStatus] Erro ao atualizar status do frete:", error);
      throw error;
    }
  }

  async upsertMany(freights: FreightInsertDto[]): Promise<void> {
    if (freights.length === 0) return;
    const CHUNK_SIZE = 500;
    try {
      for (let i = 0; i < freights.length; i += CHUNK_SIZE) {
        const chunk = freights.slice(i, i + CHUNK_SIZE);
        await db
          .insert(freightsTable)
          .values(chunk)
          .onConflictDoUpdate({
            target: freightsTable.id,
            set: {
              destination_hub: sql`excluded.destination_hub`,
              origin_hub: sql`excluded.origin_hub`,
              status: sql`excluded.status`,
              modal: sql`excluded.modal`,
              emission_type: sql`excluded.emission_type`,
              freight_type: sql`excluded.freight_type`,
              current_location: sql`excluded.current_location`,
              cte_number: sql`excluded.cte_number`,
              minute_number: sql`excluded.minute_number`,
              weight_kg: sql`excluded.weight_kg`,
              freight_weight: sql`excluded.freight_weight`,
              volume_m3: sql`excluded.volume_m3`,
              invoice_value: sql`excluded.invoice_value`,
              updated_at: sql`excluded.updated_at`,
              last_synced_at: sql`excluded.last_synced_at`
            }
          });
      }
    } catch (error) {
      console.error("[FreightRepository.upsertMany] Erro ao sincronizar fretes:", error);
      throw error;
    }
  }

  async deleteMissing(updatedAtGte: string, lastSyncedAtLt: string): Promise<void> {
    try {
      await db.execute(
        sql`DELETE FROM freights 
            WHERE updated_at >= ${updatedAtGte}::date 
              AND last_synced_at < ${lastSyncedAtLt}::timestamp`
      );
    } catch (error) {
      console.error("[FreightRepository.deleteMissing] Erro ao deletar fretes ausentes:", error);
      throw error;
    }
  }
}
