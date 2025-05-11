import request from "supertest";

import { server } from "../../server.ts";

describe("shared-tasks: get all", () => {
  it("should return a list of tasks", async () => {
    // Act
    const response = await request(server).get("/shared-tasks");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.tasks.length).toBeTruthy();
  });
});
