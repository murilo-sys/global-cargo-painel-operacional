import { syncReportUseCase, closeDatabaseConnection, type SyncReportType } from "../index";

const VALIDS_TYPES: SyncReportType[] = ["freights", "manifests", "pickups"];

async function main() {
  const reportType = process.argv[2] as SyncReportType;

  if (!reportType || !VALIDS_TYPES.includes(reportType)) {
    console.error(`[CLI] Invalid report type: ${reportType}`);
    process.exit(1);
  }

  const startTime = Date.now();

  try {
    await syncReportUseCase.execute(reportType);
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`[CLI] Sync ${reportType} completed successfully in ${duration}s.`);
    await closeDatabaseConnection();
    process.exit(0);
  } catch (error) {
    console.error(`[CLI] Fatal error during sync of ${reportType}:`, error);
    await closeDatabaseConnection().catch(() => {});
    process.exit(1);
  }
}

main();
