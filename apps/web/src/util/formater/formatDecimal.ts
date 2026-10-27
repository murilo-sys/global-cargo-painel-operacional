// Helper format decimal numbers
export function formatDecimal(value: number | null | undefined): string {
  if (!value) return "0,00";
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
