import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "../env.js";

async function runMigrations() {
  console.log("Connecting to DataBase...");

  // Using max 1 connection to avoid timeout while table lock
  const connection = postgres(env.DATABASE_URL, { max: 1 });
  const db = drizzle(connection);

  try {
    console.log("Applying migrations to database.");
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    console.log("All migrations have been applicated succesfuly");
  } catch (error) {
    console.error("Error when applicating migration:", error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

runMigrations();
