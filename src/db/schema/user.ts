import { sql } from "drizzle-orm";
import {
  mysqlTable,
  serial,
  mysqlEnum,
  timestamp,
} from "drizzle-orm/mysql-core";

const users = mysqlTable("users", {
  userId: serial("id").primaryKey().notNull(),
  theme: mysqlEnum("theme", ["DARK", "LIGHT"]).default("DARK"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export default users;
