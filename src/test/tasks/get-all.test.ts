import request from "supertest";

import { server } from "../../server.ts";
import { signInUser } from "../helpers.ts";

describe("tasks: get all", () => {
  it("should return a list of tasks", async () => {
    // Arrange
    const { token } = await signInUser();

    // Act
    const response = await request(server)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.tasks.length).toBeTruthy();
  });
});
