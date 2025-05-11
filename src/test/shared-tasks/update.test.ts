import request from "supertest";

import { server } from "../../server.ts";
import type { SharedTaskDto } from "../../controllers/shared-task.controller.ts";

describe("shared-tasks: update", () => {
  it("should update a task", async () => {
    // Arrange
    const {
      body: { tasks },
    } = await request(server).get("/shared-tasks");
    const updatedTaskFields: Omit<SharedTaskDto, "id"> = {
      title: "Learn Node.js",
      description: "Build a CRUD API",
      completed: false,
    };
    const updatedTask: SharedTaskDto = {
      ...tasks[0],
      ...updatedTaskFields,
    };

    // Act
    const response = await request(server)
      .patch(`/shared-tasks/${tasks[0].id}`)
      .send(updatedTaskFields);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      task: updatedTask,
    });
  });
});
