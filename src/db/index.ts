import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { DB_URL } from "../utils/env";
import { migrate } from "drizzle-orm/mysql2/migrator";
import * as schema from "./schema";

export default async function createDatabaseConnection() {
  try {
    const connection = await mysql.createConnection({
      uri: DB_URL,
    });

    const db = drizzle(connection, { schema, mode: "default" });

    await migrate(db, { migrationsFolder: "drizzle" });

    return db;
  } catch (error) {
    console.error("ERROR", error);
  }
}
