import { sql } from "drizzle-orm";
import { db } from "../db/connection";
import { Manifest } from "../domain/Manifest.domain";

export interface ListTransfersParams {
  unloadingPlace?: string;
}

export class ManifestRepository {
  async listActiveTransfers(params?: ListTransfersParams): Promise<Manifest[]> {
    const unloadingPlace = params?.unloadingPlace ?? "SAO GLOBAL CARGO";

    try {
      const records = await db.execute<{
        id: number;
        code: number | null;
        status: string | null;
        origin_hub: string | null;
        estimated_arrival: string | null;
        vehicle_plate: string | null;
        total_m3: number | null;
        total_weight_kg: number | null;
        total_invoices_value: number | null;
      }>(
        sql`SELECT id, code, status, origin_hub, estimated_arrival, vehicle_plate,
                   total_m3, total_weight_kg, total_invoices_value
            FROM manifests
            WHERE status = 'Em trânsito'
              AND ${unloadingPlace} = ANY(unloading_places)
            ORDER BY total_weight_kg DESC`
      );

      return (records as any[]).map(
        (r) =>
          new Manifest({
            id: Number(r.id),
            code: r.code !== null ? Number(r.code) : null,
            status: r.status,
            originHub: r.origin_hub,
            estimatedArrival: r.estimated_arrival ? String(r.estimated_arrival) : null,
            vehiclePlate: r.vehicle_plate,
            totalM3: r.total_m3 !== null ? Number(r.total_m3) : null,
            totalWeightKg: r.total_weight_kg !== null ? Number(r.total_weight_kg) : null,
            totalInvoicesValue: r.total_invoices_value !== null ? Number(r.total_invoices_value) : null
          })
      );
    } catch (error) {
      console.error("[ManifestRepository.listActiveTransfers] Erro ao listar transferências:", error);
      return [];
    }
  }
}
