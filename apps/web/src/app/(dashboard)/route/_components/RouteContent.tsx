"use client";

import RegionsCheck from "@/components/layout/dashboard/route/RegionsCheck";
import VehicleCheck from "@/components/layout/dashboard/route/VehicleCheck";
import type { HubRegionData, RouteProps, VehicleProps } from "@roteirizador/backend";
import RouteCard from "./layout/RouteCard";
import { useActionState } from "react";
import { createRouteAction } from "../_actions/createRoute.action";

interface RouteContentProps {
  hubs: HubRegionData[];
  routes?: RouteProps[];
  vehicles: VehicleProps[];
}

export default function RouteContent({ hubs, routes, vehicles }: RouteContentProps) {
  const [state, formAction, isPending] = useActionState(createRouteAction, null);

  return (
    <div className="flex flex-col gap-4">
      <form
        action={formAction}
        className="border border-black w-full rounded-xl justify-between items-start flex flex-row animate-in fade-in slide-in-from-bottom-4 duration-800 delay-100 fill-mode-backwards bg-blue-900 gap-3 py-5 px-10"
      >
        <RegionsCheck hubs={hubs} />
        <VehicleCheck vehicles={vehicles} />

        <div className="flex flex-col justify-center gap-1 bg-blue-950 rounded-2xl px-6 py-3">
          <p className="font-bold text-lg">NOME DA ROTA</p>
          <input name="name" className="px-1 border rounded-lg bg-zinc-800 text-white" />
        </div>

        <div className="flex flex-col justify-center items-center">
          <button
            type="submit"
            className="flex justify-center items-center bg-blue-600 rounded-2xl px-6 py-2 cursor-pointer
         hover:bg-blue-500 transition-colors border-2 border-blue-600 font-bold"
            disabled={isPending}
          >
            <span>+ Adicionar</span>
          </button>
          {state?.error && <span className="text-xs text-red-500 font-medium">{state.error}</span>}
        </div>
      </form>

      <div className="flex flex-col gap-10">
        {routes &&
          routes
            .toReversed()
            .map((route) => <RouteCard key={`${route.name}-${route.id}`} route={route} />)}
      </div>
    </div>
  );
}
