import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { CleanPickup } from "../mapper/integration/pickup.mapper";

export async function upsertPickups(pickups: CleanPickup[]) {
  if (pickups.length === 0) return;

  // Process on lots of 500
  const CHUNK_SIZE = 500;

  for (let i = 0; i < pickups.length; i += CHUNK_SIZE) {
    const chunk = pickups.slice(i, i + CHUNK_SIZE);

    const { error } = await supabaseAdmin.from("pickups").upsert(chunk, { onConflict: "id" });

    if (error) {
      console.error("[pickups.repository] Error during UPSERT:", error);
      throw new Error(`[pickups.repository] Fail on write pickups: ${error.message}`);
    }
  }
}
