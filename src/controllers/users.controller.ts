import type { IncomingMessage } from "node:http";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { HTTP_STATUS, type RequestContext } from "../modules/router/index.ts";
import type { CreateUserPayload } from "../repositories/user.repository.ts";
import * as repository from "../repositories/user.repository.ts";
import { handleError, ResError } from "../utils/http.ts";
import { type ResponseMod } from "../modules/router/types.ts";
import { config } from "../config.ts";
import type { User } from "../entities/User.ts";

export type JwtType = {
  user: User;
};

type RegisterPayload = CreateUserPayload;

export const register = (
  _req: IncomingMessage,
  res: ResponseMod,
  { body }: RequestContext,
) => {
  const payload = body as RegisterPayload;

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

type SignInPayload = CreateUserPayload;

export const signIn = (
  _req: IncomingMessage,
  res: ResponseMod,
  { body }: RequestContext,
) => {
  const payload = body as SignInPayload;

  repository.getUserSensitiveByEmail(payload.email, function (err, user) {
    if (err) {
      return handleError(res, err);
    }

    if (!user) {
      return handleError(res, new ResError({ cause: "not-found" }));
    }

    bcrypt.compare(payload.password, user.password).then((isPasswordMatch) => {
      if (!isPasswordMatch) {
        res.writeHead(HTTP_STATUS.unauthorized, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify({ message: "Invalid credentials" }));
        return;
      }

      const token = jwt.sign(
        { user: repository.omitSensitiveUserProps(user) },
        config.jwt.secret,
        {
          expiresIn: config.jwt.expiresIn,
        },
      );

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ token: token }));
    });
  });
};
