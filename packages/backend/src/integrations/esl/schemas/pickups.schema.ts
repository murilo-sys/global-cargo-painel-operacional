import { z } from "zod";

export const pickupItemSchema = z.object({
  ID: z.number(),
  "N° coleta": z.number(),
  Status: z.string(),
  "Pessoa/Nome fantasia": z.string(),
  "Data Agendamento": z.date().nullish(),
  "Data Solicitação": z.date(),
  "Peso real": z.coerce.number().default(0),
  "Valor total": z.coerce.number().default(0),
  "Cubagens/M&sup3;": z.coerce.number().default(0),
  "Configuração da cidade/Sigla cidade": z.string().nullish()
});

export const pickupApiSchema = z.array(pickupItemSchema);

export type PickupItem = z.infer<typeof pickupItemSchema>;
export type PickupApiResponse = z.infer<typeof pickupApiSchema>;
