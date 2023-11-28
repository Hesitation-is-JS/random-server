import { eq } from "drizzle-orm";
import { db } from "..";
import { states } from "../db/schema";
import { CreateState, UpdateState } from "./schemas";
import { isArrayEmpty } from "../utils/utils";
import { HttpNotFound } from "../utils/error/http";

export async function createOne(state: CreateState) {
  return await db?.insert(states).values(state);
}

export async function findOne(id: number) {
  const state = await db?.select().from(states).where(eq(states.id, id));

  if (isArrayEmpty(state)) return null;
  return state;
}

export async function findAll() {
  return await db?.select().from(states);
}

export async function findAllForUser(id: string) {
  console.log("id");

  return await db?.select().from(states).where(eq(states.userId, id));
}

export async function updateOne(state: UpdateState, id: number) {
  if (!(await findOne(id)))
    throw new HttpNotFound(`State with id ${id} was not found`);

  return await db?.update(states).set(state).where(eq(states.id, id));
}

export async function deleteOne(id: number) {
  if (!(await findOne(id)))
    throw new HttpNotFound(`State with id ${id} was not found`);

  return await db?.delete(states).where(eq(states.id, id));
}
