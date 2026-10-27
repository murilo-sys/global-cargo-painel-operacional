import type { VehicleProps } from "@roteirizador/backend";

interface VehicleCheckProps {
  vehicles: VehicleProps[];
}

export default function VehicleCheck({ vehicles }: VehicleCheckProps) {
  return (
    <div className="flex flex-col gap-1 bg-blue-950 rounded-2xl px-6 py-2">
      <p className="font-bold text-2xl">VEÍCULO</p>
      <div className="flex flex-col">
        {vehicles.map((vehicle) => (
          <label key={vehicle.name} className="flex items-center gap-2 cursor-pointer text-lg">
            <input type="radio" name="vehicle" value={vehicle.name} />
            {vehicle.name}
          </label>
        ))}
      </div>
    </div>
  );
}
