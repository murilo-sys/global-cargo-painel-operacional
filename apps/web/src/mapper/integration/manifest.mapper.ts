import "server-only";

import { ManifestApiResponse } from "@/schemas/integration/manifest";

export interface CleanManifest {
  id: number;
  code: number;
  vehicle_plate: string;
  status: string;
  origin_hub: string;
  total_m3: number;
  total_weight_kg: number;
  total_invoices_value: number;
  estimated_arrival: string | null; // Used string because don't exists type Date on http request, but transforms to dateString
  unloading_places: string[] | null;
}

export function manifestMapper(raw: ManifestApiResponse): CleanManifest[] {
  const cleanManifests = raw.map((manifest): CleanManifest => {
    return {
      id: manifest["ID Manifesto"],
      code: manifest.Número,
      vehicle_plate: manifest["Veículo/Placa"],
      origin_hub: manifest.Filial,
      status: manifest.Status,
      total_m3: manifest["Total M3"],
      total_weight_kg: manifest["Peso NF"],
      total_invoices_value: manifest["Valor NF"],
      unloading_places:
        manifest["Manifesto/Locais de descarregamento"]?.split(": ").map((item) => item.trim()) ?? null,
      estimated_arrival: manifest["Previsão Chegada"] ? manifest["Previsão Chegada"].toISOString() : null
    };
  });

  return cleanManifests;
}
