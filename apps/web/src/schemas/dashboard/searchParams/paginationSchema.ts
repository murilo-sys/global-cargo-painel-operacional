import z from "zod";

// default base for others schema
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().catch(1)
});
