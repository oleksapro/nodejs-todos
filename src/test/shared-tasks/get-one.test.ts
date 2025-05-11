import request from "supertest";

import { server } from "../../server.ts";
import { seededSharedTasks } from "../../seed/shared-task.seed.ts";

describe("shared-tasks: get one", () => {
  it("should return not found", async () => {
    // Act
    const response = await request(server).get(`/shared-tasks/0`);

    // Assert
    expect(response.status).toBe(404);
  });

  it("should return the shared task", async () => {
    // Arrange
    const {
      body: { tasks },
    } = await request(server).get("/shared-tasks");

    // Act
    const response = await request(server).get(`/shared-tasks/${tasks[0].id}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      task: tasks[0],
    });
  });
});
