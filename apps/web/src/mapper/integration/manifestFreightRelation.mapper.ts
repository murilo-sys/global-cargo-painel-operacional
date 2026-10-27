import { ManifestApiResponse } from "@/schemas/integration/manifest";

export interface manifestFreightRelations {
  manifest_id: number;
  freight_id: number;
}

export function manifestFreightRelationsMapper(RawManifest: ManifestApiResponse): manifestFreightRelations[] {
  const manifestFreightRelations = RawManifest.filter(
    //Mapper just add the manifests that have freights and the manifest status is in transit
    (item) => item["Frete/ID"] && item.Status === "Em trânsito"
  ).map((item): manifestFreightRelations => {
    return {
      manifest_id: item["ID Manifesto"],
      freight_id: item["Frete/ID"]!
    };
  });

  return manifestFreightRelations;
}
