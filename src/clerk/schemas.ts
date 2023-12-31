import { users } from "../db/schema";
import { ValidationSchema } from "../utils/interfaces";

export type User = typeof users.$inferSelect;
export type CreateUser = typeof users.$inferInsert;
export type UpdateUser = { theme?: "DARK" | "LIGHT" | null | undefined };

export const webhookSchema: ValidationSchema = {
  description: "This endpoint handles clerk webhook calls",
  tags: ["clerk"],
  summary: "clerk webhooks",
};
