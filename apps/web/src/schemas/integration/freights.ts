import { z } from "zod";

//Validate the freight types with zod
export const freightItemSchema = z.object({
  ID: z.number(), // Identifier
  "Sigla Destino": z.string().nullish(), // destination code
  "Sigla Origem": z.string().nullish(), // origin code
  Status: z.string(), // freight status
  "Modal do frete": z.string(), // freight modal like "air" or "rodo"
  "Tipo Documento": z.string(), // draft, normal etc...
  "Tipo Transporte": z.string(), // freight type Redelivery/Substitute etc...
  "Data atualização": z.date(),
  "N° Minuta": z.number().nullish(), // Draft number

  // nullish for safe handling for pending CTE number
  "CT-e/Número": z.number().nullish(), // freight cte code
  "Localização atual/Nome": z.string().nullish(), // current location

  // parse to number, if null default value is 0
  "Valor NF": z.coerce.number().default(0),
  "Peso real": z.coerce.number().default(0),
  "Total M3": z.coerce.number().default(0),
  "Frete peso": z.coerce.number().default(0)
});

// transform to array
export const freightsApiSchema = z.array(freightItemSchema);

// create automatically the type
export type FreightItem = z.infer<typeof freightItemSchema>;
export type FreightsApiResponse = z.infer<typeof freightsApiSchema>;
