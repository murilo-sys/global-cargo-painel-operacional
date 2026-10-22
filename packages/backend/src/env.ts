import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(10, "DATABASE_URL invalid")
});

export const env = envSchema.parse({ DATABASE_URL: process.env.DATABASE_URL });
