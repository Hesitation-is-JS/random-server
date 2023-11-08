import { ValidationSchema } from "../utils/interfaces";
import { createResponseSchema } from "../utils/schemas";

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
  response: createResponseSchema,
};
