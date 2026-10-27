"use client";

import { useActionState, useState } from "react";
import { syncReportManual } from "@/actions/sidebar/syncReportManual.action";
import { RefreshCw } from "lucide-react";

interface SyncButtonProps {
  initialStatus: string;
}

export default function SyncButton({ initialStatus }: SyncButtonProps) {
  const [state, formAction] = useActionState(syncReportManual, null);

  const [clicked, setClicked] = useState(false);

  const [prevStatus, setPrevStatus] = useState(initialStatus);

  if (initialStatus !== prevStatus) {
    setPrevStatus(initialStatus);
    if (initialStatus === "success") {
      setClicked(false);
    }
  }

  const isSyncing = initialStatus === "pending" || clicked;

  function handleSubmit() {
    setClicked(true);
  }

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <button
        type="submit"
        disabled={isSyncing}
        title="Sincronizar dados agora"
        className={`p-2 pb-0 ${!isSyncing ? "cursor-pointer group" : ""}`}
      >
        <RefreshCw
          className={`transition-all duration-300 ${
            isSyncing ? "stroke-yellow-500 animate-spin" : "group-hover:stroke-yellow-500"
          }`}
        />
      </button>

      {state?.error && <span className="text-[10px] text-red-400 block mt-1">{state.error}</span>}
    </form>
  );
}
