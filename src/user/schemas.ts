import { users } from "../db/schema";
import { ValidationSchema } from "../utils/interfaces";
import { defaultSuccessSchema, findOneResponseSchema } from "../utils/schemas";

export type User = typeof users.$inferSelect;
export type CreateUser = typeof users.$inferInsert;
export type UpdateUser = { theme?: "DARK" | "LIGHT" | null | undefined };

export const createUserSchema: ValidationSchema = {
  description: "This endpoint handles the creation of user records",
  tags: ["user"],
  summary: "Create user record",
  body: {
    type: "object",
    properties: {
      userId: { type: "string" },
      theme: { type: "string" },
    },
    required: ["userId"],
  },
  response: defaultSuccessSchema,
};

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
