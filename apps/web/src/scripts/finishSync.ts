import { completedSync } from "@/services/operational/dashboard/syncs/completedSync";

async function finishSync() {
  const id = Number(process.argv[2]);
  const matrixResult = process.argv[3] === "success" ? process.argv[3] : "error";

  if (!Number.isInteger(id)) {
    console.error("[CLI] Invalid id");
    process.exit(1);
  }

  try {
    await completedSync(id, matrixResult);
  } catch (error) {
    console.error("[CLI] Failed to update status ID", id, error);
    process.exit(1);
  }
}

finishSync();
