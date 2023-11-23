import tasks from "../db/schema/task";
import { ValidationSchema } from "../utils/interfaces";
import {
  defaultSuccessSchema,
  findManyResponseSchema,
  findOneResponseSchema,
} from "../utils/schemas";

export type CreateTask = typeof tasks.$inferInsert;
export type UpdateTask = {
  title: string;
  description: string;
  dueDate: Date;
  userId: string;
  stateId: number;
  categoryId: number;
};

export const createTaskSchema: ValidationSchema = {
  description: "This endpoint handles the creation of task records",
  tags: ["task"],
  summary: "Create task record",
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      dueDate: { type: "string", format: "date-time" },
      userId: { type: "string" },
      stateId: { type: "number" },
      categoryId: { type: "number" },
    },
    required: [
      "title",
      "description",
      "dueDate",
      "userId",
      "stateId",
      "categoryId",
    ],
  },
  response: defaultSuccessSchema,
};

export const findOneTaskSchema: ValidationSchema = {
  description: "This endpoint return task data by their corresponding id",
  tags: ["task"],
  summary: "Find one task",
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
  },
  response: findOneResponseSchema,
};

export const findManyTaskSchema: ValidationSchema = {
  description: "This endpoint return all tasks",
  tags: ["task"],
  summary: "Find all task",
  response: findManyResponseSchema,
};

export const updateTaskSchema: ValidationSchema = {
  description: "This endpoint handles the update of task records",
  tags: ["task"],
  summary: "Update task record",
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      dueDate: { type: "string", format: "date-time" },
      userId: { type: "string" },
      stateId: { type: "number" },
      categoryId: { type: "number" },
    },
    required: ["title"],
  },
  response: defaultSuccessSchema,
};
