import { db } from "..";
import { and, eq, isNull } from "drizzle-orm";
import { alias } from "drizzle-orm/mysql-core";
import { tasks, usersTasks } from "../db/schema";
import { CreateTask, Task, UpdateTask, UsersTask } from "./schemas";
import { isObjEmpty } from "../utils/utils";
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
  const subtask = alias(tasks, "subtask");

  const result = await db
    ?.select()
    .from(tasks)
    .leftJoin(subtask, eq(tasks.id, subtask.parentId))
    .where(eq(tasks.id, id));

  const formatted = result?.reduce<
    Record<number, { task: Task; subtasks: Task[] }>
  >((acc, row) => {
    const task = row.tasks;
    const subtask = row.subtask;

    if (!acc[task.id]) {
      acc[task.id] = { task, subtasks: [] };
    }

    if (subtask) {
      acc[task.id].subtasks.push(subtask);
    }

    return acc;
  }, {});

  if (isObjEmpty(formatted)) return null;

  return Object.values(formatted ?? {})[0];
}

export async function findAll() {
  const subtask = alias(tasks, "subtask");
  const result = await db
    ?.select()
    .from(tasks)
    .leftJoin(subtask, eq(tasks.id, subtask.parentId))
    .where(isNull(tasks.parentId));

  const formatted = result?.reduce<
    Record<number, { task: Task; subtasks: Task[] }>
  >((acc, row) => {
    const task = row.tasks;
    const subtask = row.subtask;

    if (!acc[task.id]) {
      acc[task.id] = { task, subtasks: [] };
    }

    if (subtask) {
      acc[task.id].subtasks.push(subtask);
    }

    return acc;
  }, {});

  return Object.values(formatted ?? {});
}

export async function findAllForUser(id: string) {
  const subtask = alias(tasks, "subtask");
  const result = await db
    ?.select()
    .from(usersTasks)
    .leftJoin(tasks, eq(usersTasks.taskId, tasks.id))
    .leftJoin(subtask, eq(tasks.id, subtask.parentId))
    .where(and(isNull(tasks.parentId), eq(usersTasks.userId, id)));

  const formatted = result?.reduce<
    Record<
      number,
      {
        userTask: UsersTask;
        tasks: Record<number, Task & { subtasks: Task[] }>;
      }
    >
  >((acc, row) => {
    const userTask = row.users_tasks;
    const task = row.tasks;
    const subtask = row.subtask;

    if (!acc[userTask.id]) {
      acc[userTask.id] = { userTask, tasks: {} };
    }

    if (task) {
      if (!acc[userTask.id].tasks[task.id]) {
        acc[userTask.id].tasks[task.id] = { ...task, subtasks: [] };
      }

      if (subtask) {
        acc[userTask.id].tasks[task.id].subtasks.push(subtask);
      }
    }

    return acc;
  }, {});

  const flattened = Object.values(formatted ?? {}).map((record) => ({
    userTask: record.userTask,
    tasks: Object.values(record.tasks ?? {}),
  }));

  return flattened;
}

export async function updateOne(task: UpdateTask, id: number) {
  if (!(await findOne(id)))
    throw new HttpNotFound(`task with id ${id} was not found`);

  console.log(task);

  return await db
    ?.update(tasks)
    .set({ ...task, dueDate: new Date(task.dueDate ?? "") })
    .where(eq(tasks.id, id));
}
