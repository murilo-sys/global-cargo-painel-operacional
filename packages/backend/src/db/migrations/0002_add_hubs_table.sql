CREATE TABLE IF NOT EXISTS "hubs" (
	"code" text PRIMARY KEY NOT NULL,
	"color" text NOT NULL,
	"region" text NOT NULL,
	"modal" text DEFAULT 'rodo' NOT NULL,
	"is_active" boolean DEFAULT true
);

INSERT INTO "hubs" ("code", "color", "region", "modal", "is_active") VALUES
  ('BEL', '#00C1CF', 'Norte', 'rodo', true),
  ('PMW', '#FFFFFF', 'Norte', 'rodo', true),
  ('MAO', '#18CF00', 'Norte', 'rodo', true),
  ('BVB', '#FFFFFF', 'Norte', 'rodo', true),
  ('MAO - AIR', '#FFFFFF', 'Norte', 'air', true),
  ('MCP', '#B7B7B7', 'Norte', 'rodo', true),
  ('AJU', '#A3A298', 'Nordeste', 'rodo', true),
  ('BHZ', '#E5D8B6', 'Sudeste', 'rodo', true),
  ('FOR', '#00FFCC', 'Nordeste', 'rodo', true),
  ('GYN', '#04BC9A', 'Sudeste', 'rodo', true),
  ('IMP', '#CB78A4', 'Nordeste', 'rodo', true),
  ('ITJ', '#EEE6D9', 'Sul', 'rodo', true),
  ('JPA', '#F8CB35', 'Nordeste', 'rodo', true),
  ('MAB', '#351967', 'Norte', 'rodo', true),
  ('MCZ', '#F58016', 'Nordeste', 'rodo', true),
  ('NAT', '#227665', 'Nordeste', 'rodo', true),
  ('PGM', '#922200', 'Norte', 'rodo', true),
  ('PNZ', '#0043BE', 'Nordeste', 'rodo', true),
  ('POA', '#C07C1B', 'Sul', 'rodo', true),
  ('REC', '#FAF3EB', 'Nordeste', 'rodo', true),
  ('SLZ', '#570345', 'Nordeste', 'rodo', true),
  ('SSA', '#FFC300', 'Nordeste', 'rodo', true),
  ('STM', '#C6B392', 'Norte', 'rodo', true),
  ('THE', '#FF0004', 'Nordeste', 'rodo', true),
  ('VDC', '#0174D7', 'Nordeste', 'rodo', true)
ON CONFLICT ("code") DO NOTHING;
