import type { SharedTaskDto } from "../controllers/shared-task.controller.ts";
import { db, dbAsync, TABLES } from "../db.ts";

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
  await dbAsync.run(
    `INSERT INTO ${TABLES.SHARED_TASKS} (title, description, completed) VALUES (?, ?, ?)`,
    [
      seededSharedTasks[0].title,
      seededSharedTasks[0].description,
      seededSharedTasks[0].completed,
    ],
  );

  await dbAsync.run(
    `INSERT INTO ${TABLES.SHARED_TASKS} (title, description, completed) VALUES (?, ?, ?)`,
    [
      seededSharedTasks[1].title,
      seededSharedTasks[1].description,
      seededSharedTasks[1].completed,
    ],
  );
}

export async function clearSharedTasks() {
  await dbAsync.run(`DELETE FROM ${TABLES.SHARED_TASKS}`);
}
