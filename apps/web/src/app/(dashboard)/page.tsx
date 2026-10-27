import { Suspense } from "react";
import type { Metadata } from "next";
import { getOperationalMetricsUseCase, hubRepository } from "@roteirizador/backend";
import { HomeDashboardCardsSkeleton } from "./_components/HomeDashboardSkeleton";
import HomeDashboard from "./_components/HomeDashboard";
import FilialSelect from "@/components/layout/dashboard/filial/FilialSelect";

export const metadata: Metadata = {
  title: "Informações Operacionais"
};

interface PageProps {
  searchParams: Promise<{
    hub?: string;
  }>;
}

export default function Home({ searchParams }: PageProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center animate-in fade-in slide-in-from-left-4 duration-800">
        <h1 className="font-bold text-2xl text-white">
          Informações Operacionais
        </h1>
        <Suspense fallback={<div className="h-9 w-32 bg-zinc-800/60 rounded-lg animate-pulse" />}>
          <FilialFilter />
        </Suspense>
      </div>

      <Suspense fallback={<HomeDashboardCardsSkeleton />}>
        <DashboardContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function FilialFilter() {
  const hubs = await hubRepository.listAllHubs();
  return <FilialSelect hubs={hubs} />;
}

interface DashboardContentProps {
  searchParams: Promise<{
    hub?: string;
  }>;
}

async function DashboardContent({ searchParams }: DashboardContentProps) {
  const resolvedParams = await searchParams;
  const hub = resolvedParams?.hub || "SAO";
  const operationalMetrics = await getOperationalMetricsUseCase.dashboardMetrics(hub);

  return <HomeDashboard rawOperationalMetrics={operationalMetrics} />;
}
