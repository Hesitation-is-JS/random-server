import { ErrorResponse } from ".";

export default class HttpError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
  }

  public getResponse(): ErrorResponse {
    return {
      message: this.message,
      status: this.status,
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
