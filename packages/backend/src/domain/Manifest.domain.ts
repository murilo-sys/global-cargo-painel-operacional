export interface ManifestProps {
  id: number;
  code: number | null;
  status: string | null;
  originHub: string | null;
  estimatedArrival: string | null;
  vehiclePlate: string | null;
  totalM3: number | null;
  totalWeightKg: number | null;
  totalInvoicesValue: number | null;
}

export class Manifest {
  private props: ManifestProps;

  constructor(props: ManifestProps) {
    this.props = { ...props };
  }

  get id(): number {
    return this.props.id;
  }

  get code(): number | null {
    return this.props.code;
  }

  get status(): string | null {
    return this.props.status;
  }

  get originHub(): string | null {
    return this.props.originHub;
  }

  get estimatedArrival(): string | null {
    return this.props.estimatedArrival;
  }

  get vehiclePlate(): string | null {
    return this.props.vehiclePlate;
  }

  get totalM3(): number | null {
    return this.props.totalM3;
  }

  get totalWeightKg(): number | null {
    return this.props.totalWeightKg;
  }

  get totalInvoicesValue(): number | null {
    return this.props.totalInvoicesValue;
  }

  toJSON(): ManifestProps {
    return { ...this.props };
  }
}
