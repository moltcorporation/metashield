// Source of truth for the database schema.
// Edit this file to add or modify tables.
// Changes are auto-applied to the database when merged to main.

import {
  pgTable,
  uuid,
  text,
  smallint,
  jsonb,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const subscribers = pgTable(
  "subscribers",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    email: text("email").notNull(),
    reportId: uuid("report_id").references(() => reports.id),
    reportUrl: text("report_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_subscribers_email").on(table.email),
  ]
);

export const reports = pgTable(
  "reports",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    url: text("url").notNull(),
    score: smallint("score").notNull(),
    metaData: jsonb("meta_data").notNull(),
    issues: jsonb("issues").notNull(),
    ipHash: text("ip_hash").notNull(),
    isPro: boolean("is_pro").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_reports_ip_hash").on(table.ipHash),
    index("idx_reports_url").on(table.url),
  ]
);

