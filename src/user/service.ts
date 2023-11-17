import { eq } from "drizzle-orm";
import { db } from "..";
import users from "../db/schema/user";
import { CreateUser, UpdateUser } from "./schemas";
import { isArrayEmpty } from "../utils/utils";

export async function createOne(user: CreateUser) {
  console.log(user);

  return db?.insert(users).values(user);
}

export async function findOne(id: string) {
  const user = await db?.select().from(users).where(eq(users.userId, id));

  if (isArrayEmpty(user)) return null;
  return await db?.select().from(users).where(eq(users.userId, id));
}

export async function updateOne(user: UpdateUser, id: string) {
  return await db?.update(users).set(user).where(eq(users.userId, id));
}
