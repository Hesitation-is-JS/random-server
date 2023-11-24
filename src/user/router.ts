import { FastifyInstance, FastifyPluginCallback } from "fastify";
import * as services from "./service";
import { findAllUserComment } from "../taskComments/service";
import { clerkPreHandler } from "../utils/preHandlers";
import { CreateUser, createUserSchema, finOneUserSchema } from "./schemas";
import { HttpNotFound } from "../utils/error/http";
import { findManyTaskCommentSchema } from "../taskComments/schemas";

const router: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _options: any,
  done: any
) => {
  fastify.route({
    method: "GET",
    url: "/:id",
    schema: finOneUserSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: string };
      const data = await services.findOne(id);

      if (!data) throw new HttpNotFound("User Not found");
      return rep.code(200).send({
        message: `User with id ${id} was found`,
        data,
      });
    },
  });

  fastify.route({
    method: "GET",
    url: "/:id/comments",
    schema: findManyTaskCommentSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: string };
      const data = await findAllUserComment(id);

      return rep.code(200).send({
        message: `Found ${data?.length} comment for user ${id}`,
        data,
      });
    },
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: createUserSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const body = req.body as CreateUser;

      const data = await services.createOne(body);
      return rep.code(201).send({ message: "User created successfully", data });
    },
  });

  done();
};

export default router;
