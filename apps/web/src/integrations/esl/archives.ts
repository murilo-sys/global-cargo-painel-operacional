import "server-only";

import { REPORTS_CONFIG } from "@/config/reportsConfig";
import { eslApi } from "@/lib/api/esl-client";
import { RequestArchive, StatusArchive } from "@/types/requestArchive";
import { ReportsType } from "@/types/reportSync";

export async function requestArchive(report: ReportsType): Promise<string> {
  const reportInfos = REPORTS_CONFIG[report];

  const response = await eslApi.post(reportInfos.url, reportInfos.body);

  const data: RequestArchive = response.data;

  //Returns the show_url to check the status from request
  return data.show_url;
}

//Delay to verify report status
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function verifyArchive(url: string): Promise<string> {
  let isGenerated = false;

  while (!isGenerated) {
    const response = await eslApi.get(`https://globalcargo.eslcloud.com.br${url}`);

    const data: StatusArchive = response.data;

    if (data.status === "error" || data.status === "canceled") {
      throw new Error("[reportsEsl.api.ts] a error ocurred while generating report of esl", { cause: data });
    }

    if (data.download_url) {
      isGenerated = true;
      return data.download_url;
    }

    await delay(10000);
  }

  throw new Error("Can't verify the status from report.");
}
