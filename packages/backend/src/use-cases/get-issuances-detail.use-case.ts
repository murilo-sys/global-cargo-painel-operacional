import type { FreightRepository, ListIssuancesFreightsParams } from "../repositories/freight.repository";
import type { Freight } from "../domain/Freight.domain";

export class GetIssuancesDetailUseCase {
  constructor(private readonly freightRepository: FreightRepository) {}

  async execute(params: ListIssuancesFreightsParams): Promise<Freight[]> {
    return this.freightRepository.listIssuancesFreights(params);
  }
}
