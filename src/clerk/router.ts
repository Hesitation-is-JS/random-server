import { FastifyInstance, FastifyPluginCallback } from "fastify";
import * as userServices from "../user/service";
import { webhookSchema } from "./schemas";
import type { WebhookEvent } from "../utils/clerkWebhook";

const router: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _options: any,
  done: any
) => {
  fastify.route({
    method: "POST",
    url: "/webhook",
    schema: webhookSchema,
    handler: async (req, rep) => {
      const event = req.body as WebhookEvent;

      switch (event.type) {
        case "user.created":
          await userServices.createOne({
            userId: event.data.id,
          });

          return rep.code(201).send({
            message: `User with id; ${event.data.id} create`,
          });

        case "user.deleted": {
          await userServices.deleteOne(event.data.id ?? "nil");

          return rep.code(200).send({
            message: `User with id; ${event.data.id} delete`,
          });
        }
      }
    },
  });

  done();
};

export default router;
