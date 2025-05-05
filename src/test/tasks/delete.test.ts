import request from "supertest";

import { server } from "../../server.ts";
import { clearTasks, seedTasks } from "../../seed/tasks.seed.ts";
import { signInUser } from "../helpers.ts";
import { clearUsers, seedUsers } from "../../seed/users.seed.ts";

describe("tasks: delete", () => {
  beforeAll(async () => {
    await seedUsers();
  });

  afterEach(async () => {
    await clearTasks();
  });

  afterAll(async () => {
    await clearUsers();
  });

  it("should delete the task", async () => {
    // Arrange
    await seedTasks();
    const { token } = await signInUser();

    // Act
    const response = await request(server)
      .delete("/tasks/1")
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Deleted",
    });

    const responseNotFound = await request(server)
      .get("/tasks/1")
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
      .delete("/tasks/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Not found",
    });
  });
});
