export function getRecentDateRange(days: number): string {
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

export function filterDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0] ?? date.toISOString();
}
