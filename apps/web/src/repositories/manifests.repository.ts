import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { CleanManifest } from "../mapper/integration/manifest.mapper";

export async function upsertManifests(manifests: CleanManifest[]) {
  if (manifests.length === 0) return;

  // Process on lots of 500
  const CHUNK_SIZE = 500;

  for (let i = 0; i < manifests.length; i += CHUNK_SIZE) {
    const chunk = manifests.slice(i, i + CHUNK_SIZE);

    const { error } = await supabaseAdmin.from("manifests").upsert(chunk, { onConflict: "id" });

    if (error) {
      console.error("[manifests.repository] Error during UPSERT:", error);
      throw new Error(`[manifests.repository] Fail on write manifests: ${error.message}`);
    }
  }
}
