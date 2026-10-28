import dotenv from "dotenv";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import z from "zod";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

// Apenas busca arquivos .env no disco se as variáveis essenciais ainda não estiverem no process.env (ex: scripts CLI locais)
if (!process.env.DATABASE_URL) {
  const searchDirs = [
    process.cwd(),
    path.resolve(/*turbopackIgnore: true*/ process.cwd(), ".."),
    path.resolve(/*turbopackIgnore: true*/ process.cwd(), "../.."),
    path.resolve(/*turbopackIgnore: true*/ process.cwd(), "apps/web"),
    path.resolve(/*turbopackIgnore: true*/ process.cwd(), "packages/backend"),
    path.resolve(/*turbopackIgnore: true*/ currentDir, ".."),
    path.resolve(/*turbopackIgnore: true*/ currentDir, "../../.."),
    path.resolve(/*turbopackIgnore: true*/ currentDir, "../../../apps/web")
  ];

  for (const dir of searchDirs) {
    const envLocal = path.join(dir, ".env.local");
    if (fs.existsSync(envLocal)) {
      dotenv.config({ path: envLocal });
    }
    const envFile = path.join(dir, ".env");
    if (fs.existsSync(envFile)) {
      dotenv.config({ path: envFile });
    }
  }
}

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
