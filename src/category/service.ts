import { and, eq, isNull, or } from "drizzle-orm";
import { db } from "..";
import { categories, states, tasks } from "../db/schema";
import { Category, CreateCategory, UpdateCategory } from "./schemas";
import { isArrayEmpty } from "../utils/utils";
import { HttpNotFound } from "../utils/error/http";
import { alias } from "drizzle-orm/mysql-core";
import { Task } from "../task/schemas";
import { State } from "../state/schemas";

export async function createOne(category: CreateCategory) {
  return db?.insert(categories).values(category);
}

export async function findOne(id: number) {
  const category = await db
    ?.select()
    .from(categories)
    .where(eq(categories.id, id));

  if (isArrayEmpty(category)) return null;
  return await db?.select().from(categories).where(eq(categories.id, id));
}

export async function findAll() {
  return await db?.select().from(categories);
}

export async function findAllForUser(id: string) {
  return await db
    ?.select()
    .from(categories)
    .where(or(eq(categories.userId, id), isNull(categories.userId)));
}

export async function findAllForUserWithData(id: string) {
  const subtask = alias(tasks, "subtask");
  const subtaskState = alias(states, "subtaskState");
  const subtaskCategory = alias(categories, "subtaskCategory");

  const result = await db
    ?.select()
    .from(categories)
    .where(or(eq(categories.userId, id), isNull(categories.userId)))
    .leftJoin(
      tasks,
      and(eq(tasks.categoryId, categories.id), isNull(tasks.parentId))
    )
    .leftJoin(states, eq(tasks.stateId, states.id))
    .leftJoin(subtask, eq(subtask.parentId, tasks.id))
    .leftJoin(subtaskCategory, eq(subtask.categoryId, subtaskCategory.id))
    .leftJoin(subtaskState, eq(subtask.stateId, subtaskState.id));

  const formatted = result.reduce<
    Record<
      number,
      Category & {
        tasks: Record<
          number,
          Task & {
            state: State;
            subtasks: (Task & { state: State; category: Category })[];
          }
        >;
      }
    >
  >((acc, row) => {
    const category = row.categories;
    const task = row.tasks;
    const state = row.states;
    const subtask = row.subtask;
    const subtaskState = row.subtaskState;
    const subtaskCategory = row.subtaskCategory;

    if (!acc[category.id]) {
      acc[category.id] = { ...category, tasks: {} };
    }

    if (task && state) {
      acc[category.id].tasks[task.id] = { ...task, state, subtasks: [] };

      if (subtask && subtaskState && subtaskCategory) {
        acc[category.id].tasks[task.id].subtasks.push({
          ...subtask,
          state: subtaskState,
          category: subtaskCategory,
        });
      }
    }

    return acc;
  }, {});

  const flattened = Object.values(formatted).map((record) => ({
    ...record,
    tasks: Object.values(record.tasks),
  }));

  return Object.values(flattened);
}

export async function updateOne(category: UpdateCategory, id: number) {
  if (!(await findOne(id)))
    throw new HttpNotFound(`Category with id ${id} was not found`);

  return await db
    ?.update(categories)
    .set(category)
    .where(eq(categories.id, id));
}

export async function deleteOne(id: number) {
  if (!(await findOne(id)))
    throw new HttpNotFound(`Category with id ${id} was not found`);

  return await db?.delete(categories).where(eq(categories.id, id));
}
