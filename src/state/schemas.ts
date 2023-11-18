import states from "../db/schema/state";
import { ValidationSchema } from "../utils/interfaces";
import {
  defaultSuccessSchema,
  findOneResponseSchema,
  findManyResponseSchema,
} from "../utils/schemas";

export type CreateState = typeof states.$inferInsert;
export type UpdateState = { title?: string; color?: string };

export const createStateSchema: ValidationSchema = {
  description: "This endpoint handles the creation of state records",
  tags: ["state"],
  summary: "Create state record",
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      color: { type: "string" },
    },
    required: ["title", "color"],
  },
  response: defaultSuccessSchema,
};

export const findOneStateSchema: ValidationSchema = {
  description: "This endpoint return state data by their corresponding id",
  tags: ["state"],
  summary: "Find one state",
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
  },
  response: findOneResponseSchema,
};

export const findManyStateSchema: ValidationSchema = {
  description: "This endpoint return all states",
  tags: ["state"],
  summary: "Find all state",
  response: findManyResponseSchema,
};

export const updateStateSchema: ValidationSchema = {
  description: "This endpoint handles the update of state records",
  tags: ["state"],
  summary: "Update state record",
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
    },
    required: ["title"],
  },
  response: defaultSuccessSchema,
};
