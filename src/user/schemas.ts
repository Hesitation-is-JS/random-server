import { users } from "../db/schema";
import { ValidationSchema } from "../utils/interfaces";

export type User = typeof users.$inferSelect;
export type CreateUser = typeof users.$inferInsert;
export type UpdateUser = { theme?: "DARK" | "LIGHT" | null | undefined };

export const finOneUserSchema: ValidationSchema = {
  description: "This endpoint return user data by their corresponding id",
  tags: ["user"],
  summary: "Find one user",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  // response: findOneResponseSchema,
};
