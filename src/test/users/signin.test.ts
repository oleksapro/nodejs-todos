import request from "supertest";

import { server } from "../../server.ts";
import { seededUser, seedUsers } from "../../seed/user.seed.ts";
import type { SignInResponse } from "../../controllers/user.controller.ts";
import { HTTP_STATUS } from "../../modules/router/const.ts";
import type { IHasMessage } from "../../utils/http.ts";
import type { SignInPayload } from "../../schemas/user.schema.ts";

describe("users: sign in", () => {
  it("should sign in a user", async () => {
    // Arrange
    const payload: SignInPayload = {
      email: seededUser.email,
      password: seededUser.password,
    };
    const expectedResponse: SignInResponse = {
      token: expect.any(String),
    };

    // Act
    const response = await request(server).post("/users/signin").send(payload);

    // Assert
    expect(response.status).toBe(HTTP_STATUS.success);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should reject sign in with wrong password", async () => {
    // Arrange
    const payload: SignInPayload = {
      email: seededUser.email,
      password: "wrong_password", // Incorrect password
    };
    const expectedResponse: IHasMessage = {
      message: "Invalid credentials",
    };

    // Act
    const response = await request(server).post("/users/signin").send(payload);

    // Assert
    expect(response.status).toBe(HTTP_STATUS.unauthorized);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should reject sign in with non-existent email", async () => {
    // Arrange
    const payload = {
      email: "nonexistent@test.com",
      password: "any_password",
    };
    const expectedResponse: IHasMessage = {
      message: expect.any(String),
    };

    // Act
    const response = await request(server).post("/users/signin").send(payload);

    // Assert
    expect(response.status).toBe(HTTP_STATUS.notFound);
    expect(response.body).toEqual(expectedResponse);
  });
});
