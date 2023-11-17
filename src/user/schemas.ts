import users from "../db/schema/user";
import { ValidationSchema } from "../utils/interfaces";
import { responseSchema, findOneResponseSchema } from "../utils/schemas";

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
  response: responseSchema,
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
  response: findOneResponseSchema,
};
