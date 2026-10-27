export interface VehicleProps {
  id?: string | undefined;
  name: string;
  maxWeightKg?: number | undefined;
  maxVolumeM3?: number | undefined;
  isActive?: boolean | undefined;
}

export class Vehicle {
  readonly id: string | undefined;
  readonly name: string;
  readonly maxWeightKg: number;
  readonly maxVolumeM3: number;
  readonly isActive: boolean;

  constructor(props: VehicleProps) {
    this.id = props.id;
    this.name = props.name;
    this.maxWeightKg = Number(props.maxWeightKg) || 0;
    this.maxVolumeM3 = Number(props.maxVolumeM3) || 0;
    this.isActive = props.isActive ?? true;
  }

  toJSON(): VehicleProps {
    return {
      id: this.id,
      name: this.name,
      maxWeightKg: this.maxWeightKg,
      maxVolumeM3: this.maxVolumeM3,
      isActive: this.isActive
    };
  }
}
