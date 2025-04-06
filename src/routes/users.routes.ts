import { createUser } from "../controllers/users.controller.ts";
import { HTTP_METHODS } from "../modules/router/const.ts";
import type { Route } from "../modules/router/types.ts";

export const routes: Route[] = [
  {
    path: "/users",
    method: HTTP_METHODS.POST,
    handler: createUser,
  },
];
