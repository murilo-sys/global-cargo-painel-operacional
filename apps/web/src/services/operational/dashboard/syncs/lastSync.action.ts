import { getLastSyncUseCase, type LastSyncRecord } from "@roteirizador/backend";

export type LastSyncResult = LastSyncRecord;

export default async function getLastSync(): Promise<LastSyncResult> {
  return await getLastSyncUseCase.execute();
}
