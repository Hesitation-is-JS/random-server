import { relations, sql } from "drizzle-orm";
import {
  int,
  mysqlTable,
  varchar,
  timestamp,
  datetime,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const categories = mysqlTable("categories", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 15 }).notNull().unique(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  tasks: many(tasks),
}));

export const states = mysqlTable("states", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 15 }).notNull().unique(),
  color: varchar("color", { length: 15 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const statesRelations = relations(states, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasks = mysqlTable("tasks", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 2000 }),
  dueDate: datetime("due_date"),
  collectionId: int("collection_id").references(() => taskCollections.id),
  stateId: int("state_id").references(() => states.id),
  categoryId: int("category_id").references(() => categories.id),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const tasksRelations = relations(tasks, ({ many, one }) => ({
  users: many(users),
  collection: one(taskCollections),
  category: one(categories),
  state: one(states),
  comments: many(tasksComments),
}));

export const taskCollections = mysqlTable("task_collection", {
  id: int("id").primaryKey().autoincrement(),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 2000 }),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const taskCollectionsRelations = relations(tasks, ({ many, one }) => ({
  users: one(users),
  tasks: many(tasks),
}));

export const tasksComments = mysqlTable("tasks_comments", {
  id: int("id").primaryKey().autoincrement(),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId),
  taskId: int("task_id").references(() => tasks.id),
  content: varchar("content", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const taskCommentsRelations = relations(tasks, ({ one }) => ({
  users: one(users),
  tasks: one(tasks),
}));

export const users = mysqlTable("users", {
  userId: varchar("userId", { length: 256 }).primaryKey().notNull().unique(),
  theme: mysqlEnum("theme", ["DARK", "LIGHT"]).default("DARK"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(tasks, ({ many, one }) => ({
  users: one(users),
  tasks: many(tasks),
  collections: many(taskCollections),
}));

export const usersTasks = mysqlTable("users_tasks", {
  id: int("id").primaryKey().autoincrement(),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId),
  taskId: int("tas_id").references(() => tasks.id),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const usersTasksRelations = relations(tasks, ({ one }) => ({
  users: one(users),
  tasks: one(tasks),
}));
