import type { IncomingMessage } from "node:http";
import jwt from "jsonwebtoken";

import {
  type ResponseMod,
  type RequestMod,
  type RequestContext,
} from "../modules/router/types.ts";
import { HTTP_STATUS } from "../modules/router/const.ts";
import { config } from "../config.ts";
import type { JwtType } from "../controllers/users.controller.ts";

export const authMiddleware =
  (
    next: (req: RequestMod, res: ResponseMod, context: RequestContext) => void,
  ) =>
  (req1: IncomingMessage, res: ResponseMod, context: RequestContext) => {
    const req = req1 as RequestMod;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.writeHead(HTTP_STATUS.unauthorized, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "Unauthorized" }));
      return;
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid token" }));
        return;
      }

      const jwtPayload = decoded as JwtType;

      req.context = { user: jwtPayload.user };

      next(req, res, context);
    });
  };
