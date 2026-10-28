import { finishSyncUseCase, closeDatabaseConnection } from "../index";

async function finishSync() {
  const id = Number(process.argv[2]);
  const matrixResult = process.argv[3] === "success" ? process.argv[3] : "error";

  if (!Number.isInteger(id)) {
    console.error("[CLI] Invalid id:", process.argv[2]);
    process.exit(1);
  }

  try {
    await finishSyncUseCase.execute(id, matrixResult);
    await closeDatabaseConnection();
    process.exit(0);
  } catch (error) {
    console.error("[CLI] Failed to update status for ID:", id, error);
    await closeDatabaseConnection().catch(() => {});
    process.exit(1);
  }
}

finishSync();
