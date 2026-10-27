// Helper format currency
export function formatCurrency(value: number | null | undefined): string {
  if (!value) return "R$ 0,00";
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
