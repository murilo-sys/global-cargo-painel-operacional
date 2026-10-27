import type { FreightsApiResponse } from "../schemas/freights.schema";
import type { FreightInsertDto } from "../../../repositories/freight.repository";

export function mapEslFreightsToDto(raw: FreightsApiResponse, syncDate: Date): FreightInsertDto[] {
  return raw.map((freight): FreightInsertDto => ({
    id: freight.ID,
    updated_at: freight["Data atualização"].toISOString().split("T")[0] ?? null,
    destination_hub: freight["Sigla Destino"] ?? null,
    origin_hub: freight["Sigla Origem"] ?? null,
    status: freight.Status,
    modal: freight["Modal do frete"],
    emission_type: freight["Tipo Documento"],
    freight_type: freight["Tipo Transporte"],
    current_location: freight["Localização atual/Nome"] ?? null,
    cte_number: freight["CT-e/Número"] ?? null,
    minute_number: freight["N° Minuta"] ?? null,
    weight_kg: freight["Peso real"],
    volume_m3: freight["Total M3"],
    invoice_value: freight["Valor NF"],
    last_synced_at: syncDate,
    freight_weight: freight["Frete peso"],
    is_disabled: false
  }));
}
