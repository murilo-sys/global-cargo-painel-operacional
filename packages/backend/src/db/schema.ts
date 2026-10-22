import {
  pgTable,
  text,
  integer,
  doublePrecision,
  date,
  timestamp,
  boolean,
  uuid,
  pgSchema,
  primaryKey
} from "drizzle-orm/pg-core";

export const authSchema = pgSchema("auth");

export const usersTable = authSchema.table("users", {
  id: uuid("id").primaryKey()
});

export const freightsTable = pgTable("freights", {
  id: integer("id").primaryKey(),
  destination_hub: text("destination_hub"),
  origin_hub: text("origin_hub"),
  status: text("status").notNull(),
  modal: text("modal").notNull(),
  issuance_status: text("issuance_status").notNull(),
  emission_type: text("emission_type").notNull(),
  freight_type: text("freight_type").notNull(),
  current_location: text("current_location"),
  cte_number: integer("cte_number"),
  minute_number: integer("minute_number"),
  weight_kg: doublePrecision("weight_kg").notNull(),
  freight_weight: doublePrecision("freight_weight").notNull(),
  volume_m3: doublePrecision("volume_m3").notNull(),
  invoice_value: doublePrecision("invoice_value").notNull(),
  updated_at: date("updated_at"),
  last_synced_at: timestamp("last_synced_at").notNull(),
  is_disabled: boolean("is_disabled").default(false)
});

export const manifestsTable = pgTable("manifests", {
  id: integer("id").primaryKey(),
  code: integer("code").notNull(),
  total_m3: doublePrecision("total_m3").notNull(),
  total_weight_kg: doublePrecision("total_weight_kg").notNull(),
  total_invoices_value: doublePrecision("total_invoices_value").notNull(),
  unloading_places: text("unloading_places").array(),
  estimated_arrival: timestamp("estimated_arrival"),
  status: text("status").notNull(),
  vehicle_plate: text("vehicle_plate").notNull(),
  origin_hub: text("origin_hub").notNull()
});

export const pickupsTable = pgTable("pickups", {
  id: integer("id").primaryKey(),
  code: integer("code").notNull(),
  volume_m3: doublePrecision("volume_m3").notNull(),
  weight_kg: doublePrecision("weight_kg").notNull(),
  invoice_value: doublePrecision("invoice_value").notNull(),
  destination_hub: text("destination_hub"),
  service_date: timestamp("service_date"),
  request_date: timestamp("request_date").notNull(),
  status: text("status").notNull(),
  filial: text("filial").notNull()
});

export const manifestFreightsTable = pgTable(
  "manifest_freights",
  {
    manifest_id: integer("manifest_id")
      .notNull()
      .references(() => manifestsTable.id, { onDelete: "cascade" }),
    freight_id: integer("freight_id")
      .notNull()
      .references(() => freightsTable.id, { onDelete: "cascade" })
  },
  (table) => [primaryKey({ columns: [table.manifest_id, table.freight_id] })]
);

export const vehicleTypesTable = pgTable("vehicles_types", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  max_weight_kg: integer("max_weight_kg").notNull(),
  max_volume_m3: integer("max_volume_m3").notNull(),
  is_active: boolean("is_active").default(true)
});

export const routesTable = pgTable("routes", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  created_by: uuid("created_by")
    .notNull()
    .references(() => usersTable.id),
  vehicle_code: integer("vehicle_code")
    .notNull()
    .references(() => vehicleTypesTable.id),
  hubs: text("hubs").notNull().array()
});

export const hubsTable = pgTable("hubs", {
  code: text("code").primaryKey(),
  color: text("color").notNull(),
  region: text("region").notNull(),
  modal: text("modal").notNull().default("rodo"),
  is_active: boolean("is_active").default(true)
});

export const syncHistoryTable = pgTable("sync_history", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp("created_at").defaultNow(),
  status: text("status"),
  error: text("error").array()
});
