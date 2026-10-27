import { HubRepository, type HubRegionData } from "../repositories/hub.repository";
import { RouteRepository } from "../repositories/route.repository";
import { VehicleRepository } from "../repositories/vehicle.repository";
import type { Route } from "../domain/Route.domain";
import type { Vehicle } from "../domain/Vehicle.domain";

export interface RoutesDashboardData {
  hubs: HubRegionData[];
  routes: Route[];
  vehicles: Vehicle[];
}

export class GetRoutesUseCase {
  constructor(
    private routeRepository: RouteRepository,
    private hubRepository: HubRepository,
    private vehicleRepository: VehicleRepository
  ) {}

  async execute(daysAgo = 5): Promise<RoutesDashboardData> {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - daysAgo);

    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });

    const dateString = `${formatter.format(targetDate)}T00:00:00.000Z`;

    const [hubs, routes, vehicles] = await Promise.all([
      this.hubRepository.listRodoHubs(),
      this.routeRepository.listRoutes(dateString),
      this.vehicleRepository.listActiveVehicles()
    ]);

    return { hubs, routes, vehicles };
  }
}
