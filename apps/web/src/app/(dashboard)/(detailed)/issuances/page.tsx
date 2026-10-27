import { getIssuancesDetailUseCase } from "@roteirizador/backend";
import type { Metadata } from "next";
import { FreightTable } from "@/components/layout/dashboard/freight/FreightTable";
import Link from "next/link";
import { env } from "@/env";
import { Suspense } from "react";
import { FreightTableSkeleton } from "@/components/layout/dashboard/freight/FreightTableSkeleton";
import { issuanceSearchParamsSchema } from "@/schemas/dashboard/searchParams/issuanceSchema";

export const metadata: Metadata = {
  title: "Emissões"
};

interface IssuancesProps {
  searchParams: Promise<{
    page?: string;
    status?: "Pendente" | "Emitido" | "Manifestado";
  }>;
}

export default function Issuances({ searchParams }: IssuancesProps) {
  return (
    <div className="flex flex-col gap-5">
      <Suspense fallback={<FreightTableSkeleton />}>
        <IssuancesContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function IssuancesContent({ searchParams }: IssuancesProps) {
  const params = await searchParams;
  const { page, status } = issuanceSearchParamsSchema.parse(params);

  const freights = await getIssuancesDetailUseCase.execute({
    page,
    status,
    pageSize: env.PAGE_SIZE,
    daysAgo: env.DAYS_AGO_SEARCH_FREIGHTS
  });

  const serializedData = freights.map((f) => f.toJSON());
  const href = `&status=${status}`;

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
            {`Emissões - ${status.toLocaleUpperCase()}`}
          </h2>
        </div>

        <div className="flex flex-row gap-2">
          <Link
            href="/issuances?status=Pendente"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              status === "Pendente" ? "bg-blue-600 text-white" : "bg-blue-900/60 text-zinc-300 hover:bg-blue-900"
            }`}
          >
            Pendentes
          </Link>
          <Link
            href="/issuances?status=Emitido"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              status === "Emitido" ? "bg-blue-600 text-white" : "bg-blue-900/60 text-zinc-300 hover:bg-blue-900"
            }`}
          >
            Emitidos
          </Link>
          <Link
            href="/issuances?status=Manifestado"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              status === "Manifestado" ? "bg-blue-600 text-white" : "bg-blue-900/60 text-zinc-300 hover:bg-blue-900"
            }`}
          >
            Manifestados
          </Link>
        </div>
      </div>

      <FreightTable data={serializedData} />

      <div className="flex flex-row w-full justify-end pr-4 gap-2">
        {page > 1 && (
          <Link
            className="px-5 text-2xl border rounded-lg hover:bg-blue-500 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            href={`/issuances?page=${page - 1}${href}`}
          >
            🠔
          </Link>
        )}

        {serializedData.length >= env.PAGE_SIZE && (
          <Link
            className="px-5 text-2xl border rounded-lg hover:bg-blue-500 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            href={`/issuances?page=${Number(page) + 1}${href}`}
          >
            🠖
          </Link>
        )}
      </div>
    </div>
  );
}
