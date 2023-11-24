import { sql } from "drizzle-orm";
import { mysqlTable, varchar, timestamp, int } from "drizzle-orm/mysql-core";
import users from "./user";
import tasks from "./task";

const usersTasks = mysqlTable("usersTasks", {
  id: int("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId),
  taskId: int("tas_id").references(() => tasks.id),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export default usersTasks;
