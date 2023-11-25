import { FastifyInstance, FastifyPluginCallback } from "fastify";
import * as services from "./service";
import { clerkPreHandler } from "../utils/preHandlers";
import {
  CreateTaskCollection,
  UpdateTaskCollection,
  createTaskCollectionSchema,
  findManyTaskCollectionSchema,
  findOneTaskCollectionSchema,
  updateTaskCollectionSchema,
} from "../taskCollection/schemas";
import { HttpNotFound } from "../utils/error/http";

const router: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _options: any,
  done: any
) => {
  fastify.route({
    method: "GET",
    url: "/",
    schema: findManyTaskCollectionSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const data = await services.findAll();

      return rep.code(200).send({
        message: `Found ${data?.length} task collections`,
        data,
      });
    },
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: findOneTaskCollectionSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: number };

      const data = await services.findOne(id);
      if (!data) throw new HttpNotFound("Collection Not found");

      return rep.code(200).send({
        message: `Task collections ${id} was found`,
        data,
      });
    },
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: createTaskCollectionSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const body = req.body as CreateTaskCollection;

      await services.createOne(body);

      return rep.code(200).send({
        message: `Task collections created successfully`,
      });
    },
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: updateTaskCollectionSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.body as { id: number };

      const body = req.body as UpdateTaskCollection;

      await services.updateOne(body, id);

      return rep.code(200).send({
        message: `Task collections created successfully`,
      });
    },
  });

  done();
};

export default router;
