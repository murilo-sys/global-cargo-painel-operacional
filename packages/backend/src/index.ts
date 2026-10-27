import "server-only";

// Repositórios
import OperationalMetricsRepository from "./repositories/operational-metrics.repository";
import { HubRepository } from "./repositories/hub.repository";
import { RouteRepository } from "./repositories/route.repository";
import { VehicleRepository } from "./repositories/vehicle.repository";
import { FreightRepository } from "./repositories/freight.repository";
import { PickupRepository } from "./repositories/pickup.repository";
import { ManifestRepository } from "./repositories/manifest.repository";
import { SyncRepository } from "./repositories/sync.repository";

// Casos de Uso
import GetOperationalMetricsUseCase from "./use-cases/get-operational-metrics.use-case";
import { GetRoutesUseCase } from "./use-cases/get-routes.use-case";
import { ManageRouteUseCase } from "./use-cases/manage-route.use-case";
import { GetMocarDetailUseCase } from "./use-cases/get-mocar-detail.use-case";
import { ToggleFreightStatusUseCase } from "./use-cases/toggle-freight-status.use-case";
import { GetIssuancesDetailUseCase } from "./use-cases/get-issuances-detail.use-case";
import { GetPickupsDetailUseCase } from "./use-cases/get-pickups-detail.use-case";
import { GetManifestsDetailUseCase } from "./use-cases/get-manifests-detail.use-case";
import { GetLastSyncUseCase } from "./use-cases/get-last-sync.use-case";

// Instâncias
const operationalMetricsRepository = new OperationalMetricsRepository();
const hubRepository = new HubRepository();
const routeRepository = new RouteRepository();
const vehicleRepository = new VehicleRepository();
const freightRepository = new FreightRepository();
const pickupRepository = new PickupRepository();
const manifestRepository = new ManifestRepository();
const syncRepository = new SyncRepository();

const getOperationalMetricsUseCase = new GetOperationalMetricsUseCase(operationalMetricsRepository);
const getRoutesUseCase = new GetRoutesUseCase(routeRepository, hubRepository, vehicleRepository);
const manageRouteUseCase = new ManageRouteUseCase(routeRepository);
const getMocarDetailUseCase = new GetMocarDetailUseCase(freightRepository);
const toggleFreightStatusUseCase = new ToggleFreightStatusUseCase(freightRepository);
const getIssuancesDetailUseCase = new GetIssuancesDetailUseCase(freightRepository);
const getPickupsDetailUseCase = new GetPickupsDetailUseCase(pickupRepository);
const getManifestsDetailUseCase = new GetManifestsDetailUseCase(manifestRepository);
const getLastSyncUseCase = new GetLastSyncUseCase(syncRepository);

// Domínio (POO)
export { Hub } from "./domain/Hub.domain";
export { Route, type RouteHubData, type RouteProps } from "./domain/Route.domain";
export { Vehicle, type VehicleProps } from "./domain/Vehicle.domain";
export { Freight, type FreightProps } from "./domain/Freight.domain";
export { Pickup, type PickupProps } from "./domain/Pickup.domain";
export { Manifest, type ManifestProps } from "./domain/Manifest.domain";

// Repositórios
export {
  operationalMetricsRepository,
  hubRepository,
  routeRepository,
  vehicleRepository,
  freightRepository,
  pickupRepository,
  manifestRepository,
  syncRepository
};
export { SyncRepository, type LastSyncRecord } from "./repositories/sync.repository";
export type { HubRegionData } from "./repositories/hub.repository";
export type { CreateRouteDto } from "./repositories/route.repository";
export type { ListMocarFreightsParams, ListIssuancesFreightsParams } from "./repositories/freight.repository";
export type { ListPickupsParams } from "./repositories/pickup.repository";
export type { ListTransfersParams } from "./repositories/manifest.repository";

// Casos de Uso
export {
  getOperationalMetricsUseCase,
  getRoutesUseCase,
  manageRouteUseCase,
  getMocarDetailUseCase,
  toggleFreightStatusUseCase,
  getIssuancesDetailUseCase,
  getPickupsDetailUseCase,
  getManifestsDetailUseCase,
  getLastSyncUseCase
};

// Tipos
export type * from "./types/dashboardOperationalMetrics";
