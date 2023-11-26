import { taskCollections } from "../db/schema";
import { ValidationSchema } from "../utils/interfaces";
import {
  defaultSuccessSchema,
  findManyResponseSchema,
  findOneResponseSchema,
} from "../utils/schemas";

export type CreateTaskCollection = typeof taskCollections.$inferInsert;
export type UpdateTaskCollection = { title: string; description: string };

export const createTaskCollectionSchema: ValidationSchema = {
  description: "This endpoint handles the creation of task collection records",
  tags: ["taskCollection"],
  summary: "Create task collection record",
  body: {
    type: "object",
    properties: {
      userId: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
    },
    required: ["userId", "title", "description"],
    additionalProperties: false,
  },
  response: defaultSuccessSchema,
};

export const findOneTaskCollectionSchema: ValidationSchema = {
  description:
    "This endpoint return task collection data by their corresponding id",
  tags: ["taskCollection"],
  summary: "Find one task collection",
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
    additionalProperties: false,
  },
  // response: findOneResponseSchema,
};

export const findOneUserCollectionSchema: ValidationSchema = {
  description: "This endpoint returns user's task collection",
  tags: ["taskCollection"],
  summary: "Find user's task collection",
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
    additionalProperties: false,
  },
  // response: findOneResponseSchema,
};

export const findManyTaskCollectionSchema: ValidationSchema = {
  description: "This endpoint return all task collections",
  tags: ["taskCollection"],
  summary: "Find all task collections",
  response: findManyResponseSchema,
};

export const updateTaskCollectionSchema: ValidationSchema = {
  description: "This endpoint handles the update of task collection records",
  tags: ["taskCollection"],
  summary: "Update task collection record",
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
    },
    required: ["title", "description"],
    additionalProperties: false,
  },
  response: defaultSuccessSchema,
};
