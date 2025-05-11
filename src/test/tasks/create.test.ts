import request from "supertest";

import { server } from "../../server.ts";
import { HTTP_STATUS } from "../../modules/router/const.ts";
import type { IHasMessage } from "../../utils/http.ts";
import { signInUser } from "../helpers.ts";
import type { CreateTaskPayload } from "../../repositories/task.repository.ts";
import type { CreateTaskResponse } from "../../controllers/task.controller.ts";

describe("tasks: create", () => {
  it("should reject unauthorized request", async () => {
    const expectedResponse: IHasMessage = {
      message: "Unauthorized",
    };

    // Act
    const response = await request(server).post("/tasks").send({
      title: "Learn Node.js",
      description: "Build a CRUD API",
      completed: false,
    });

    // Assert
    expect(response.status).toBe(HTTP_STATUS.unauthorized);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should create a new task", async () => {
    // Arrange
    const { token } = await signInUser();
    const payload: CreateTaskPayload = {
      title: "Learn Node.js",
      description: "Build a CRUD API",
      completed: false,
    };
    const expectedResponse: CreateTaskResponse = {
      task: {
        id: expect.any(Number),
        title: "Learn Node.js",
        description: "Build a CRUD API",
        completed: false,
      },
    };

    // Act
    const response = await request(server)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);

    // Assert
    expect(response.status).toBe(HTTP_STATUS.created);
    expect(response.body).toEqual(expectedResponse);
  });
});
