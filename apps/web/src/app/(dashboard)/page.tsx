import { Suspense } from "react";
import type { Metadata } from "next";
import { getOperationalMetricsUseCase } from "@roteirizador/backend";
import HomeDashboard from "./_components/HomeDashboard";
import { HomeDashboardCardsSkeleton } from "./_components/HomeDashboardSkeleton";

export const metadata: Metadata = {
  title: "Informações Operacionais"
};

export default function Home() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl text-white animate-in fade-in slide-in-from-left-4 duration-800">
        Informações Operacionais
      </h1>

      <Suspense fallback={<HomeDashboardCardsSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}

async function DashboardContent() {
  const operationalMetrics = await getOperationalMetricsUseCase.dashboardMetrics();
  return <HomeDashboard rawOperationalMetrics={operationalMetrics} />;
}
