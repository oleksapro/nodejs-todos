import type { SharedTaskDto } from "../controllers/shared-tasks.controller.ts";
import { db } from "../db.ts";

export const seededSharedTasks: SharedTaskDto[] = [
  {
    id: 1,
    title: "Seeded Task 1",
    description: "Seeded Description 1",
    completed: false,
  },
  {
    id: 2,
    title: "Seeded Task 2",
    description: "Seeded Description 2",
    completed: true,
  },
];

export async function seedSharedTasks() {
  db.run(
    "INSERT INTO shared_tasks (title, description, completed) VALUES (?, ?, ?)",
    ["Seeded Task 1", "Seeded Description 1", 0],
  );
  db.run(
    "INSERT INTO shared_tasks (title, description, completed) VALUES (?, ?, ?)",
    ["Seeded Task 2", "Seeded Description 2", 1],
  );
}

export async function clearSharedTasks() {
  db.run("DELETE FROM shared_tasks");
}
