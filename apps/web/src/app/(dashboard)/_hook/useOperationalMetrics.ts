import type { DashboardOperationalMetrics, Hub } from "@roteirizador/backend";
import { useMemo, useState } from "react";

export interface DashboardHub extends Hub {
  total: {
    m3: number;
    realWeight: number;
    invoiceValue: number;
    freightWeight: number;
  };
}

export interface CalculatedDashboardMetrics extends Omit<DashboardOperationalMetrics, "hubs"> {
  hubs: DashboardHub[];
}

export function useOperationalMetrics(rawData: DashboardOperationalMetrics) {
  // Filter for pickups metrics
  const [inTransit, setInTransit] = useState<boolean>(false);

  // Filter for pickups metrics
  const [collected, setCollected] = useState<boolean>(false);

  // Filter for transfers metrics
  const [transfer, setTransfer] = useState<boolean>(false);

  // Filter for warehouse metrics
  const [inWareHouse, setInWareHouse] = useState<boolean>(true);

  // Computed metrics with dynamic totals per hub
  const operationalMetrics: CalculatedDashboardMetrics = useMemo(() => {
    const hubs: DashboardHub[] = (rawData.hubs ?? []).map((item) => {
      return {
        code: item.code,
        color: item.color,
        total: {
          m3:
            (inWareHouse ? item.warehouse.m3 : 0) +
            (transfer ? item.transfers.m3 : 0) +
            (inTransit ? item.pickups.inTransit.m3 : 0) +
            (collected ? item.pickups.collected.m3 : 0),
          realWeight:
            (inWareHouse ? item.warehouse.realWeight : 0) +
            (transfer ? item.transfers.realWeight : 0) +
            (inTransit ? item.pickups.inTransit.realWeight : 0) +
            (collected ? item.pickups.collected.realWeight : 0),
          invoiceValue:
            (inWareHouse ? item.warehouse.invoiceValue : 0) +
            (transfer ? item.transfers.invoiceValue : 0) +
            (inTransit ? item.pickups.inTransit.invoiceValue : 0) +
            (collected ? item.pickups.collected.invoiceValue : 0),
          freightWeight:
            (inWareHouse ? item.warehouse.freightWeight : 0) + (transfer ? item.transfers.freightWeight : 0)
        },
        warehouse: item.warehouse,
        transfers: item.transfers,
        pickups: item.pickups
      };
    });

    return {
      pickups: rawData.pickups,
      manifests: rawData.manifests,
      issuances: rawData.issuances,
      mocar: rawData.mocar,
      hubs
    };
  }, [
    collected,
    inTransit,
    inWareHouse,
    rawData.issuances,
    rawData.manifests,
    rawData.mocar,
    rawData.pickups,
    rawData.hubs,
    transfer
  ]);

  return {
    collected,
    setCollected,
    operationalMetrics,
    setInTransit,
    setTransfer,
    inTransit,
    transfer,
    inWareHouse,
    setInWareHouse
  };
}
