import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(10, "DATABASE_URL invalid"),
  ESL_TOKEN: z.string().default(""),
  ESL_URL_PICKUPS: z.string().default(""),
  ESL_URL_MANIFEST: z.string().default(""),
  ESL_URL_FREIGHTS: z.string().default(""),
  DAYS_AGO_FILTER_SYNC: z.coerce.number().min(0).default(5),
  DAYS_AGO_FILTER_PICKUP_SYNC: z.coerce.number().min(0).default(3)
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  ESL_TOKEN: process.env.ESL_TOKEN,
  ESL_URL_PICKUPS: process.env.ESL_URL_PICKUPS,
  ESL_URL_MANIFEST: process.env.ESL_URL_MANIFEST,
  ESL_URL_FREIGHTS: process.env.ESL_URL_FREIGHTS,
  DAYS_AGO_FILTER_SYNC: process.env.DAYS_AGO_FILTER_SYNC,
  DAYS_AGO_FILTER_PICKUP_SYNC: process.env.DAYS_AGO_FILTER_PICKUP_SYNC
});
