import { type ResponseMod } from "../modules/router/index.ts";
import { HTTP_STATUS } from "../modules/router/index.ts";

type ResErrorOptions = {
  message?: string;
  cause: "not-found" | "forbidden";
};

export type IHasMessage = {
  message: string;
};

export class ResError extends Error {
  cause: "not-found" | "forbidden" | string;

  constructor(options: ResErrorOptions) {
    super(options.message);
    this.cause = options.cause;
  }
}

export const handleError = (res: ResponseMod, err: Error | unknown) => {
  if (err instanceof Error) {
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
