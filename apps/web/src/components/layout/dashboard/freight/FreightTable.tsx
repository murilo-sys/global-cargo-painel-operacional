"use client";

import { updateFreightStatusAction } from "@/actions/freights/updateFreightStatus.action";
import type { FreightProps } from "@roteirizador/backend";
import { formatCurrency } from "@/util/formater/formatCurrency";
import { formatDecimal } from "@/util/formater/formatDecimal";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

interface FreightTableProps {
  data: FreightProps[];
}

export function FreightTable({ data }: FreightTableProps) {
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const handleToggle = (id: number, isDisabled: boolean) => {
    startTransition(async () => {
      await updateFreightStatusAction({
        id,
        isDisabled,
        path: pathname
      });
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-200 animate-in fade-in duration-800">
      <table className="w-full text-center text-sm text-white">
        <thead className="bg-blue-900 text-xs font-semibold uppercase text-white border-b border-zinc-200">
          <tr>
            <th className="px-4 py-3">CT-e / Minuta</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Modal</th>
            <th className="px-4 py-3">Destino</th>
            <th className="px-4 py-3">Valor NF</th>
            <th className="px-4 py-3">Frete Peso</th>
            <th className="px-4 py-3">Volume (m³)</th>
            <th className="px-4 py-3">Peso (kg)</th>
            <th className="px-4 py-3">Ação</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-200">
          {data.map((item) => {
            const docNumber = item.cteNumber ?? item.minuteNumber ?? "N/A";
            return (
              <tr
                key={item.id}
                className={`hover:bg-zinc-50/50 transition-colors ${item.isDisabled ? "line-through bg-gray-500/50" : ""}`}
              >
                <td className="px-4 py-3 font-medium text-white underline">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://globalcargo.eslcloud.com.br/freights/${item.id}/edit`}
                  >
                    {docNumber}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-medium ${item.isDisabled ? "line-through" : ""}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-medium ${item.isDisabled ? "line-through" : ""}`}
                  >
                    {item.modal}
                  </span>
                </td>
                <td className="px-4 py-3">{item.destinationHub ?? "N/A"}</td>
                <td className="px-4 py-3 font-mono">{formatCurrency(item.invoiceValue)}</td>
                <td className="px-4 py-3 font-mono">{formatCurrency(item.freightWeight)}</td>
                <td className="px-4 py-3 font-mono">{formatDecimal(item.volumeM3)}</td>
                <td className="px-4 py-3 font-mono">{formatDecimal(item.weightKg)}</td>
                <td className="px-4 py-3 font-mono">
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id, !item.isDisabled)}
                    className={`border px-2 py-1 rounded-lg cursor-pointer hover:${item.isDisabled ? "bg-blue-500" : "bg-red-500"} font-bold transition-colors duration-300`}
                  >
                    {item.isDisabled ? "✓" : "X"}
                  </button>
                </td>
              </tr>
            );
          })}

          {data.length === 0 && (
            <tr>
              <td colSpan={9} className="px-4 py-8 text-center text-zinc-400">
                Nenhum frete encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
