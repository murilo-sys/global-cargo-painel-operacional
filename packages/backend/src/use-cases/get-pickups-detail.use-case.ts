import type { PickupRepository, ListPickupsParams } from "../repositories/pickup.repository";
import type { Pickup } from "../domain/Pickup.domain";

export class GetPickupsDetailUseCase {
  constructor(private readonly pickupRepository: PickupRepository) {}

  async execute(params?: ListPickupsParams): Promise<Pickup[]> {
    return this.pickupRepository.listPickups(params);
  }
}
