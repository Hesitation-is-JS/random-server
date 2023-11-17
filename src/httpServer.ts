import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { clerkPlugin } from "@clerk/fastify";
import globalErrorHandler from "./utils/error";
import { SwaggerOptions } from "@fastify/swagger";

declare module "fastify" {
  interface FastifyReply {
    startTime: number;
  }
}

const GLOBAL_PREFIX = "api";

const swaggerOptions: SwaggerOptions = {
  swagger: {
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
    host: "localhost",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [],
    definitions: {},
  },
};

export function createHttpServer(): FastifyInstance {
  const fastify = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
    disableRequestLogging: true,
  });

  fastify.addHook("onRequest", (_, reply: FastifyReply, done: any) => {
    reply.startTime = Date.now();
    done();
  });
  fastify.addHook(
    "onResponse",
    (req: FastifyRequest, reply: FastifyReply, done: any) => {
      const method = req.raw.method;
      const url = req.raw.url;
      const status = reply.raw.statusCode;
      const durationMs = Date.now() - reply.startTime;
      fastify.log.info(
        `${method}:${url} | status: ${status} | duration: ${durationMs}ms`
      );
      done();
    }
  );

  fastify.register(clerkPlugin);
  fastify.register(import("@fastify/swagger"), swaggerOptions);
  fastify.register(import("@fastify/swagger-ui"), {
    routePrefix: GLOBAL_PREFIX + "/docs",
  });

  fastify.setErrorHandler(globalErrorHandler);

  fastify.register(import("./user/router"), {
    prefix: GLOBAL_PREFIX + "/user",
  });

  fastify.all("*", (_req, rep) => {
    rep.code(404).send({ message: "Route not found", success: false });
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
