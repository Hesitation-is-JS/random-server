import { FastifyInstance, FastifyPluginCallback } from "fastify";
import * as services from "./service";
import * as commentService from "../taskComments/service";
import * as categoryService from "../category/service";
import * as stateService from "../state/service";
import * as taskService from "../task/service";
import { clerkPreHandler } from "../utils/preHandlers";
import { CreateUser, createUserSchema, finOneUserSchema } from "./schemas";
import { HttpNotFound } from "../utils/error/http";
import { findOneUserCommentSchema } from "../taskComments/schemas";
import { finUsersCategorySchema } from "../category/schemas";

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
    schema: findOneUserCommentSchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: string };
      const data = await commentService.findAllUserComment(id);

      return rep.code(200).send({
        message: `Found ${data?.length} comment for user ${id}`,
        data,
      });
    },
  });

  fastify.route({
    method: "GET",
    url: "/:id/categories",
    schema: finUsersCategorySchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: string };
      const data = await categoryService.findAllForUser(id);

      return rep.code(200).send({
        message: `Found ${data?.length} categories for user ${id}`,
        data,
      });
    },
  });

  fastify.route({
    method: "GET",
    url: "/:id/states",
    schema: finUsersCategorySchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: string };
      console.log(id);

      const data = await stateService.findAllForUser(id);

      return rep.code(200).send({
        message: `Found ${data?.length} states for user ${id}`,
        data,
      });
    },
  });

  fastify.route({
    method: "GET",
    url: "/:id/tasks",
    schema: finUsersCategorySchema,
    // preHandler: clerkPreHandler,
    handler: async (req, rep) => {
      const { id } = req.params as { id: string };
      console.log(id);

      const data = await taskService.findAllForUser(id);

      return rep.code(200).send({
        message: `Found ${data?.length} tasks for user ${id}`,
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
