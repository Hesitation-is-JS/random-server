import { sql } from "drizzle-orm";
import { mysqlTable, varchar, timestamp, int } from "drizzle-orm/mysql-core";
import users from "./user";
import tasks from "./task";

const tasksComments = mysqlTable("tasks-comments", {
  id: int("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId),
  taskId: int("tas_id").references(() => tasks.id),
  content: varchar("user_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export default tasksComments;
