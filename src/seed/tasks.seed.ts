import type { TaskDto } from "../controllers/tasks.controller.ts";
import { db, dbAsync, TABLES } from "../db.ts";

export const seededSharedTasks: TaskDto[] = [
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

export async function seedTasks() {
  await dbAsync.run(
    `INSERT INTO ${TABLES.TASKS} (title, description, completed) VALUES (?, ?, ?)`,
    [
      seededSharedTasks[0].title,
      seededSharedTasks[0].description,
      seededSharedTasks[0].completed,
    ],
  );

  dbAsync.run(
    `INSERT INTO ${TABLES.TASKS} (title, description, completed) VALUES (?, ?, ?)`,
    [
      seededSharedTasks[1].title,
      seededSharedTasks[1].description,
      seededSharedTasks[1].completed,
    ],
  );
}

export async function clearTasks() {
  db.run(`DELETE FROM ${TABLES.TASKS}`);
}
