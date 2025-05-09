import request from "supertest";

import { server } from "../../server.ts";
import { clearTasks, seededTasks, seedTasks } from "../../seed/task.seed.ts";
import { signInUser } from "../helpers.ts";
import { clearUsers, seedUsers } from "../../seed/user.seed.ts";

describe("tasks: get one", () => {
  beforeAll(async () => {
    await seedUsers();
  });

  afterEach(async () => {
    await clearTasks();
  });

  afterAll(async () => {
    await clearUsers();
    await clearTasks();
  });

  it("should return not found", async () => {
    // Arrange
    const { token } = await signInUser();

    // Act
    const response = await request(server)
      .get("/tasks/1")
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(404);
  });

  it("should return the task", async () => {
    // Arrange
    await seedTasks();
    const { token } = await signInUser();

    // Act
    const response = await request(server)
      .get("/tasks/1")
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      task: seededTasks[0],
    });
  });
});
