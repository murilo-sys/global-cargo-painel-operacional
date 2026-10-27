import { z } from "zod";

export const freightItemSchema = z.object({
  ID: z.number(),
  "Sigla Destino": z.string().nullish(),
  "Sigla Origem": z.string().nullish(),
  Status: z.string(),
  "Modal do frete": z.string(),
  "Tipo Documento": z.string(),
  "Tipo Transporte": z.string(),
  "Data atualização": z.date(),
  "N° Minuta": z.number().nullish(),
  "CT-e/Número": z.number().nullish(),
  "Localização atual/Nome": z.string().nullish(),
  "Valor NF": z.coerce.number().default(0),
  "Peso real": z.coerce.number().default(0),
  "Total M3": z.coerce.number().default(0),
  "Frete peso": z.coerce.number().default(0)
});

export const freightsApiSchema = z.array(freightItemSchema);

export type FreightItem = z.infer<typeof freightItemSchema>;
export type FreightsApiResponse = z.infer<typeof freightsApiSchema>;
