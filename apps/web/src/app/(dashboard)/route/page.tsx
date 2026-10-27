import { getRoutesUseCase } from "@roteirizador/backend";
import type { Metadata } from "next";
import { Suspense } from "react";
import { RouteSkeleton } from "./_components/RouteSkeleton";
import RouteContent from "./_components/RouteContent";
import { env } from "@/env";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Roteirizador"
};

export default function Route() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl animate-in fade-in slide-in-from-left-5 duration-800">
        Roteirizador
      </h1>
      <Suspense fallback={<RouteSkeleton />}>
        <RouteSuspense />
      </Suspense>
    </div>
  );
}

async function RouteSuspense() {
  await connection();
  const { hubs, routes, vehicles } = await getRoutesUseCase.execute(env.DAYS_AGO_SEARCH_FREIGHTS);

  const serializedRoutes = routes.map((r) => r.toJSON());
  const serializedVehicles = vehicles.map((v) => v.toJSON());

  return <RouteContent hubs={hubs} routes={serializedRoutes} vehicles={serializedVehicles} />;
}
