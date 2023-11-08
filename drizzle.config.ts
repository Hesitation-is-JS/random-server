import type { Config } from "drizzle-kit";
import { DB_URL } from "./src/utils/env";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/db/schema/*.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    connectionString: DB_URL,
  },
} satisfies Config;
