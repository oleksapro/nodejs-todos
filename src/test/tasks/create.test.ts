import request from "supertest";

import { server } from "../../server.ts";
import { clearTasks } from "../../seed/tasks.seed.ts";
import { HTTP_STATUS } from "../../modules/router/const.ts";
import type { IHasMessage } from "../../utils/http.ts";
import { clearUsers, seedUsers } from "../../seed/users.seed.ts";
import { signInUser } from "../helpers.ts";
import type { CreateTaskPayload } from "../../repositories/task.repository.ts";
import type { CreateTaskResponse } from "../../controllers/tasks.controller.ts";

describe("tasks: create", () => {
  beforeAll(async () => {
    await seedUsers();
  });

  afterEach(async () => {
    await clearTasks();
  });

  afterAll(async () => {
    await clearUsers();
  });

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
        id: 1,
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
