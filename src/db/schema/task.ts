import { sql } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  timestamp,
  serial,
  int,
  datetime,
} from "drizzle-orm/mysql-core";
import users from "./user";
import categories from "./category";
import states from "./state";

const tasks = mysqlTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 2000 }),
  dueDate: datetime("due_date"),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId),
  stateId: int("state_id").references(() => states.id),
  categoryId: int("category_id").references(() => categories.id),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export default tasks;
