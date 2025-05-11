import request from "supertest";

import { server } from "../../server.ts";
import type { TaskDto } from "../../controllers/task.controller.ts";
import { signInUser } from "../helpers.ts";

describe("tasks: update", () => {
  it("should update a task", async () => {
    // Arrange
    const { token } = await signInUser();
    const {
      body: { tasks },
    } = await request(server)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);
    const updatedTaskFields: Omit<TaskDto, "id"> = {
      title: "Learn Node.js",
      description: "Build a CRUD API",
      completed: false,
    };
    const updatedTask: TaskDto = {
      ...tasks[0],
      ...updatedTaskFields,
    };

    // Act
    const response = await request(server)
      .patch(`/tasks/${tasks[0].id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedTaskFields);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      task: updatedTask,
    });
  });
});
