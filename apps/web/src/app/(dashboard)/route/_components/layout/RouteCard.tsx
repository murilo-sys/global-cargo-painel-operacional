"use client";

import type { RouteProps } from "@roteirizador/backend";
import RouteCapacityBar from "./RouteCapacityBar";
import Image from "next/image";
import HubCard from "@/components/layout/dashboard/hub/HubCard";
import { deleteRouteAction } from "../../_actions/deleteRoute.action";
import DeleteButton from "../ui/DeleteButton";
import { useActionState } from "react";

interface RouteCardProps {
  route: RouteProps;
}

export default function RouteCard({ route }: RouteCardProps) {
  const [, formAction, isPending] = useActionState(deleteRouteAction, null);

  return (
    <div className="w-full bg-blue-900 rounded-xl py-5 px-6 flex flex-col gap-4 slide-in-from-bottom-5 animate-in fade-in duration-800">
      {/* Headers */}
      <div className="flex flex-row justify-between">
        <p className="font-bold text-2xl tracking-wide">{route.name.toLocaleUpperCase()}</p>
        <DeleteButton disabled={isPending} id={route.id} formAction={formAction} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="flex flex-col gap-4 col-span-2 w-full max-w-300">
          <RouteCapacityBar
            title="Peso Real"
            unit="kg"
            maxValue={route.maxRealWeight}
            hubs={route.hubs}
            getValue={(hub) => hub.totalRealWeight}
          />

          <RouteCapacityBar
            title="Volume"
            unit="m³"
            maxValue={route.maxVolumeM3}
            hubs={route.hubs}
            getValue={(hub) => hub.totalVolumeM3}
          />
        </div>

        <div className="flex justify-center items-center w-full">
          <Image
            src={`/pages/routes/${route.vehicle.toLowerCase()}.webp`}
            alt={`Imagem ${route.vehicle}`}
            width={400}
            height={104}
            unoptimized
            className="w-auto h-32 object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full">
        {route.hubs.map((value) => (
          <div className="w-full" key={value.code}>
            <HubCard
              realWeight={value.totalRealWeight}
              m3={value.totalVolumeM3}
              invoiceValue={value.totalInvoiceValue}
              freightWeight={value.totalFreightWeight}
              color={value.color}
              code={value.code}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
