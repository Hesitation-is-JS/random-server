import { FastifyInstance, FastifyPluginCallback } from "fastify";
import * as services from "./service";
import { clerkPreHandler } from "../utils/preHandlers";
import {
  CreateCategory,
  UpdateCategory,
  createCategorySchema,
  finOneCategorySchema,
  finManyCategorySchema,
  updateCategorySchema,
} from "./schemas";
import { HttpNotFound } from "../utils/error";

const router: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _options: any,
  done: any
) => {
  fastify.route({
    method: "GET",
    url: "/get",
    schema: finManyCategorySchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const data = await services.findAll();

      return rep.code(200).send({
        success: true,
        message: `Found ${data?.length} Categories`,
        data,
      });
    },
  });

  fastify.route({
    method: "GET",
    url: "/get/:id",
    schema: finOneCategorySchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: number };
      const data = await services.findOne(id);

      if (!data) throw new HttpNotFound(`Category with id ${id} was not found`);

      return rep.code(200).send({
        success: true,
        message: `Category with id ${id} was found`,
        data,
      });
    },
  });

  fastify.route({
    method: "POST",
    url: "/create",
    schema: createCategorySchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const body = req.body as CreateCategory;

      const data = await services.createOne(body);

      return rep.code(201).send({
        message: "Category created successfully",
        data,
        success: true,
      });
    },
  });

  fastify.route({
    method: "PUT",
    url: "/update/:id",
    schema: updateCategorySchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: number };
      const body = req.body as UpdateCategory;

      await services.updateOne(body, id);

      return rep.code(200).send({
        message: "Category updated successfully",
        success: true,
      });
    },
  });

  done();
};

export default router;
