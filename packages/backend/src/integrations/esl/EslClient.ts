import axios, { type AxiosInstance } from "axios";
import * as XLSX from "xlsx";

export interface EslClientConfig {
  token: string;
  baseUrl?: string;
}

export class EslClient {
  private readonly http: AxiosInstance;
  private readonly baseUrl: string;

  constructor(config: EslClientConfig) {
    this.baseUrl = config.baseUrl ?? "https://globalcargo.eslcloud.com.br";
    this.http = axios.create({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.token}`
      }
    });
  }

  async requestArchive(url: string, body: unknown): Promise<string> {
    const response = await this.http.post(url, body);
    return response.data.show_url;
  }

  async verifyArchive(showUrl: string): Promise<string> {
    const fullUrl = showUrl.startsWith("http") ? showUrl : `${this.baseUrl}${showUrl}`;
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    while (true) {
      const response = await this.http.get(fullUrl);
      const data = response.data;

      if (data.status === "error" || data.status === "canceled") {
        throw new Error(`[EslClient.verifyArchive] Erro na geração do relatório no ESL: ${data.status}`);
      }

      if (data.download_url) {
        return data.download_url;
      }

      await delay(10000);
    }
  }

  async downloadArchive(downloadUrl: string): Promise<unknown[]> {
    const delayMs = 2100;
    const attempts = 15;

    for (let index = 0; index < attempts; index++) {
      try {
        await new Promise((resolve) => setTimeout(resolve, delayMs));

        const response = await axios.get(downloadUrl, { responseType: "arraybuffer" });
        const buffer = Buffer.from(response.data);

        const workbook = XLSX.read(buffer, { type: "buffer", cellDates: true });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          return [];
        }
        const firstSheet = workbook.Sheets[firstSheetName];
        if (!firstSheet) {
          return [];
        }

        return XLSX.utils.sheet_to_json(firstSheet);
      } catch (error) {
        const is404 = axios.isAxiosError(error) && error.response?.status === 404;
        if (is404 && index < attempts - 1) {
          console.warn("[EslClient.downloadArchive] Arquivo ainda não disponível no ESL, tentando novamente...");
          continue;
        }
        throw new Error(`[EslClient.downloadArchive] Falha ao baixar planilha: ${error}`);
      }
    }

    return [];
  }
}
