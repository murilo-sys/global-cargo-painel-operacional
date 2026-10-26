import HubCard from "@/components/layout/dashboard/hub/HubCard";
import type { DashboardHub } from "../_hook/useOperationalMetrics";

interface HubCardsProps {
  data: DashboardHub[];
}

export function HubCards({ data }: HubCardsProps) {
  return (
    <>
      {data.map((hub) => (
        <HubCard
          key={hub.code}
          realWeight={hub.total.realWeight}
          freightWeight={hub.total.freightWeight}
          m3={hub.total.m3}
          invoiceValue={hub.total.invoiceValue}
          color={hub.color}
          code={hub.code}
        />
      ))}
    </>
  );
}
