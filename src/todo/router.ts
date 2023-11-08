import { FastifyInstance, FastifyPluginCallback } from "fastify";
import * as services from "./service";
import { clerkPreHandler } from "../utils/preHandlers";
import { createUserSchema } from "./schemas";

const router: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _options: any,
  done: any
) => {
  fastify.route({
    method: "GET",
    url: "/protected",
    preHandler: clerkPreHandler,
    handler: async (_req, rep) => {
      const data = await services.findOne(0);
      return rep.code(200).send({ success: true, message: data });
    },
  });

  fastify.route({
    method: "POST",
    url: "/public",
    schema: createUserSchema,
    handler: async (_req, rep) => {
      const data = await services.findOne(0);
      return rep
        .code(201)
        .send({ message: "message", data, success: true, test: "sdq" });
    },
  });

  done();
};

export default router;
