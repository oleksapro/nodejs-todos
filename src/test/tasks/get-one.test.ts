import request from "supertest";

import { server } from "../../server.ts";
import { seededTasks, seedTasks } from "../../seed/task.seed.ts";
import { signInUser } from "../helpers.ts";

describe("tasks: get one", () => {
  it("should return not found", async () => {
    // Arrange
    const { token } = await signInUser();

    // Act
    const response = await request(server)
      .get("/tasks/0")
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(404);
  });

  it("should return the task", async () => {
    // Arrange
    const { token } = await signInUser();
    const {
      body: { tasks },
    } = await request(server)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    // Act
    const response = await request(server)
      .get(`/tasks/${tasks[0].id}`)
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      task: tasks[0],
    });
  });
});
