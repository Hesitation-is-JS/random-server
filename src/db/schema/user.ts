import { sql } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  mysqlEnum,
  timestamp,
} from "drizzle-orm/mysql-core";

const users = mysqlTable("users", {
  userId: varchar("userId", { length: 256 }).primaryKey().notNull(),
  theme: mysqlEnum("theme", ["DARK", "LIGHT"]).default("DARK"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export default users;
