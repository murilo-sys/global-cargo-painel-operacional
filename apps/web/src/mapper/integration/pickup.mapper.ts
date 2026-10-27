import "server-only";

import { PickupApiResponse } from "@/schemas/integration/pickups";

export interface CleanPickup {
  id: number;
  code: number;
  filial: string;
  status: string;
  volume_m3: number;
  weight_kg: number;
  invoice_value: number;
  service_date: string | null; // Used string because don't exists type Date on http request, but transforms to dateString
  request_date: string | null; // Used string because don't exists type Date on http request, but transforms to dateString
  destination_hub: string | null;
}

export function pickupMapper(raw: PickupApiResponse): CleanPickup[] {
  const cleanManifests = raw.map((pickup): CleanPickup => {
    return {
      filial: pickup["Pessoa/Nome fantasia"].trim(),
      id: pickup.ID,
      code: pickup["N° coleta"],
      status: pickup.Status,
      volume_m3: pickup["Cubagens/M&sup3;"],
      weight_kg: pickup["Peso real"],
      invoice_value: pickup["Valor total"],
      service_date: pickup["Data Agendamento"] ? pickup["Data Agendamento"].toISOString() : null,
      request_date: pickup["Data Solicitação"] ? pickup["Data Solicitação"].toISOString() : null,
      destination_hub: pickup["Configuração da cidade/Sigla cidade"] ?? null
    };
  });

  return cleanManifests;
}
