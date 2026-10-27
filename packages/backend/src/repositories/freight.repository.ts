import { sql } from "drizzle-orm";
import { db } from "../db/connection";
import { Freight } from "../domain/Freight.domain";

export interface ListMocarFreightsParams {
  page: number;
  pageSize: number;
  hub?: string;
  modal?: string;
  daysAgo?: number;
}

export class FreightRepository {
  async listMocarFreights(params: ListMocarFreightsParams): Promise<Freight[]> {
    const page = Math.max(1, params.page || 1);
    const pageSize = Math.max(1, params.pageSize || 10);
    const offset = (page - 1) * pageSize;
    const daysAgo = params.daysAgo ?? 5;

    // Constrói condições dinâmicas de forma segura
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

  async updateDisabledStatus(id: number, isDisabled: boolean): Promise<void> {
    await db.execute(
      sql`UPDATE freights SET is_disabled = ${isDisabled} WHERE id = ${id}`
    );
  }
}
