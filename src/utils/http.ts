import { type ResponseMod } from "../modules/router/index.ts";
import { HTTP_STATUS } from "../modules/router/index.ts";

type IHasErrors = {
  errors: unknown[];
};

type ResErrorOptions = {
  message?: string;
} & (
  | {
      cause: "not-found" | "forbidden";
    }
  | (IHasErrors & {
      cause: "validation";
    })
);

export type IHasMessage = {
  message: string;
};

export class ResError extends Error {
  cause: "not-found" | "forbidden" | "validation" | string;
  errors: unknown[] = [];

  constructor(options: ResErrorOptions) {
    super(options.message);
    this.cause = options.cause;
    this.errors = options.cause === "validation" ? options.errors : [];
  }
}

export const handleError = (res: ResponseMod, err: ResError | unknown) => {
  if (err instanceof ResError) {
    if (err.cause === "forbidden") {
      res.writeHead(HTTP_STATUS.forbidden, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "Forbidden" } as IHasMessage));
      return;
    }

    if (err.cause === "not-found") {
      res.writeHead(HTTP_STATUS.notFound, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "Not found" } as IHasMessage));
      return;
    }

    if (err.cause === "validation") {
      res.writeHead(HTTP_STATUS.badRequest, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          message: "Bad request",
          errors: err.errors,
        } as IHasMessage),
      );
      return;
    }
  }

  if (err instanceof Error) {
    res.writeHead(HTTP_STATUS.serverError, {
      "Content-Type": "application/json",
    });

    const { message, ...restErrorProps } = err;

    res.end(
      JSON.stringify({
        ...restErrorProps,
        message: message || "Something went wrong",
      } as IHasMessage),
    );

    return;
  }

  res.end(
    JSON.stringify({
      message: "Something went wrong",
    } as IHasMessage),
  );
};
