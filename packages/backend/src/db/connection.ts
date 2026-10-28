import postgres from "postgres";
import { env } from "../env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export const client = postgres(env.DATABASE_URL, {
  prepare: false,
  max: 10,
  idle_timeout: 5
});

export const db = drizzle(client, { schema });

export async function closeDatabaseConnection(): Promise<void> {
  await client.end({ timeout: 5 });
}
