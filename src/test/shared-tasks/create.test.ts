import request from "supertest";

import { server } from "../../server.ts";
import { db } from "../../db.ts";
import { clearSharedTasks } from "../../seed/shared-tasks.ts";

describe("shared-tasks: create", () => {
  afterEach(async () => {
    clearSharedTasks();
  });

  it("should create a new task", async () => {
    // Act
    const response = await request(server).post("/shared-tasks").send({
      title: "Learn Node.js",
      description: "Build a CRUD API",
      completed: false,
    });

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      task: {
        id: 1,
        title: "Learn Node.js",
        description: "Build a CRUD API",
        completed: false,
      },
    });
  });
});
