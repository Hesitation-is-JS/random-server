import { sql } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  timestamp,
  int,
  datetime,
} from "drizzle-orm/mysql-core";
import categories from "./category";
import states from "./state";
import taskCollection from "./taskCollection";

const tasks = mysqlTable("tasks", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 2000 }),
  dueDate: datetime("due_date"),
  collectionId: int("collection_id").references(() => taskCollection.id),
  stateId: int("state_id").references(() => states.id),
  categoryId: int("category_id").references(() => categories.id),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export default tasks;
