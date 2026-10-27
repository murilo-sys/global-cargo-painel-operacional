import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function completedSync(id: number, status: string) {
  const supabase = await supabaseAdmin;

  const { error } = await supabase.from("sync_history").update({ status: status }).eq("id", id);

  if (error) throw new Error("[syncs/completedSync.ts] Unknown error happened", { cause: error });
}
