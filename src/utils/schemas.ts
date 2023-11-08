import { ResponseSchema } from "./interfaces";

export const createResponseSchema: ResponseSchema = {
  "201": {
    type: "object",
    properties: {
      success: { type: "boolean" },
      message: { type: "string" },
      data: { type: "array" },
    },
  },
};
