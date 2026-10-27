import { RouteRepository, type CreateRouteDto } from "../repositories/route.repository";

export class ManageRouteUseCase {
  constructor(private routeRepository: RouteRepository) {}

  async createRoute(data: CreateRouteDto): Promise<void> {
    const trimmedName = data.name.trim();
    if (!trimmedName) {
      throw new Error("O nome da rota é obrigatório.");
    }

    if (!data.vehicle?.trim()) {
      throw new Error("Selecione um veículo válido.");
    }

    if (!data.hubs || data.hubs.length === 0) {
      throw new Error("Selecione pelo menos um HUB.");
    }

    await this.routeRepository.createRoute({
      name: trimmedName,
      vehicle: data.vehicle.trim(),
      hubs: data.hubs,
      createdBy: data.createdBy
    });
  }

  async deleteRoute(id: string): Promise<void> {
    if (!id?.trim()) {
      throw new Error("ID da rota é obrigatório.");
    }

    await this.routeRepository.deleteRoute(id.trim());
  }
}
