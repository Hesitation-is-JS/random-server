import { ResponseSchema } from "./interfaces";

export const baseResponseSchema: ResponseSchema = {
  "4xx": {
    type: "object",
    properties: {
      message: { type: "string" },
      error: { type: "object" },
    },
  },
  "5xx": {
    type: "object",
    properties: {
      message: { type: "string" },
      error: { type: "object" },
    },
  },
};

export const defaultSuccessSchema: ResponseSchema = {
  ...baseResponseSchema,
  "2xx": {
    type: "object",
    properties: {
      success: { type: "boolean" },
      message: { type: "string" },
    },
  },
};

export const findOneResponseSchema: ResponseSchema = {
  ...baseResponseSchema,
  "2xx": {
    type: "object",
    properties: {
      message: { type: "string" },
      data: { type: "array" },
    },
  },
};

export const findManyResponseSchema: ResponseSchema = {
  ...baseResponseSchema,
  "2xx": {
    type: "object",
    properties: {
      message: { type: "string" },
      data: { type: "array" },
    },
  },
};
