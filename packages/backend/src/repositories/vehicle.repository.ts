import { sql } from "drizzle-orm";
import { db } from "../db/connection";
import { Vehicle } from "../domain/Vehicle.domain";

export class VehicleRepository {
  async listActiveVehicles(): Promise<Vehicle[]> {
    try {
      const records = await db.execute<{
        id: string;
        name: string;
        max_weight_kg: string | number;
        max_volume_m3: string | number;
        is_active: boolean;
      }>(
        sql`SELECT id, name, max_weight_kg, "max_volume_m³" AS max_volume_m3, is_active FROM vehicle_types WHERE is_active = true`
      );

      return (records as any[]).map(
        (r) =>
          new Vehicle({
            id: String(r.id),
            name: r.name,
            maxWeightKg: Number(r.max_weight_kg),
            maxVolumeM3: Number(r.max_volume_m3),
            isActive: Boolean(r.is_active)
          })
      );
    } catch (error) {
      console.error("[VehicleRepository.listActiveVehicles] Erro ao listar veículos:", error);
      return [];
    }
  }
}
