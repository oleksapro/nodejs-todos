import request from "supertest";

import { server } from "../server.ts";
import { seededUser } from "../seed/users.seed.ts";
import type { SignInResponse } from "../controllers/user.controller.ts";

export async function signInUser(): Promise<SignInResponse> {
  const {
    body: { token },
  } = await request(server).post("/users/signin").send({
    email: seededUser.email,
    password: seededUser.password,
  });

  return {
    token: token,
  };
}
