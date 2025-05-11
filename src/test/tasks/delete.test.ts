import request from "supertest";

import { server } from "../../server.ts";
import { signInUser } from "../helpers.ts";

describe("tasks: delete", () => {
  it("should delete the task", async () => {
    // Arrange
    const { token } = await signInUser();
    const {
      body: { tasks },
    } = await request(server)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    // Act
    const response = await request(server)
      .delete(`/tasks/${tasks[0].id}`)
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Deleted",
    });

    const responseNotFound = await request(server)
      .get(`/tasks/${tasks[0].id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(responseNotFound.status).toBe(404);
    expect(responseNotFound.body).toEqual({
      message: "Not found",
    });
  });

  it("should return not found, when there is no task with id in db", async () => {
    // Arrange
    const { token } = await signInUser();

    // Act
    const response = await request(server)
      .delete("/tasks/0")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Not found",
    });
  });
});
