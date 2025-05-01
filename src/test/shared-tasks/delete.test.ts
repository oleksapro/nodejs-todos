import request from "supertest";

import { server } from "../../server.ts";
import { clearSharedTasks, seedSharedTasks } from "../../seed/shared-tasks.ts";

describe("shared-tasks: delete", () => {
  afterEach(async () => {
    clearSharedTasks();
  });

  it("should delete the shared task", async () => {
    // Arrange
    await seedSharedTasks();

    // Act
    const response = await request(server).delete("/shared-tasks/1");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Deleted",
    });

    const responseNotFound = await request(server).get("/shared-tasks/1");

    expect(responseNotFound.status).toBe(404);
    expect(responseNotFound.body).toEqual({
      error: "Not found",
    });
  });

  it("should return not found, when there is no task with id in db", async () => {
    // Act
    const response = await request(server).delete("/shared-tasks/1");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Not found",
    });
  });
});
