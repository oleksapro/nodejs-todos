import request from "supertest";

import { server } from "../../server.ts";
import {
  clearSharedTasks,
  seedSharedTasks,
} from "../../seed/shared-tasks.seed.ts";
import type { SharedTaskDto } from "../../controllers/shared-task.controller.ts";

describe("shared-tasks: update", () => {
  afterEach(async () => {
    clearSharedTasks();
  });

  it("should update a task", async () => {
    // Arrange
    await seedSharedTasks();

    const updatedTaskFields: Omit<SharedTaskDto, "id"> = {
      title: "Learn Node.js",
      description: "Build a CRUD API",
      completed: false,
    };
    const updatedTask: SharedTaskDto = {
      ...updatedTaskFields,
      id: 1,
    };

    // Act
    const response = await request(server)
      .patch("/shared-tasks/1")
      .send(updatedTaskFields);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      task: updatedTask,
    });
  });
});
