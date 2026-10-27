import syncReport from "@/services/syncReport.service";
import { ReportsType } from "@/types/reportSync";

const VALIDS_TYPES: ReportsType[] = ["freights", "manifests", "pickups"];

async function main() {
  const reportType = process.argv[2] as ReportsType;

  // Fail-fast if the argument isn't valid
  if (!reportType || !VALIDS_TYPES.includes(reportType)) {
    console.error(`[CLI] Invalid report: ${reportType}`);
    process.exit(1);
  }

  const startTime = Date.now();

  try {
    await syncReport(reportType);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`[CLI] Sync ${reportType} concluided successfuly on ${duration}s.`);
    process.exit(0);
  } catch (error) {
    console.error(`[CLI] Fatal error, Report: ${reportType}:`, error);
    process.exit(1);
  }
}

main();
