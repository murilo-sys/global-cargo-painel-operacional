export interface BaseValues {
  m3: number;
  realWeight: number;
}

export interface PickupsMetrics {
  collected: BaseValues;
  inTransit: BaseValues;
}

export interface IssuancesMetrics {
  issued: number;
  pendings: number;
  manifested: number;
}

export interface ManifestTotals extends BaseValues {
  invoiceValue: number;
  freightWeight: number;
}

export interface Manifest extends BaseValues {
  originHub: string;
  manifestCode: number;
  estimatedArrival?: string;
}

export interface ManifestMetrics {
  totals: ManifestTotals;
  manifests: Manifest[];
}

export interface HubTransportValues extends BaseValues {
  invoiceValue: number;
}

export interface HubPickupsStatus {
  collected: HubTransportValues;
  inTransit: HubTransportValues;
}

export interface HubCargoValues extends HubTransportValues {
  freightWeight: number;
}

export interface Hub {
  code: string;
  color: string;
  pickups: HubPickupsStatus;
  transfers: HubCargoValues;
  warehouse: HubCargoValues;
}

export interface DashboardOperationalMetrics {
  mocar: BaseValues;
  pickups: PickupsMetrics;
  issuances: IssuancesMetrics;
  manifests: ManifestMetrics;
  hubs: Hub[];
}
