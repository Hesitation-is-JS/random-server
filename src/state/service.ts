import { eq } from "drizzle-orm";
import { db } from "..";
import states from "../db/schema/state";
import { CreateState, UpdateState } from "./schemas";
import { isArrayEmpty } from "../utils/utils";

export async function createOne(state: CreateState) {
  return await db?.insert(states).values(state);
}

export async function findOne(id: number) {
  const state = await db?.select().from(states).where(eq(states.id, id));

  if (isArrayEmpty(state)) return null;
  return await db?.select().from(states).where(eq(states.id, id));
}

export async function findAll() {
  return await db?.select().from(states);
}

export async function updateOne(state: UpdateState, id: number) {
  return await db?.update(states).set(state).where(eq(states.id, id));
}
