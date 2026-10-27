import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { vehicleTypesTable } from "../db/schema";
import { Vehicle } from "../domain/Vehicle.domain";

export class VehicleRepository {
  async listActiveVehicles(): Promise<Vehicle[]> {
    try {
      const records = await db
        .select({
          id: vehicleTypesTable.id,
          name: vehicleTypesTable.name,
          maxWeightKg: vehicleTypesTable.max_weight_kg,
          maxVolumeM3: vehicleTypesTable.max_volume_m3,
          isActive: vehicleTypesTable.is_active
        })
        .from(vehicleTypesTable)
        .where(eq(vehicleTypesTable.is_active, true));

      return records.map(
        (r) =>
          new Vehicle({
            id: r.id,
            name: r.name,
            maxWeightKg: Number(r.maxWeightKg),
            maxVolumeM3: Number(r.maxVolumeM3),
            isActive: Boolean(r.isActive)
          })
      );
    } catch (error) {
      console.error("[VehicleRepository.listActiveVehicles] Erro ao listar veículos:", error);
      return [];
    }
  }
}
