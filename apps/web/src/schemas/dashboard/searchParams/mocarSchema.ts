import z from "zod";
import { paginationSchema } from "./paginationSchema";

// Mocar Params Schema
export const mocarSearchParamsSchema = paginationSchema.extend({
  hub: z.string().toUpperCase().optional().catch(undefined),
  modal: z.enum(["Rodoviário", "Aéreo"]).optional().catch(undefined)
});

export type MocarSearchParams = z.infer<typeof mocarSearchParamsSchema>;
