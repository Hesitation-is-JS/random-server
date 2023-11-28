import { categories } from "../db/schema";
import { ValidationSchema } from "../utils/interfaces";
import {
  defaultSuccessSchema,
  findOneResponseSchema,
  findManyResponseSchema,
} from "../utils/schemas";

export type CreateCategory = typeof categories.$inferInsert;
export type UpdateCategory = { title?: string };

export const createCategorySchema: ValidationSchema = {
  description: "This endpoint handles the creation of category records",
  tags: ["category"],
  summary: "Create category record",
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      userId: { type: "string" },
    },
    required: ["title", "userId"],
  },
  response: defaultSuccessSchema,
};

export const finOneCategorySchema: ValidationSchema = {
  description: "This endpoint return category data by their corresponding id",
  tags: ["category"],
  summary: "Find one category",
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
  },
  // response: findOneResponseSchema,
};

export const finManyCategorySchema: ValidationSchema = {
  description: "This endpoint return all categories",
  tags: ["category"],
  summary: "Find all category",
  response: findManyResponseSchema,
};

export const finUsersCategorySchema: ValidationSchema = {
  description: "This endpoint return all user's categories",
  tags: ["user"],
  summary: "Find all user's category",
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: findManyResponseSchema,
};

export const updateCategorySchema: ValidationSchema = {
  description: "This endpoint handles the update of category records",
  tags: ["category"],
  summary: "Update category record",
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
    },
    required: ["title"],
  },
  response: defaultSuccessSchema,
};

export const deleteOneCategorySchema: ValidationSchema = {
  description: "This endpoint deletes category data by their corresponding id",
  tags: ["category"],
  summary: "Delete one category",
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
  },
  // response: findOneResponseSchema,
};
