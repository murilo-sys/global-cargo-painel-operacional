import z from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url().min(10, "DATABASE_URL length must be bigger than 10."),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(10, "DATABASE_URL length must be bigger than 10."),
  SUPABASE_SECRET_KEY: z.string().default(""),

  // ESL
  ESL_TOKEN: z.string().default(""),
  ESL_URL_PICKUPS: z.string().default(""),
  ESL_URL_MANIFEST: z.string().default(""),
  ESL_URL_FREIGHTS: z.string().default(""),

  // GitHub Actions
  TOKEN_GITHUB: z.string().default(""),
  URL_ACTION_GITHUB: z.string().default(""),

  // Days ago (Sync)
  DAYS_AGO_FILTER_SYNC: z.coerce.number().min(0).default(5),
  DAYS_AGO_FILTER_PICKUP_SYNC: z.coerce.number().min(0).default(3),

  // Days ago (Queries / Database)
  DAYS_AGO_SEARCH_FREIGHTS: z.coerce.number().min(0).default(5),
  DAYS_AGO_SEARCH_PICKUPS: z.coerce.number().min(0).default(0),

  // Pagination
  PAGE_SIZE: z.coerce.number().min(1).default(10)
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  ESL_TOKEN: process.env.ESL_TOKEN,
  ESL_URL_PICKUPS: process.env.ESL_URL_PICKUPS,
  ESL_URL_MANIFEST: process.env.ESL_URL_MANIFEST,
  ESL_URL_FREIGHTS: process.env.ESL_URL_FREIGHTS,
  TOKEN_GITHUB: process.env.TOKEN_GITHUB,
  URL_ACTION_GITHUB: process.env.URL_ACTION_GITHUB,
  DAYS_AGO_FILTER_SYNC: process.env.DAYS_AGO_FILTER_SYNC,
  DAYS_AGO_FILTER_PICKUP_SYNC: process.env.DAYS_AGO_FILTER_PICKUP_SYNC,
  DAYS_AGO_SEARCH_FREIGHTS: process.env.DAYS_AGO_SEARCH_FREIGHTS,
  DAYS_AGO_SEARCH_PICKUPS: process.env.DAYS_AGO_SEARCH_PICKUPS,
  PAGE_SIZE: process.env.PAGE_SIZE
});
