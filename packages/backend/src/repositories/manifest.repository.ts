import { sql } from "drizzle-orm";
import { db } from "../db/connection";
import { manifestsTable, manifestFreightsTable } from "../db/schema";
import { Manifest } from "../domain/Manifest.domain";

export interface ListTransfersParams {
  unloadingPlace?: string;
}

export interface ManifestInsertDto {
  id: number;
  code: number;
  total_m3: number;
  total_weight_kg: number;
  total_invoices_value: number;
  unloading_places: string[] | null;
  estimated_arrival: Date | null;
  status: string;
  vehicle_plate: string;
  origin_hub: string;
}

export interface ManifestFreightRelationInsertDto {
  manifest_id: number;
  freight_id: number;
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

  async upsertMany(manifests: ManifestInsertDto[]): Promise<void> {
    if (manifests.length === 0) return;
    const CHUNK_SIZE = 500;
    try {
      for (let i = 0; i < manifests.length; i += CHUNK_SIZE) {
        const chunk = manifests.slice(i, i + CHUNK_SIZE);
        await db
          .insert(manifestsTable)
          .values(chunk)
          .onConflictDoUpdate({
            target: manifestsTable.id,
            set: {
              code: sql`excluded.code`,
              total_m3: sql`excluded.total_m3`,
              total_weight_kg: sql`excluded.total_weight_kg`,
              total_invoices_value: sql`excluded.total_invoices_value`,
              unloading_places: sql`excluded.unloading_places`,
              estimated_arrival: sql`excluded.estimated_arrival`,
              status: sql`excluded.status`,
              vehicle_plate: sql`excluded.vehicle_plate`,
              origin_hub: sql`excluded.origin_hub`
            }
          });
      }
    } catch (error) {
      console.error("[ManifestRepository.upsertMany] Erro ao salvar manifestos:", error);
      throw error;
    }
  }

  async upsertRelations(relations: ManifestFreightRelationInsertDto[]): Promise<void> {
    if (relations.length === 0) return;
    const CHUNK_SIZE = 500;
    try {
      for (let i = 0; i < relations.length; i += CHUNK_SIZE) {
        const chunk = relations.slice(i, i + CHUNK_SIZE);
        await db
          .insert(manifestFreightsTable)
          .values(chunk)
          .onConflictDoNothing();
      }
    } catch (error) {
      console.error("[ManifestRepository.upsertRelations] Erro ao salvar relações de manifesto e fretes:", error);
      throw error;
    }
  }
}
