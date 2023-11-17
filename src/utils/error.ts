import {
  FastifyError,
  FastifyRequest,
  FastifyReply,
  errorCodes,
} from "fastify";

export default function globalErrorHandler(
  this: any,
  error: FastifyError,
  _req: FastifyRequest,
  rep: FastifyReply
) {
  this.log.error(error);

  let statusCode = 500;
  let message = "Internal server  error";

  switch (true) {
    case error instanceof HttpError:
      statusCode = error.status;
      message = error.message;
      break;

    case error instanceof Error:
      statusCode = error.statusCode ?? statusCode;
      message = error.message;
      break;

    default:
      break;
  }

  rep.code(statusCode).send({ message: message, success: false });
}

interface HttpErrorResponse {
  message: string;
  status: number;
  success: boolean;
}

export class HttpError extends Error {
  constructor(
    public message: string,
    public status: number,
    public success: boolean = false
  ) {
    super(message);
  }

  public getResponse(): HttpErrorResponse {
    return {
      message: this.message,
      status: this.status,
      success: this.success,
    };
  }
}
export class HttpNotFound extends HttpError {
  constructor(public message: string = "NOT_FOUND_MESSAGE") {
    super(message, 404);
  }
}
export class HttpUnauthorized extends HttpError {
  constructor(public message: string = "UNAUTHORIZED_MESSAGE") {
    super(message, 401);
  }
}
export class HttpBadRequest extends HttpError {
  constructor(public message: string = "BAD_REQUEST_MESSAGE") {
    super(message, 400);
  }
}
export class HttpForbidden extends HttpError {
  constructor(public message: string = "FORBIDDEN") {
    super(message, 403);
  }
}
