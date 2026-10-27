export interface Route {
  hubs: Hub[];
  id: string;
  vehicle: string;
  name: string;
  maxVolumeM3: number;
  maxRealWeight: number;
}

export interface Hub {
  code: string;
  color: string;
  totalVolumeM3: number;
  totalRealWeight: number;
  totalInvoiceValue: number;
  totalFreightWeight: number;
}

export interface Regions {
  region: string;
  hubs: string[];
}
