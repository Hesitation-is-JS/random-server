import { sql } from "drizzle-orm";
import { serial, mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";

const categories = mysqlTable("categories", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 15 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export default categories;
