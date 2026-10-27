import { newSync } from "@/services/operational/dashboard/syncs/newSync.service";

async function startSync() {
  try {
    const id = await newSync();
    console.log(id);
  } catch (error) {
    console.error("[CLI] Failed to create ID", error);
    process.exit(1);
  }
}

startSync();
