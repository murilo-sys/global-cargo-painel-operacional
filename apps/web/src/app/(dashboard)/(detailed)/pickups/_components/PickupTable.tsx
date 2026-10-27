import type { PickupProps } from "@roteirizador/backend";
import { formatCurrency } from "@/util/formater/formatCurrency";
import { formatDate } from "@/util/formater/formatDate";
import { formatDecimal } from "@/util/formater/formatDecimal";

interface PickupTableProps {
  data: PickupProps[];
}

export function PickupTable({ data }: PickupTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-200 animate-in fade-in duration-500">
      <table className="w-full text-center text-sm text-white">
        <thead className="bg-blue-900 text-xs font-semibold uppercase text-white border-b border-zinc-200">
          <tr>
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Data</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Destino</th>
            <th className="px-4 py-3">Valor NF</th>
            <th className="px-4 py-3">Volume (m³)</th>
            <th className="px-4 py-3">Peso (kg)</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-200">
          {data.map((pickup) => (
            <tr key={pickup.id} className="hover:bg-zinc-50/50 transition-colors">
              <td className="px-4 py-3 font-medium text-white underline">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://globalcargo.eslcloud.com.br/picks/${pickup.id}/edit`}
                >
                  {pickup.code}
                </a>
              </td>
              <td className="px-4 py-3">
                <span className="inline-block px-2 py-0.5 text-xs font-medium">
                  {formatDate(pickup.serviceDate)}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="inline-block px-2 py-0.5 text-xs font-medium">{pickup.status}</span>
              </td>
              <td className="px-4 py-3">{pickup.destinationHub ?? "N/A"}</td>
              <td className="px-4 py-3 font-mono">{formatCurrency(pickup.invoiceValue ?? 0)}</td>
              <td className="px-4 py-3 font-mono">{formatDecimal(pickup.volumeM3 ?? 0)}</td>
              <td className="px-4 py-3 font-mono">{formatDecimal(pickup.weightKg ?? 0)}</td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-zinc-400">
                Nenhuma coleta encontrada no momento.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
