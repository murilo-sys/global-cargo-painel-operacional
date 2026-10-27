"use server";

import { manageRouteUseCase } from "@roteirizador/backend";
import { revalidatePath } from "next/cache";

export async function deleteRouteAction(_prevState: unknown, id: string) {
  if (!id) {
    return { error: "ID da rota é obrigatório." };
  }

  try {
    await manageRouteUseCase.deleteRoute(id);
    revalidatePath("/route");
    return { success: true };
  } catch (error: unknown) {
    console.error("[deleteRouteAction] Erro:", error);
    return { error: "Ocorreu um erro ao excluir a rota. Tente novamente." };
  }
}
