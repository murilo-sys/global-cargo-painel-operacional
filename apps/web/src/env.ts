import z from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url().min(10, "DATABASE_URL length must be bigger than 10."),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(10, "DATABASE_URL length must be bigger than 10."),

  // Days ago (Queries / Database)
  DAYS_AGO_SEARCH_FREIGHTS: z.coerce.number().min(0, "DAYS must be a valid number").default(5),
  DAYS_AGO_SEARCH_PICKUPS: z.coerce.number().min(0, "DAYS must be a valid number").default(0),

  // Days ago (Sync)
  DAYS_AGO_FILTER_SYNC: z.coerce.number().min(0, "DAYS must be a valid number").default(5),

  // Pagination
  PAGE_SIZE: z.coerce.number().min(1, "Content per page must be a valid number").default(10)
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  PAGE_SIZE: process.env.PAGE_SIZE
});
