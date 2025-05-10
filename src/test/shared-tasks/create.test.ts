import request from "supertest";

import { server } from "../../server.ts";

describe("shared-tasks: create", () => {
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
        id: expect.any(Number),
        title: "Learn Node.js",
        description: "Build a CRUD API",
        completed: false,
      },
    });
  });
});
