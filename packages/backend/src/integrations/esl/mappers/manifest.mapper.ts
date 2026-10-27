import type { ManifestApiResponse } from "../schemas/manifests.schema";
import type { ManifestInsertDto, ManifestFreightRelationInsertDto } from "../../../repositories/manifest.repository";

export function mapEslManifestsToDto(raw: ManifestApiResponse): {
  manifests: ManifestInsertDto[];
  relations: ManifestFreightRelationInsertDto[];
} {
  const manifests: ManifestInsertDto[] = raw.map((manifest) => ({
    id: manifest["ID Manifesto"],
    code: manifest.Número,
    vehicle_plate: manifest["Veículo/Placa"],
    origin_hub: manifest.Filial,
    status: manifest.Status,
    total_m3: manifest["Total M3"],
    total_weight_kg: manifest["Peso NF"],
    total_invoices_value: manifest["Valor NF"],
    unloading_places: manifest["Manifesto/Locais de descarregamento"]
      ? manifest["Manifesto/Locais de descarregamento"].split(": ").map((item) => item.trim())
      : null,
    estimated_arrival: manifest["Previsão Chegada"] ?? null
  }));

  const relations: ManifestFreightRelationInsertDto[] = raw
    .filter((item) => item["Frete/ID"] && item.Status === "Em trânsito")
    .map((item) => ({
      manifest_id: item["ID Manifesto"],
      freight_id: item["Frete/ID"]!
    }));

  return { manifests, relations };
}
