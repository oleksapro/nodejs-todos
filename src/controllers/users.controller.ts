import type { IncomingMessage } from "node:http";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { HTTP_STATUS, type RequestContext } from "../modules/router/index.ts";
import type { CreateUserPayload } from "../repositories/user.repository.ts";
import * as repository from "../repositories/user.repository.ts";
import { handleError, ResError } from "../utils/http.ts";
import { type ResponseMod } from "../modules/router/types.ts";
import { config } from "../config.ts";
import type { User } from "../entities/user.ts";
import { registerSchema, signInSchema } from "../schemas/user.schema.ts";

export type JwtType = {
  user: User;
};

export type RegisterResponse = {
  user: User | undefined;
};

export const register = (
  _req: IncomingMessage,
  res: ResponseMod,
  { body }: RequestContext,
) => {
  const validationResult = registerSchema.safeParse(body);

  if (!validationResult.success) {
    return handleError(
      res,
      new ResError({
        cause: "validation",
        errors: validationResult.error.issues,
      }),
    );
  }

  const payload = validationResult.data;

  repository.createUser(payload, function (err, user) {
    if (err) {
      return handleError(res, err);
    }

    res.writeHead(HTTP_STATUS.created, {
      "Content-Type": "application/json",
    });

    const response: RegisterResponse = { user: user };
    res.end(JSON.stringify(response));
  });
};

export type SignInPayload = CreateUserPayload;
export type SignInResponse = {
  token: string;
};

export const signIn = (
  _req: IncomingMessage,
  res: ResponseMod,
  { body }: RequestContext,
) => {
  const validationResult = signInSchema.safeParse(body);

  if (!validationResult.success) {
    return handleError(
      res,
      new ResError({
        cause: "validation",
        errors: validationResult.error.issues,
      }),
    );
  }

  const payload = validationResult.data;

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

      res.writeHead(HTTP_STATUS.success, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ token: token }));
    });
  });
};
