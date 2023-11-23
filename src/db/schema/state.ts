import { relations, sql } from "drizzle-orm";
import { int, mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";
import tasks from "./task";

const states = mysqlTable("states", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 15 }).notNull().unique(),
  color: varchar("color", { length: 15 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const statesRelations = relations(states, ({ many }) => ({
  posts: many(tasks),
}));

export default states;
