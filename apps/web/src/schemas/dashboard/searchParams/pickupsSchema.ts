import z from "zod";

export const pickupsSearchParamsSchema = z.object({
  status: z.enum(["Coletada", "Em trânsito"]).optional().catch(undefined)
});

export type PickupsSearchParams = z.infer<typeof pickupsSearchParamsSchema>;
