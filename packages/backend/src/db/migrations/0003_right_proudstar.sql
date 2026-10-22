CREATE TABLE "sync_history" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"status" text,
	"error" text[]
);
