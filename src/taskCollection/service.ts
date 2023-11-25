import { eq } from "drizzle-orm";
import { db } from "..";
import taskCollections from "../db/schema/taskCollection";
import { CreateTaskCollection, UpdateTaskCollection } from "./schemas";
import { isArrayEmpty } from "../utils/utils";
import { HttpNotFound } from "../utils/error/http";
import tasks from "../db/schema/task";
import { drizzle } from "drizzle-orm/mysql2";

export async function createOne(taskCollection: CreateTaskCollection) {
  return await db?.insert(taskCollections).values(taskCollection);
}

export async function findOne(id: number) {
  const taskCollection = await db
    ?.select()
    .from(taskCollections)
    .where(eq(taskCollections.id, id));

  if (isArrayEmpty(taskCollection)) return null;
  return taskCollection;
}

export async function findAll() {
  return await db
    ?.select()
    .from(taskCollections)
    .leftJoin(tasks, eq(taskCollections.id, tasks.id));
}

export async function findAllUserCollection(id: string) {
  return await db
    ?.select()
    .from(taskCollections)
    .where(eq(taskCollections.userId, id));
}

export async function updateOne(
  taskCollection: UpdateTaskCollection,
  id: number
) {
  if (!(await findOne(id)))
    throw new HttpNotFound(`taskCollection with id ${id} was not found`);

  return await db
    ?.update(taskCollections)
    .set(taskCollection)
    .where(eq(taskCollections.id, id));
}
