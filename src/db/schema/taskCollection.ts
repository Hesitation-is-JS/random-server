import { sql } from "drizzle-orm";
import { mysqlTable, varchar, timestamp, int } from "drizzle-orm/mysql-core";
import users from "./user";

const taskCollections = mysqlTable("task_collection", {
  id: int("id").primaryKey().autoincrement(),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 2000 }),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export default taskCollections;
