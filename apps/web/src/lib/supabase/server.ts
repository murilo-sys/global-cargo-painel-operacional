import { env } from "@/env";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import "server-only";

export async function createClient() {
  // Get the cookies from request
  const cookieStore = await cookies();

  // Create a instance from supabase using the keys and cookies
  return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          console.error(`[lib/supabase/server.ts] Unknown error happened: ${error}`);
        }
      }
    }
  });
}
