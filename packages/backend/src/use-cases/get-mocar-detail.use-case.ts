import { FreightRepository, type ListMocarFreightsParams } from "../repositories/freight.repository";
import type { Freight } from "../domain/Freight.domain";

export class GetMocarDetailUseCase {
  constructor(private freightRepository: FreightRepository) {}

  async execute(params: ListMocarFreightsParams): Promise<Freight[]> {
    return await this.freightRepository.listMocarFreights(params);
  }
}
