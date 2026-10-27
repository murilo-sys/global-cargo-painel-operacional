import { sql } from "drizzle-orm";
import { db } from "../db/connection";
import { pickupsTable } from "../db/schema";
import { Pickup } from "../domain/Pickup.domain";

export interface ListPickupsParams {
  status?: "Em trânsito" | "Coletada";
  daysAgo?: number;
  filial?: string;
}

export interface PickupInsertDto {
  id: number;
  code: number;
  volume_m3: number;
  weight_kg: number;
  invoice_value: number;
  destination_hub: string | null;
  service_date: Date | null;
  request_date: Date;
  status: string;
  filial: string;
}

export class PickupRepository {
  async listPickups(params?: ListPickupsParams): Promise<Pickup[]> {
    const daysAgo = params?.daysAgo ?? 0;
    const filial = params?.filial ?? "SAO GLOBAL CARGO";

    const conditions = [
      sql`status IN ('Em trânsito', 'Coletada')`,
      sql`filial = ${filial}`
    ];

    if (daysAgo > 0) {
      conditions.push(sql`service_date >= (CURRENT_DATE - ${daysAgo} * INTERVAL '1 day')`);
    }

    if (params?.status) {
      conditions.push(sql`status = ${params.status}`);
    }

    const whereClause = sql.join(conditions, sql` AND `);

    try {
      const records = await db.execute<{
        id: number;
        code: number | null;
        status: string | null;
        volume_m3: number | null;
        weight_kg: number | null;
        invoice_value: number | null;
        destination_hub: string | null;
        service_date: string | null;
        filial: string | null;
      }>(
        sql`SELECT id, code, status, volume_m3, weight_kg, invoice_value, destination_hub, service_date, filial
            FROM pickups
            WHERE ${whereClause}
            ORDER BY service_date DESC`
      );

      return (records as any[]).map(
        (r) =>
          new Pickup({
            id: Number(r.id),
            code: r.code !== null ? Number(r.code) : null,
            status: r.status,
            volumeM3: r.volume_m3 !== null ? Number(r.volume_m3) : null,
            weightKg: r.weight_kg !== null ? Number(r.weight_kg) : null,
            invoiceValue: r.invoice_value !== null ? Number(r.invoice_value) : null,
            destinationHub: r.destination_hub,
            serviceDate: r.service_date ? String(r.service_date) : null,
            filial: r.filial
          })
      );
    } catch (error) {
      console.error("[PickupRepository.listPickups] Erro ao listar coletas:", error);
      return [];
    }
  }

  async upsertMany(pickups: PickupInsertDto[]): Promise<void> {
    if (pickups.length === 0) return;
    const CHUNK_SIZE = 500;
    try {
      for (let i = 0; i < pickups.length; i += CHUNK_SIZE) {
        const chunk = pickups.slice(i, i + CHUNK_SIZE);
        await db
          .insert(pickupsTable)
          .values(chunk)
          .onConflictDoUpdate({
            target: pickupsTable.id,
            set: {
              code: sql`excluded.code`,
              volume_m3: sql`excluded.volume_m3`,
              weight_kg: sql`excluded.weight_kg`,
              invoice_value: sql`excluded.invoice_value`,
              destination_hub: sql`excluded.destination_hub`,
              service_date: sql`excluded.service_date`,
              request_date: sql`excluded.request_date`,
              status: sql`excluded.status`,
              filial: sql`excluded.filial`
            }
          });
      }
    } catch (error) {
      console.error("[PickupRepository.upsertMany] Erro ao salvar coletas:", error);
      throw error;
    }
  }
}
