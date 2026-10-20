import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().length(10, "DATABASE_URL lenght must be bigger than 10.")
});

export const env = envSchema.parse(process.env.DATABASE_URL);
