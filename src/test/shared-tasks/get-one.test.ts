import request from "supertest";

import { server } from "../../server.ts";
import {
  clearSharedTasks,
  seededSharedTasks,
  seedSharedTasks,
} from "../../seed/shared-task.seed.ts";

describe("shared-tasks: get one", () => {
  afterEach(async () => {
    clearSharedTasks();
  });
  afterAll(() => {
    clearSharedTasks();
  });

  it("should return not found", async () => {
    // Act
    const response = await request(server).get("/shared-tasks/1");

    // Assert
    expect(response.status).toBe(404);
  });

  it("should return the shared task", async () => {
    // Arrange
    await seedSharedTasks();

    // Act
    const response = await request(server).get("/shared-tasks/1");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      task: seededSharedTasks[0],
    });
  });
});
