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

  const routeTotals = route.hubs.reduce(
    (acc, hub) => ({
      m3: acc.m3 + (hub.totalVolumeM3 || 0),
      invoiceValue: acc.invoiceValue + (hub.totalInvoiceValue || 0),
      realWeight: acc.realWeight + (hub.totalRealWeight || 0),
      freightWeight: acc.freightWeight + (hub.totalFreightWeight || 0)
    }),
    { m3: 0, invoiceValue: 0, realWeight: 0, freightWeight: 0 }
  );

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full">
        {/* Cards Individuais dos Hubs */}
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

        {/* Card Totalizador da Rota (no final) */}
        <div className="w-full">
          <HubCard
            code="TOTAL"
            color="#0f172a"
            realWeight={routeTotals.realWeight}
            m3={routeTotals.m3}
            invoiceValue={routeTotals.invoiceValue}
            freightWeight={routeTotals.freightWeight}
            disableLink
          />
        </div>
      </div>
    </div>
  );
}
