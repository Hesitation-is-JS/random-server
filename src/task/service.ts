import { eq } from "drizzle-orm";
import { db } from "..";
import { tasks } from "../db/schema";
import { usersTasks } from "../db/schema";
import { CreateTask, UpdateTask } from "./schemas";
import { isArrayEmpty } from "../utils/utils";
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
  const task = await db?.select().from(tasks).where(eq(tasks.id, id));

  if (isArrayEmpty(task)) return null;
  return await db?.select().from(tasks).where(eq(tasks.id, id));
}

export async function findAll() {
  return await db?.select().from(tasks);
}

export async function updateOne(task: UpdateTask, id: number) {
  if (!(await findOne(id)))
    throw new HttpNotFound(`task with id ${id} was not found`);

  return await db
    ?.update(tasks)
    .set({ ...task, dueDate: new Date(task.dueDate ?? "") })
    .where(eq(tasks.id, id));
}
