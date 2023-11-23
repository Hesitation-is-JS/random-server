import { eq } from "drizzle-orm";
import { db } from "..";
import categories from "../db/schema/category";
import { CreateCategory, UpdateCategory } from "./schemas";
import { isArrayEmpty } from "../utils/utils";
import { HttpNotFound } from "../utils/error/http";

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

export async function updateOne(category: UpdateCategory, id: number) {
  if (!(await findOne(id)))
    throw new HttpNotFound(`Category with id ${id} was not found`);

  return await db
    ?.update(categories)
    .set(category)
    .where(eq(categories.id, id));
}
