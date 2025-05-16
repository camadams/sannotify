import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const resortsTable = pgTable("resorts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  sub_unitcode: text("sub_unitcode").notNull(),
  avaliabilty: text("avaliabilty").notNull(),
});
