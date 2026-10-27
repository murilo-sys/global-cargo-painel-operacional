import z from "zod";
import { paginationSchema } from "./paginationSchema";

export const issuanceSearchParamsSchema = paginationSchema.extend({
  status: z.enum(["Pendente", "Emitido", "Manifestado"]).catch("Pendente")
});

export type IssuanceSearchParams = z.infer<typeof issuanceSearchParamsSchema>;
