import { startSyncUseCase } from "@roteirizador/backend";

async function startSync() {
  try {
    const id = await startSyncUseCase.execute();
    console.log(id);
  } catch (error) {
    console.error("[CLI] Failed to create sync ID:", error);
    process.exit(1);
  }
}

startSync();
