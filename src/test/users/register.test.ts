import request from "supertest";

import { server } from "../../server.ts";
import { clearUsers, seededUser } from "../../seed/users.seed.ts";
import type { RegisterResponse } from "../../controllers/users.controller.ts";
import { HTTP_STATUS } from "../../modules/router/const.ts";
import type { RegisterPayload } from "../../schemas/user.schema.ts";

describe("users: register", () => {
  afterEach(async () => {
    await clearUsers();
  });

  it("should register a new user", async () => {
    // Arrange
    const payload: RegisterPayload = {
      email: seededUser.email,
      password: seededUser.password,
    };
    const expectedResponse: RegisterResponse = {
      user: {
        email: payload.email,
        id: seededUser.id,
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
