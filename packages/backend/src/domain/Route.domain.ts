export interface RouteHubData {
  code: string;
  color: string;
  totalVolumeM3: number;
  totalRealWeight: number;
  totalInvoiceValue: number;
  totalFreightWeight: number;
}

export interface RouteProps {
  id: string;
  name: string;
  vehicle: string;
  maxVolumeM3: number;
  maxRealWeight: number;
  hubs: RouteHubData[];
}

export class Route {
  readonly id: string;
  readonly name: string;
  readonly vehicle: string;
  readonly maxVolumeM3: number;
  readonly maxRealWeight: number;
  readonly hubs: RouteHubData[];

  constructor(props: RouteProps) {
    this.id = String(props.id);
    this.name = props.name;
    this.vehicle = props.vehicle;
    this.maxVolumeM3 = Number(props.maxVolumeM3) || 0;
    this.maxRealWeight = Number(props.maxRealWeight) || 0;
    this.hubs = props.hubs ?? [];
  }

  get totalVolume(): number {
    return this.hubs.reduce((acc, hub) => acc + (hub.totalVolumeM3 || 0), 0);
  }

  get totalRealWeight(): number {
    return this.hubs.reduce((acc, hub) => acc + (hub.totalRealWeight || 0), 0);
  }

  get totalInvoiceValue(): number {
    return this.hubs.reduce((acc, hub) => acc + (hub.totalInvoiceValue || 0), 0);
  }

  get totalFreightWeight(): number {
    return this.hubs.reduce((acc, hub) => acc + (hub.totalFreightWeight || 0), 0);
  }

  get volumeOccupancyPercentage(): number {
    if (this.maxVolumeM3 <= 0) return 0;
    return (this.totalVolume / this.maxVolumeM3) * 100;
  }

  get weightOccupancyPercentage(): number {
    if (this.maxRealWeight <= 0) return 0;
    return (this.totalRealWeight / this.maxRealWeight) * 100;
  }

  toJSON(): RouteProps {
    return {
      id: this.id,
      name: this.name,
      vehicle: this.vehicle,
      maxVolumeM3: this.maxVolumeM3,
      maxRealWeight: this.maxRealWeight,
      hubs: this.hubs
    };
  }
}
