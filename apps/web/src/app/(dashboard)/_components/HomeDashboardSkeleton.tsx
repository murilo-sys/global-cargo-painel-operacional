export function HomeDashboardCardsSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* 5 Cards de resumo no topo */}
      <div className="flex flex-row gap-3 justify-between items-start">
        {/* Coletas - Coletados */}
        <div className="w-full h-44 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-center text-zinc-600 font-bold text-2xl">
          --
        </div>
        {/* Coletas - Em Trânsito */}
        <div className="w-full h-44 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-center text-zinc-600 font-bold text-2xl">
          --
        </div>
        {/* Transferências */}
        <div className="w-full h-44 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-center text-zinc-600 font-bold text-2xl">
          --
        </div>
        {/* Mocar */}
        <div className="w-full h-44 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-center text-zinc-600 font-bold text-2xl">
          --
        </div>
        {/* Emissões */}
        <div className="w-full max-w-40 h-44 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-center text-zinc-600 font-bold text-2xl">
          --
        </div>
      </div>

      {/* Grid de Hubs */}
      <div className="grid grid-cols-4 gap-6">
        <div className="w-full h-44 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-center text-zinc-600 font-bold text-2xl">
          --
        </div>
        <div className="w-full h-44 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-center text-zinc-600 font-bold text-2xl">
          --
        </div>
        <div className="w-full h-44 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-center text-zinc-600 font-bold text-2xl">
          --
        </div>
        <div className="w-full h-44 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-center text-zinc-600 font-bold text-2xl">
          --
        </div>
      </div>
    </div>
  );
}
