import { startSyncUseCase, closeDatabaseConnection } from "@roteirizador/backend";

async function startSync() {
  try {
    const id = await startSyncUseCase.execute();
    console.log(id);
    await closeDatabaseConnection();
    process.exit(0);
  } catch (error) {
    console.error("[CLI] Failed to create sync ID:", error);
    await closeDatabaseConnection().catch(() => {});
    process.exit(1);
  }
}

startSync();
