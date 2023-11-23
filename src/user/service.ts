import { eq } from "drizzle-orm";
import { db } from "..";
import users from "../db/schema/user";
import { CreateUser, UpdateUser } from "./schemas";
import { isArrayEmpty } from "../utils/utils";
import { clerkClient } from "@clerk/fastify";
import { HttpNotFound } from "../utils/error/http";

export async function createOne(user: CreateUser) {
  return await db?.insert(users).values(user);
}

export async function findOne(id: string) {
  const user = await db?.select().from(users).where(eq(users.userId, id));

  if (isArrayEmpty(user)) return null;
  return await db?.select().from(users).where(eq(users.userId, id));
}

export async function findClerkUser(id: string) {
  return await clerkClient.users.getUser(id);
}

export async function updateOne(user: UpdateUser, id: string) {
  if (!(await findOne(id)))
    throw new HttpNotFound(`User with id ${id} was not found`);

  return await db?.update(users).set(user).where(eq(users.userId, id));
}
