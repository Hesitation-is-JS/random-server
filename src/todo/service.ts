import { db } from "..";
import users from "../db/schema/user";

export async function findOne(id: number) {
  const res = await db?.select().from(users).execute();

  return res;
}
