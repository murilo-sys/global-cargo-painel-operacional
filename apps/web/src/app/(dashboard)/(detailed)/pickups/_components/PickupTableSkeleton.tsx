export function PickupTableSkeleton() {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-200 animate-in fade-in slide-in-from-bottom-4 duration-800">
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
          <tr>
            <td colSpan={7} className="px-4 py-8 text-center text-white">
              Carregando...
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
