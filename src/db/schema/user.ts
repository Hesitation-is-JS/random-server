import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("firstName", { length: 256 }),
  lastName: varchar("lastName", { length: 256 }),
  username: varchar("username", { length: 256 }),
  password: varchar("password", { length: 256 }),
});

export default users;
