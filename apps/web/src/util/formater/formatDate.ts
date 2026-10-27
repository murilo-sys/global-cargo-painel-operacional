export function formatDate(value: string | null | undefined): string {
  if (!value) return "N/A";

  const date = new Date(value);

  if (!isNaN(date.getTime())) {
    return `${date.toLocaleDateString("pt-BR", { timeZone: "UTC" })} ${date.toLocaleTimeString("pt-BR", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" })}`;
  }

  const rawData = value.split("-");
  if (rawData.length === 3) {
    return `${rawData[2]}/${rawData[1]}/${rawData[0]}`;
  }

  return value;
}
