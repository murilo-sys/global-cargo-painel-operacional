import { REPORTS_CONFIG } from "@/config/reportsConfig";
import { downloadArchive } from "@/lib/xlsx/downloadArchive";
import { ReportsType } from "@/types/reportSync";

const VALIDS_TYPES: ReportsType[] = ["freights", "manifests", "pickups"];

async function main() {
  const reportType = process.argv[2] as ReportsType;
  const url = process.argv[3];

  // Fail-fast if the argument isn't valid
  if (!reportType || !VALIDS_TYPES.includes(reportType)) {
    console.error(`[CLI] Invalid report: ${reportType}`);
    process.exit(1);
  }

  // Fail-fast if the url isn't valid
  if (!url) {
    console.error(`[CLI] Invalid url: ${url}`);
    process.exit(1);
  }

  const startTime = Date.now();

  try {
    //Get the infos from the actual report
    const reportInfos = REPORTS_CONFIG[reportType];

    // Download the archive with the download_url and transform to json
    const json = await downloadArchive(url);

    await reportInfos.process(json);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`[CLI] Sync ${reportType} concluided successfuly on ${duration}s.`);
    process.exit(0);
  } catch (error) {
    console.error(`[CLI] Fatal error, Report: ${reportType}:`, error);
    process.exit(1);
  }
}

main();
