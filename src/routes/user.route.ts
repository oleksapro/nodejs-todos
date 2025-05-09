import { register, signIn } from "../controllers/user.controller.ts";
import { HTTP_METHODS } from "../modules/router/const.ts";
import type { Route } from "../modules/router/types.ts";

export const routes: Route[] = [
  {
    path: "/users/register",
    method: HTTP_METHODS.POST,
    handler: register,
  },
  {
    path: "/users/signin",
    method: HTTP_METHODS.POST,
    handler: signIn,
  },
];
