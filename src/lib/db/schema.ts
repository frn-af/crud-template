import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const imt = pgTable("imt", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  no_hp: integer().notNull(),
  tinggi_badan: integer().notNull(),
  berat_badan: integer().notNull(),
});

export const Data = typeof imt.$inferSelect;
export const InsertData = typeof imt.$inferInsert;
