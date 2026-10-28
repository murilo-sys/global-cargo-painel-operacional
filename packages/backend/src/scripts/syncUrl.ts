import { syncReportUseCase, closeDatabaseConnection, type SyncReportType } from "../index";

const VALIDS_TYPES: SyncReportType[] = ["freights", "manifests", "pickups"];

async function main() {
  const reportType = process.argv[2] as SyncReportType;
  const url = process.argv[3];

  if (!reportType || !VALIDS_TYPES.includes(reportType)) {
    console.error(`[CLI] Invalid report type: ${reportType}`);
    process.exit(1);
  }

  if (!url) {
    console.error("[CLI] Missing download url");
    process.exit(1);
  }

  const startTime = Date.now();

  try {
    await syncReportUseCase.execute(reportType, url);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`[CLI] Sync ${reportType} from URL completed successfully in ${duration}s.`);
    await closeDatabaseConnection();
    process.exit(0);
  } catch (error) {
    console.error(`[CLI] Fatal error during sync of ${reportType} from URL:`, error);
    await closeDatabaseConnection().catch(() => {});
    process.exit(1);
  }
}

main();
