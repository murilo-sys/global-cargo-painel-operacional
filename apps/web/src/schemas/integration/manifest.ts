import { z } from "zod";

//Validate the manifest types with zod
export const manifestItemSchema = z.object({
  "ID Manifesto": z.number(),
  Número: z.number(),
  Status: z.string(),
  "Total M3": z.coerce.number().default(0), // total m³ from manifest
  "Peso NF": z.coerce.number().default(0), // total real weights
  "Valor NF": z.coerce.number().default(0), // total nfe value
  "Previsão Chegada": z.date().nullish(), // estimated arrival
  "Manifesto/Locais de descarregamento": z.string().nullish(), //unloading locals
  Filial: z.string(), //Origin hub
  "Veículo/Placa": z.string(), // Vehicle plate

  //Freight
  "Frete/ID": z.number().nullish(),
  "CT-e/Número": z.number().nullish(), // freight cte code
  "Configuração da cidade/Sigla cidade": z.string().nullish(), // destination code
  "Frete/Valor NF": z.coerce.number().default(0), // invoice_value
  "Frete/Peso real": z.coerce.number().default(0), // real weight
  "Frete/Total M3": z.coerce.number().default(0), // m³
  "Frete/Frete peso": z.coerce.number().default(0)
});

//transform to array
export const manifestApiSchema = z.array(manifestItemSchema);

// create automatically the type
export type ManifestItem = z.infer<typeof manifestItemSchema>;
export type ManifestApiResponse = z.infer<typeof manifestApiSchema>;
