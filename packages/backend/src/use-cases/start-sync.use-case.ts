import { SyncRepository } from "../repositories/sync.repository";

export class StartSyncUseCase {
  constructor(private readonly syncRepository: SyncRepository) {}

  async execute(): Promise<number> {
    return await this.syncRepository.createPendingSync();
  }
}
