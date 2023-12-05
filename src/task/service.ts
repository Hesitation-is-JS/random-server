import { db } from "..";
import { and, eq, isNull } from "drizzle-orm";
import { tasks, usersTasks } from "../db/schema";
import { CreateTask, UpdateTask } from "./schemas";
import { HttpNotFound } from "../utils/error/http";

export async function createOne(task: CreateTask, userId: string) {
  await db?.transaction(async (tx) => {
    const createdTask = await tx
      .insert(tasks)
      .values({ ...task, dueDate: new Date(task.dueDate ?? "") });
    await tx
      .insert(usersTasks)
      .values({ taskId: createdTask[0].insertId, userId });
  });
}

export async function findOne(id: number) {
  const result = await db.query.tasks.findMany({
    with: {
      state: true,
      category: true,
      comments: true,
      subtasks: {
        with: {
          state: true,
          category: true,
          comments: true,
        },
      },
    },
    where: and(eq(tasks.id, id), isNull(tasks.parentId)),
  });

  return result;
}

export async function findAll() {
  const result = await db.query.tasks.findMany({
    with: {
      subtasks: true,
    },
    where: isNull(tasks.parentId),
  });

  return result;
}

export async function findAllForUser(id: string) {
  const result = await db.query.usersTasks.findMany({
    with: {
      tasks: {
        with: {
          state: true,
          category: true,
          comments: true,
          subtasks: {
            with: {
              state: true,
              category: true,
              comments: true,
            },
          },
        },
      },
    },
    where: eq(usersTasks.userId, id),
  });

  const formatted = result
    .filter((join) => join.tasks?.parentId === null)
    .map((join) => join.tasks);

  return formatted;
}

export async function updateOne(task: UpdateTask, id: number) {
  if (!(await findOne(id)))
    throw new HttpNotFound(`task with id ${id} was not found`);

  return await db
    ?.update(tasks)
    .set({ ...task, dueDate: new Date(task.dueDate ?? "") })
    .where(eq(tasks.id, id));
}
