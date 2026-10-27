export interface FreightProps {
  id: number;
  destinationHub: string | null;
  modal: string | null;
  volumeM3: number;
  weightKg: number;
  invoiceValue: number;
  minuteNumber: number | null;
  status: string | null;
  cteNumber: number | null;
  freightWeight: number;
  isDisabled: boolean;
}

export class Freight {
  readonly id: number;
  readonly destinationHub: string | null;
  readonly modal: string | null;
  readonly volumeM3: number;
  readonly weightKg: number;
  readonly invoiceValue: number;
  readonly minuteNumber: number | null;
  readonly status: string | null;
  readonly cteNumber: number | null;
  readonly freightWeight: number;
  readonly isDisabled: boolean;

  constructor(props: FreightProps) {
    this.id = props.id;
    this.destinationHub = props.destinationHub;
    this.modal = props.modal;
    this.volumeM3 = Number(props.volumeM3) || 0;
    this.weightKg = Number(props.weightKg) || 0;
    this.invoiceValue = Number(props.invoiceValue) || 0;
    this.minuteNumber = props.minuteNumber;
    this.status = props.status;
    this.cteNumber = props.cteNumber;
    this.freightWeight = Number(props.freightWeight) || 0;
    this.isDisabled = Boolean(props.isDisabled);
  }

  get documentNumber(): string {
    if (this.cteNumber) return String(this.cteNumber);
    if (this.minuteNumber) return String(this.minuteNumber);
    return "N/A";
  }

  get eslEditUrl(): string {
    return `https://globalcargo.eslcloud.com.br/freights/${this.id}/edit`;
  }

  toJSON(): FreightProps {
    return {
      id: this.id,
      destinationHub: this.destinationHub,
      modal: this.modal,
      volumeM3: this.volumeM3,
      weightKg: this.weightKg,
      invoiceValue: this.invoiceValue,
      minuteNumber: this.minuteNumber,
      status: this.status,
      cteNumber: this.cteNumber,
      freightWeight: this.freightWeight,
      isDisabled: this.isDisabled
    };
  }
}
