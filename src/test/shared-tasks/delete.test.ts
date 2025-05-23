import request from "supertest";

import { server } from "../../server.ts";

describe("shared-tasks: delete", () => {
  it("should delete the shared task", async () => {
    // Arrange
    const {
      body: { tasks },
    } = await request(server).get("/shared-tasks");

    // Act
    const response = await request(server).delete(
      `/shared-tasks/${tasks[0].id}`,
    );

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Deleted",
    });

    const responseNotFound = await request(server).get("/shared-tasks/1");

    expect(responseNotFound.status).toBe(404);
    expect(responseNotFound.body).toEqual({
      message: "Not found",
    });
  });

  it("should return not found, when there is no task with id in db", async () => {
    // Act
    const response = await request(server).delete("/shared-tasks/1");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Not found",
    });
  });
});
