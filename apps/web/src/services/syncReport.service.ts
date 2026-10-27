import "server-only";
import { ReportsType } from "@/types/reportSync";
import { requestArchive, verifyArchive } from "../integrations/esl/archives";
import { downloadArchive } from "@/lib/xlsx/downloadArchive";
import { REPORTS_CONFIG } from "@/config/reportsConfig";

export default async function syncReport(report: ReportsType) {
  //Get the infos from the actual report
  const reportInfos = REPORTS_CONFIG[report];

  //Request the archive and get the show_url
  const show_url = await requestArchive(report);

  // Verify the status from archive and get the download_url when available
  const download_url = await verifyArchive(show_url);

  // Download the archive with the download_url and transform to json
  const json = await downloadArchive(download_url);

  //Process the json
  await reportInfos.process(json);
}
