import { getMocarDetailUseCase } from "@roteirizador/backend";
import type { Metadata } from "next";
import { FreightTable } from "@/components/layout/dashboard/freight/FreightTable";
import Link from "next/link";
import { env } from "@/env";
import { Suspense } from "react";
import { FreightTableSkeleton } from "@/components/layout/dashboard/freight/FreightTableSkeleton";
import { mocarSearchParamsSchema } from "@/schemas/dashboard/searchParams/mocarSchema";

export const metadata: Metadata = {
  title: "Mocar"
};

interface MocarProps {
  searchParams: Promise<{
    page?: string;
    hub?: string;
    modal?: "Rodoviário" | "Aéreo";
  }>;
}

export default function Mocar({ searchParams }: MocarProps) {
  return (
    <div className="flex flex-col gap-5">
      <Suspense fallback={<FreightTableSkeleton />}>
        <MocarContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function MocarContent({ searchParams }: MocarProps) {
  const params = await searchParams;
  const { page, hub, modal } = mocarSearchParamsSchema.parse(params);

  const freights = await getMocarDetailUseCase.execute({
    page,
    pageSize: env.PAGE_SIZE,
    hub,
    modal,
    daysAgo: env.DAYS_AGO_SEARCH_FREIGHTS
  });

  const serializedData = freights.map((f) => f.toJSON());
  const href = `${hub ? `&hub=${hub}` : ""}${modal ? `&modal=${modal}` : ""}`;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold text-2xl animate-in fade-in slide-in-from-left-4 duration-800">
        Mocar {hub ? `- ${hub}` : ""}
      </h2>

      <FreightTable data={serializedData} />

      <div className="flex flex-row w-full justify-end pr-4 gap-2">
        {page > 1 && (
          <Link
            className="px-5 text-2xl border rounded-lg hover:bg-blue-500 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            href={`/mocar?page=${page - 1}${href}`}
          >
            🠔
          </Link>
        )}

        {serializedData.length >= env.PAGE_SIZE && (
          <Link
            className="px-5 text-2xl border rounded-lg hover:bg-blue-500 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            href={`/mocar?page=${Number(page) + 1}${href}`}
          >
            🠖
          </Link>
        )}
      </div>
    </div>
  );
}
