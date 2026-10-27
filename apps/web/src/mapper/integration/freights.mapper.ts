import "server-only";

import { FreightsApiResponse } from "@/schemas/integration/freights";

export interface CleanFreight {
  id: number;
  updated_at: string; // Used string because don't exists type Date on http request, but transforms to dateString
  minute_number: number | null;
  destination_hub: string | null;
  origin_hub: string | null;
  status: string;
  modal: string;
  emission_type: string;
  freight_type: string;
  cte_number: number | null;
  current_location: string | null;
  weight_kg: number;
  volume_m3: number;
  invoice_value: number;
  last_synced_at: string;
  freight_weight: number;
}

export function freightMapper(raw: FreightsApiResponse, date: string): CleanFreight[] {
  const cleanFreights = raw.map((freight): CleanFreight => {
    return {
      id: freight.ID,
      updated_at: freight["Data atualização"].toISOString(),
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
      last_synced_at: date,
      freight_weight: freight["Frete peso"]
    };
  });

  return cleanFreights;
}
