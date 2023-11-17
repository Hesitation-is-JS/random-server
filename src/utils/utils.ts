import { SwaggerOptions } from "@fastify/swagger";

export function isObjEmpty(obj: Record<any, any> | undefined) {
  if (!obj) return false;
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isArrayEmpty(arr: any[] | undefined) {
  if (!arr) return false;
  return arr.length === 0;
}

export const swaggerOptions: SwaggerOptions = {
  swagger: {
    info: {
      title: "Test swagger",
      description: "Testing the Fastify swagger API",
      version: "0.1.0",
    },
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [],
    definitions: {},
  },
};

export const GLOBAL_PREFIX = "api";
