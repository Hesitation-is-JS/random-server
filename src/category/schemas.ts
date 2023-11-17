import categories from "../db/schema/category";
import { ValidationSchema } from "../utils/interfaces";
import { defaultSuccessSchema, findOneResponseSchema } from "../utils/schemas";

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
    },
    required: ["title"],
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
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: findOneResponseSchema,
};
