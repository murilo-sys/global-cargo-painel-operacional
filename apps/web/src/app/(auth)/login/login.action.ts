"use server";

import { createClient } from "@/lib/supabase/server";
import { LoginFormData, loginSchema } from "@/schemas/login/auth";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginFormData) {
  // safe parse with zod
  const validation = loginSchema.safeParse(data);

  // Verify if has errors
  if (!validation.success) {
    return { error: "Dados inválidos." };
  }

  //Create client and login with data infos
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  });

  // If has errors on supabase login
  if (error) {
    return { error: "E-mail ou senha incorretos." };
  }

  //Redirect to the main page
  redirect("/");
}
