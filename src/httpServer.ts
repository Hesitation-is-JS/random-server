import Fastify, { FastifyInstance } from "fastify";
import { clerkPlugin } from "@clerk/fastify";
import globalErrorHandler from "./utils/error";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";

const GLOBAL_PREFIX = "api";

export function createHttpServer(): FastifyInstance {
  const fastify = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
    disableRequestLogging: true,
  });

  fastify.register(clerkPlugin);
  fastify.register(import("@fastify/swagger"), {
    swagger: {
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      host: "localhost",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "user", description: "User related end-points" },
        { name: "code", description: "Code related end-points" },
      ],
      definitions: {
        User: {
          type: "object",
          required: ["id", "email"],
          properties: {
            id: { type: "string", format: "uuid" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string", format: "email" },
          },
        },
      },
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
  });
  fastify.register(import("@fastify/swagger-ui"), {
    routePrefix: GLOBAL_PREFIX + "/docs",
  });

  fastify.setErrorHandler(globalErrorHandler);

  fastify.register(import("./todo/router"), {
    prefix: GLOBAL_PREFIX + "/todo",
  });

  return fastify;
}

export async function launchHttpServer(fastify: FastifyInstance, port: number) {
  try {
    await fastify.listen({ port });
    fastify.swagger();
  } catch (error) {
    fastify.log.error(error);
  }
}
