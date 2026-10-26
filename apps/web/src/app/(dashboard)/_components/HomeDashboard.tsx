"use client";

import type { DashboardOperationalMetrics } from "@roteirizador/backend";
import { PickupCard } from "./cards/PickupCard";
import { useOperationalMetrics } from "../_hook/useOperationalMetrics";
import { TransferCard } from "./cards/TransferCard";
import MocarCard from "./cards/MocarCard";
import { IssuanceCard } from "./cards/IssuanceCard";
import { HubCards } from "./HubCards";

interface HomeDashboardProps {
  rawOperationalMetrics: DashboardOperationalMetrics;
}

export default function HomeDashboard({ rawOperationalMetrics }: HomeDashboardProps) {
  const {
    operationalMetrics,
    collected,
    setCollected,
    setInTransit,
    inTransit,
    setTransfer,
    transfer,
    setInWareHouse,
    inWareHouse
  } = useOperationalMetrics(rawOperationalMetrics);

  return (
    <div className="flex flex-col gap-3">
      {/* Cards resumo geral */}
      <div className="flex flex-row gap-3 justify-between items-start">
        <PickupCard
          href="Coletada"
          title="Coletados"
          setStatus={setCollected}
          status={collected}
          className="w-full animate-in fade-in slide-in-from-bottom-4 duration-800 delay-100 fill-mode-backwards"
          data={operationalMetrics.pickups.collected}
        />
        <PickupCard
          href="Em trânsito"
          title="Em Trânsito"
          setStatus={setInTransit}
          status={inTransit}
          className="w-full animate-in fade-in slide-in-from-bottom-4 duration-800 delay-100 fill-mode-backwards"
          data={operationalMetrics.pickups.inTransit}
        />
        <TransferCard
          setTransfer={setTransfer}
          transfer={transfer}
          className="w-full animate-in fade-in slide-in-from-bottom-4 duration-800 delay-200 fill-mode-backwards"
          data={operationalMetrics.manifests}
        />
        <MocarCard
          className="w-full h-fit animate-in fade-in slide-in-from-bottom-4 duration-800 delay-300 fill-mode-backwards"
          data={operationalMetrics.mocar}
          setInWareHouse={setInWareHouse}
          inWareHouse={inWareHouse}
        />
        <IssuanceCard
          className="w-full h-fit max-w-40 animate-in fade-in slide-in-from-bottom-4 duration-800 delay-400 fill-mode-backwards"
          data={operationalMetrics.issuances}
        />
      </div>

      {/* Hubs */}
      <div className="grid grid-cols-4 gap-6 fade-in animate-in slide-in-from-bottom-5 duration-800">
        <HubCards data={operationalMetrics.hubs} />
      </div>
    </div>
  );
}
