import { ValidationSchema } from "../utils/interfaces";
import { createResponseSchema } from "../utils/schemas";

export const createUserSchema: ValidationSchema = {
  description: "post some data",
  tags: ["user", "code"],
  summary: "qwerty",
  body: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
    },
    required: ["firstName", "lastName"],
  },
  response: createResponseSchema,
};
