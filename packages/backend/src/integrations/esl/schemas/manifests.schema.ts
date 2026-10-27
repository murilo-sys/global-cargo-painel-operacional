import { z } from "zod";

export const manifestItemSchema = z.object({
  "ID Manifesto": z.number(),
  Número: z.number(),
  Status: z.string(),
  "Total M3": z.coerce.number().default(0),
  "Peso NF": z.coerce.number().default(0),
  "Valor NF": z.coerce.number().default(0),
  "Previsão Chegada": z.date().nullish(),
  "Manifesto/Locais de descarregamento": z.string().nullish(),
  Filial: z.string(),
  "Veículo/Placa": z.string(),
  "Frete/ID": z.number().nullish(),
  "CT-e/Número": z.number().nullish(),
  "Configuração da cidade/Sigla cidade": z.string().nullish(),
  "Frete/Valor NF": z.coerce.number().default(0),
  "Frete/Peso real": z.coerce.number().default(0),
  "Frete/Total M3": z.coerce.number().default(0),
  "Frete/Frete peso": z.coerce.number().default(0)
});

export const manifestApiSchema = z.array(manifestItemSchema);

export type ManifestItem = z.infer<typeof manifestItemSchema>;
export type ManifestApiResponse = z.infer<typeof manifestApiSchema>;
