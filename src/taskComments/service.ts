import { eq } from "drizzle-orm";
import { db } from "..";
import { tasksComments } from "../db/schema";
import { CreateTaskComment, UpdateTaskComment } from "./schemas";
import { isArrayEmpty } from "../utils/utils";
import { HttpNotFound } from "../utils/error/http";

export async function createOne(taskComment: CreateTaskComment) {
  return await db?.insert(tasksComments).values(taskComment);
}

export async function findOne(id: number) {
  const taskComment = await db
    ?.select()
    .from(tasksComments)
    .where(eq(tasksComments.id, id));

  if (isArrayEmpty(taskComment)) return null;
  return await db?.select().from(tasksComments).where(eq(tasksComments.id, id));
}

export async function findAll() {
  return await db?.select().from(tasksComments);
}

export async function findAllUserComment(id: string) {
  return await db
    ?.select()
    .from(tasksComments)
    .where(eq(tasksComments.userId, id));
}

export async function findAllTaskComment(id: number) {
  return await db
    ?.select()
    .from(tasksComments)
    .where(eq(tasksComments.taskId, id));
}

export async function updateOne(taskComment: UpdateTaskComment, id: number) {
  if (!(await findOne(id)))
    throw new HttpNotFound(`taskComment with id ${id} was not found`);

  return await db
    ?.update(tasksComments)
    .set(taskComment)
    .where(eq(tasksComments.id, id));
}
