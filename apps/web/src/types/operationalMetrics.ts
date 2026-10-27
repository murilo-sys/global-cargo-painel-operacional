export interface PickupStatusValue {
  m3: number;
  realWeight: number;
}

export interface ManifestValues {
  manifestCode: number;
  estimatedArrival: Date | null;
  totalM3: number;
  realWeight: number;
  originHub: string | null;
}

export interface HubValues {
  m3: number;
  realWeight: number;
  invoiceValue: number;
  freightWeight: number;
}

export interface TransitStatus<T> {
  inTransit: T;
  collected: T;
}

export type PickupMetrics = TransitStatus<PickupStatusValue>;

export type ManifestMetrics = {
  manifests: ManifestValues[];
  metrics: HubValues;
};

export interface MocarMetrics {
  m3: number;
  realWeight: number;
}

export interface IssuanceMetrics {
  pendings: number;
  manifested: number;
  issued: number;
}

export interface Hub {
  code: string;
  color: string;
  wareHouse: HubValues;
  transfer: HubValues;
  pickup: TransitStatus<HubValues>;
}

export interface DashboardHub extends Hub {
  total: HubValues;
}

export type WareHouseHubs = Hub[];

export interface OperationalMetrics<THub = Hub[]> {
  pickups: PickupMetrics;
  manifest: ManifestMetrics;
  wareHouseHubs: THub;
  issuances: IssuanceMetrics;
  mocar: MocarMetrics;
}
