import { FastifyInstance, FastifyPluginCallback } from "fastify";
import * as services from "./service";
import { clerkPreHandler } from "../utils/preHandlers";
import { CreateUser, createUserSchema, finOneUserSchema } from "./schemas";
import { HttpNotFound } from "../utils/error";

const router: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _options: any,
  done: any
) => {
  fastify.route({
    method: "GET",
    url: "/get/:id",
    schema: finOneUserSchema,
    preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: string };
      const data = await services.findOne(id);

      if (!data) throw new HttpNotFound("User Not found");
      return rep
        .code(200)
        .send({ success: true, message: `User with id ${id} was found`, data });
    },
  });

  fastify.route({
    method: "POST",
    url: "/create",
    schema: createUserSchema,
    preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const body = req.body as CreateUser;

      const data = await services.createOne(body);
      return rep
        .code(201)
        .send({ message: "message", data, success: true, test: "sdq" });
    },
  });

  done();
};

export default router;
