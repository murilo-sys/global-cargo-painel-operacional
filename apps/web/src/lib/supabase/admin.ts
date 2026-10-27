import "server-only";
import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export const supabaseAdmin = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SECRET_KEY ?? "",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);
