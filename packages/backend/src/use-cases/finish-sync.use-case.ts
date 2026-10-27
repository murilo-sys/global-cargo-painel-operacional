import { SyncRepository } from "../repositories/sync.repository";

export class FinishSyncUseCase {
  constructor(private readonly syncRepository: SyncRepository) {}

  async execute(id: number, status: string): Promise<void> {
    await this.syncRepository.updateSyncStatus(id, status);
  }
}
