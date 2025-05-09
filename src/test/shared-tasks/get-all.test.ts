import request from "supertest";

import { server } from "../../server.ts";
import {
  clearSharedTasks,
  seededSharedTasks,
  seedSharedTasks,
} from "../../seed/shared-task.seed.ts";

describe("shared-tasks: get all", () => {
  afterEach(async () => {
    clearSharedTasks();
  });

  it("should return an empty list of tasks, when table does not have any records", async () => {
    // Act
    const response = await request(server).get("/shared-tasks");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ tasks: [] });
  });

  it("should return a list of tasks", async () => {
    // Arrange
    await seedSharedTasks();

    // Act
    const response = await request(server).get("/shared-tasks");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      tasks: seededSharedTasks,
    });
  });
});
