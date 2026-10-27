import { FreightRepository } from "../repositories/freight.repository";

export class ToggleFreightStatusUseCase {
  constructor(private freightRepository: FreightRepository) {}

  async execute(id: number, isDisabled: boolean): Promise<void> {
    if (!id || id <= 0) {
      throw new Error("ID do frete inválido.");
    }

    await this.freightRepository.updateDisabledStatus(id, isDisabled);
  }
}
