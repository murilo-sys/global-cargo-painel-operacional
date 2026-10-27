import { getPickupsDetailUseCase } from "@roteirizador/backend";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PickupTable } from "./_components/PickupTable";
import { PickupTableSkeleton } from "./_components/PickupTableSkeleton";
import { pickupsSearchParamsSchema } from "@/schemas/dashboard/searchParams/pickupsSchema";
import { env } from "@/env";

export const metadata: Metadata = {
  title: "Coletas"
};

interface PickupsProps {
  searchParams: Promise<{
    status?: "Coletada" | "Em trânsito";
  }>;
}

export default function Pickups({ searchParams }: PickupsProps) {
  return (
    <div className="flex flex-col gap-5">
      <Suspense fallback={<PickupTableSkeleton />}>
        <PickupsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function PickupsContent({ searchParams }: PickupsProps) {
  const params = await searchParams;
  const { status } = pickupsSearchParamsSchema.parse(params);

  const pickups = await getPickupsDetailUseCase.execute({
    status,
    daysAgo: env.DAYS_AGO_SEARCH_PICKUPS
  });

  const serializedData = pickups.map((p) => p.toJSON());

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <Link
            href="/"
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
          >
            🠔 Voltar ao Painel
          </Link>
          <h2 className="font-bold text-2xl animate-in fade-in slide-in-from-left-4 duration-800">
            Coletas {status ? `- ${status}` : ""}
          </h2>
        </div>

        <div className="flex flex-row gap-2">
          <Link
            href="/pickups"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              !status ? "bg-blue-600 text-white" : "bg-blue-900/60 text-zinc-300 hover:bg-blue-900"
            }`}
          >
            Todas
          </Link>
          <Link
            href="/pickups?status=Coletada"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              status === "Coletada" ? "bg-blue-600 text-white" : "bg-blue-900/60 text-zinc-300 hover:bg-blue-900"
            }`}
          >
            Coletadas
          </Link>
          <Link
            href="/pickups?status=Em%20tr%C3%A2nsito"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              status === "Em trânsito" ? "bg-blue-600 text-white" : "bg-blue-900/60 text-zinc-300 hover:bg-blue-900"
            }`}
          >
            Em Trânsito
          </Link>
        </div>
      </div>

      <PickupTable data={serializedData} />
    </div>
  );
}
