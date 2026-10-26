import { env } from "@/env";

export function getRecentDateRange(days = env.DAYS_AGO_FILTER_SYNC): string {
  const formatarData = (data: Date) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(data);

  const end = new Date();

  const begin = new Date();
  begin.setDate(end.getDate() - days);

  return `${formatarData(begin)} - ${formatarData(end)}`;
}
