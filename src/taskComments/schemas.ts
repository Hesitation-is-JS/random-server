import comment from "../db/schema/taskComments";
import { ValidationSchema } from "../utils/interfaces";
import {
  defaultSuccessSchema,
  findManyResponseSchema,
  findOneResponseSchema,
} from "../utils/schemas";

export type CreateTask = typeof comment.$inferInsert;
export type UpdateTask = { content: string };

export const createTaskCommentSchema: ValidationSchema = {
  description: "This endpoint handles the creation of task records",
  tags: ["task", "comments"],
  summary: "Create comment record",
  body: {
    type: "object",
    properties: {
      userId: { type: "string" },
      taskId: { type: "number" },
      content: { type: "string" },
    },
    required: ["userId", "taskId", "content"],
  },
  response: defaultSuccessSchema,
};

export const findManyTaskCommentSchema: ValidationSchema = {
  description: "This endpoint return all task comments",
  tags: ["task", "comments"],
  summary: "Find all task comments",
  response: findManyResponseSchema,
};

export const updateTaskCommentSchema: ValidationSchema = {
  description: "This endpoint handles the update of task records",
  tags: ["task", "comments"],
  summary: "Update comment record",
  body: {
    type: "object",
    properties: {
      content: { type: "string" },
    },
    required: ["content"],
  },
  response: defaultSuccessSchema,
};
