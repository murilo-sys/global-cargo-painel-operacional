export interface PickupProps {
  id: number;
  code: number | null;
  status: string | null;
  volumeM3: number | null;
  weightKg: number | null;
  invoiceValue: number | null;
  destinationHub: string | null;
  serviceDate: string | null;
  filial?: string | null;
}

export class Pickup {
  private props: PickupProps;

  constructor(props: PickupProps) {
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

  get volumeM3(): number | null {
    return this.props.volumeM3;
  }

  get weightKg(): number | null {
    return this.props.weightKg;
  }

  get invoiceValue(): number | null {
    return this.props.invoiceValue;
  }

  get destinationHub(): string | null {
    return this.props.destinationHub;
  }

  get serviceDate(): string | null {
    return this.props.serviceDate;
  }

  get filial(): string | null | undefined {
    return this.props.filial;
  }

  toJSON(): PickupProps {
    return { ...this.props };
  }
}
