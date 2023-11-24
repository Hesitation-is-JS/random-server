import { relations, sql } from "drizzle-orm";
import { int, mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";
import tasks from "./task";

const categories = mysqlTable("categories", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 15 }).notNull().unique(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export default categories;
