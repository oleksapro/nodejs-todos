import { type Response } from "../modules/router/index.ts";
import { HTTP_STATUS } from "../modules/router/index.ts";

export const handleError = (res: Response, err: Error) => {
  if (err.cause === "not-found") {
    res.writeHead(HTTP_STATUS.notFound, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: "Task not found" }));
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
    }),
  );
};
