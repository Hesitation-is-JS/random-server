import { eq } from "drizzle-orm";
import { db } from "..";
import taskComments from "../db/schema/taskComments";
import { CreateTaskComment, UpdateTaskComment } from "./schemas";
import { isArrayEmpty } from "../utils/utils";
import { HttpNotFound } from "../utils/error/http";

export async function createOne(taskComment: CreateTaskComment) {
  return await db?.insert(taskComments).values(taskComment);
}

export async function findOne(id: number) {
  const taskComment = await db
    ?.select()
    .from(taskComments)
    .where(eq(taskComments.id, id));

  if (isArrayEmpty(taskComment)) return null;
  return await db?.select().from(taskComments).where(eq(taskComments.id, id));
}

export async function findAll() {
  return await db?.select().from(taskComments);
}

export async function findAllUserComment(id: string) {
  return await db
    ?.select()
    .from(taskComments)
    .where(eq(taskComments.userId, id));
}

export async function findAllTaskComment(id: number) {
  return await db
    ?.select()
    .from(taskComments)
    .where(eq(taskComments.taskId, id));
}

export async function updateOne(taskComment: UpdateTaskComment, id: number) {
  if (!(await findOne(id)))
    throw new HttpNotFound(`taskComment with id ${id} was not found`);

  return await db
    ?.update(taskComments)
    .set(taskComment)
    .where(eq(taskComments.id, id));
}
