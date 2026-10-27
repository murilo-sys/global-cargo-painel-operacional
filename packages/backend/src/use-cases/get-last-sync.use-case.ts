import { SyncRepository, type LastSyncRecord } from "../repositories/sync.repository";

export class GetLastSyncUseCase {
  constructor(private readonly syncRepository: SyncRepository) {}

  async execute(): Promise<LastSyncRecord> {
    const lastSync = await this.syncRepository.getLastSuccessfulSync();
    if (!lastSync) {
      return { status: "none" };
    }
    return lastSync;
  }
}
