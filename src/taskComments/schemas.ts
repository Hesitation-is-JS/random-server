import { tasksComments } from "../db/schema";
import { ValidationSchema } from "../utils/interfaces";
import {
  defaultSuccessSchema,
  findManyResponseSchema,
  findOneResponseSchema,
} from "../utils/schemas";

export type CreateTaskComment = typeof tasksComments.$inferInsert;
export type UpdateTaskComment = { content: string };

export const createTaskCommentSchema: ValidationSchema = {
  description: "This endpoint handles the creation of task records",
  tags: ["task"],
  summary: "Create comment record",
  body: {
    type: "object",
    properties: {
      userId: { type: "string" },
      taskId: { type: "number" },
      content: { type: "string" },
    },
    required: ["userId", "taskId", "content"],
    additionalProperties: false,
  },
  response: defaultSuccessSchema,
};

export const findOneTaskCommentSchema: ValidationSchema = {
  description: "This endpoint return task's comment",
  tags: ["task"],
  summary: "Find task's comments",
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

export const findOneUserCommentSchema: ValidationSchema = {
  description:
    "This endpoint return task comment data by their corresponding id",
  tags: ["user"],
  summary: "Find one comment",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
  },
  // response: findOneResponseSchema,
};

export const findManyTaskCommentSchema: ValidationSchema = {
  description: "This endpoint return all task comments",
  tags: ["task", "user"],
  summary: "Find all task comments",
  response: findManyResponseSchema,
};

export const updateTaskCommentSchema: ValidationSchema = {
  description: "This endpoint handles the update of task records",
  tags: ["task"],
  summary: "Update comment record",
  body: {
    type: "object",
    properties: {
      content: { type: "string" },
    },
    required: ["content"],
    additionalProperties: false,
  },
  response: defaultSuccessSchema,
};
