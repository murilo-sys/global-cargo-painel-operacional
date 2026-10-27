import type { ManifestProps } from "@roteirizador/backend";
import { formatCurrency } from "@/util/formater/formatCurrency";
import { formatDate } from "@/util/formater/formatDate";
import { formatDecimal } from "@/util/formater/formatDecimal";

interface TransferTableProps {
  data: ManifestProps[];
}

export function TransferTable({ data }: TransferTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-200 animate-in fade-in duration-800">
      <table className="w-full text-center text-sm text-white">
        <thead className="bg-blue-900 text-xs font-semibold uppercase text-white border-b border-zinc-200">
          <tr>
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Placa</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Filial Origem</th>
            <th className="px-4 py-3">Previsão Chegada</th>
            <th className="px-4 py-3">Valor NF Total</th>
            <th className="px-4 py-3">Volume Total (m³)</th>
            <th className="px-4 py-3">Peso Total (kg)</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-200">
          {data.map((manifest) => (
            <tr key={manifest.id} className="hover:bg-zinc-50/50 transition-colors">
              <td className="px-4 py-3 font-medium text-white underline">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://globalcargo.eslcloud.com.br/manifests/${manifest.id}/edit`}
                >
                  {manifest.code}
                </a>
              </td>
              <td className="px-4 py-3">
                <span className="inline-block px-2 py-0.5 text-xs font-medium">
                  {manifest.vehiclePlate ?? "Não informado"}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="inline-block px-2 py-0.5 text-xs font-medium">{manifest.status}</span>
              </td>
              <td className="px-4 py-3">
                <span className="inline-block px-2 py-0.5 text-xs font-medium">{manifest.originHub ?? "N/A"}</span>
              </td>
              <td className="px-4 py-3">
                <span className="inline-block px-2 py-0.5 text-xs font-medium">
                  {formatDate(manifest.estimatedArrival)}
                </span>
              </td>
              <td className="px-4 py-3 font-mono">{formatCurrency(manifest.totalInvoicesValue ?? 0)}</td>
              <td className="px-4 py-3 font-mono">{formatDecimal(manifest.totalM3 ?? 0)}</td>
              <td className="px-4 py-3 font-mono">{formatDecimal(manifest.totalWeightKg ?? 0)}</td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-zinc-400">
                Nenhuma transferência encontrada no momento.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
