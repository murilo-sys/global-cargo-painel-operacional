import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function newSync() {
  const supabase = await supabaseAdmin;

  const { success, error, data } = await supabase
    .from("sync_history")
    .insert({
      status: "pending"
    })
    .select("id")
    .single();

  if (!success) throw new Error("[syncs/newSync.service.ts] Unknown error happened", { cause: error });

  return data.id;
}
