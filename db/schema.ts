import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const availabilityTable = pgTable("availability", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  camp_id: integer("camp_id").notNull(),
  availability: text("availability").notNull(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
