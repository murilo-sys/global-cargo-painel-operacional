"use server";

import { toggleFreightStatusUseCase } from "@roteirizador/backend";
import { revalidatePath } from "next/cache";

interface ToggleFreightParams {
  id: number;
  isDisabled: boolean;
  path: string;
}

export async function updateFreightStatusAction({ id, isDisabled, path }: ToggleFreightParams) {
  if (!id) {
    return { error: "ID do frete é obrigatório." };
  }

  try {
    await toggleFreightStatusUseCase.execute(id, isDisabled);
    revalidatePath(path);
    return { success: true };
  } catch (error) {
    console.error("[updateFreightStatusAction] Erro:", error);
    return { error: "Não foi possível atualizar o frete." };
  }
}
