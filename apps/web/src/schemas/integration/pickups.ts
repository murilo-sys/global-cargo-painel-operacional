import { z } from "zod";

export const pickupItemSchema = z.object({
  ID: z.number(),
  "N° coleta": z.number(),
  Status: z.string(), //pick,
  "Pessoa/Nome fantasia": z.string(), // Corporation/filial
  "Data Agendamento": z.date().nullish(), // Appointment date
  "Data Solicitação": z.date(), // create date
  "Peso real": z.coerce.number().default(0), // real weight
  "Valor total": z.coerce.number().default(0),
  "Cubagens/M&sup3;": z.coerce.number().default(0), // m³
  "Configuração da cidade/Sigla cidade": z.string().nullish() //destination hub
});

export const pickupApiSchema = z.array(pickupItemSchema);

// create automatically the type
export type PickupItem = z.infer<typeof pickupItemSchema>;
export type PickupApiResponse = z.infer<typeof pickupApiSchema>;
