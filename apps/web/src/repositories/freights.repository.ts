import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { CleanFreight } from "../mapper/integration/freights.mapper";

export async function upsertFreights(freights: CleanFreight[]) {
  if (freights.length === 0) return;

  // Process on lots of 500
  const CHUNK_SIZE = 500;

  for (let i = 0; i < freights.length; i += CHUNK_SIZE) {
    const chunk = freights.slice(i, i + CHUNK_SIZE);

    const { error } = await supabaseAdmin.from("freights").upsert(chunk, { onConflict: "id" });

    if (error) {
      console.error("[freights.repository] Error during UPSERT:", error);
      throw new Error(`[freights.repository] Fail on write freights: ${error.message}`);
    }
  }
}

export async function deleteMissingFreights(
  freightsEsl: CleanFreight[],
  updated_at: string,
  last_synced_at: string
) {
  if (freightsEsl.length === 0) return;

  const { error } = await supabaseAdmin
    .from("freights")
    .delete()
    .gte("updated_at", updated_at)
    .lt("last_synced_at", last_synced_at);

  if (error) throw new Error("[freights.repository.ts] Unknown error happened", { cause: error });
}
