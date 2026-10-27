"use server";

import { env } from "@/env";
import axios from "axios";

export async function syncReportManual() {
  try {
    if (!env.URL_ACTION_GITHUB || !env.TOKEN_GITHUB) {
      return { success: false, error: "Configuração do GitHub Actions não encontrada." };
    }

    const req = await axios.post(
      env.URL_ACTION_GITHUB,
      { ref: "main" },
      { headers: { Authorization: `Bearer ${env.TOKEN_GITHUB}` } }
    );

    if (req.status === 204) {
      return { success: true };
    }

    return { success: false, error: "Aguardando confirmação do GitHub." };
  } catch (error) {
    console.error("[syncReportManual] Erro ao disparar sincronização manual:", error);
    return { success: false, error: "Não foi possível sincronizar os dados, tente novamente..." };
  }
}
