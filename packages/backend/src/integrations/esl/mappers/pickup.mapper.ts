import type { PickupApiResponse } from "../schemas/pickups.schema";
import type { PickupInsertDto } from "../../../repositories/pickup.repository";

export function mapEslPickupsToDto(raw: PickupApiResponse): PickupInsertDto[] {
  return raw.map((pickup): PickupInsertDto => ({
    id: pickup.ID,
    code: pickup["N° coleta"],
    filial: pickup["Pessoa/Nome fantasia"].trim(),
    status: pickup.Status,
    volume_m3: pickup["Cubagens/M&sup3;"],
    weight_kg: pickup["Peso real"],
    invoice_value: pickup["Valor total"],
    service_date: pickup["Data Agendamento"] ?? null,
    request_date: pickup["Data Solicitação"],
    destination_hub: pickup["Configuração da cidade/Sigla cidade"] ?? null
  }));
}
