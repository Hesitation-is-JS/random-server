import { FastifyError, FastifyRequest, FastifyReply } from "fastify";
import DrizzleErrorHandler, { DrizzleError, isDrizzleError } from "./drizzle";
import HttpError from "./http";

export default function globalErrorHandler(
  this: any,
  error: FastifyError,
  _req: FastifyRequest,
  rep: FastifyReply
) {
  this.log.error(error);

  let status = 500;
  let message = "Internal server  error";

  switch (true) {
    case error instanceof HttpError:
      status = error.status;
      message = error.message;
      break;

    case isDrizzleError(error):
      const drizzleErrorResponse = new DrizzleErrorHandler(
        error as unknown as DrizzleError
      ).getResponse();

      status = drizzleErrorResponse.status;
      message = drizzleErrorResponse.message;
      break;

    case error instanceof Error:
      status = error.statusCode ?? status;
      message = error.message;
      break;

    default:
      break;
  }

  rep.code(status).send({ message: message, success: false });
}

export interface ErrorResponse {
  message: string;
  status: number;
}
