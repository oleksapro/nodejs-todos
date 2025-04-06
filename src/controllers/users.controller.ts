import type { IncomingMessage } from "node:http";

import { HTTP_STATUS, type RequestContext } from "../modules/router/index.ts";
import type { CreateUserPayload } from "../repositories/user.repository.ts";
import * as repository from "../repositories/user.repository.ts";
import { handleError } from "../utils/http.ts";
import { type Response } from "../modules/router/index.ts";

export const createUser = (
  _req: IncomingMessage,
  res: Response,
  { body }: RequestContext,
) => {
  const payload = body as CreateUserPayload;

  repository.createUser(payload, function (err, user) {
    if (err) {
      return handleError(res, err);
    }

    res.writeHead(HTTP_STATUS.created, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ user: user }));
  });
};
