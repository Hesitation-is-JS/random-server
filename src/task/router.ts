import { FastifyInstance, FastifyPluginCallback } from "fastify";
import * as services from "./service";
import { clerkPreHandler } from "../utils/preHandlers";
import {
  CreateTask,
  UpdateTask,
  createTaskSchema,
  findManyTaskSchema,
  findOneTaskSchema,
  updateTaskSchema,
} from "./schemas";
import { HttpNotFound } from "../utils/error/http";

const router: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _options: any,
  done: any
) => {
  fastify.route({
    method: "GET",
    url: "/",
    schema: findManyTaskSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const data = await services.findAll();

      return rep.code(200).send({
        message: `Found ${data?.length} tasks`,
        data,
      });
    },
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: findOneTaskSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: number };
      const data = await services.findOne(id);

      if (!data) throw new HttpNotFound(`Task with id ${id} was not found`);

      return rep.code(200).send({
        message: `Task with id ${id} was found`,
        data,
      });
    },
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: createTaskSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const body = req.body as CreateTask;

      await services.createOne(body);

      return rep.code(201).send({
        message: "Task created successfully",
      });
    },
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: updateTaskSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: number };
      const body = req.body as UpdateTask;

      await services.updateOne(body, id);

      return rep.code(200).send({
        message: "Task updated successfully",
      });
    },
  });

  done();
};

export default router;
