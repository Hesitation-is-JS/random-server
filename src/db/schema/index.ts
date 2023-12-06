import { relations, sql } from "drizzle-orm";
import {
  int,
  mysqlTable,
  varchar,
  timestamp,
  datetime,
  mysqlEnum,
  index,
  foreignKey,
} from "drizzle-orm/mysql-core";

export const categories = mysqlTable("categories", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 256 }).notNull(),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  user: one(users, {
    fields: [categories.userId],
    references: [users.userId],
  }),
  tasks: many(tasks),
}));

export const states = mysqlTable("states", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 256 }).notNull(),
  color: varchar("color", { length: 20 }).notNull(),
  userId: varchar("user_id", { length: 256 }).references(() => users.userId, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const statesRelations = relations(states, ({ many, one }) => ({
  user: one(users, {
    fields: [states.userId],
    references: [users.userId],
  }),
  tasks: many(tasks),
}));

export const tasks = mysqlTable(
  "tasks",
  {
    id: int("id").primaryKey().autoincrement(),
    parentId: int("parent_id"),
    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description", { length: 2000 }),
    dueDate: datetime("due_date"),
    stateId: int("state_id")
      .references(() => states.id)
      .notNull(),
    categoryId: int("category_id")
      .references(() => categories.id)
      .notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    parentReference: foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
    }),
    parentIdx: index("parent_idx").on(table.parentId),
    stateIdx: index("state_idx").on(table.stateId),
    categoryIdx: index("category_idx").on(table.categoryId),
  })
);

export const tasksRelations = relations(tasks, ({ many, one }) => ({
  userTasks: many(usersTasks),
  subtasks: many(tasks, { relationName: "subtasks" }),
  parent: one(tasks, {
    fields: [tasks.parentId],
    references: [tasks.id],
    relationName: "subtasks",
  }),
  category: one(categories, {
    fields: [tasks.categoryId],
    references: [categories.id],
  }),
  state: one(states, {
    fields: [tasks.stateId],
    references: [states.id],
  }),
  comments: many(tasksComments),
}));

export const tasksComments = mysqlTable(
  "tasks_comments",
  {
    id: int("id").primaryKey().autoincrement(),
    userId: varchar("user_id", { length: 256 })
      .references(() => users.userId)
      .notNull(),
    taskId: int("task_id")
      .references(() => tasks.id)
      .notNull(),
    content: varchar("content", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    userIdx: index("user_idx").on(table.userId),
    taskIdx: index("task_idx").on(table.taskId),
  })
);

export const taskCommentsRelations = relations(tasksComments, ({ one }) => ({
  users: one(users, {
    fields: [tasksComments.userId],
    references: [users.userId],
  }),
  tasks: one(tasks, {
    fields: [tasksComments.taskId],
    references: [tasks.id],
  }),
}));

export const users = mysqlTable("users", {
  userId: varchar("userId", { length: 256 }).primaryKey().notNull().unique(),
  theme: mysqlEnum("theme", ["DARK", "LIGHT"]).default("DARK"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ many }) => ({
  userTasks: many(usersTasks),
  categories: many(categories),
  states: many(states),
}));

export const usersTasks = mysqlTable(
  "users_tasks",
  {
    id: int("id").primaryKey().autoincrement(),
    userId: varchar("user_id", { length: 256 }).references(() => users.userId),
    taskId: int("tas_id").references(() => tasks.id),
    createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    userIdx: index("user_idx").on(table.userId),
    taskIdx: index("task_idx").on(table.taskId),
  })
);

export const usersTasksRelations = relations(usersTasks, ({ one }) => ({
  users: one(users, {
    fields: [usersTasks.userId],
    references: [users.userId],
  }),
  tasks: one(tasks, {
    fields: [usersTasks.taskId],
    references: [tasks.id],
  }),
}));
