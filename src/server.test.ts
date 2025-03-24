import request from "supertest";
import { server } from "./server.ts";
import { db } from "./db.ts";

describe("Todos API", () => {
  afterAll(async () => {
    server.close();
    db.close();
  });

  afterEach(async () => {
    db.run("DELETE FROM tasks");
  });

  it("should return a list of tasks", async () => {
    const response = await request(server).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ tasks: [] });
  });
});
