/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'manifest_freights'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "manifest_freights" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "manifest_freights" ADD CONSTRAINT "manifest_freights_manifest_id_freight_id_pk" PRIMARY KEY("manifest_id","freight_id");