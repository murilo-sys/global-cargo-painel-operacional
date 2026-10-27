import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { manifestFreightRelations } from "../mapper/integration/manifestFreightRelation.mapper";

export async function upsertManifestsFreightsRelations(rawData: manifestFreightRelations[]) {
  if (rawData.length === 0) return;

  // Process on lots of 500
  const CHUNK_SIZE = 500;

  for (let i = 0; i < rawData.length; i += CHUNK_SIZE) {
    const chunk = rawData.slice(i, i + CHUNK_SIZE);

    const { error } = await supabaseAdmin
      .from("manifest_freights")
      .upsert(chunk, { onConflict: "manifest_id,freight_id" });

    if (error) {
      console.error("[manifestsFreightsRelations.repository] Error during UPSERT:", error);
      throw new Error(`[manifestsFreightsRelations.repository] Fail on write manifests: ${error.message}`);
    }
  }
}
