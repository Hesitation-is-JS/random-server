import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const DB_URL = String(process.env.DB_URL);

export default {
  schema: "./schema/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: DB_URL,
  },
} satisfies Config;
