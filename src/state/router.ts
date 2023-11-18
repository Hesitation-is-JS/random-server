import { FastifyInstance, FastifyPluginCallback } from "fastify";
import * as services from "./service";
import { clerkPreHandler } from "../utils/preHandlers";
import {
  CreateState,
  UpdateState,
  createStateSchema,
  findOneStateSchema,
  findManyStateSchema,
  updateStateSchema,
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
    schema: findManyStateSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const data = await services.findAll();

      return rep.code(200).send({
        success: true,
        message: `Found ${data?.length} states`,
        data,
      });
    },
  });

  fastify.route({
    method: "GET",
    url: "/get/:id",
    schema: findOneStateSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: number };
      const data = await services.findOne(id);

      if (!data) throw new HttpNotFound(`State with id ${id} was not found`);

      return rep.code(200).send({
        success: true,
        message: `State with id ${id} was found`,
        data,
      });
    },
  });

  fastify.route({
    method: "POST",
    url: "/create",
    schema: createStateSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const body = req.body as CreateState;

      await services.createOne(body);

      return rep.code(201).send({
        message: "State created successfully",
        success: true,
      });
    },
  });

  fastify.route({
    method: "PUT",
    url: "/update/:id",
    schema: updateStateSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: number };
      const body = req.body as UpdateState;

      await services.updateOne(body, id);

      return rep.code(200).send({
        message: "State updated successfully",
        success: true,
      });
    },
  });

  done();
};

export default router;
