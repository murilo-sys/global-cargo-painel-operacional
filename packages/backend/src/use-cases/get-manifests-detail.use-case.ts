import type { ManifestRepository, ListTransfersParams } from "../repositories/manifest.repository";
import type { Manifest } from "../domain/Manifest.domain";

export class GetManifestsDetailUseCase {
  constructor(private readonly manifestRepository: ManifestRepository) {}

  async execute(params?: ListTransfersParams): Promise<Manifest[]> {
    return this.manifestRepository.listActiveTransfers(params);
  }
}
