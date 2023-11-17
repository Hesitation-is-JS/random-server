import { getAuth } from "@clerk/fastify";
import { FastifyRequest, FastifyReply } from "fastify";
import { HttpUnauthorized } from "./error";

export async function clerkPreHandler(
  req: FastifyRequest,
  _reply: FastifyReply,
  done: any
) {
  const { sessionId } = getAuth(req);

  if (!sessionId) {
    throw new HttpUnauthorized();
  }

  done();
}
