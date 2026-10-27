import { sql } from "drizzle-orm";
import { db } from "../db/connection";
import { Route, type RouteHubData } from "../domain/Route.domain";

export interface CreateRouteDto {
  name: string;
  vehicle: string;
  hubs: string[];
  createdBy?: string | null | undefined;
}

export class RouteRepository {
  async listRoutes(dateString: string): Promise<Route[]> {
    try {
      const result = await db.execute<{
        data: Array<{
          id: string;
          name: string;
          vehicle: string;
          maxVolumeM3: number;
          maxRealWeight: number;
          hubs: RouteHubData[];
        }>;
      }>(sql`SELECT fn_get_routes(${dateString}) AS data`);

      const rawRoutes = result[0]?.data ?? [];

      return rawRoutes.map(
        (item) =>
          new Route({
            id: item.id,
            name: item.name,
            vehicle: item.vehicle,
            maxVolumeM3: item.maxVolumeM3,
            maxRealWeight: item.maxRealWeight,
            hubs: item.hubs ?? []
          })
      );
    } catch (error) {
      console.error("[RouteRepository.listRoutes] Erro ao carregar rotas:", error);
      return [];
    }
  }

  async createRoute(data: CreateRouteDto): Promise<void> {
    if (data.createdBy) {
      await db.execute(
        sql`INSERT INTO routes (name, vehicle_code, hubs, created_by) 
            VALUES (${data.name}, ${data.vehicle}, ${data.hubs}, ${data.createdBy}::uuid)`
      );
    } else {
      await db.execute(
        sql`INSERT INTO routes (name, vehicle_code, hubs) 
            VALUES (${data.name}, ${data.vehicle}, ${data.hubs})`
      );
    }
  }

  async deleteRoute(id: string): Promise<void> {
    await db.execute(sql`DELETE FROM routes WHERE id = ${id}::uuid`);
  }
}
