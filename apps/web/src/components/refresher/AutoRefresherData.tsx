"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // <-- Cliente de BROWSER

export default function AutoRefresherData() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("sync-events")
      .on("postgres_changes", { event: "*", schema: "public", table: "sync_history" }, () => {
        startTransition(() => {
          router.refresh();
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return null;
}
