import request from "supertest";

import { server } from "../../server.ts";
import { clearTasks, seededTasks, seedTasks } from "../../seed/tasks.seed.ts";
import { clearUsers, seedUsers } from "../../seed/users.seed.ts";
import { signInUser } from "../helpers.ts";

describe("tasks: get all", () => {
  beforeAll(async () => {
    await seedUsers();
  });

  afterEach(async () => {
    await clearTasks();
  });

  afterAll(async () => {
    await clearUsers();
  });

  it("should return an empty list of tasks, when table does not have any records", async () => {
    // Arrange
    const { token } = await signInUser();

    // Act
    const response = await request(server)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ tasks: [] });
  });

  it("should return a list of tasks", async () => {
    // Arrange
    await seedTasks();
    const { token } = await signInUser();

    // Act
    const response = await request(server)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      tasks: seededTasks,
    });
  });
});
