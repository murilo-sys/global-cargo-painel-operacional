import getLastSync from "@/services/operational/dashboard/syncs/lastSync.action";
import SyncButton from "./SyncButton";
import SyncTime from "./SyncTime";

export default async function Sync() {
  const lastSync = await getLastSync();

  return (
    <div className="flex flex-col justify-between items-center">
      <SyncButton initialStatus={lastSync.status} />
      {lastSync.status === "success" && lastSync.created_at && (
        <SyncTime created_at={lastSync.created_at} />
      )}
    </div>
  );
}
