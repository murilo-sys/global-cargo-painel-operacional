"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface FilialSelectProps {
  hubs: string[];
}

export default function FilialSelect({ hubs }: FilialSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentHub = searchParams.get("hub") || "SAO";

  function handleSelect(newHub: string) {
    router.push(`?hub=${newHub}`);
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="hub-select" className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
        Filial:
      </label>
      <select
        id="hub-select"
        value={currentHub}
        onChange={(e) => handleSelect(e.target.value)}
        className="bg-zinc-800 text-white text-sm py-1.5 px-3 rounded-lg font-bold border border-zinc-700 hover:border-zinc-500 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
      >
        {hubs.map((hub) => (
          <option key={hub} value={hub}>
            {hub}
          </option>
        ))}
      </select>
    </div>
  );
}
