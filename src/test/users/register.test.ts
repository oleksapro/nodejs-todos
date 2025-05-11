import request from "supertest";

import { server } from "../../server.ts";
import { clearUsers, seededUser } from "../../seed/user.seed.ts";
import type { RegisterResponse } from "../../controllers/user.controller.ts";
import { HTTP_STATUS } from "../../modules/router/const.ts";
import type { RegisterPayload } from "../../schemas/user.schema.ts";

describe("users: register", () => {
  it("should register a new user", async () => {
    // Arrange
    const payload: RegisterPayload = {
      email: "testUser@mail.com",
      password: "abcdefgh1234",
    };
    const expectedResponse: RegisterResponse = {
      user: {
        email: payload.email,
        id: expect.any(Number),
      },
    };

    // Act
    const response = await request(server)
      .post("/users/register")
      .send(payload);

    // Assert
    expect(response.status).toBe(HTTP_STATUS.created);
    expect(response.body).toEqual(expectedResponse);
  });
});
