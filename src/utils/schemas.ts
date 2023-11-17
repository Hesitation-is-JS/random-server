import { ResponseSchema } from "./interfaces";

export const responseSchema: ResponseSchema = {
  "200": {
    type: "object",
    properties: {
      success: { type: "boolean" },
      message: { type: "string" },
      data: { type: "array" },
    },
  },
  "4xx": {
    type: "object",
    properties: {
      success: { type: "boolean" },
      message: { type: "string" },
      error: { type: "object" },
    },
  },
  "5xx": {
    type: "object",
    properties: {
      success: { type: "boolean" },
      message: { type: "string" },
      error: { type: "object" },
    },
  },
};

export const findOneResponseSchema: ResponseSchema = {
  ...responseSchema,
  "2xx": {
    type: "object",
    properties: {
      success: { type: "boolean" },
      message: { type: "string" },
      data: { type: "object" },
    },
  },
};
