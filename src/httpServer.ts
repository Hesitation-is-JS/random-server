import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { clerkPlugin } from "@clerk/fastify";
import globalErrorHandler from "./utils/error";
import cors from "@fastify/cors";
import { GLOBAL_PREFIX, swaggerOptions } from "./utils/utils";

declare module "fastify" {
  interface FastifyReply {
    startTime: number;
  }
}

export function createHttpServer(): FastifyInstance {
  const fastify = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
    disableRequestLogging: true,
  });

  fastify.register(cors, { origin: "*" });

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
  fastify.register(import("./clerk/router"), {
    prefix: GLOBAL_PREFIX + "/clerk",
  });
  fastify.register(import("./category/router"), {
    prefix: GLOBAL_PREFIX + "/category",
  });
  fastify.register(import("./state/router"), {
    prefix: GLOBAL_PREFIX + "/state",
  });
  fastify.register(import("./task/router"), {
    prefix: GLOBAL_PREFIX + "/task",
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
