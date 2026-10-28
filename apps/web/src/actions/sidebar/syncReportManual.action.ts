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
      { ref: "master" },
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.TOKEN_GITHUB}`,
          "X-GitHub-Api-Version": "2022-11-28"
        }
      }
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
