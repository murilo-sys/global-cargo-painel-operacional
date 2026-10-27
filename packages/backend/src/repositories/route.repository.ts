import { eq, sql } from "drizzle-orm";
import { db } from "../db/connection";
import { routesTable } from "../db/schema";
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
    try {
      await db.insert(routesTable).values({
        name: data.name,
        vehicle_code: data.vehicle,
        hubs: data.hubs,
        created_by: data.createdBy ?? null
      });
    } catch (error) {
      console.error("[RouteRepository.createRoute] Erro ao criar rota:", error);
      throw error;
    }
  }

  async deleteRoute(id: string): Promise<void> {
    try {
      await db.delete(routesTable).where(eq(routesTable.id, id));
    } catch (error) {
      console.error("[RouteRepository.deleteRoute] Erro ao deletar rota:", error);
      throw error;
    }
  }
}
