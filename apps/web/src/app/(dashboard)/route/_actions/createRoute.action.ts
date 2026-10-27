"use server";

import { manageRouteUseCase } from "@roteirizador/backend";
import { createRouteSchema } from "@/schemas/dashboard/pages/routes/createRouteSchema";
import { revalidatePath } from "next/cache";

export async function createRouteAction(_prevState: unknown, formData: FormData) {
  const validation = createRouteSchema.safeParse({
    name: formData.get("name"),
    vehicle: formData.get("vehicle"),
    hubs: formData.getAll("hubs")
  });

  if (!validation.success) {
    return { error: validation.error.issues[0]?.message ?? "Dados inválidos." };
  }

  try {
    await manageRouteUseCase.createRoute({
      name: validation.data.name,
      vehicle: validation.data.vehicle,
      hubs: validation.data.hubs
    });

    revalidatePath("/route");
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro ao criar rota. Tente novamente.";
    return { error: message };
  }
}
