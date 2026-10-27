export function filterDaysAgo(days: number) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - days);

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const dateString = formatter.format(targetDate);

  return `${dateString}T00:00:00.000Z`;
}
